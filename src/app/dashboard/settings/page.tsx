"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useActiveEpoch, useHealth } from "@/hooks/useCoordinator";

function ReadOnlyField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono-ui text-[10px] text-outline uppercase tracking-widest">{label}</span>
      <div className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2">
        <span className="font-mono-ui text-xs text-on-surface-variant break-all">{value}</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { epoch, isLoading } = useActiveEpoch();
  const { health } = useHealth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">Settings</h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Live configuration from the coordinator and epoch metadata.
        </p>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg">
        <span className="material-symbols-outlined text-secondary text-lg">info</span>
        <p className="font-mono-ui text-xs text-secondary">
          These values are read directly from the production coordinator and active epoch. Changes require coordinator-side updates.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-container-high rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coordinator connection */}
          <DashboardCard title="Coordinator Connection" subtitle="Production endpoint">
            <div className="space-y-4">
              <ReadOnlyField label="Endpoint" value="https://coordinator.fed-learn.online" />
              <ReadOnlyField label="Auth Mode" value="mTLS (Client Certificate)" />
              <ReadOnlyField label="Org Identity" value="org-aiims" />
              <ReadOnlyField label="Status" value={health?.status === "ok" ? "Connected ✓" : "Disconnected ✗"} />
              <ReadOnlyField label="Last Health Check" value={health?.timestamp ?? "—"} />
            </div>
          </DashboardCard>

          {/* Active epoch config */}
          <DashboardCard title="Epoch Configuration" subtitle={epoch ? `Epoch #${epoch.epoch_number}` : "No active epoch"}>
            {epoch ? (
              <div className="space-y-4">
                <ReadOnlyField label="Model ID" value={String(epoch.model_id)} />
                <ReadOnlyField label="Model Version" value={String(epoch.model_version)} />
                <ReadOnlyField label="Status" value={String(epoch.status)} />
                <ReadOnlyField label="FedProx μ" value={String(epoch.fedprox_mu)} />
                <ReadOnlyField label="Architecture Hash" value={String(epoch.architecture_hash)} />
              </div>
            ) : (
              <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
                No active epoch.
              </p>
            )}
          </DashboardCard>

          {/* Privacy config */}
          <DashboardCard title="Privacy Configuration" subtitle="Differential privacy parameters">
            {epoch ? (
              <div className="space-y-4">
                <ReadOnlyField label="ε (Epsilon)" value={String(epoch.privacy_epsilon)} />
                <ReadOnlyField label="δ (Delta)" value={String(epoch.privacy_delta)} />
                <ReadOnlyField label="Mechanism" value="Gaussian Noise" />
              </div>
            ) : (
              <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
                No active epoch.
              </p>
            )}
          </DashboardCard>

          {/* Security / Crypto */}
          <DashboardCard title="Security" subtitle="Model integrity verification">
            {epoch ? (
              <div className="space-y-4">
                <ReadOnlyField label="Model SHA-256" value={String(epoch.model_hash)} />
                <ReadOnlyField label="Ed25519 Signature" value={String(epoch.model_signature)} />
                <ReadOnlyField label="SecAgg Threshold" value={String(epoch.secure_agg_threshold)} />
                <ReadOnlyField label="Participants" value={`${(epoch.secure_agg_participants as unknown[])?.length ?? 0} orgs registered`} />
              </div>
            ) : (
              <p className="font-body-sm text-sm text-outline-variant py-8 text-center">
                No active epoch.
              </p>
            )}
          </DashboardCard>

          {/* AWS Infrastructure */}
          <DashboardCard title="AWS Infrastructure" subtitle="Deployment references" className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReadOnlyField label="Region" value="us-east-1" />
              <ReadOnlyField label="API Gateway" value="d-orzgespo9f.execute-api.us-east-1.amazonaws.com" />
              <ReadOnlyField label="Ingestion Bucket" value="fl-ingestion-318629836373-dev" />
              <ReadOnlyField label="ECS Cluster" value="FederatedLearningCluster" />
              <ReadOnlyField label="CloudWatch Namespace" value="FederatedLearning" />
              <ReadOnlyField label="Aggregation Log Group" value="/fl-coordinator/aggregation" />
            </div>
          </DashboardCard>
        </div>
      )}
    </div>
  );
}
