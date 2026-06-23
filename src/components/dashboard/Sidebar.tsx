"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/rounds", label: "Training Rounds", icon: "model_training" },
  { href: "/dashboard/models", label: "Model Registry", icon: "inventory_2" },
  { href: "/dashboard/participants", label: "Participants", icon: "groups" },
  { href: "/dashboard/audit", label: "Audit Trail", icon: "verified_user" },
  { href: "/dashboard/drift", label: "Drift Detection", icon: "trending_up" },
  { href: "/dashboard/privacy", label: "Privacy Budget", icon: "shield" },
  { href: "/dashboard/alerts", label: "Alerts", icon: "notifications" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-surface border-r border-outline-variant/10 flex flex-col z-40">
      {/* Brand */}
      <div className="px-lg py-6 border-b border-outline-variant/10">
        <Link
          href="/"
          className="font-display-lg text-xl tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          Sangrah
        </Link>
        <p className="font-mono-ui text-[10px] text-outline-variant uppercase tracking-widest mt-1">
          Federation Control
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-surface-container-high text-primary"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container/60"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-lg ${
                    isActive ? "text-secondary" : "text-outline group-hover:text-on-surface-variant"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-body-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
            <span className="font-mono-ui text-xs text-secondary">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body-sm text-xs text-primary truncate">
              {user?.name || "User"}
            </p>
            <p className="font-mono-ui text-[10px] text-outline-variant truncate">
              {user?.org_name || "Organization"}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
