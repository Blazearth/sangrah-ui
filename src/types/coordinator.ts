// ─── Coordinator API response types ─────────────────────────────────────────
// Derived from the actual DynamoDB schema and Lambda response shapes
// documented in Federated_Learning_Coordinator_Final_Report.md

export interface EpochResponse {
  epoch_id: string;          // "EPOCH#fraud-detection-v2#3"
  epoch_number: number;
  model_id: string;          // "fraud-detection-v2"
  model_version: string;     // "v1", "v2", "v3"
  status: "PENDING" | "ACTIVE" | "AGGREGATING" | "COMPLETED" | "FAILED";
  model_hash: string;        // SHA-256 hex
  model_signature: string;   // Base64 Ed25519
  model_s3_key: string;      // "models/fraud-detection-v2/v3/model.npy"
  architecture_hash: string;
  fedprox_mu: number;
  privacy_epsilon: number;
  privacy_delta: number;
  secure_agg_threshold: number;
  secure_agg_participants?: string[];
  dataset_schema?: string;
  drift_alerts?: DriftAlert[];
  created_at: string;
  activated_at?: string;
  completed_at?: string;
}

export interface DriftAlert {
  feature: string;
  score: number;
  threshold: number;
  epoch_number: number;
}

export interface SubmissionRecord {
  submission_id: string;
  epoch_id: string;
  org_id: string;
  model_id: string;
  epoch_number: number;
  update_hash: string;
  s3_key: string;
  submitted_at: string;
  status: string;
}

export interface AuditEntry {
  entry_id: string;
  model_id: string;
  epoch_number: number;
  event_type: "UPDATE_SUBMITTED" | "AGGREGATION_TRIGGERED" | "MODEL_PUBLISHED";
  org_id: string;
  payload: Record<string, unknown>;
  previous_hash: string;
  entry_hash: string;
  created_at: string;
}

export interface OrgRecord {
  org_id: string;
  display_name: string;
  status: "ACTIVE" | "REVOKED" | "PENDING";
  public_key: string;
  registered_at: string;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  timestamp: string;
}

export interface ModelDownloadUrlResponse {
  url: string;
  download_url: string;
}

export interface UpdateUploadUrlResponse {
  url: string;
  upload_url: string;
}

// ─── BFF API response shapes ─────────────────────────────────────────────────
// These are what the Next.js API routes return to the client

export interface ApiError {
  error: string;
  code?: number;
}

export type ApiResult<T> = T | ApiError;

// Enriched dashboard data assembled by the BFF
export interface DashboardStatus {
  health: HealthResponse;
  activeEpoch: EpochResponse | null;
  recentAudit: AuditEntry[];
  submissions: SubmissionRecord[];
}
