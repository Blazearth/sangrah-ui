/**
 * Client-side SWR hooks that fetch from the Next.js BFF API routes.
 * All coordinator credentials stay server-side — these hit /api/* only.
 */
import useSWR from "swr";
import type { EpochResponse, AuditEntry, HealthResponse } from "@/types/coordinator";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    // 404 on /api/epochs/active means no active epoch (PENDING state) — not a real error
    if (res.status === 404) return null;
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
  const { data, error, isLoading, mutate } = useSWR<EpochResponse | null>(
    `/api/epochs/active${query}`,
    fetcher,
    {
      refreshInterval: 15_000,
      // Don't treat null (no active epoch) as an error — just show empty state
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        // Never retry on 404 — epoch is simply PENDING
        if (error?.message?.includes("404")) return;
        // Otherwise retry up to 3 times
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  return {
    epoch: data ?? null,
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
