import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid } from "@/components/gallery-grid";

export function Gallery() {
  return (
    <section id="gallery" className="bg-background-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="A visual record, not a stock feed"
          description="Every tile is an original illustration — no stock photography, no filler. Click any tile for a closer look."
        />

        <div className="mt-16">
          <GalleryGrid items={gallery.slice(0, 8)} />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="focus-ring border-border text-foreground hover:border-primary/30 hover:bg-background bg-background inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            View full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
