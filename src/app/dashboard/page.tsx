"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAuth } from "@/context/AuthContext";
import { useActiveEpoch, useAudit, useHealth } from "@/hooks/useCoordinator";

// Fallback mock data used when coordinator is not reachable
const MOCK_EPOCH = {
  epoch_number: 3,
  status: "ACTIVE" as const,
  model_version: "v3",
  privacy_epsilon: 1.0,
  privacy_delta: 1e-5,
  model_hash: "sha256:pending...",
};

const MOCK_ACTIVITY = [
  { created_at: new Date().toISOString(), event_type: "MODEL_PUBLISHED", org_id: "coordinator", entry_hash: "sha256:a4f2...", previous_hash: "sha256:e0d1..." },
  { created_at: new Date(Date.now() - 5 * 60000).toISOString(), event_type: "AGGREGATION_TRIGGERED", org_id: "coordinator", entry_hash: "sha256:e0d1...", previous_hash: "sha256:d9e0..." },
  { created_at: new Date(Date.now() - 12 * 60000).toISOString(), event_type: "UPDATE_SUBMITTED", org_id: "org-aiims", entry_hash: "sha256:d9e0...", previous_hash: "sha256:c8d9..." },
  { created_at: new Date(Date.now() - 18 * 60000).toISOString(), event_type: "UPDATE_SUBMITTED", org_id: "org-kgmu", entry_hash: "sha256:c8d9...", previous_hash: "sha256:b7c8..." },
];

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

export default function DashboardPage() {
  const { user } = useAuth();
  const { epoch, isLoading: epochLoading, error: epochError } = useActiveEpoch();
  const { entries, isLoading: auditLoading } = useAudit(undefined, 10);
  const { isHealthy } = useHealth();

  // Use real data if available, otherwise fall back to mock
  const e = epoch ?? MOCK_EPOCH;
  const activity = entries.length > 0 ? entries : MOCK_ACTIVITY;
  const isMock = !!epochError || !epoch;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Federation Dashboard
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Welcome back, {user?.name}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isMock && (
            <span className="font-mono-ui text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded uppercase tracking-wider">
              Mock data — coordinator offline
            </span>
          )}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isHealthy ? "bg-green-500 animate-pulse" : "bg-error"
              }`}
            />
            <span className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-wider">
              {isHealthy ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Current Epoch
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">
              #{e.epoch_number}
            </p>
          )}
          <p
            className={`font-mono-ui text-mono-ui mt-2 uppercase tracking-wider ${
              e.status === "ACTIVE"
                ? "text-green-400"
                : e.status === "AGGREGATING"
                ? "text-amber-400"
                : "text-outline-variant"
            }`}
          >
            {e.status}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Model Version
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">
              {e.model_version}
            </p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            {e.model_hash?.slice(0, 18)}...
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Privacy ε
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">
              {e.privacy_epsilon?.toFixed(1) ?? "—"}
            </p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            δ = {e.privacy_delta ?? "—"}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Drift Alerts
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p
              className={`font-display-lg text-3xl ${
                (epoch?.drift_alerts?.length ?? 0) > 0
                  ? "text-error"
                  : "text-primary"
              }`}
            >
              {epoch?.drift_alerts?.length ?? 0}
            </p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            features flagged
          </p>
        </DashboardCard>
      </div>

      {/* Epoch Detail + Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Epoch Detail */}
        <DashboardCard
          title="Active Epoch"
          subtitle={`model_id: ${epoch?.model_id ?? "fraud-detection-v2"}`}
          className="lg:col-span-1"
        >
          {epochLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-surface-container-high rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                ["Epoch ID", `#${e.epoch_number}`],
                ["Status", e.status],
                ["FedProx μ", epoch?.fedprox_mu ?? "—"],
                ["SecAgg Threshold", epoch?.secure_agg_threshold ?? "—"],
                ["ε / δ", `${e.privacy_epsilon ?? "—"} / ${e.privacy_delta ?? "—"}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-outline-variant/10 last:border-0">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        {/* Audit Feed */}
        <DashboardCard
          title="Audit Feed"
          subtitle="Live hash chain events"
          className="lg:col-span-2"
          noPadding
        >
          {auditLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-surface-container-high rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-3 hover:bg-surface-container/30 transition-colors"
                >
                  <span className="font-mono-ui text-[10px] text-outline-variant w-16 flex-shrink-0 pt-0.5">
                    {timeAgo(item.created_at)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`font-mono-ui text-xs ${
                        eventColor[item.event_type] ?? "text-on-surface-variant"
                      }`}
                    >
                      {item.event_type.replace(/_/g, " ")}
                    </span>
                    <span className="font-mono-ui text-[10px] text-outline-variant ml-2">
                      · {item.org_id}
                    </span>
                  </div>
                  <span className="font-mono-ui text-[10px] text-outline-variant hidden md:block">
                    {String(item.entry_hash).slice(0, 14)}...
                  </span>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
