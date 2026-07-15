import type { Metadata } from "next";

import { ProgramCard } from "@/components/cards/program-card";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getPrograms } from "@/lib/api";

export const metadata: Metadata = {
  title: "Programs",
  description: "Structured calisthenics training programs for every level.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        title="Training Programs"
        subtitle="From your first pull-up to advanced skills — find the program that fits your goals."
      />
      <Section>
        {programs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Programs will be added soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
