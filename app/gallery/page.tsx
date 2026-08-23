import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { PageHeader } from "@/components/page-header";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Original illustrated travel art from every Lumière destination.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A visual record, not a stock feed"
        description="Every tile is an original illustration. Click any tile for a closer look, or use the arrow keys to browse."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <GalleryGrid items={gallery} />
      </section>
    </>
  );
}
