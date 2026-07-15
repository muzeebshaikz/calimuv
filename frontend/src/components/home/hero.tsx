"use client";

import { motion } from "motion/react";
import { ArrowRight, Dumbbell } from "lucide-react";

import { ButtonLink } from "@/components/ui-blocks/button-link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground"
        >
          <Dumbbell className="size-4 text-primary" />
          {site.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl"
        >
          Build Real Strength With{" "}
          <span className="text-primary">Calisthenics</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Master your bodyweight, unlock impressive skills, and transform your
          physique with expert coaching at {site.name}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <ButtonLink href="/join" size="lg">
            Start Training <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/programs" size="lg" variant="outline">
            Explore Programs
          </ButtonLink>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-8"
        >
          {[
            { value: "500+", label: "Members Trained" },
            { value: "10+", label: "Years Experience" },
            { value: "50+", label: "Transformations" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
