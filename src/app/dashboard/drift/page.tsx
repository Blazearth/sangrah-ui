"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useActiveEpoch } from "@/hooks/useCoordinator";
import type { DriftAlert } from "@/types/coordinator";

export default function DriftPage() {
  const { epoch, isLoading, error } = useActiveEpoch();

  const driftAlerts: DriftAlert[] = epoch?.drift_alerts ?? [];
  const isMock = !!error || !epoch;
  const alertCount = driftAlerts.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Drift Detection
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Per-feature distribution shift alerts from the coordinator.
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
            Drift Alerts
          </p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className={`font-display-lg text-3xl ${alertCount > 0 ? "text-error" : "text-green-400"}`}>
              {alertCount}
            </p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
            features flagged this epoch
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Epoch
          </p>
          {isLoading ? (
            <div className="h-9 w-12 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">#{epoch?.epoch_number ?? "—"}</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
            {epoch?.status ?? "—"}
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Status
          </p>
          <p className={`font-display-lg text-3xl ${alertCount === 0 ? "text-green-400" : "text-error"}`}>
            {alertCount === 0 ? "Clean" : "Alert"}
          </p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
            distribution stability
          </p>
        </DashboardCard>
      </div>

      {isLoading ? (
        <DashboardCard>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        </DashboardCard>
      ) : alertCount === 0 ? (
        <DashboardCard>
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400 text-3xl">check_circle</span>
            </div>
            <div className="text-center">
              <p className="font-body-sm text-sm text-primary">
                No drift alerts for epoch #{epoch?.epoch_number}
              </p>
              <p className="font-mono-ui text-[10px] text-outline-variant mt-1">
                All feature distributions are within acceptable bounds.
                {epoch?.dataset_schema ? ` Schema: ${epoch.dataset_schema}` : ""}
              </p>
            </div>
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard title="Drift Alerts" subtitle={`${alertCount} features flagged — epoch #${epoch?.epoch_number}`} noPadding>
          <div className="divide-y divide-outline-variant/10">
            {driftAlerts.map((alert, i) => {
              const pct = Math.min((alert.score / (alert.threshold * 3)) * 100, 100);
              return (
                <div key={i} className="px-6 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono-ui text-sm text-on-surface-variant">{alert.feature}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono-ui text-[10px] text-outline-variant">
                        threshold {alert.threshold}
                      </span>
                      <span className="font-mono-ui text-sm text-error font-medium">
                        {alert.score.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-error"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      )}

      {/* Epoch model info */}
      {epoch && (
        <DashboardCard title="Model Integrity" subtitle="Hash and signature from coordinator">
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">
                Model Hash
              </span>
              <span className="font-mono-ui text-xs text-secondary break-all">
                {epoch.model_hash}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">
                Ed25519 Sig
              </span>
              <span className="font-mono-ui text-xs text-on-surface-variant break-all">
                {epoch.model_signature}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">
                Arch Hash
              </span>
              <span className="font-mono-ui text-xs text-on-surface-variant">
                {epoch.architecture_hash}
              </span>
            </div>
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
