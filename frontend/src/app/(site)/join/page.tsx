import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";

export const metadata: Metadata = {
  title: "Join Now",
  description: "Start your calisthenics journey with Calimuv today.",
};

const perks = [
  "Personalised onboarding assessment",
  "Access to all group classes",
  "Structured skill progressions",
  "Supportive training community",
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Join Calimuv"
        subtitle="Take the first step. Fill in the form and our team will reach out to get you started."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">What you get</h2>
            <ul className="mt-6 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Prefer to talk first? Visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>{" "}
              or check{" "}
              <a href="/pricing" className="text-primary hover:underline">
                membership plans
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Membership Enquiry</h2>
            <div className="mt-6">
              <ContactForm defaultSubject="Membership enquiry" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
