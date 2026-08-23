"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Star, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { FlightArc } from "@/components/ui/flight-arc";
import { fadeIn, slideUp, viewportOnce } from "@/lib/motion";

export function Cta() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="from-primary via-primary to-accent noise-overlay relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br px-8 py-20 text-center shadow-[0_50px_100px_-30px_rgba(15,118,110,0.5)] sm:px-16 sm:py-24"
      >
        {/* Layered depth: spotlight glow, drifting blobs, flight-path arcs,
            and a faint dot grid — the richest background treatment on the
            page, reserved for the section that should close it out loudest. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <motion.div
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
        >
          <FlightArc className="absolute top-8 left-0 h-24 w-full" />
          <FlightArc
            className="absolute bottom-8 left-0 h-24 w-full rotate-180"
            animated={false}
          />
        </motion.div>

        {/* Floating proof badges — small, distinct from the hero's larger
            information panels, but the same "layered, overlapping" language. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="animate-float glass absolute top-10 left-6 hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white sm:flex"
        >
          <Star className="text-accent-gold fill-accent-gold h-3.5 w-3.5" />
          4.9/5 average rating
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ animationDelay: "-3s" }}
          className="animate-float glass absolute right-6 bottom-10 hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white sm:flex"
        >
          <Users className="h-3.5 w-3.5" />
          12,000+ travelers
        </motion.div>

        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Your next trip is one conversation away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-balance text-white/85">
            Tell us where and when — we&apos;ll handle the routing, the stays, and the
            quiet details in between.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/plan"
              className={buttonVariants({
                size: "lg",
                className:
                  "text-primary bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:bg-white/90",
              })}
            >
              Start planning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:hello@lumiere.travel"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
                className: "border-white/30 bg-white/10 text-white hover:bg-white/20",
              })}
            >
              <Mail className="h-4 w-4" />
              Talk to a guide
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
