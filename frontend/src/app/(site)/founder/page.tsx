import { Quote } from "lucide-react";
import type { Metadata } from "next";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/social";
import { SmartImage } from "@/components/smart-image";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getFounder } from "@/lib/api";

export const metadata: Metadata = {
  title: "Founder",
  description: "Meet the founder of Calimuv.",
};

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
} as const;

export default async function FounderPage() {
  const founder = await getFounder();

  return (
    <>
      <PageHeader title="Meet the Founder" />
      <Section>
        {!founder ? (
          <p className="text-center text-muted-foreground">
            Founder information will be added soon.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SmartImage src={founder.photo_url} alt={founder.name} label="Founder photo" />
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold">{founder.name}</h2>
              {founder.title && (
                <p className="mt-1 text-lg text-primary">{founder.title}</p>
              )}

              {founder.quote && (
                <blockquote className="mt-6 rounded-xl border-l-4 border-primary bg-muted/40 p-5">
                  <Quote className="size-6 text-primary/40" />
                  <p className="mt-2 text-lg italic">{founder.quote}</p>
                </blockquote>
              )}

              {founder.bio && (
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {founder.bio}
                </p>
              )}

              {founder.years_experience != null && (
                <p className="mt-6 text-sm">
                  <span className="text-2xl font-bold text-primary">
                    {founder.years_experience}+
                  </span>{" "}
                  years of coaching experience
                </p>
              )}

              {founder.social_links && (
                <div className="mt-6 flex gap-4">
                  {Object.entries(founder.social_links).map(([key, url]) => {
                    const Icon =
                      SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                    if (!Icon || !url) return null;
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={key}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Icon className="size-6" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
