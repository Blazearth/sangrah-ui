"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const features = [
  { name: "income", score: 0.82, baseline: 0.12, threshold: 0.3, status: "alert" },
  { name: "age_group", score: 0.21, baseline: 0.08, threshold: 0.3, status: "ok" },
  { name: "transaction_freq", score: 0.34, baseline: 0.11, threshold: 0.3, status: "alert" },
  { name: "account_balance", score: 0.09, baseline: 0.07, threshold: 0.3, status: "ok" },
  { name: "loan_ratio", score: 0.15, baseline: 0.10, threshold: 0.3, status: "ok" },
  { name: "credit_score", score: 0.28, baseline: 0.09, threshold: 0.3, status: "warning" },
  { name: "employment_type", score: 0.06, baseline: 0.05, threshold: 0.3, status: "ok" },
  { name: "geo_region", score: 0.19, baseline: 0.08, threshold: 0.3, status: "ok" },
];

// Trend data per epoch for the top drifting feature
const trendData = [
  { epoch: 17, score: 0.14 },
  { epoch: 18, score: 0.18 },
  { epoch: 19, score: 0.22 },
  { epoch: 20, score: 0.31 },
  { epoch: 21, score: 0.45 },
  { epoch: 22, score: 0.61 },
  { epoch: 23, score: 0.74 },
  { epoch: 24, score: 0.82 },
];

const maxScore = Math.max(...trendData.map((d) => d.score));

export default function DriftPage() {
  const alertCount = features.filter((f) => f.status === "alert").length;
  const warnCount = features.filter((f) => f.status === "warning").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Drift Detection
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Per-feature distribution shift monitoring across epochs.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Features Monitored
          </p>
          <p className="font-display-lg text-3xl text-primary">{features.length}</p>
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Drift Alerts
          </p>
          <p className="font-display-lg text-3xl text-error">{alertCount}</p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            Score &gt; threshold (0.3)
          </p>
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Warnings
          </p>
          <p className="font-display-lg text-3xl text-amber-400">{warnCount}</p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-2">
            Score approaching threshold
          </p>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature drift scores */}
        <DashboardCard title="Feature Drift Scores" subtitle="Current epoch vs baseline">
          <div className="space-y-4">
            {features.map((f) => {
              const pct = Math.min((f.score / 1.0) * 100, 100);
              const thresholdPct = (f.threshold / 1.0) * 100;
              return (
                <div key={f.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono-ui text-xs text-on-surface-variant">
                      {f.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-ui text-[10px] text-outline-variant">
                        baseline {f.baseline}
                      </span>
                      <span
                        className={`font-mono-ui text-xs font-medium ${
                          f.status === "alert"
                            ? "text-error"
                            : f.status === "warning"
                            ? "text-amber-400"
                            : "text-green-400"
                        }`}
                      >
                        {f.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        f.status === "alert"
                          ? "bg-error"
                          : f.status === "warning"
                          ? "bg-amber-400"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                    {/* Threshold marker */}
                    <div
                      className="absolute top-0 bottom-0 w-[1px] bg-outline-variant/60"
                      style={{ left: `${thresholdPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Trend chart for top drifting feature */}
        <DashboardCard
          title="income — Drift Trend"
          subtitle="Epochs 17–24 (KL divergence score)"
        >
          <div className="h-48 flex items-end gap-2 pt-4">
            {trendData.map((d) => {
              const h = (d.score / maxScore) * 100;
              const isAlert = d.score >= 0.3;
              return (
                <div key={d.epoch} className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-mono-ui text-[9px] text-outline-variant">
                    {d.score.toFixed(2)}
                  </span>
                  <div
                    className={`w-full rounded-sm transition-all ${
                      isAlert ? "bg-error/70" : "bg-secondary/50"
                    }`}
                    style={{ height: `${h}%`, minHeight: "4px" }}
                  />
                  <span className="font-mono-ui text-[9px] text-outline-variant">
                    {d.epoch}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Threshold line label */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-outline-variant/60" />
            <span className="font-mono-ui text-[10px] text-outline-variant">
              threshold = 0.30
            </span>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
