export type LandmarkMotif =
  | "tower"
  | "temple"
  | "mountain"
  | "wave"
  | "dune"
  | "arch"
  | "island"
  | "skyline"
  | "torii"
  | "dome"
  | "spire"
  | "minaret"
  | "lake-peak"
  | "tram"
  | "terrace"
  | "table-mountain"
  | "eiffel"
  | "colosseum"
  | "sagrada"
  | "lattice-tower"
  | "wat"
  | "statue"
  | "opera-house"
  | "glacier-peaks";

export interface Destination {
  slug: string;
  country: string;
  city: string;
  description: string;
  rating: number;
  bestSeason: string;
  region: string;
  motif: LandmarkMotif;
  gradient: [string, string];
  /** Short editorial tag shown on cards, e.g. "Coastal escape". */
  category: string;
  /** Optional real photograph (freely licensed). Falls back to the
   * illustrated gradient + landmark art when omitted. */
  photo?: { src: string; alt: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  destination: string;
  flag: string;
  duration: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** A short travel-storytelling line, in place of a generic SaaS blurb. */
  story?: string;
  /** Slug of a destination whose art/motif illustrates this feature. */
  destinationSlug?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  motif: LandmarkMotif;
  gradient: [string, string];
  size: "sm" | "md" | "lg";
}
