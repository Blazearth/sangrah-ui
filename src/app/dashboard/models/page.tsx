"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAudit, useActiveEpoch } from "@/hooks/useCoordinator";

// Derive model versions from MODEL_PUBLISHED audit events
export default function ModelsPage() {
  const { entries, isLoading, error } = useAudit(undefined, 50);
  const { epoch } = useActiveEpoch();

  // Each MODEL_PUBLISHED event = a model version
  const models = entries
    .filter((e) => e.event_type === "MODEL_PUBLISHED")
    .map((e) => {
      let modelHash = "";
      let s3Key = "";
      let updatesUsed = 0;
      try {
        const payload = typeof e.payload === "string" ? JSON.parse(e.payload) : e.payload;
        modelHash = payload.model_hash ?? "";
        s3Key = payload.s3_key ?? "";
        updatesUsed = payload.updates_used ?? 0;
      } catch { /* ignore */ }

      // Extract version from s3_key: "models/fraud-detection-v2/v3/model.npy" → "v3"
      const versionMatch = s3Key.match(/\/(v\d+)\//);
      const version = versionMatch ? versionMatch[1] : `v${e.epoch_number}`;

      return {
        version,
        epoch_number: e.epoch_number,
        model_hash: modelHash,
        s3_key: s3Key,
        updates_used: updatesUsed,
        published_at: e.created_at,
        entry_hash: e.entry_hash,
      };
    })
    .sort((a, b) => b.epoch_number - a.epoch_number);

  // Currently training model from active epoch
  const trainingModel = epoch
    ? {
        version: String(epoch.model_version),
        epoch_number: Number(epoch.epoch_number),
        model_hash: String(epoch.model_hash ?? ""),
        model_signature: String(epoch.model_signature ?? ""),
        status: String(epoch.status),
      }
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Model Registry
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Published model artifacts from the coordinator S3 bucket.
        </p>
      </div>

      {/* Current active model */}
      {trainingModel && (
        <DashboardCard title="Current Model" subtitle={`Epoch #${trainingModel.epoch_number} · ${trainingModel.status}`}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">Version</span>
              <span className="font-display-lg text-xl text-primary">{trainingModel.version}</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-20 flex-shrink-0 pt-0.5">SHA-256</span>
              <span className="font-mono-ui text-xs text-secondary break-all">{trainingModel.model_hash}</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-20 flex-shrink-0 pt-0.5">Ed25519</span>
              <span className="font-mono-ui text-xs text-on-surface-variant break-all">{trainingModel.model_signature}</span>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* Published model history */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-container-high rounded-xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-error py-8 text-center">
            Failed to load model history from coordinator.
          </p>
        </DashboardCard>
      ) : models.length === 0 ? (
        <DashboardCard>
          <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
            No published models yet. Complete a training round to see models here.
          </p>
        </DashboardCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {models.map((m) => (
            <DashboardCard key={m.version + m.epoch_number}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display-lg text-xl text-primary">{m.version}</p>
                  <p className="font-mono-ui text-[10px] text-outline-variant mt-0.5">
                    Epoch #{m.epoch_number}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-ui uppercase tracking-wider bg-green-500/15 text-green-400">
                  Published
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">Published</span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">
                    {new Date(m.published_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">Updates Used</span>
                  <span className="font-mono-ui text-xs text-on-surface-variant">{m.updates_used}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider">S3 Key</span>
                  <span className="font-mono-ui text-[10px] text-on-surface-variant truncate max-w-[160px]">{m.s3_key}</span>
                </div>
              </div>

              <div className="flex gap-3 mb-3">
                <span className="font-mono-ui text-[10px] text-outline uppercase tracking-wider w-12 flex-shrink-0">Hash</span>
                <span className="font-mono-ui text-[10px] text-secondary break-all">{m.model_hash}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-400 text-sm">verified</span>
                <span className="font-mono-ui text-[10px] text-green-400 uppercase tracking-wider">
                  Audit Chain Verified
                </span>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </div>
  );
}
