"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAudit, useActiveEpoch } from "@/hooks/useCoordinator";

// Derive round history from audit events — each AGGREGATION_TRIGGERED is a round
function timeAgo(isoStr: string) {
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const hrs = Math.floor(diffMs / 3600000);
  if (hrs < 1) return `${Math.floor(diffMs / 60000)}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function RoundsPage() {
  const { entries, isLoading, error } = useAudit(undefined, 50);
  const { epoch } = useActiveEpoch();

  // Build round data from audit entries
  const rounds = entries.reduce<
    {
      epoch_number: number;
      status: string;
      submissions: number;
      threshold: number;
      model_hash: string | null;
      model_s3_key: string | null;
      completed_at: string | null;
      triggered_at: string | null;
    }[]
  >((acc, entry) => {
    const epochNum = entry.epoch_number;
    let round = acc.find((r) => r.epoch_number === epochNum);
    if (!round) {
      round = {
        epoch_number: epochNum,
        status: "unknown",
        submissions: 0,
        threshold: 1,
        model_hash: null,
        model_s3_key: null,
        completed_at: null,
        triggered_at: null,
      };
      acc.push(round);
    }

    if (entry.event_type === "UPDATE_SUBMITTED") {
      round.submissions += 1;
    } else if (entry.event_type === "AGGREGATION_TRIGGERED") {
      round.status = "AGGREGATED";
      round.triggered_at = entry.created_at;
      try {
        const payload = typeof entry.payload === "string" ? JSON.parse(entry.payload) : entry.payload;
        round.threshold = payload.threshold ?? 1;
        round.submissions = payload.submission_count ?? round.submissions;
      } catch { /* ignore */ }
    } else if (entry.event_type === "MODEL_PUBLISHED") {
      round.status = "COMPLETED";
      round.completed_at = entry.created_at;
      try {
        const payload = typeof entry.payload === "string" ? JSON.parse(entry.payload) : entry.payload;
        round.model_hash = payload.model_hash ?? null;
        round.model_s3_key = payload.s3_key ?? null;
      } catch { /* ignore */ }
    }

    return acc;
  }, []);

  // Sort by epoch descending
  rounds.sort((a, b) => b.epoch_number - a.epoch_number);

  // Add the current active epoch as the top row if not already covered
  if (epoch && !rounds.find((r) => r.epoch_number === Number(epoch.epoch_number))) {
    rounds.unshift({
      epoch_number: Number(epoch.epoch_number),
      status: String(epoch.status),
      submissions: 0,
      threshold: Number(epoch.secure_agg_threshold ?? 1),
      model_hash: null,
      model_s3_key: null,
      completed_at: null,
      triggered_at: null,
    });
  }

  const statusBadge: Record<string, { bg: string; text: string }> = {
    ACTIVE: { bg: "bg-green-500/15", text: "text-green-400" },
    COMPLETED: { bg: "bg-secondary/15", text: "text-secondary" },
    AGGREGATED: { bg: "bg-amber-500/15", text: "text-amber-400" },
    unknown: { bg: "bg-outline/15", text: "text-outline" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Training Rounds
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Epoch history derived from the coordinator audit chain.
        </p>
      </div>

      {isLoading ? (
        <DashboardCard noPadding>
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        </DashboardCard>
      ) : error ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-error py-8 text-center">
            Failed to load audit data from coordinator.
          </p>
        </DashboardCard>
      ) : rounds.length === 0 ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
            No training rounds recorded yet.
          </p>
        </DashboardCard>
      ) : (
        <DashboardCard noPadding>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/15">
                  {["Epoch", "Status", "Submissions", "Threshold", "Model Hash", "Completed"].map((h) => (
                    <th key={h} className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rounds.map((r) => {
                  const badge = statusBadge[r.status] ?? statusBadge.unknown;
                  return (
                    <tr key={r.epoch_number} className="border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-3.5 font-mono-ui text-sm text-primary">
                        #{r.epoch_number}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-ui uppercase tracking-wider ${badge.bg} ${badge.text}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                        {r.submissions}
                      </td>
                      <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                        {r.threshold}
                      </td>
                      <td className="px-6 py-3.5 font-mono-ui text-[10px] text-secondary">
                        {r.model_hash ? `${r.model_hash.slice(0, 16)}...` : "—"}
                      </td>
                      <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                        {r.completed_at ? timeAgo(r.completed_at) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
