import Link from "next/link";

import { InstagramIcon } from "@/components/icons/social";
import { SmartImage } from "@/components/smart-image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Trainer } from "@/lib/types";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Card className="group overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <Link href={`/trainers/${trainer.slug}`} className="relative block aspect-[4/5]">
        <SmartImage
          src={trainer.photo_url}
          alt={trainer.name}
          label="Trainer photo"
        />
      </Link>
      <div className="px-6 pb-6">
        <h3 className="text-xl font-semibold">
          <Link href={`/trainers/${trainer.slug}`} className="hover:text-primary">
            {trainer.name}
          </Link>
        </h3>
        {trainer.specialization && (
          <p className="mt-1 text-sm text-primary">{trainer.specialization}</p>
        )}
        {trainer.experience_years != null && (
          <Badge variant="secondary" className="mt-3">
            {trainer.experience_years}+ yrs experience
          </Badge>
        )}
        {trainer.social_links?.instagram && (
          <a
            href={trainer.social_links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`${trainer.name} on Instagram`}
            className="mt-4 inline-flex text-muted-foreground hover:text-primary"
          >
            <InstagramIcon className="size-5" />
          </a>
        )}
      </div>
    </Card>
  );
}
