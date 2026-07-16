"use client";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui-blocks/button-link";
import { Section } from "@/components/ui-blocks/section";

export function VideoShowcase() {
  return (
    <Section className="bg-card/30">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            See it in action
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Real training. Real progress.
          </h2>
          <p className="mt-4 text-muted-foreground">
            This is what training at CaliMUV looks like — coached calisthenics
            that takes you from your first rep to skills you never thought
            possible. Watch a member train at Spark7 Sports Arena, Yelahanka.
          </p>
          <div className="mt-8">
            <ButtonLink href="/join" size="lg" className="glow">
              Start Your Journey <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <div className="relative aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl border border-primary/30 shadow-[0_0_50px_-15px_var(--brand)]">
            <video
              className="h-full w-full object-cover"
              src="/videos/chinup.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
