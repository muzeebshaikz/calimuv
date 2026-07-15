import { Quote, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.author_name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="flex h-full flex-col p-6">
      <Quote className="size-8 text-primary/30" />
      {testimonial.rating != null && (
        <div className="mt-2 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < testimonial.rating!
                  ? "size-4 fill-primary text-primary"
                  : "size-4 text-muted-foreground/30"
              }
            />
          ))}
        </div>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
        “{testimonial.content}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar>
          {testimonial.photo_url && (
            <AvatarImage src={testimonial.photo_url} alt={testimonial.author_name} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{testimonial.author_name}</p>
          {testimonial.author_context && (
            <p className="text-xs text-muted-foreground">
              {testimonial.author_context}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
