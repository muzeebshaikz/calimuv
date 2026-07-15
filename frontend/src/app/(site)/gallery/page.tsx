import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import { getGallery } from "@/lib/api";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from training sessions, events, and the Calimuv facility.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A glimpse into life at Calimuv — training, events, and community."
      />
      <Section>
        {images.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Photos will be added soon.
          </p>
        ) : (
          <GalleryGrid images={images} />
        )}
      </Section>
    </>
  );
}
