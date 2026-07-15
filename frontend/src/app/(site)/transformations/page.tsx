import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SmartImage } from "@/components/smart-image";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getTransformations } from "@/lib/api";

export const metadata: Metadata = {
  title: "Transformations",
  description: "Real member transformations achieved at Calimuv.",
};

export default async function TransformationsPage() {
  const items = await getTransformations();

  return (
    <>
      <PageHeader
        title="Transformations"
        subtitle="Real results from real members who put in the work."
      />
      <Section>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Transformation stories will be added soon.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <Card className="overflow-hidden p-0">
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-square border-r">
                      <SmartImage src={t.before_image_url} alt="Before" label="Before" />
                      <span className="absolute left-2 top-2 rounded bg-background/80 px-2 py-0.5 text-xs font-semibold">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-square">
                      <SmartImage src={t.after_image_url} alt="After" label="After" />
                      <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold">{t.author_name}</h3>
                    {t.author_context && (
                      <p className="text-sm text-primary">{t.author_context}</p>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground">
                      “{t.content}”
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
