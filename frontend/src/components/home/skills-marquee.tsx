import { Zap } from "lucide-react";

const SKILLS = [
  "Muscle-Up",
  "Front Lever",
  "Planche",
  "Handstand",
  "Human Flag",
  "Pistol Squat",
  "Back Lever",
  "L-Sit",
  "One-Arm Pull-Up",
  "Dragon Flag",
];

export function SkillsMarquee() {
  const row = [...SKILLS, ...SKILLS]; // duplicated for a seamless loop

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/40 py-5">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-8">
        {row.map((skill, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-lg font-semibold tracking-tight text-foreground/80">
              {skill}
            </span>
            <Zap className="size-4 shrink-0 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
