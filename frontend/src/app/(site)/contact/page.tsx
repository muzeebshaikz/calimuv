import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="Questions about programs, pricing, or membership? We'd love to hear from you."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info + map */}
          <div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </span>
                <a href={`tel:${site.contact.phone}`} className="hover:text-primary">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <span>{site.contact.address}</span>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-xl border">
              <iframe
                title="Calimuv location"
                src={site.contact.mapEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold">Send a Message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
