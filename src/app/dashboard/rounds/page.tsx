"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const epochs = [
  { epoch: 24, status: "in_progress", startedAt: "2025-06-22 14:30", duration: "-", participants: "4/5", loss: 0.0342, accuracy: "96.8%" },
  { epoch: 23, status: "completed", startedAt: "2025-06-22 12:15", duration: "2h 14m", participants: "5/5", loss: 0.0360, accuracy: "96.5%" },
  { epoch: 22, status: "completed", startedAt: "2025-06-22 09:45", duration: "2h 28m", participants: "5/5", loss: 0.0385, accuracy: "96.1%" },
  { epoch: 21, status: "completed", startedAt: "2025-06-21 18:00", duration: "2h 05m", participants: "5/5", loss: 0.0401, accuracy: "95.8%" },
  { epoch: 20, status: "completed", startedAt: "2025-06-21 15:30", duration: "2h 31m", participants: "5/5", loss: 0.0423, accuracy: "95.4%" },
  { epoch: 19, status: "completed", startedAt: "2025-06-21 12:45", duration: "2h 44m", participants: "4/5", loss: 0.0448, accuracy: "95.0%" },
  { epoch: 18, status: "failed", startedAt: "2025-06-21 10:00", duration: "0h 42m", participants: "3/5", loss: null, accuracy: "-" },
  { epoch: 17, status: "completed", startedAt: "2025-06-20 22:00", duration: "2h 18m", participants: "5/5", loss: 0.0461, accuracy: "94.7%" },
  { epoch: 16, status: "completed", startedAt: "2025-06-20 19:30", duration: "2h 30m", participants: "5/5", loss: 0.0489, accuracy: "94.2%" },
  { epoch: 15, status: "completed", startedAt: "2025-06-20 16:45", duration: "2h 44m", participants: "5/5", loss: 0.0512, accuracy: "93.8%" },
];

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  in_progress: { bg: "bg-secondary/15", text: "text-secondary", label: "In Progress" },
  completed: { bg: "bg-green-500/15", text: "text-green-400", label: "Completed" },
  failed: { bg: "bg-error/15", text: "text-error", label: "Failed" },
};

export default function RoundsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Training Rounds
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Epoch history and aggregation status.
        </p>
      </div>

      <DashboardCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/15">
                <th className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Epoch
                </th>
                <th className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Status
                </th>
                <th className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Started
                </th>
                <th className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Duration
                </th>
                <th className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Participants
                </th>
                <th className="text-right font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Loss
                </th>
                <th className="text-right font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3">
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody>
              {epochs.map((e) => {
                const badge = statusBadge[e.status];
                return (
                  <tr
                    key={e.epoch}
                    className="border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3.5 font-mono-ui text-sm text-primary">
                      #{e.epoch}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-ui uppercase tracking-wider ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                      {e.startedAt}
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                      {e.duration}
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                      {e.participants}
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-primary text-right">
                      {e.loss !== null ? e.loss.toFixed(4) : "-"}
                    </td>
                    <td className="px-6 py-3.5 font-mono-ui text-xs text-primary text-right">
                      {e.accuracy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
