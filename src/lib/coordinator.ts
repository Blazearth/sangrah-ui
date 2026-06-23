/**
 * Server-side coordinator client — BFF only, never runs in browser.
 *
 * Uses Node's native https.request for mTLS (undici / Next.js fetch does not
 * support https.Agent for client certificates). Falls back to plain fetch for
 * local HTTP mode.
 */

import * as fs from "fs";
import * as https from "https";
import * as http from "http";

const BASE_URL = process.env.COORDINATOR_BASE_URL ?? "http://localhost:8082";
const AUTH_MODE = process.env.COORDINATOR_AUTH_MODE ?? "local";
const ORG_ID = process.env.COORDINATOR_ORG_ID ?? "org-aiims";
const MODEL_ID = process.env.COORDINATOR_MODEL_ID ?? "fraud-detection-v2";

// ─── mTLS agent (loaded once) ─────────────────────────────────────────────────
let _tlsAgent: https.Agent | null = null;

function getTlsAgent(): https.Agent {
  if (_tlsAgent) return _tlsAgent;

  const certPath = process.env.COORDINATOR_CERT_PATH!;
  const keyPath = process.env.COORDINATOR_KEY_PATH!;
  const caPath = process.env.COORDINATOR_CA_PATH!;

  if (!certPath || !keyPath || !caPath) {
    throw new Error(
      "mTLS mode requires COORDINATOR_CERT_PATH, COORDINATOR_KEY_PATH, COORDINATOR_CA_PATH"
    );
  }

  _tlsAgent = new https.Agent({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    // No 'ca' here — API Gateway's server cert is signed by Amazon's public CA.
    // Our private CA only signs client certs, not the server.
    rejectUnauthorized: true,
    keepAlive: true,
  });

  return _tlsAgent;
}

// ─── Core request using Node http/https directly ──────────────────────────────
// Next.js server-side fetch (undici) does NOT support https.Agent for mTLS.
// We use the native node modules instead.

function nodeRequest<T>(
  method: string,
  path: string,
  body?: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${path}`);
    const isHttps = url.protocol === "https:";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (AUTH_MODE === "local") {
      headers["X-Test-Org-Id"] = ORG_ID;
    }

    if (body) {
      headers["Content-Length"] = Buffer.byteLength(body).toString();
    }

    const options: https.RequestOptions = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers,
      family: 4, // force IPv4 — IPv6 is unreachable on this host
      ...(isHttps && AUTH_MODE === "mtls" ? { agent: getTlsAgent() } : {}),
    };

    const transport = isHttps ? https : http;

    const req = transport.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (!res.statusCode || res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data) as T);
        } catch {
          reject(new Error(`JSON parse error: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on("error", reject);

    if (body) req.write(body);
    req.end();
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const coordinator = {
  modelId: MODEL_ID,

  health() {
    return nodeRequest<{ status: string; timestamp: string }>("GET", "/api/health");
  },

  activeEpoch(modelId = MODEL_ID) {
    return nodeRequest<Record<string, unknown>>(
      "GET",
      `/api/epochs/active?model_id=${encodeURIComponent(modelId)}`
    );
  },

  audit(modelId = MODEL_ID, limit = 50) {
    return nodeRequest<{ items?: unknown[]; entries?: unknown[]; count?: number }>(
      "GET",
      `/api/audit?model_id=${encodeURIComponent(modelId)}&limit=${limit}`
    );
  },

  modelDownloadUrl(modelId = MODEL_ID, modelVersion: string) {
    return nodeRequest<{ url: string; download_url: string }>(
      "POST",
      "/api/models/download-url",
      JSON.stringify({ model_id: modelId, model_version: modelVersion })
    );
  },

  updateUploadUrl(modelId = MODEL_ID, epochNumber: number) {
    return nodeRequest<{ url: string; upload_url: string }>(
      "POST",
      "/api/updates/upload-url",
      JSON.stringify({ model_id: modelId, epoch_number: epochNumber })
    );
  },

  submitComplete(modelId = MODEL_ID, epochNumber: number, updateHash: string) {
    return nodeRequest<{ message: string }>(
      "POST",
      "/api/updates/complete",
      JSON.stringify({
        model_id: modelId,
        epoch_number: epochNumber,
        update_hash: updateHash,
      })
    );
  },
};
