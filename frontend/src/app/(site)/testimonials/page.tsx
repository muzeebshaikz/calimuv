import type { Metadata } from "next";

import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getTestimonials } from "@/lib/api";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our members say about training at Calimuv.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader
        title="Member Testimonials"
        subtitle="Real words from the Calimuv community."
      />
      <Section>
        {testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Testimonials will be added soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
