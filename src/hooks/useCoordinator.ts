/**
 * Client-side SWR hooks that fetch from the Next.js BFF API routes.
 * All coordinator credentials stay server-side — these hit /api/* only.
 */
import useSWR from "swr";
import type { EpochResponse, AuditEntry, HealthResponse } from "@/types/coordinator";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

// ─── Health ───────────────────────────────────────────────────────────────────
export function useHealth() {
  const { data, error, isLoading } = useSWR<HealthResponse>(
    "/api/health",
    fetcher,
    { refreshInterval: 30_000 } // re-check every 30s
  );
  return {
    health: data,
    isHealthy: data?.status === "ok",
    isLoading,
    error,
  };
}

// ─── Active Epoch ─────────────────────────────────────────────────────────────
export function useActiveEpoch(modelId?: string) {
  const query = modelId ? `?model_id=${modelId}` : "";
  const { data, error, isLoading, mutate } = useSWR<EpochResponse>(
    `/api/epochs/active${query}`,
    fetcher,
    { refreshInterval: 15_000 } // poll every 15s — epoch state changes slowly
  );
  return {
    epoch: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

// ─── Audit Trail ──────────────────────────────────────────────────────────────
export function useAudit(modelId?: string, limit = 50) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (modelId) params.set("model_id", modelId);

  const { data, error, isLoading, mutate } = useSWR<{
    entries: AuditEntry[];
    count: number;
  }>(`/api/audit?${params.toString()}`, fetcher, {
    refreshInterval: 20_000,
  });

  return {
    entries: data?.entries ?? [],
    count: data?.count ?? 0,
    isLoading,
    error,
    refresh: mutate,
  };
}
