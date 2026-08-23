"use client";

import { motion } from "framer-motion";

interface FlightArcProps {
  className?: string;
  animated?: boolean;
}

/**
 * A thin dashed great-circle arc with a traveling dot — the page's signature
 * motif, echoing the idea of a route rather than a generic decorative shape.
 */
export function FlightArc({ className, animated = true }: FlightArcProps) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="arcGradient"
          x1="0"
          y1="0"
          x2="400"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#d4a574" stopOpacity="0" />
          <stop offset="15%" stopColor="#d4a574" />
          <stop offset="85%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        id="arcPath"
        d="M10 110 Q200 -10 390 110"
        stroke="url(#arcGradient)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className={animated ? "animate-drift" : undefined}
      />
      <circle cx="10" cy="110" r="3" fill="#d4a574" />
      <circle cx="390" cy="110" r="3" fill="#0f766e" />
      {animated && (
        <motion.circle
          r="4"
          fill="#0f766e"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            offsetPath: "path('M10 110 Q200 -10 390 110')",
          }}
        />
      )}
    </svg>
  );
}
