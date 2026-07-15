import { ArrowLeft, Check, Clock, Signal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SmartImage } from "@/components/smart-image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui-blocks/button-link";
import { Section } from "@/components/ui-blocks/section";
import { getProgram } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: "Program not found" };
  return {
    title: program.title,
    description: program.short_description || "Calisthenics program at Calimuv",
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  return (
    <Section>
      <Link
        href="/programs"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to programs
      </Link>

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
        <SmartImage src={program.image_url} alt={program.title} label="Program image" />
      </div>

      <div className="flex flex-wrap gap-2">
        {program.level && (
          <Badge variant="secondary" className="capitalize">
            <Signal className="mr-1 size-3" /> {program.level}
          </Badge>
        )}
        {program.duration && (
          <Badge variant="outline">
            <Clock className="mr-1 size-3" /> {program.duration}
          </Badge>
        )}
      </div>

      <h1 className="mt-4 text-4xl font-bold">{program.title}</h1>
      {program.description && (
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {program.description}
        </p>
      )}

      {program.features && program.features.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">What&apos;s included</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {program.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <ButtonLink href="/join" size="lg">
          Join this program
        </ButtonLink>
      </div>
    </Section>
  );
}
