import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Voss",
    role: "Product Designer",
    quote:
      "Every leg of the trip was arranged before I had to think about it. The itinerary felt personal, not templated.",
    rating: 5,
    initials: "EV",
    destination: "Kyoto, Japan",
    flag: "🇯🇵",
    duration: "6 days",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "Founder, Studio Loop",
    quote:
      "I've used a lot of travel planners. This is the first one that understood pacing — no back-to-back red-eyes.",
    rating: 5,
    initials: "MC",
    destination: "Santorini, Greece",
    flag: "🇬🇷",
    duration: "5 days",
  },
  {
    id: "t3",
    name: "Amara Okafor",
    role: "Photographer",
    quote:
      "The local guides alone were worth it. Quiet access to places I'd never have found on my own.",
    rating: 4.9,
    initials: "AO",
    destination: "Marrakech, Morocco",
    flag: "🇲🇦",
    duration: "8 days",
  },
  {
    id: "t4",
    name: "Julien Roy",
    role: "Editor",
    quote:
      "Booking took minutes and every confirmation arrived instantly. It's the calmest travel planning has ever felt.",
    rating: 4.8,
    initials: "JR",
    destination: "Lisbon, Portugal",
    flag: "🇵🇹",
    duration: "4 days",
  },
];
