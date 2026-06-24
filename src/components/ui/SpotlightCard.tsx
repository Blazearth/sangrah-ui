"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  accent?: "secondary" | "error";
  onClick?: () => void;
  active?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  accent = "secondary",
  onClick,
  active = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const spotlightColor =
    accent === "error"
      ? "rgba(255, 180, 171, 0.12)"
      : "rgba(177, 197, 255, 0.14)";

  const borderActive =
    accent === "error" ? "border-error/40" : "border-secondary/40";

  return (
    <div
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`spotlight-card relative overflow-hidden rounded-xl border bg-surface-container-low/50 backdrop-blur-md transition-all duration-500 ${
        active || hovering
          ? `${borderActive} -translate-y-1 shadow-[0_8px_40px_rgba(0,0,0,0.4)]`
          : "border-outline-variant/20"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={
        hovering
          ? {
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%), rgba(28, 27, 27, 0.5)`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
