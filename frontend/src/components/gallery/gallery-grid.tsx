"use client";

import { useState } from "react";

import { SmartImage } from "@/components/smart-image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  // Distinct categories for a simple filter bar.
  const categories = Array.from(
    new Set(images.map((i) => i.category).filter(Boolean))
  ) as string[];
  const [filter, setFilter] = useState<string | null>(null);

  const shown = filter ? images.filter((i) => i.category === filter) : images;

  return (
    <>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button onClick={() => setFilter(null)}>
            <Badge variant={filter === null ? "default" : "secondary"} className="cursor-pointer capitalize">
              All
            </Badge>
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}>
              <Badge
                variant={filter === c ? "default" : "secondary"}
                className="cursor-pointer capitalize"
              >
                {c}
              </Badge>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-lg",
              "transition-transform hover:scale-[1.02]"
            )}
          >
            <SmartImage src={img.thumbnail_url || img.image_url} alt={img.caption || "Gallery image"} label="Photo" />
            {img.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-2">
          <DialogTitle className="sr-only">
            {active?.caption || "Gallery image"}
          </DialogTitle>
          {active && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <SmartImage src={active.image_url} alt={active.caption || "Gallery image"} label="Photo" />
            </div>
          )}
          {active?.caption && (
            <p className="p-2 text-center text-sm text-muted-foreground">
              {active.caption}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
