/**
 * Server-side coordinator client — BFF only, never runs in browser.
 *
 * AUTH_MODE=mtls  → attaches org-aiims client cert to every request (production AWS)
 * AUTH_MODE=local → sends X-Test-Org-Id header (Docker Compose local mode)
 */

import * as fs from "fs";
import * as https from "https";

const BASE_URL = process.env.COORDINATOR_BASE_URL ?? "http://localhost:8082";
const AUTH_MODE = process.env.COORDINATOR_AUTH_MODE ?? "local";
const ORG_ID = process.env.COORDINATOR_ORG_ID ?? "org-aiims";
const MODEL_ID = process.env.COORDINATOR_MODEL_ID ?? "fraud-detection-v2";

// Build a persistent mTLS agent (loaded once at module init)
let _tlsAgent: https.Agent | null = null;

function getTlsAgent(): https.Agent {
  if (_tlsAgent) return _tlsAgent;

  const certPath = process.env.COORDINATOR_CERT_PATH;
  const keyPath = process.env.COORDINATOR_KEY_PATH;
  const caPath = process.env.COORDINATOR_CA_PATH;

  if (!certPath || !keyPath || !caPath) {
    throw new Error(
      "mTLS mode requires COORDINATOR_CERT_PATH, COORDINATOR_KEY_PATH, and COORDINATOR_CA_PATH"
    );
  }

  _tlsAgent = new https.Agent({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true,
  });

  return _tlsAgent;
}

function buildFetchOptions(extra?: RequestInit): RequestInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(extra?.headers as Record<string, string> ?? {}),
  };

  if (AUTH_MODE === "local") {
    headers["X-Test-Org-Id"] = ORG_ID;
  }

  const options: RequestInit = {
    ...extra,
    headers,
    cache: "no-store",
  };

  // Attach mTLS agent for production HTTPS calls
  if (AUTH_MODE === "mtls") {
    // Node fetch (used by Next.js server) accepts agent via undici dispatcher,
    // but the simplest production-compatible approach is passing it as a cast
    (options as Record<string, unknown>).agent = getTlsAgent();
  }

  return options;
}

async function coordinatorFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const fetchOptions = buildFetchOptions(options);

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Coordinator ${options?.method ?? "GET"} ${path} → HTTP ${res.status}: ${text}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const coordinator = {
  modelId: MODEL_ID,

  health() {
    return coordinatorFetch<{ status: string; timestamp: string }>("/api/health");
  },

  activeEpoch(modelId = MODEL_ID) {
    return coordinatorFetch<Record<string, unknown>>(
      `/api/epochs/active?model_id=${encodeURIComponent(modelId)}`
    );
  },

  audit(modelId = MODEL_ID, limit = 50) {
    return coordinatorFetch<{ items?: unknown[]; entries?: unknown[]; count?: number }>(
      `/api/audit?model_id=${encodeURIComponent(modelId)}&limit=${limit}`
    );
  },

  modelDownloadUrl(modelId = MODEL_ID, modelVersion: string) {
    return coordinatorFetch<{ url: string; download_url: string }>(
      "/api/models/download-url",
      {
        method: "POST",
        body: JSON.stringify({ model_id: modelId, model_version: modelVersion }),
      }
    );
  },

  updateUploadUrl(modelId = MODEL_ID, epochNumber: number) {
    return coordinatorFetch<{ url: string; upload_url: string }>(
      "/api/updates/upload-url",
      {
        method: "POST",
        body: JSON.stringify({ model_id: modelId, epoch_number: epochNumber }),
      }
    );
  },

  submitComplete(modelId = MODEL_ID, epochNumber: number, updateHash: string) {
    return coordinatorFetch<{ message: string }>("/api/updates/complete", {
      method: "POST",
      body: JSON.stringify({
        model_id: modelId,
        epoch_number: epochNumber,
        update_hash: updateHash,
      }),
    });
  },
};
