"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const auditEntries = [
  {
    id: "evt_024_agg",
    timestamp: "2025-06-22T14:45:12Z",
    actor: "coordinator",
    action: "aggregation_started",
    details: "Epoch 24 aggregation initiated with 4/5 participants",
    hash: "sha256:f1a2b3c4...d5e6",
    prevHash: "sha256:e0d1c2b3...a4f5",
    verified: true,
  },
  {
    id: "evt_024_grad_a",
    timestamp: "2025-06-22T14:42:08Z",
    actor: "Enterprise-A",
    action: "gradient_submitted",
    details: "Gradient submission for epoch 24 (passed Multi-Krum validation)",
    hash: "sha256:e0d1c2b3...a4f5",
    prevHash: "sha256:d9e0f1a2...b3c4",
    verified: true,
  },
  {
    id: "evt_024_grad_c",
    timestamp: "2025-06-22T14:40:33Z",
    actor: "Enterprise-C",
    action: "gradient_submitted",
    details: "Gradient submission for epoch 24 (passed Multi-Krum validation)",
    hash: "sha256:d9e0f1a2...b3c4",
    prevHash: "sha256:c8d9e0f1...a2b3",
    verified: true,
  },
  {
    id: "evt_024_grad_e",
    timestamp: "2025-06-22T14:38:55Z",
    actor: "Enterprise-E",
    action: "gradient_submitted",
    details: "Gradient submission for epoch 24 (passed Multi-Krum validation)",
    hash: "sha256:c8d9e0f1...a2b3",
    prevHash: "sha256:b7c8d9e0...f1a2",
    verified: true,
  },
  {
    id: "evt_024_grad_b",
    timestamp: "2025-06-22T14:35:21Z",
    actor: "Enterprise-B",
    action: "gradient_submitted",
    details: "Gradient submission for epoch 24 (passed Multi-Krum validation)",
    hash: "sha256:b7c8d9e0...f1a2",
    prevHash: "sha256:a6b7c8d9...e0f1",
    verified: true,
  },
  {
    id: "evt_024_init",
    timestamp: "2025-06-22T14:30:00Z",
    actor: "coordinator",
    action: "round_initiated",
    details: "Epoch 24 training round initiated. Model v1.2.3 distributed.",
    hash: "sha256:a6b7c8d9...e0f1",
    prevHash: "sha256:95a6b7c8...d9e0",
    verified: true,
  },
  {
    id: "evt_023_model",
    timestamp: "2025-06-22T14:28:44Z",
    actor: "coordinator",
    action: "model_checkpoint",
    details: "Model v1.2.3 checkpoint saved. Ed25519 signature applied.",
    hash: "sha256:95a6b7c8...d9e0",
    prevHash: "sha256:84959687...c8d9",
    verified: true,
  },
  {
    id: "evt_023_complete",
    timestamp: "2025-06-22T14:28:00Z",
    actor: "coordinator",
    action: "epoch_completed",
    details: "Epoch 23 completed successfully. Loss: 0.0360, Accuracy: 96.5%",
    hash: "sha256:84959687...c8d9",
    prevHash: "sha256:73848576...b7c8",
    verified: true,
  },
];

const actionColors: Record<string, string> = {
  aggregation_started: "text-secondary",
  gradient_submitted: "text-green-400",
  round_initiated: "text-secondary",
  model_checkpoint: "text-primary",
  epoch_completed: "text-green-400",
};

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Audit Trail
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Immutable hash chain of all federation events.
        </p>
      </div>

      {/* Chain integrity status */}
      <DashboardCard>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-400 text-2xl">
              verified_user
            </span>
          </div>
          <div>
            <p className="font-body-sm text-sm text-primary">
              Hash Chain Integrity Verified
            </p>
            <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">
              {auditEntries.length} events · All hashes validated · No tampering detected
            </p>
          </div>
        </div>
      </DashboardCard>

      {/* Hash chain visualization */}
      <div className="space-y-0">
        {auditEntries.map((entry, i) => (
          <div key={entry.id} className="relative flex gap-4">
            {/* Chain connector line */}
            <div className="flex flex-col items-center w-8 flex-shrink-0">
              <div
                className={`w-3 h-3 rounded-full border-2 ${
                  entry.verified
                    ? "border-green-500 bg-green-500/20"
                    : "border-error bg-error/20"
                }`}
              />
              {i < auditEntries.length - 1 && (
                <div className="w-[1px] flex-1 bg-outline-variant/20 min-h-[60px]" />
              )}
            </div>

            {/* Entry card */}
            <div className="flex-1 pb-4">
              <div className="bg-surface border border-outline-variant/10 rounded-lg p-4 hover:border-outline-variant/25 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span
                      className={`font-mono-ui text-xs ${
                        actionColors[entry.action] || "text-on-surface-variant"
                      }`}
                    >
                      {entry.action.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <span className="font-mono-ui text-[10px] text-outline-variant ml-3">
                      by {entry.actor}
                    </span>
                  </div>
                  <span className="font-mono-ui text-[10px] text-outline-variant">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="font-body-sm text-sm text-on-surface-variant mb-3">
                  {entry.details}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono-ui text-[10px] text-outline uppercase">
                      Hash:
                    </span>
                    <span className="font-mono-ui text-[10px] text-secondary">
                      {entry.hash}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono-ui text-[10px] text-outline uppercase">
                      Prev:
                    </span>
                    <span className="font-mono-ui text-[10px] text-outline-variant">
                      {entry.prevHash}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
