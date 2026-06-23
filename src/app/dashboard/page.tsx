"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAuth } from "@/context/AuthContext";

// Mock data — will be replaced by API calls to coordinator
const currentEpoch = {
  epoch: 24,
  totalEpochs: 50,
  status: "training",
  startedAt: "2025-06-22T14:30:00Z",
  participantsReady: 4,
  participantsTotal: 5,
  globalLoss: 0.0342,
  accuracy: 96.8,
};

const participants = [
  { name: "Enterprise-A", status: "training", progress: 78 },
  { name: "Enterprise-B", status: "training", progress: 65 },
  { name: "Enterprise-C", status: "training", progress: 82 },
  { name: "Research-Lab-D", status: "idle", progress: 0 },
  { name: "Enterprise-E", status: "training", progress: 71 },
];

const activityFeed = [
  { time: "2m ago", event: "Epoch 24 aggregation started", type: "info" },
  { time: "8m ago", event: "Enterprise-A submitted gradients", type: "success" },
  { time: "12m ago", event: "Enterprise-C submitted gradients", type: "success" },
  { time: "15m ago", event: "Enterprise-E submitted gradients", type: "success" },
  { time: "18m ago", event: "Research-Lab-D disconnected (timeout)", type: "warning" },
  { time: "22m ago", event: "Enterprise-B submitted gradients", type: "success" },
  { time: "30m ago", event: "Epoch 24 training round initiated", type: "info" },
  { time: "1h ago", event: "Model v1.2.3 checkpoint saved", type: "info" },
  { time: "1h ago", event: "Epoch 23 completed successfully", type: "success" },
  { time: "2h ago", event: "Drift alert: feature_income > threshold", type: "warning" },
];

const statusColors: Record<string, string> = {
  training: "bg-secondary",
  idle: "bg-outline",
  error: "bg-error",
  success: "text-green-400",
  warning: "text-amber-400",
  info: "text-secondary",
};

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Federation Dashboard
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Welcome back, {user?.name}. Here&apos;s your federation overview.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Current Epoch
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {currentEpoch.epoch}
            <span className="text-lg text-outline-variant">
              /{currentEpoch.totalEpochs}
            </span>
          </p>
          <div className="mt-3 w-full bg-surface-container-high rounded-full h-1.5">
            <div
              className="bg-secondary h-1.5 rounded-full transition-all"
              style={{
                width: `${(currentEpoch.epoch / currentEpoch.totalEpochs) * 100}%`,
              }}
            />
          </div>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Global Loss
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {currentEpoch.globalLoss}
          </p>
          <p className="font-mono-ui text-mono-ui text-green-400 mt-2">
            ↓ 0.0018 from last epoch
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Accuracy
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {currentEpoch.accuracy}%
          </p>
          <p className="font-mono-ui text-mono-ui text-green-400 mt-2">
            ↑ 0.3% from last epoch
          </p>
        </DashboardCard>

        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Participants
          </p>
          <p className="font-display-lg text-3xl text-primary">
            {currentEpoch.participantsReady}
            <span className="text-lg text-outline-variant">
              /{currentEpoch.participantsTotal}
            </span>
          </p>
          <p className="font-mono-ui text-mono-ui text-amber-400 mt-2">
            1 node disconnected
          </p>
        </DashboardCard>
      </div>

      {/* Main Content: Participants Ring + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Participant Ring */}
        <DashboardCard
          title="Participant Status"
          subtitle="Real-time federation ring"
          className="lg:col-span-1"
        >
          <div className="flex flex-col items-center py-4">
            {/* Ring visualization */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                />
                {participants.map((p, i) => {
                  const angle = (i / participants.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 100 + Math.cos(angle) * 80;
                  const y = 100 + Math.sin(angle) * 80;
                  return (
                    <g key={p.name}>
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill={p.status === "training" ? "rgba(177,197,255,0.2)" : "rgba(142,145,146,0.2)"}
                        stroke={p.status === "training" ? "#b1c5ff" : "#8e9192"}
                        strokeWidth="1"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill={p.status === "training" ? "#b1c5ff" : "#8e9192"}
                      />
                    </g>
                  );
                })}
                {/* Center hub */}
                <circle
                  cx="100"
                  cy="100"
                  r="16"
                  fill="rgba(177,197,255,0.1)"
                  stroke="#b1c5ff"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x="100"
                  y="104"
                  textAnchor="middle"
                  className="fill-secondary text-[10px] font-mono-ui"
                >
                  AGG
                </text>
              </svg>
            </div>

            {/* Participant list */}
            <div className="w-full mt-6 space-y-2">
              {participants.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${statusColors[p.status]}`}
                    />
                    <span className="font-mono-ui text-xs text-on-surface-variant">
                      {p.name}
                    </span>
                  </div>
                  <span className="font-mono-ui text-[10px] text-outline uppercase">
                    {p.status === "training" ? `${p.progress}%` : p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        {/* Activity Feed */}
        <DashboardCard
          title="Activity Feed"
          subtitle="Recent federation events"
          className="lg:col-span-2"
          noPadding
        >
          <div className="divide-y divide-outline-variant/10">
            {activityFeed.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-3 hover:bg-surface-container/30 transition-colors"
              >
                <span className="font-mono-ui text-[10px] text-outline-variant w-14 flex-shrink-0 pt-0.5">
                  {item.time}
                </span>
                <span
                  className={`font-body-sm text-sm ${statusColors[item.type]} flex-1`}
                >
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
