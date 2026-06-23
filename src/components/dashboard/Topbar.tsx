"use client";

import { useAuth } from "@/context/AuthContext";
import { useHealth, useActiveEpoch } from "@/hooks/useCoordinator";

export default function DashboardTopbar() {
  const { user } = useAuth();
  const { isHealthy, isLoading: healthLoading } = useHealth();
  const { epoch } = useActiveEpoch();

  return (
    <header className="h-14 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-code-label text-outline uppercase tracking-[0.15em]">
          {user?.org_name ?? "Organization"}
        </span>
        <span className="text-outline-variant text-xs">•</span>
        <span className="font-mono-ui text-mono-ui text-outline-variant uppercase tracking-wider">
          {user?.role?.replace("_", " ") ?? "User"}
        </span>
        {epoch && (
          <>
            <span className="text-outline-variant text-xs">•</span>
            <span className="font-mono-ui text-[10px] text-secondary uppercase tracking-wider">
              Epoch #{epoch.epoch_number} · {epoch.status}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!healthLoading && (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isHealthy ? "bg-green-500 animate-pulse" : "bg-error"
              }`}
            />
            <span
              className={`font-mono-ui text-[10px] uppercase tracking-wider ${
                isHealthy ? "text-outline-variant" : "text-error"
              }`}
            >
              {isHealthy ? "Coordinator Online" : "Coordinator Offline"}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
