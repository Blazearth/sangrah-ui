/**
 * Server-side coordinator client used by Next.js API route handlers (BFF).
 * Supports both local Docker Compose mode (X-Test-Org-Id header) and
 * production mTLS mode (client cert + CA bundle via node:https agent).
 *
 * All calls are server-side only — credentials never reach the browser.
 */

const BASE_URL = process.env.COORDINATOR_BASE_URL ?? "http://localhost:8082";
const AUTH_MODE = process.env.COORDINATOR_AUTH_MODE ?? "local";
const ORG_ID = process.env.COORDINATOR_ORG_ID ?? "org-hospital-a";
const MODEL_ID = process.env.COORDINATOR_MODEL_ID ?? "fraud-detection-v2";

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (AUTH_MODE === "local") {
    // Local Docker Compose: coordinator reads org from this header
    headers["X-Test-Org-Id"] = ORG_ID;
  }
  // mTLS mode: cert is attached via custom https.Agent (not yet implemented here;
  // requires node:https and fs — add when deploying against production endpoint)

  return headers;
}

async function coordinatorFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(),
      ...(options?.headers ?? {}),
    },
    // Don't cache coordinator responses — always fresh
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Coordinator ${options?.method ?? "GET"} ${path} → ${res.status}: ${text}`
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
    return coordinatorFetch<{ items?: unknown[]; entries?: unknown[] }>(
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
    return coordinatorFetch<{ message: string }>(
      "/api/updates/complete",
      {
        method: "POST",
        body: JSON.stringify({
          model_id: modelId,
          epoch_number: epochNumber,
          update_hash: updateHash,
        }),
      }
    );
  },
};
