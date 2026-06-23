import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function DashboardCard({
  title,
  subtitle,
  children,
  className = "",
  noPadding = false,
}: DashboardCardProps) {
  return (
    <div
      className={`bg-surface border border-outline-variant/15 rounded-xl overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-outline-variant/10">
          {title && (
            <h3 className="font-headline-md text-lg text-primary">{title}</h3>
          )}
          {subtitle && (
            <p className="font-mono-ui text-mono-ui text-outline-variant mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
