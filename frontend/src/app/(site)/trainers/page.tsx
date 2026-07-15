import type { Metadata } from "next";

import { TrainerCard } from "@/components/cards/trainer-card";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getTrainers } from "@/lib/api";

export const metadata: Metadata = {
  title: "Trainers",
  description: "Meet the certified calisthenics coaches at Calimuv.",
};

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <>
      <PageHeader
        title="Our Trainers"
        subtitle="Certified coaches dedicated to helping you master calisthenics."
      />
      <Section>
        {trainers.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Trainers will be added soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trainers.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <TrainerCard trainer={t} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
