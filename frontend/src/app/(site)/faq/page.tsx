import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getFaqs } from "@/lib/api";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about training at Calimuv.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before getting started."
      />
      <Section>
        {faqs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            FAQs will be added soon.
          </p>
        ) : (
          <div className="mx-auto max-w-3xl">
            <Accordion multiple={false} className="w-full">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={`faq-${f.id}`}>
                  <AccordionTrigger className="text-left text-base">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </Section>
    </>
  );
}
