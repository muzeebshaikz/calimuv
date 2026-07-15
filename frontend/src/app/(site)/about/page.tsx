import { Dumbbell, Heart, Target, Users } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section, SectionHeading } from "@/components/ui-blocks/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name}, our mission, and our approach to calisthenics training.`,
};

const values = [
  {
    icon: Target,
    title: "Skill-First",
    body: "We build strength through progressive skills — not just reps. Every session moves you toward a tangible goal.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Train alongside a supportive community that pushes you to show up and level up.",
  },
  {
    icon: Heart,
    title: "Sustainable",
    body: "Bodyweight training that respects your joints and builds a body that lasts a lifetime.",
  },
  {
    icon: Dumbbell,
    title: "For Everyone",
    body: "From complete beginners to advanced athletes — our coaching meets you where you are.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${site.name}`}
        subtitle={site.description}
      />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-muted-foreground">
            At {site.name}, we believe anyone can build an impressive, capable
            body using nothing but their own bodyweight. Our mission is to make
            world-class calisthenics coaching accessible, structured, and fun —
            helping every member unlock strength and skills they never thought
            possible.
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Why us" title="What We Stand For" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <Card className="h-full p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
