"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useActiveEpoch } from "@/hooks/useCoordinator";

export default function PrivacyPage() {
  const { epoch, isLoading } = useActiveEpoch();

  const epsilon = epoch?.privacy_epsilon != null ? Number(epoch.privacy_epsilon) : null;
  const delta = epoch?.privacy_delta != null ? Number(epoch.privacy_delta) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Privacy Budget
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Differential privacy parameters for the active epoch.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">ε (Epsilon)</p>
          {isLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">{epsilon !== null ? epsilon.toFixed(1) : "—"}</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">privacy budget</p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">δ (Delta)</p>
          {isLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">{delta !== null ? delta.toExponential(0) : "—"}</p>
          )}
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">failure probability</p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">Mechanism</p>
          <p className="font-display-lg text-3xl text-primary">Gaussian</p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">noise type</p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">Epoch</p>
          {isLoading ? (
            <div className="h-9 w-16 bg-surface-container-high rounded animate-pulse" />
          ) : (
            <p className="font-display-lg text-3xl text-primary">#{epoch?.epoch_number ?? "—"}</p>
          )}
          <p className={`font-mono-ui text-mono-ui mt-1 ${epoch?.status === "ACTIVE" ? "text-green-400" : "text-outline-variant"}`}>
            {epoch?.status ?? "—"}
          </p>
        </DashboardCard>
      </div>

      <DashboardCard title="Privacy Configuration" subtitle={epoch ? `model_id: ${epoch.model_id} · epoch ${epoch.epoch_number}` : "No active epoch"}>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {[
              ["ε (Epsilon)", epsilon !== null ? epsilon : "—", epsilon !== null ? `Lower = stronger privacy. This epoch uses ${epsilon}` : "Not available"],
              ["δ (Delta)", delta !== null ? delta.toExponential(1) : "—", "Probability that ε-DP guarantee fails"],
              ["Clip Threshold", "1.0", "Gradient L2 norm clipping (from daemon config)"],
              ["FedProx μ", epoch?.fedprox_mu ?? "0.01", "Proximal term strength"],
              ["SecAgg Threshold", epoch?.secure_agg_threshold ?? 2, "Min submissions to trigger aggregation"],
              ["Architecture Hash", epoch?.architecture_hash ?? "—", "Model structure integrity check"],
            ].map(([label, value, desc]) => (
              <div key={String(label)} className="flex items-start justify-between py-4 border-b border-outline-variant/10 last:border-0">
                <div>
                  <p className="font-mono-ui text-xs text-primary">{label}</p>
                  <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">{desc}</p>
                </div>
                <span className="font-mono-ui text-sm text-secondary ml-8 flex-shrink-0">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
