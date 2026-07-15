import { ArrowLeft, Award } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InstagramIcon } from "@/components/icons/social";
import { SmartImage } from "@/components/smart-image";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui-blocks/section";
import { getTrainer, getTrainers } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trainer = await getTrainer(slug);
  if (!trainer) return { title: "Trainer not found" };
  return {
    title: trainer.name,
    description: trainer.specialization || `Trainer at Calimuv`,
  };
}

export default async function TrainerDetailPage({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainer(slug);
  if (!trainer) notFound();

  return (
    <Section>
      <Link
        href="/trainers"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to trainers
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <SmartImage src={trainer.photo_url} alt={trainer.name} label="Trainer photo" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{trainer.name}</h1>
          {trainer.specialization && (
            <p className="mt-2 text-lg text-primary">{trainer.specialization}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {trainer.experience_years != null && (
              <Badge variant="secondary">
                {trainer.experience_years}+ years experience
              </Badge>
            )}
          </div>

          {trainer.bio && (
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {trainer.bio}
            </p>
          )}

          {trainer.certifications && trainer.certifications.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Certifications</h2>
              <ul className="mt-3 space-y-2">
                {trainer.certifications.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Award className="size-4 text-primary" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {trainer.social_links?.instagram && (
            <a
              href={trainer.social_links.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <InstagramIcon className="size-5" /> Follow on Instagram
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
