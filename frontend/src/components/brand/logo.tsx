import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/** Hexagon shield mark with a neon lightning bolt (CaliMUV brand mark). */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 54"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      {...props}
    >
      {/* hexagon shield */}
      <path
        d="M24 2 L44 13 V34 L24 52 L4 34 V13 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* lightning bolt */}
      <path
        d="M27 12 L16 30 H23 L20 42 L33 22 H25 Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** hide the "MINIMAL POWER" subtitle (e.g. tight spaces) */
  showSubtitle?: boolean;
}

/** Full lockup: mark + "CaliMUV" wordmark + optional MINIMAL POWER subtitle. */
export function Logo({ className, showSubtitle = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className="size-8 shrink-0 drop-shadow-[0_0_10px_var(--brand)]" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight">
          CaliMU<span className="text-primary">V</span>
        </span>
        {showSubtitle && (
          <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Minimal Power
          </span>
        )}
      </span>
    </span>
  );
}
