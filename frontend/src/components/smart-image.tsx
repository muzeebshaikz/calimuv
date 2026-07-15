"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** shown inside the placeholder box */
  label?: string;
}

/**
 * Renders an image that fills its (relatively-positioned) parent.
 * If `src` is missing or the file fails to load, shows a branded placeholder
 * instead of a broken image — useful while real photos aren't uploaded yet.
 */
export function SmartImage({ src, alt, className, label }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-muted/40 text-muted-foreground",
          className
        )}
      >
        <ImageIcon className="size-8 opacity-50" />
        <span className="px-2 text-center text-xs">
          {label || "Add image"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
