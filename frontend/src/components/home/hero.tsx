"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

import {
  Athlete,
  Dumbbell,
  GymRings,
  Kettlebell,
  Parallettes,
} from "@/components/graphics/calisthenics-art";
import { CountUp } from "@/components/motion/count-up";
import { Float } from "@/components/motion/float";
import { ButtonLink } from "@/components/ui-blocks/button-link";
import { site } from "@/lib/site";

const stats = [
  { to: 500, suffix: "+", label: "Members Trained" },
  { to: 10, suffix: "+", label: "Years Experience" },
  { to: 50, suffix: "+", label: "Transformations" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Animated backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* drifting grid */}
        <div
          className="absolute inset-0 opacity-[0.12] [animation:grid-drift_6s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(var(--brand) 1px, transparent 1px), linear-gradient(90deg, var(--brand) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
        {/* pulsing neon blobs */}
        <motion.div
          className="absolute -top-32 left-1/4 size-[520px] rounded-full bg-primary/20 blur-[120px]"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 size-[420px] rounded-full bg-primary/15 blur-[120px]"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            <Sparkles className="size-4" />
            {site.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl"
          >
            Build Real Strength With{" "}
            <span className="text-primary neon-text">Calisthenics</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0"
          >
            Master your bodyweight, unlock impressive skills, and transform your
            physique with expert coaching at {site.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <ButtonLink href="/join" size="lg" className="glow">
              Start Training <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/programs" size="lg" variant="outline">
              Explore Programs
            </ButtonLink>
          </motion.div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8 lg:mx-0">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary neon-text sm:text-4xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating neon athlete + equipment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md sm:block"
        >
          {/* halo */}
          <div className="absolute inset-8 rounded-full bg-primary/10 blur-2xl" />

          <Float distance={10} duration={6} className="absolute inset-x-8 top-6 bottom-0">
            <Athlete className="h-full w-full drop-shadow-[0_0_28px_var(--brand)]" />
          </Float>

          <Float distance={16} duration={5} className="absolute left-0 top-4">
            <GymRings className="w-16 text-primary drop-shadow-[0_0_16px_var(--brand)] sm:w-20" />
          </Float>
          <Float distance={14} duration={6.5} delay={0.6} className="absolute right-2 top-10">
            <Dumbbell className="w-24 drop-shadow-[0_0_16px_var(--brand)] sm:w-28" />
          </Float>
          <Float distance={18} duration={5.5} delay={0.3} className="absolute -left-2 bottom-14">
            <Kettlebell className="w-16 drop-shadow-[0_0_16px_var(--brand)] sm:w-20" />
          </Float>
          <Float distance={12} duration={7} delay={0.9} className="absolute right-0 bottom-8">
            <Parallettes className="w-24 drop-shadow-[0_0_16px_var(--brand)] sm:w-28" />
          </Float>
        </motion.div>
      </div>
    </section>
  );
}
