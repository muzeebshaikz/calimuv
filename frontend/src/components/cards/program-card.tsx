import { ArrowRight, Clock, Signal } from "lucide-react";
import Link from "next/link";

import { SmartImage } from "@/components/smart-image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Program } from "@/lib/types";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="group flex flex-col overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <Link href={`/programs/${program.slug}`} className="relative block aspect-video">
        <SmartImage src={program.image_url} alt={program.title} label="Program image" />
      </Link>
      <div className="flex flex-1 flex-col px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {program.level && (
            <Badge variant="secondary" className="capitalize">
              <Signal className="mr-1 size-3" />
              {program.level}
            </Badge>
          )}
          {program.duration && (
            <Badge variant="outline">
              <Clock className="mr-1 size-3" />
              {program.duration}
            </Badge>
          )}
        </div>
        <h3 className="mt-3 text-xl font-semibold">{program.title}</h3>
        {program.short_description && (
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            {program.short_description}
          </p>
        )}
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          Learn more <ArrowRight className="size-4" />
        </Link>
      </div>
    </Card>
  );
}
