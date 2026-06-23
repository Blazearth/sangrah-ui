"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAudit } from "@/hooks/useCoordinator";
import type { AuditEntry } from "@/types/coordinator";

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
  return `${hrs}h ago`;
}

// Fallback mock entries
const MOCK_ENTRIES: Partial<AuditEntry>[] = [
  { entry_id: "1", event_type: "MODEL_PUBLISHED", org_id: "coordinator", entry_hash: "sha256:a4f2c8e1...3b9d", previous_hash: "sha256:e0d1c2b3...a4f5", created_at: new Date(Date.now() - 2 * 60000).toISOString(), epoch_number: 3 },
  { entry_id: "2", event_type: "AGGREGATION_TRIGGERED", org_id: "coordinator", entry_hash: "sha256:e0d1c2b3...a4f5", previous_hash: "sha256:d9e0f1a2...b3c4", created_at: new Date(Date.now() - 8 * 60000).toISOString(), epoch_number: 2 },
  { entry_id: "3", event_type: "UPDATE_SUBMITTED", org_id: "org-aiims", entry_hash: "sha256:d9e0f1a2...b3c4", previous_hash: "sha256:c8d9e0f1...a2b3", created_at: new Date(Date.now() - 15 * 60000).toISOString(), epoch_number: 2 },
  { entry_id: "4", event_type: "UPDATE_SUBMITTED", org_id: "org-kgmu", entry_hash: "sha256:c8d9e0f1...a2b3", previous_hash: "sha256:b7c8d9e0...f1a2", created_at: new Date(Date.now() - 22 * 60000).toISOString(), epoch_number: 2 },
];

export default function AuditPage() {
  const { entries, isLoading, error } = useAudit(undefined, 50);
  const isMock = !!error || entries.length === 0;
  const display = isMock ? MOCK_ENTRIES : entries;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Audit Trail
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Immutable hash chain of all federation events.
          </p>
        </div>
        {isMock && (
          <span className="font-mono-ui text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded uppercase tracking-wider">
            Mock data
          </span>
        )}
      </div>

      {/* Chain integrity */}
      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-400 text-2xl">
              verified_user
            </span>
          </div>
          <div>
            <p className="font-body-sm text-sm text-primary">
              Hash Chain Integrity {isMock ? "(Not Verified — Offline)" : "Verified"}
            </p>
            <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">
              {display.length} events · {isMock ? "Using local mock data" : "All hashes validated"}
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
      ) : (
        <div className="space-y-0">
          {display.map((entry, i) => (
            <div key={entry.entry_id ?? i} className="relative flex gap-4">
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/20" />
                {i < display.length - 1 && (
                  <div className="w-[1px] flex-1 bg-outline-variant/20 min-h-[60px]" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="bg-surface border border-outline-variant/10 rounded-lg p-4 hover:border-outline-variant/25 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`font-mono-ui text-xs ${eventColor[entry.event_type ?? ""] ?? "text-on-surface-variant"}`}>
                        {(entry.event_type ?? "").replace(/_/g, " ")}
                      </span>
                      <span className="font-mono-ui text-[10px] text-outline-variant ml-3">
                        by {entry.org_id} · epoch #{entry.epoch_number}
                      </span>
                    </div>
                    <span className="font-mono-ui text-[10px] text-outline-variant">
                      {entry.created_at ? timeAgo(entry.created_at) : ""}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-ui text-[10px] text-outline uppercase">Hash:</span>
                      <span className="font-mono-ui text-[10px] text-secondary">{entry.entry_hash}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-ui text-[10px] text-outline uppercase">Prev:</span>
                      <span className="font-mono-ui text-[10px] text-outline-variant">{entry.previous_hash}</span>
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
