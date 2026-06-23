"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const models = [
  {
    version: "1.2.4",
    status: "training",
    epoch: 24,
    createdAt: "2025-06-22 14:30",
    size: "-",
    hash: "pending...",
    approved: false,
  },
  {
    version: "1.2.3",
    status: "active",
    epoch: 23,
    createdAt: "2025-06-22 12:15",
    size: "142 MB",
    hash: "sha256:a4f2c8e1...3b9d",
    approved: true,
  },
  {
    version: "1.2.2",
    status: "archived",
    epoch: 22,
    createdAt: "2025-06-22 09:45",
    size: "141 MB",
    hash: "sha256:7c91d3a0...f82e",
    approved: true,
  },
  {
    version: "1.2.1",
    status: "archived",
    epoch: 21,
    createdAt: "2025-06-21 18:00",
    size: "140 MB",
    hash: "sha256:b2e4f6c9...1a5d",
    approved: true,
  },
  {
    version: "1.2.0",
    status: "archived",
    epoch: 20,
    createdAt: "2025-06-21 15:30",
    size: "139 MB",
    hash: "sha256:d8a1c5e3...6f2b",
    approved: true,
  },
  {
    version: "1.1.9",
    status: "rollback_target",
    epoch: 19,
    createdAt: "2025-06-21 12:45",
    size: "138 MB",
    hash: "sha256:e5f3a2d1...8c47",
    approved: true,
  },
];

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  training: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Training" },
  active: { bg: "bg-green-500/15", text: "text-green-400", label: "Active" },
  archived: { bg: "bg-outline/15", text: "text-outline", label: "Archived" },
  rollback_target: { bg: "bg-secondary/15", text: "text-secondary", label: "Rollback Target" },
};

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary">
            Model Registry
          </h1>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Versioned model artifacts with integrity verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {models.map((m) => {
          const badge = statusBadge[m.status];
          return (
            <DashboardCard key={m.version}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display-lg text-xl text-primary">
                    v{m.version}
                  </p>
                  <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">
                    Epoch {m.epoch}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-ui uppercase tracking-wider ${badge.bg} ${badge.text}`}
                >
                  {badge.label}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">
                    Created
                  </span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">
                    {m.createdAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">
                    Size
                  </span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">
                    {m.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">
                    Hash
                  </span>
                  <span className="font-mono-ui text-[10px] text-on-surface-variant font-mono">
                    {m.hash}
                  </span>
                </div>
              </div>

              {m.approved && (
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="material-symbols-outlined text-green-400 text-sm">
                    verified
                  </span>
                  <span className="font-mono-ui text-[10px] text-green-400 uppercase tracking-wider">
                    Ed25519 Signed
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                {m.status === "active" && (
                  <button className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">
                      download
                    </span>
                    Download
                  </button>
                )}
                {m.status === "archived" && (
                  <button className="flex-1 text-xs py-2 px-3 rounded border border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">
                      history
                    </span>
                    Rollback
                  </button>
                )}
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </div>
  );
}
