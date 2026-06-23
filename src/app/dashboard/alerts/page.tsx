"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAudit, useActiveEpoch } from "@/hooks/useCoordinator";

function timeAgo(isoStr: string) {
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const severityMap: Record<string, { color: string; icon: string; label: string }> = {
  MODEL_PUBLISHED: { color: "text-green-400", icon: "check_circle", label: "Model Published" },
  AGGREGATION_TRIGGERED: { color: "text-secondary", icon: "sync", label: "Aggregation Triggered" },
  UPDATE_SUBMITTED: { color: "text-on-surface-variant", icon: "upload", label: "Update Submitted" },
};

export default function AlertsPage() {
  const { entries, isLoading, error } = useAudit(undefined, 50);
  const { epoch } = useActiveEpoch();

  // Drift alerts from the epoch
  const driftAlerts = (epoch?.drift_alerts ?? []) as { feature: string; score: number; threshold: number }[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">Alerts</h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Live federation events and drift warnings from the coordinator.
        </p>
      </div>

      {/* Drift alerts — real from epoch metadata */}
      {driftAlerts.length > 0 && (
        <DashboardCard title="⚠ Drift Alerts" subtitle={`${driftAlerts.length} features flagged in epoch #${epoch?.epoch_number}`}>
          <div className="space-y-3">
            {driftAlerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                <span className="font-mono-ui text-sm text-error">{alert.feature}</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono-ui text-[10px] text-outline-variant">threshold {alert.threshold}</span>
                  <span className="font-mono-ui text-sm text-error font-medium">{alert.score.toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {driftAlerts.length === 0 && epoch && (
        <DashboardCard>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
            </div>
            <div>
              <p className="font-body-sm text-sm text-primary">No Drift Alerts</p>
              <p className="font-mono-ui text-[10px] text-outline-variant">
                All features within bounds for epoch #{epoch.epoch_number}
              </p>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* SNS / CloudWatch info */}
      <DashboardCard title="Notification Configuration" subtitle="AWS-managed alert infrastructure">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg">
            <span className="material-symbols-outlined text-secondary text-lg">info</span>
            <p className="font-mono-ui text-xs text-secondary">
              Alert notifications are managed via AWS CloudWatch Alarms and SNS Topics.
              Configure them in the AWS Console under the FederatedLearning namespace.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ["CloudWatch Namespace", "FederatedLearning"],
              ["Metric", "AggregationSuccess / AggregationFailure"],
              ["SNS Topic", "Configure in AWS Console → SNS → Topics"],
              ["Log Group", "/fl-coordinator/aggregation"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-outline-variant/10 last:border-0">
                <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">{label}</span>
                <span className="font-mono-ui text-xs text-on-surface-variant">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </DashboardCard>

      {/* Recent events as alerts timeline */}
      <DashboardCard title="Event Timeline" subtitle="All coordinator events" noPadding>
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="font-body-sm text-sm text-error py-8 text-center">
            Failed to load events.
          </p>
        ) : entries.length === 0 ? (
          <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
            No events recorded yet.
          </p>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {entries.map((entry, i) => {
              const info = severityMap[entry.event_type] ?? { color: "text-outline-variant", icon: "info", label: entry.event_type };
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container/30 transition-colors">
                  <span className={`material-symbols-outlined text-lg ${info.color}`}>{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-mono-ui text-xs ${info.color}`}>{info.label}</p>
                    <p className="font-mono-ui text-[10px] text-outline-variant">
                      {entry.org_id} · epoch #{entry.epoch_number}
                    </p>
                  </div>
                  <span className="font-mono-ui text-[10px] text-outline-variant flex-shrink-0">
                    {timeAgo(entry.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
