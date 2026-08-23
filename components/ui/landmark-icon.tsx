import type { LandmarkMotif } from "@/types";

const paths: Record<LandmarkMotif, string> = {
  tower:
    "M50 90 L50 20 M38 90 L62 90 M42 60 L58 60 M45 40 L55 40 M50 20 L44 30 M50 20 L56 30 M32 90 Q50 78 68 90",
  temple:
    "M20 90 L80 90 M26 90 L26 55 L74 55 L74 90 M20 55 L80 55 L50 30 L20 55 M50 30 L50 18 M45 18 L55 18",
  mountain:
    "M10 88 L35 45 L48 65 L62 32 L90 88 Z M35 45 L28 55 L40 55 Z M62 32 L56 42 L68 42 Z",
  wave: "M8 55 Q20 40 32 55 T56 55 T80 55 T104 55 M8 72 Q20 57 32 72 T56 72 T80 72 T104 72",
  dune: "M5 80 Q25 50 45 80 Q65 55 95 80 M20 80 Q30 68 40 80",
  arch: "M25 90 L25 45 A25 25 0 0 1 75 45 L75 90 M15 90 L85 90",
  island: "M10 75 Q30 60 50 75 T90 75 M50 75 L50 40 L62 46 L50 55",
  skyline:
    "M10 90 L10 55 L22 55 L22 90 M28 90 L28 40 L40 40 L40 90 M46 90 L46 62 L58 62 L58 90 M64 90 L64 25 L76 25 L76 90 M82 90 L82 48 L90 48 L90 90",
  // Kyoto — torii gate
  torii: "M20 35 L20 90 M80 35 L80 90 M10 30 Q50 15 90 30 M15 45 L85 45",
  // Santorini — blue-domed church above the caldera cliff
  dome: "M35 58 A15 15 0 0 1 65 58 L65 62 L35 62 Z M48 58 L48 42 L50 37 L52 42 L52 58 M8 90 L28 68 L72 68 L92 90",
  // Reykjavík — Hallgrímskirkja's stepped spire under the aurora
  spire:
    "M50 90 L50 28 M34 90 L34 52 L40 52 L40 42 L46 42 L46 32 L54 32 L54 42 L60 42 L60 52 L66 52 L66 90 M8 18 Q30 8 50 18 T92 18",
  // Marrakech — minaret with a crenellated crown
  minaret:
    "M40 90 L40 30 L60 30 L60 90 M34 30 L66 30 L66 22 L34 22 Z M46 22 L46 10 L54 10 L54 22 M38 46 L62 46 M38 62 L62 62 M38 78 L62 78",
  // Queenstown — a jagged peak mirrored in Lake Wakatipu
  "lake-peak":
    "M14 58 L36 22 L50 42 L66 18 L92 58 M14 58 L92 58 M14 58 L36 88 L50 70 L66 90 L92 58",
  // Lisbon — the Carris tram
  tram: "M16 55 Q16 44 27 44 L73 44 Q84 44 84 55 L84 80 L16 80 Z M16 66 L84 66 M27 80 L27 88 M73 80 L73 88 M50 44 L50 20 M32 20 L68 20",
  // Bali — terraced rice paddies with a gate marker
  terrace:
    "M4 88 Q28 78 52 85 T104 80 M4 72 Q28 62 52 69 T104 64 M4 56 Q28 46 52 53 T104 48 M22 32 L22 20 L34 20 L34 32",
  // Cape Town — the flat top of Table Mountain
  "table-mountain": "M8 88 L20 42 L80 42 L92 88 Z M16 42 L84 42",
  // Paris — the Eiffel Tower's tapering lattice
  eiffel:
    "M50 90 L34 90 L45 55 L28 55 L43 30 L34 30 L50 8 L66 30 L57 30 L72 55 L55 55 L66 90 Z M30 68 L70 68 M38 46 L62 46",
  // Rome — the Colosseum's arched facade
  colosseum:
    "M8 82 L8 55 Q8 45 18 45 L82 45 Q92 45 92 55 L92 82 M20 82 L20 55 Q20 50 25 50 Q30 50 30 55 L30 82 M42 82 L42 55 Q42 50 47 50 Q52 50 52 55 L52 82 M64 82 L64 55 Q64 50 69 50 Q74 50 74 55 L74 82 M8 82 L92 82",
  // Barcelona — the Sagrada Família's tapering spires
  sagrada:
    "M28 90 L28 42 L24 30 L32 30 Z M50 90 L50 22 L45 8 L55 8 Z M72 90 L72 48 L68 36 L76 36 Z M10 90 L90 90",
  // Tokyo — a slender lattice broadcast tower
  "lattice-tower":
    "M50 90 L40 90 L47 12 L53 12 L60 90 Z M42 66 L58 66 M44 48 L56 48 M46 30 L54 30",
  // Bangkok — a tiered wat roofline
  wat: "M14 90 L86 90 M20 90 L20 72 L80 72 L80 90 M10 72 L90 72 L50 58 L10 72 M22 58 L78 58 L50 44 L22 58 M34 44 L66 44 L50 32 L34 44",
  // Rio de Janeiro — Christ the Redeemer above Corcovado
  statue:
    "M50 90 L46 58 L20 42 M50 58 L80 42 M50 58 L50 32 M44 32 A6 6 0 1 1 56 32 A6 6 0 1 1 44 32 M8 90 L34 58 L50 90 M50 90 L66 58 L92 90",
  // Sydney — the Opera House's sail shells
  "opera-house":
    "M12 82 Q24 52 36 82 M34 82 Q46 46 58 82 M56 82 Q68 40 80 82 M8 82 L92 82 M64 82 Q78 62 92 82",
  // Banff — glacier-capped peaks
  "glacier-peaks":
    "M4 88 L20 48 L30 64 L45 30 L60 60 L76 38 L96 88 Z M20 48 L15 57 L26 57 M45 30 L39 41 L51 41 M76 38 L70 49 L81 49",
};

const viewBoxes: Partial<Record<LandmarkMotif, string>> = {
  wave: "0 0 110 90",
  skyline: "0 0 100 90",
  terrace: "0 0 108 90",
};

export function LandmarkIcon({
  motif,
  className,
}: {
  motif: LandmarkMotif;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBoxes[motif] ?? "0 0 100 100"}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={paths[motif]}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
