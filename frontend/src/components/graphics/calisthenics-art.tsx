// Stylized neon calisthenics equipment + athlete, as inline SVG.
// Colors follow the theme via `var(--brand)` / currentColor; glow is applied
// by the parent (e.g. `drop-shadow`). No external image assets.

import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "var(--brand)",
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GymRings(props: Props) {
  return (
    <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M35 8 L42 60" {...stroke} />
      <path d="M85 8 L78 60" {...stroke} />
      <circle cx="40" cy="92" r="30" {...stroke} strokeWidth={7} />
      <circle cx="82" cy="92" r="30" {...stroke} strokeWidth={7} />
    </svg>
  );
}

export function Kettlebell(props: Props) {
  return (
    <svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M42 40 a18 22 0 0 1 36 0" {...stroke} strokeWidth={7} />
      <path
        d="M60 42 C30 42 24 66 24 90 C24 116 44 124 60 124 C76 124 96 116 96 90 C96 66 90 42 60 42 Z"
        {...stroke}
        strokeWidth={7}
      />
      <circle cx="60" cy="90" r="12" {...stroke} strokeWidth={4} />
    </svg>
  );
}

export function Dumbbell(props: Props) {
  return (
    <svg viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="10" y="26" width="16" height="38" rx="5" {...stroke} strokeWidth={6} />
      <rect x="28" y="16" width="16" height="58" rx="6" {...stroke} strokeWidth={6} />
      <path d="M44 45 L106 45" {...stroke} strokeWidth={7} />
      <rect x="106" y="16" width="16" height="58" rx="6" {...stroke} strokeWidth={6} />
      <rect x="124" y="26" width="16" height="38" rx="5" {...stroke} strokeWidth={6} />
    </svg>
  );
}

export function Parallettes(props: Props) {
  return (
    <svg viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 26 L132 26" {...stroke} strokeWidth={7} />
      <path d="M30 26 L30 70 L18 78" {...stroke} />
      <path d="M120 26 L120 70 L132 78" {...stroke} />
      <path d="M30 70 L18 78 M30 70 L42 78" {...stroke} />
      <path d="M120 70 L132 78 M120 70 L108 78" {...stroke} />
    </svg>
  );
}

export function PullupBar(props: Props) {
  return (
    <svg viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15 20 L135 20" {...stroke} strokeWidth={7} />
      <path d="M28 20 L28 100 M122 20 L122 100" {...stroke} />
      <path d="M14 100 L42 100 M108 100 L136 100" {...stroke} />
    </svg>
  );
}

/** Geometric athlete holding an L-sit on parallettes. */
export function Athlete(props: Props) {
  return (
    <svg viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="ath" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* parallettes */}
      <path d="M30 176 L92 176 M128 176 L190 176" {...stroke} strokeWidth={7} />
      <path d="M40 176 L40 206 M82 176 L82 206 M138 176 L138 206 M180 176 L180 206" {...stroke} />

      {/* head */}
      <circle cx="110" cy="42" r="20" fill="url(#ath)" stroke="var(--brand)" strokeWidth={4} />
      {/* torso */}
      <path
        d="M110 62 C96 66 90 88 92 120 C94 150 104 158 110 158 C116 158 126 150 128 120 C130 88 124 66 110 62 Z"
        fill="url(#ath)"
        stroke="var(--brand)"
        strokeWidth={4}
      />
      {/* arms straight down to bars (support hold) */}
      <path d="M92 92 L60 176" {...stroke} strokeWidth={9} />
      <path d="M128 92 L160 176" {...stroke} strokeWidth={9} />
      {/* legs extended forward (L-sit) */}
      <path d="M112 150 L196 132" {...stroke} strokeWidth={9} />
      <path d="M108 150 L192 146" {...stroke} strokeWidth={9} />
      <circle cx="196" cy="132" r="6" fill="var(--brand)" />
      <circle cx="192" cy="146" r="6" fill="var(--brand)" />
    </svg>
  );
}
