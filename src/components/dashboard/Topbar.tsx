"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-code-label text-outline uppercase tracking-[0.15em]">
          {user?.org_name || "Organization"}
        </span>
        <span className="text-outline-variant text-xs">•</span>
        <span className="font-mono-ui text-mono-ui text-outline-variant uppercase tracking-wider">
          {user?.role?.replace("_", " ") || "User"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-wider">
            Connected
          </span>
        </div>
      </div>
    </header>
  );
}
