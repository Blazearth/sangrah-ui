"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useActiveEpoch } from "@/hooks/useCoordinator";

export default function ParticipantsPage() {
  const { epoch, isLoading, error } = useActiveEpoch();

  const rawParticipants = (epoch?.secure_agg_participants ?? []) as unknown as { org_id: string; public_key: string }[];
  const participants = rawParticipants.map((p) => ({
    org_id: p.org_id,
    public_key: p.public_key,
  }));

  const threshold = Number(epoch?.secure_agg_threshold ?? 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">Participants</h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Federation member organizations in the current epoch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">Total Nodes</p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">{participants.length}</p>
          )}
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">SecAgg Threshold</p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-secondary">{threshold}</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">min submissions</p>
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">Epoch</p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : epoch ? (
            <p className="font-display-lg text-3xl text-primary">#{epoch.epoch_number}</p>
          ) : (
            <p className="font-display-lg text-3xl text-outline-variant">—</p>
          )}
        </DashboardCard>
      </div>

      {isLoading ? (
        <DashboardCard noPadding>
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        </DashboardCard>
      ) : error ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-error py-8 text-center">
            Failed to load participant data from coordinator.
          </p>
        </DashboardCard>
      ) : participants.length === 0 ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
            No participants registered for the active epoch.
          </p>
        </DashboardCard>
      ) : (
        <DashboardCard noPadding>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/15">
                  {["Org ID", "Public Key", "Status"].map((h) => (
                    <th key={h} className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((org) => (
                  <tr key={org.org_id} className="border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors">
                    <td className="px-6 py-3.5 font-mono-ui text-sm text-secondary">{org.org_id}</td>
                    <td className="px-6 py-3.5 font-mono-ui text-[10px] text-on-surface-variant max-w-xs truncate">
                      {org.public_key ? `${org.public_key.slice(0, 40)}...` : "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-mono-ui text-xs text-on-surface-variant">ACTIVE</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
