import { ArrowRight } from "lucide-react";

import { ProgramCard } from "@/components/cards/program-card";
import { PricingCard } from "@/components/cards/pricing-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { TrainerCard } from "@/components/cards/trainer-card";
import { Hero } from "@/components/home/hero";
import { SkillsMarquee } from "@/components/home/skills-marquee";
import { VideoShowcase } from "@/components/home/video-showcase";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui-blocks/button-link";
import { Section, SectionHeading } from "@/components/ui-blocks/section";
import { getHome } from "@/lib/api";

export default async function HomePage() {
  const { trainers, programs, pricing, testimonials } = await getHome();

  return (
    <>
      <Hero />
      <SkillsMarquee />

      {/* Programs */}
      {programs.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="What we offer"
            title="Training Programs"
            subtitle="Structured programs for every level — from your first pull-up to advanced skills."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/programs" variant="outline">
              View all programs <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Trainers */}
      {trainers.length > 0 && (
        <Section className="bg-muted/30">
          <SectionHeading
            eyebrow="Meet the team"
            title="Expert Trainers"
            subtitle="Learn from certified coaches who live and breathe calisthenics."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.slice(0, 4).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <TrainerCard trainer={t} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/trainers" variant="outline">
              Meet all trainers <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* Video showcase */}
      <VideoShowcase />

      {/* Pricing */}
      {pricing.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Membership"
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that fits your goals. Cancel anytime."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {pricing.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <PricingCard plan={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section className="bg-muted/30">
          <SectionHeading
            eyebrow="Success stories"
            title="What Our Members Say"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Join Calimuv today and take the first step towards a stronger,
            more capable you.
          </p>
          <ButtonLink
            href="/join"
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            Join Now <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
