"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const mounted = useRef(false);

  // Reset when the source changes, and (after mount) detect an image that
  // already failed synchronously — avoids setState-before-mount warnings.
  useEffect(() => {
    mounted.current = true;
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    return () => {
      mounted.current = false;
    };
  }, [src]);

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
        <span className="px-2 text-center text-xs">{label || "Add image"}</span>
      </div>
    );
  }

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      // Local /public paths (seed placeholders) skip the optimizer so a missing
      // file doesn't produce a 400 from /_next/image; remote URLs stay optimized.
      unoptimized={src.startsWith("/")}
      className={cn("object-cover", className)}
      onError={() => {
        if (mounted.current) setFailed(true);
      }}
    />
  );
}
