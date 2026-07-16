import type { Metadata } from "next";

import { PricingCard } from "@/components/cards/pricing-card";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getPricing } from "@/lib/api";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent membership plans at Calimuv.",
};

export default async function PricingPage() {
  const plans = await getPricing();

  return (
    <>
      <PageHeader
        title="Membership Plans"
        subtitle="Choose the plan that fits your goals. No hidden fees, cancel anytime."
      />
      <Section>
        {plans.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Pricing plans will be added soon.
          </p>
        ) : (
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {plans.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <PricingCard plan={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
