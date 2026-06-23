"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAudit } from "@/hooks/useCoordinator";

const eventColor: Record<string, string> = {
  MODEL_PUBLISHED: "text-primary",
  AGGREGATION_TRIGGERED: "text-secondary",
  UPDATE_SUBMITTED: "text-green-400",
};

function timeAgo(isoStr: string) {
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AuditPage() {
  const { entries, count, isLoading, error } = useAudit(undefined, 50);

  // Verify chain integrity by checking each entry's previous_hash matches the prior entry's entry_hash
  let chainValid = true;
  for (let i = 0; i < entries.length - 1; i++) {
    if (entries[i].previous_hash !== entries[i + 1].entry_hash) {
      chainValid = false;
      break;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">Audit Trail</h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Immutable hash chain from the coordinator — {count} events.
        </p>
      </div>

      {/* Chain integrity */}
      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${chainValid ? "bg-green-500/15" : "bg-error/15"} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${chainValid ? "text-green-400" : "text-error"} text-2xl`}>
              {chainValid ? "verified_user" : "gpp_bad"}
            </span>
          </div>
          <div>
            <p className="font-body-sm text-sm text-primary">
              {isLoading ? "Verifying..." : chainValid ? "Hash Chain Integrity Verified" : "Chain Integrity Warning"}
            </p>
            <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">
              {entries.length} events · {chainValid ? "All previous_hash links valid" : "Hash mismatch detected"}
            </p>
          </div>
        </div>
      </DashboardCard>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-surface-container-high rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-error py-8 text-center">
            Failed to load audit data from coordinator.
          </p>
        </DashboardCard>
      ) : entries.length === 0 ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
            No audit events recorded yet.
          </p>
        </DashboardCard>
      ) : (
        <div className="space-y-0">
          {entries.map((entry, i) => (
            <div key={entry.entry_id} className="relative flex gap-4">
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/20" />
                {i < entries.length - 1 && (
                  <div className="w-[1px] flex-1 bg-outline-variant/20 min-h-[60px]" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="bg-surface border border-outline-variant/10 rounded-lg p-4 hover:border-outline-variant/25 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`font-mono-ui text-xs ${eventColor[entry.event_type] ?? "text-on-surface-variant"}`}>
                        {entry.event_type.replace(/_/g, " ")}
                      </span>
                      <span className="font-mono-ui text-[10px] text-outline-variant ml-3">
                        by {entry.org_id} · epoch #{entry.epoch_number}
                      </span>
                    </div>
                    <span className="font-mono-ui text-[10px] text-outline-variant">
                      {timeAgo(entry.created_at)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-ui text-[10px] text-outline uppercase">Hash:</span>
                      <span className="font-mono-ui text-[10px] text-secondary">{entry.entry_hash.slice(0, 16)}...</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-ui text-[10px] text-outline uppercase">Prev:</span>
                      <span className="font-mono-ui text-[10px] text-outline-variant">{entry.previous_hash.slice(0, 16)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
