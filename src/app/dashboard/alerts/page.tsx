"use client";

import { useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";

const alertRules = [
  {
    id: "rule_001",
    name: "Epoch Failure",
    condition: "aggregation_failed",
    description: "Trigger when a training round fails to complete",
    channels: { email: true, slack: true, teams: false },
    enabled: true,
  },
  {
    id: "rule_002",
    name: "Drift Threshold Exceeded",
    condition: "drift_score > 0.30",
    description: "Trigger when any feature's KL divergence exceeds the threshold",
    channels: { email: true, slack: false, teams: false },
    enabled: true,
  },
  {
    id: "rule_003",
    name: "Privacy Budget Warning",
    condition: "epsilon_consumed > 80%",
    description: "Trigger when cumulative ε consumption exceeds 80% of budget",
    channels: { email: true, slack: true, teams: true },
    enabled: true,
  },
  {
    id: "rule_004",
    name: "Node Disconnected",
    condition: "participant_timeout",
    description: "Trigger when a participant node drops out of the federation",
    channels: { email: false, slack: true, teams: false },
    enabled: true,
  },
  {
    id: "rule_005",
    name: "Byzantine Detection",
    condition: "byzantine_excluded",
    description: "Trigger when Multi-Krum excludes a participant gradient",
    channels: { email: true, slack: true, teams: true },
    enabled: false,
  },
  {
    id: "rule_006",
    name: "Certificate Expiry",
    condition: "cert_expiry_within_30d",
    description: "Trigger when a participant certificate expires within 30 days",
    channels: { email: true, slack: false, teams: false },
    enabled: true,
  },
];

type Rule = typeof alertRules[0];

export default function AlertsPage() {
  const [rules, setRules] = useState<Rule[]>(alertRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const toggleChannel = (id: string, ch: keyof Rule["channels"]) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, channels: { ...r.channels, [ch]: !r.channels[ch] } }
          : r
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Alert Configuration
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          SNS notification rules for federation events.
        </p>
      </div>

      {/* SNS status */}
      <DashboardCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-xl">
                notifications_active
              </span>
            </div>
            <div>
              <p className="font-body-sm text-sm text-primary">SNS Topic Connected</p>
              <p className="font-mono-ui text-[10px] text-outline-variant">
                arn:aws:sns:us-east-1:123456789:sangrah-federation-alerts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-mono-ui text-[10px] text-green-400 uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>
      </DashboardCard>

      {/* Rules list */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <DashboardCard key={rule.id}>
            <div className="flex items-start gap-4">
              {/* Toggle */}
              <button
                onClick={() => toggleRule(rule.id)}
                className={`mt-1 w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ${
                  rule.enabled ? "bg-secondary" : "bg-surface-container-high"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    rule.enabled ? "left-4" : "left-0.5"
                  }`}
                />
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-body-sm text-sm text-primary">{rule.name}</p>
                  <span className="font-mono-ui text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                    {rule.condition}
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mb-3">
                  {rule.description}
                </p>

                {/* Channel toggles */}
                <div className="flex gap-3">
                  {(["email", "slack", "teams"] as const).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => toggleChannel(rule.id, ch)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono-ui uppercase tracking-wider transition-colors ${
                        rule.channels[ch]
                          ? "border-secondary/50 text-secondary bg-secondary/10"
                          : "border-outline-variant/30 text-outline-variant hover:border-outline-variant"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {ch === "email" ? "mail" : ch === "slack" ? "chat" : "groups"}
                      </span>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
