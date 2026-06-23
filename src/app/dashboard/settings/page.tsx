"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const settings = {
  retention: {
    gradientRetentionDays: 7,
    modelRetentionVersions: 20,
    auditLogRetentionDays: 365,
    checkpointFrequency: 5,
  },
  dr: {
    backupRegion: "eu-west-1",
    backupFrequency: "daily",
    lastBackup: "2025-06-22T02:00:00Z",
    rto: "4 hours",
    rpo: "24 hours",
    s3Bucket: "sangrah-dr-backups-eu",
  },
  secrets: {
    coordinatorEndpoint: "https://coord.sangrah.internal:8443",
    mtlsCertPath: "/etc/sangrah/certs/coordinator.pem",
    kmsKeyId: "arn:aws:kms:us-east-1:123:key/abc-****-****",
    jwtIssuer: "https://auth.sangrah.internal",
    encryptionAlgo: "AES-256-GCM",
  },
};

function ReadOnlyField({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono-ui text-[10px] text-outline uppercase tracking-widest">
        {label}
      </span>
      <div className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2">
        <span
          className={`text-on-surface-variant ${
            mono ? "font-mono-ui text-xs" : "font-body-sm text-sm"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Settings
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          System configuration — read-only view. Changes require coordinator access.
        </p>
      </div>

      {/* Read-only notice */}
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg">
        <span className="material-symbols-outlined text-secondary text-lg">info</span>
        <p className="font-mono-ui text-xs text-secondary">
          These settings are managed via the Rust coordinator config. UI is read-only.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention */}
        <DashboardCard
          title="Data Retention"
          subtitle="Gradient and model storage policies"
        >
          <div className="space-y-4">
            <ReadOnlyField
              label="Gradient Retention"
              value={`${settings.retention.gradientRetentionDays} days`}
            />
            <ReadOnlyField
              label="Model Versions Kept"
              value={settings.retention.modelRetentionVersions}
            />
            <ReadOnlyField
              label="Audit Log Retention"
              value={`${settings.retention.auditLogRetentionDays} days`}
            />
            <ReadOnlyField
              label="Checkpoint Frequency"
              value={`Every ${settings.retention.checkpointFrequency} epochs`}
            />
          </div>
        </DashboardCard>

        {/* Disaster Recovery */}
        <DashboardCard
          title="Disaster Recovery"
          subtitle="Cross-region backup configuration"
        >
          <div className="space-y-4">
            <ReadOnlyField
              label="Backup Region"
              value={settings.dr.backupRegion}
            />
            <ReadOnlyField
              label="Backup Frequency"
              value={settings.dr.backupFrequency}
            />
            <ReadOnlyField
              label="Last Backup"
              value={new Date(settings.dr.lastBackup).toLocaleString()}
              mono={false}
            />
            <ReadOnlyField label="RTO" value={settings.dr.rto} />
            <ReadOnlyField label="RPO" value={settings.dr.rpo} />
            <ReadOnlyField label="S3 Bucket" value={settings.dr.s3Bucket} />
          </div>
        </DashboardCard>

        {/* Secrets (redacted) */}
        <DashboardCard
          title="Secrets & Endpoints"
          subtitle="Coordinator connection — redacted for security"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField
              label="Coordinator Endpoint"
              value={settings.secrets.coordinatorEndpoint}
            />
            <ReadOnlyField
              label="mTLS Cert Path"
              value={settings.secrets.mtlsCertPath}
            />
            <ReadOnlyField
              label="KMS Key ID"
              value={settings.secrets.kmsKeyId}
            />
            <ReadOnlyField
              label="JWT Issuer"
              value={settings.secrets.jwtIssuer}
            />
            <ReadOnlyField
              label="Encryption Algorithm"
              value={settings.secrets.encryptionAlgo}
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
