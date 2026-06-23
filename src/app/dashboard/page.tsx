"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAuth } from "@/context/AuthContext";
import { useActiveEpoch, useAudit, useHealth } from "@/hooks/useCoordinator";

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
          <div
            className={`w-2 h-2 rounded-full ${
              isHealthy ? "bg-green-500 animate-pulse" : "bg-error"
            }`}
          />
          <span className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-wider">
            {isHealthy ? "Coordinator Online" : "Coordinator Offline"}
          </span>
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
          ) : epoch ? (
            <p className="font-display-lg text-3xl text-primary">#{epoch.epoch_number}</p>
          ) : (
            <p className="font-display-lg text-3xl text-outline-variant">—</p>
          )}
          <p
            className={`font-mono-ui text-mono-ui mt-2 uppercase tracking-wider ${
              epoch?.status === "ACTIVE"
                ? "text-green-400"
                : epoch?.status === "AGGREGATING"
                ? "text-amber-400"
                : "text-outline-variant"
            }`}
          >
            {epoch?.status ?? (epochError ? "No active epoch" : "Loading...")}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Model Version
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : epoch ? (
            <p className="font-display-lg text-3xl text-primary">{epoch.model_version}</p>
          ) : (
            <p className="font-display-lg text-3xl text-outline-variant">—</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2 truncate">
            {epoch?.model_hash ? `${String(epoch.model_hash).slice(0, 18)}...` : "—"}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Privacy ε
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : epoch ? (
            <p className="font-display-lg text-3xl text-primary">
              {Number(epoch.privacy_epsilon).toFixed(1)}
            </p>
          ) : (
            <p className="font-display-lg text-3xl text-outline-variant">—</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            δ = {epoch?.privacy_delta ?? "—"}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Participants
          </p>
          {epochLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : epoch?.secure_agg_participants ? (
            <p className="font-display-lg text-3xl text-primary">
              {(epoch.secure_agg_participants as unknown[]).length}
            </p>
          ) : (
            <p className="font-display-lg text-3xl text-outline-variant">—</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            threshold: {epoch?.secure_agg_threshold ?? "—"}
          </p>
        </DashboardCard>
      </div>

      {/* Epoch Detail + Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Epoch Detail */}
        <DashboardCard
          title="Active Epoch"
          subtitle={epoch ? `model_id: ${epoch.model_id}` : "No data"}
          className="lg:col-span-1"
        >
          {epochLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-surface-container-high rounded animate-pulse" />
              ))}
            </div>
          ) : epoch ? (
            <div className="space-y-3">
              {[
                ["Epoch", `#${epoch.epoch_number}`],
                ["Status", epoch.status],
                ["FedProx μ", epoch.fedprox_mu],
                ["SecAgg Threshold", epoch.secure_agg_threshold],
                ["ε / δ", `${epoch.privacy_epsilon} / ${epoch.privacy_delta}`],
                ["Arch Hash", epoch.architecture_hash],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between items-center py-1 border-b border-outline-variant/10 last:border-0">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
              No active epoch. Activate one via the coordinator.
            </p>
          )}
        </DashboardCard>

        {/* Audit Feed */}
        <DashboardCard
          title="Audit Feed"
          subtitle={`${entries.length} events from coordinator`}
          className="lg:col-span-2"
          noPadding
        >
          {auditLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-surface-container-high rounded animate-pulse" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <p className="font-body-sm text-sm text-outline-variant py-12 text-center">
              No audit events recorded yet.
            </p>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {entries.map((item, i) => (
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
                      · {item.org_id} · epoch #{item.epoch_number}
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
