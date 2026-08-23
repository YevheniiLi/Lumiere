import Image from "next/image";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { LandmarkIcon } from "@/components/ui/landmark-icon";
import type { Destination } from "@/types";

interface DestinationArtProps {
  destination: Destination;
  iconClassName?: string;
  showRating?: boolean;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}

export function DestinationArt({
  destination,
  iconClassName = "h-20 w-20",
  showRating = true,
  priority = false,
  sizes = "(min-width: 1024px) 400px, 100vw",
  children,
}: DestinationArtProps) {
  return (
    <div className="noise-overlay relative flex h-full items-center justify-center overflow-hidden">
      {destination.photo ? (
        <Image
          src={destination.photo.src}
          alt={destination.photo.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${destination.gradient[0]}, ${destination.gradient[1]})`,
            }}
          />
          <LandmarkIcon
            motif={destination.motif}
            className={`relative text-white/90 transition-transform duration-700 ease-out group-hover:scale-110 ${iconClassName}`}
          />
        </>
      )}

      {/* Soft bottom vignette — keeps captions/badges legible over any
          gradient or photo without needing a separate scrim per card. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

      {showRating && (
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-current" />
          {destination.rating}
        </span>
      )}
      {children}
    </div>
  );
}
