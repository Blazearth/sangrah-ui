"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useActiveEpoch } from "@/hooks/useCoordinator";

// Fallback when coordinator is offline
const MOCK_ORGS = [
  { org_id: "org-aiims", display_name: "AIIMS Test Organisation", status: "ACTIVE" },
  { org_id: "org-kgmu", display_name: "KGMU Test Organisation", status: "ACTIVE" },
];

export default function ParticipantsPage() {
  const { epoch, isLoading, error } = useActiveEpoch();

  // Real participant list comes from epoch.secure_agg_participants
  const rawParticipants = epoch?.secure_agg_participants ?? [];
  const isMock = !!error || rawParticipants.length === 0;

  // Merge with mock display names when available
  const participants = isMock
    ? MOCK_ORGS
    : rawParticipants.map((p) => ({
        org_id: typeof p === "object" && p !== null ? (p as {org_id: string}).org_id : String(p),
        display_name: typeof p === "object" && p !== null ? ((p as {org_id: string}).org_id) : String(p),
        status: "ACTIVE",
      }));

  const activeCount = participants.filter((p) => p.status === "ACTIVE").length;
  const threshold = epoch?.secure_agg_threshold ?? 2;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Participants
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Federation member organizations — epoch {epoch?.epoch_number ?? "—"} participant ring.
          </p>
        </div>
        {isMock && (
          <span className="font-mono-ui text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded uppercase tracking-wider">
            Mock data
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Total Nodes
          </p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">{participants.length}</p>
          )}
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Active
          </p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-green-400">{activeCount}</p>
          )}
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            SecAgg Threshold
          </p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-secondary">{threshold}</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
            min submissions needed
          </p>
        </DashboardCard>
      </div>

      <DashboardCard noPadding>
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/15">
                  {["Org ID", "Display Name", "Status", "Role in Epoch"].map((h) => (
                    <th key={h} className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((org) => (
                  <tr key={org.org_id} className="border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors">
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-secondary">
                      {org.org_id}
                    </td>
                    <td className="px-6 py-3.5 font-body-sm text-sm text-primary">
                      {org.display_name}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-mono-ui text-xs text-on-surface-variant">
                          {org.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                      Secure Aggregation Participant
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>

      {/* Epoch context */}
      {epoch && (
        <DashboardCard title="Epoch Context" subtitle="Current round configuration">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Model ID", epoch.model_id],
              ["Model Version", epoch.model_version],
              ["FedProx μ", epoch.fedprox_mu],
              ["SecAgg Threshold", epoch.secure_agg_threshold],
            ].map(([label, val]) => (
              <div key={String(label)}>
                <p className="font-mono-ui text-[10px] text-outline uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="font-mono-ui text-sm text-on-surface-variant">{String(val)}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
