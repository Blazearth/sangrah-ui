"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";

const orgs = [
  {
    id: "org_001",
    name: "Enterprise-A",
    contact: "alice@enterprise-a.com",
    role: "federation_admin",
    status: "active",
    joinedAt: "2025-03-15",
    lastSeen: "2m ago",
    epochsContributed: 24,
    certExpiry: "2026-03-15",
  },
  {
    id: "org_002",
    name: "Enterprise-B",
    contact: "bob@enterprise-b.com",
    role: "data_scientist",
    status: "active",
    joinedAt: "2025-04-02",
    lastSeen: "5m ago",
    epochsContributed: 22,
    certExpiry: "2026-04-02",
  },
  {
    id: "org_003",
    name: "Enterprise-C",
    contact: "carol@enterprise-c.com",
    role: "ml_engineer",
    status: "active",
    joinedAt: "2025-04-10",
    lastSeen: "1m ago",
    epochsContributed: 24,
    certExpiry: "2026-04-10",
  },
  {
    id: "org_004",
    name: "Research-Lab-D",
    contact: "dave@research-d.edu",
    role: "observer",
    status: "disconnected",
    joinedAt: "2025-05-01",
    lastSeen: "18m ago",
    epochsContributed: 19,
    certExpiry: "2026-05-01",
  },
  {
    id: "org_005",
    name: "Enterprise-E",
    contact: "eve@enterprise-e.com",
    role: "data_scientist",
    status: "active",
    joinedAt: "2025-05-20",
    lastSeen: "3m ago",
    epochsContributed: 20,
    certExpiry: "2026-05-20",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  disconnected: "bg-amber-500",
  revoked: "bg-error",
};

export default function ParticipantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display-lg text-headline-md text-primary">
          Participants
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-1">
          Federation member organizations and their node status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Total Nodes
          </p>
          <p className="font-display-lg text-3xl text-primary">5</p>
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Active Now
          </p>
          <p className="font-display-lg text-3xl text-green-400">4</p>
        </DashboardCard>
        <DashboardCard>
          <p className="font-mono-ui text-code-label text-outline uppercase tracking-widest mb-2">
            Disconnected
          </p>
          <p className="font-display-lg text-3xl text-amber-400">1</p>
        </DashboardCard>
      </div>

      <DashboardCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/15">
                {["Organization", "Status", "Role", "Last Seen", "Epochs", "Cert Expiry"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left font-mono-ui text-code-label text-outline uppercase tracking-widest px-6 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {orgs.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-outline-variant/5 hover:bg-surface-container/30 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div>
                      <p className="font-body-sm text-sm text-primary">{o.name}</p>
                      <p className="font-mono-ui text-[10px] text-outline-variant">
                        {o.contact}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusColors[o.status]}`} />
                      <span className="font-mono-ui text-xs text-on-surface-variant capitalize">
                        {o.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                    {o.role.replace("_", " ")}
                  </td>
                  <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                    {o.lastSeen}
                  </td>
                  <td className="px-6 py-3.5 font-mono-ui text-xs text-primary">
                    {o.epochsContributed}
                  </td>
                  <td className="px-6 py-3.5 font-mono-ui text-xs text-on-surface-variant">
                    {o.certExpiry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
