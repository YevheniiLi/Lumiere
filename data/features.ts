import type { FeatureItem, StatItem } from "@/types";

export const features: FeatureItem[] = [
  {
    id: "hotels",
    title: "Carefully Selected Hotels",
    description: "A shortlist of properties vetted in person, not just by star rating.",
    icon: "BedDouble",
    story: "A cliffside room in Santorini, chosen for the view before the amenities.",
    destinationSlug: "santorini-greece",
  },
  {
    id: "adventure",
    title: "Memorable Experiences",
    description: "From glacier hikes to reef dives, routed by people who've done them.",
    icon: "Compass",
    story: "A dawn start on a Banff trail, timed to beat the crowds to Moraine Lake.",
    destinationSlug: "banff-canada",
  },
  {
    id: "guides",
    title: "Authentic Local Guides",
    description: "Independent guides who live in the city, not seasonal contractors.",
    icon: "MapPinned",
    story: "In Kyoto, a guide who knows which temple gate opens before the tour buses.",
    destinationSlug: "kyoto-japan",
  },
  {
    id: "booking",
    title: "Better Planning",
    description:
      "A pace set for the trip, not a template — fewer stops, more room to stay.",
    icon: "Zap",
    story: "Confirmed in the time it takes to finish your coffee — no hold music.",
  },
];

export const stats: StatItem[] = [
  {
    id: "trips",
    label: "Trips planned",
    value: 128000,
    suffix: "+",
    icon: "Users",
  },
  {
    id: "destinations",
    label: "Countries covered",
    value: 194,
    suffix: "",
    icon: "Globe2",
  },
  { id: "guides", label: "Local guides", value: 3400, suffix: "+", icon: "MapPinned" },
  { id: "rating", label: "Traveler rating", value: 4.9, suffix: "/5", icon: "Star" },
];
