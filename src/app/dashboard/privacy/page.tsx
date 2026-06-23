"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const privacyConfig = {
  epsilon: 10.0,
  delta: 1e-5,
  mechanism: "Gaussian",
  totalEpochs: 50,
};

const epochBudgets = [
  { epoch: 1, consumed: 0.18 }, { epoch: 2, consumed: 0.20 }, { epoch: 3, consumed: 0.19 },
  { epoch: 4, consumed: 0.21 }, { epoch: 5, consumed: 0.18 }, { epoch: 6, consumed: 0.22 },
  { epoch: 7, consumed: 0.20 }, { epoch: 8, consumed: 0.19 }, { epoch: 9, consumed: 0.21 },
  { epoch: 10, consumed: 0.18 }, { epoch: 11, consumed: 0.20 }, { epoch: 12, consumed: 0.22 },
  { epoch: 13, consumed: 0.19 }, { epoch: 14, consumed: 0.21 }, { epoch: 15, consumed: 0.20 },
  { epoch: 16, consumed: 0.19 }, { epoch: 17, consumed: 0.21 }, { epoch: 18, consumed: 0.20 },
  { epoch: 19, consumed: 0.22 }, { epoch: 20, consumed: 0.19 }, { epoch: 21, consumed: 0.20 },
  { epoch: 22, consumed: 0.21 }, { epoch: 23, consumed: 0.19 }, { epoch: 24, consumed: 0.18 },
];

const totalConsumed = epochBudgets.reduce((sum, e) => sum + e.consumed, 0);
const cumulativeData = epochBudgets.map((_, i) => ({
  epoch: epochBudgets[i].epoch,
  cumulative: epochBudgets.slice(0, i + 1).reduce((s, e) => s + e.consumed, 0),
}));
const maxCumulative = privacyConfig.epsilon;
const pctUsed = (totalConsumed / maxCumulative) * 100;

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Privacy Budget
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Cumulative ε tracking with per-epoch consumption breakdown.
        </p>
      </div>

      {/* Config + Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            ε Budget
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {privacyConfig.epsilon.toFixed(1)}
          </p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">total allowed</p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            ε Consumed
          </p>
          <p className="font-display-lg text-3xl text-secondary">
            {totalConsumed.toFixed(2)}
          </p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
            {pctUsed.toFixed(1)}% used
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            δ (delta)
          </p>
          <p className="font-display-lg text-3xl text-primary">1e-5</p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">failure prob.</p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Mechanism
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {privacyConfig.mechanism}
          </p>
          <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">noise type</p>
        </DashboardCard>
      </div>

      {/* Budget progress */}
      <DashboardCard title="Budget Consumption" subtitle={`${totalConsumed.toFixed(2)} / ${privacyConfig.epsilon} ε used across ${epochBudgets.length} epochs`}>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-mono-ui text-xs text-outline-variant">0</span>
            <span className="font-mono-ui text-xs text-outline-variant">
              ε = {privacyConfig.epsilon}
            </span>
          </div>
          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                pctUsed > 80 ? "bg-error" : pctUsed > 60 ? "bg-amber-400" : "bg-secondary"
              }`}
              style={{ width: `${pctUsed}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono-ui text-xs text-secondary">
              {totalConsumed.toFixed(2)} consumed
            </span>
            <span className="font-mono-ui text-xs text-outline-variant">
              {(privacyConfig.epsilon - totalConsumed).toFixed(2)} remaining
            </span>
          </div>
        </div>

        {/* Cumulative bar chart */}
        <div className="mt-6">
          <p className="font-mono-ui text-[10px] text-outline uppercase tracking-wider mb-3">
            Cumulative ε by Epoch
          </p>
          <div className="h-32 flex items-end gap-[2px]">
            {cumulativeData.map((d) => {
              const h = (d.cumulative / maxCumulative) * 100;
              return (
                <div
                  key={d.epoch}
                  className="flex-1 bg-secondary/40 hover:bg-secondary/70 transition-colors rounded-t-sm"
                  style={{ height: `${h}%`, minHeight: "2px" }}
                  title={`Epoch ${d.epoch}: ε=${d.cumulative.toFixed(2)}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono-ui text-[9px] text-outline-variant">Epoch 1</span>
            <span className="font-mono-ui text-[9px] text-outline-variant">Epoch {epochBudgets.length}</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
