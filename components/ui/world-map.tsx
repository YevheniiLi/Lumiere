import { FEATURED_CITIES, WORLD_LAND_PATH } from "@/data/world-map-path";

interface WorldMapProps {
  className?: string;
}

/**
 * A real world map — the land silhouette is traced from actual Natural
 * Earth geographic data (see data/world-map-path.ts), not a stylized dot
 * grid. City pins sit at their true projected coordinates and are joined
 * by animated flight-route arcs.
 */
export function WorldMap({ className }: WorldMapProps) {
  const cities = FEATURED_CITIES;

  const routes = cities.slice(0, -1).map((city, i) => {
    const next = cities[i + 1];
    const midX = (city.x + next.x) / 2;
    const midY = Math.min(city.y, next.y) - 22;
    return {
      d: `M${city.x} ${city.y} Q${midX} ${midY} ${next.x} ${next.y}`,
      key: `${city.name}-${next.name}`,
    };
  });

  return (
    <svg
      viewBox="0 0 600 240"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="worldArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4a574" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="worldGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a574" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="600" height="240" fill="url(#worldGlow)" />

      <path
        d={WORLD_LAND_PATH}
        fill="currentColor"
        className="text-foreground-secondary/25"
      />

      {routes.map((route) => (
        <path
          key={route.key}
          d={route.d}
          stroke="url(#worldArc)"
          strokeWidth="1.4"
          strokeDasharray="2 5"
          fill="none"
          className="animate-drift"
        />
      ))}

      {cities.map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r="9" fill="url(#pinGlow)">
            <animate
              attributeName="r"
              values="6;13;6"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.1;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={city.x}
            cy={city.y}
            r="3"
            fill="#d4a574"
            stroke="white"
            strokeWidth="1.2"
          />
        </g>
      ))}
    </svg>
  );
}
