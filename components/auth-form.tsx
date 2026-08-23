"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubGlyph, GoogleGlyph } from "@/components/ui/social-icons";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [provider, setProvider] = useState<"google" | "github" | "email" | null>(null);
  const isSignUp = mode === "sign-up";

  const handleSubmit =
    (chosenProvider: "google" | "github" | "email") => (e: FormEvent) => {
      e.preventDefault();
      setProvider(chosenProvider);
      setSubmitted(true);
    };

  if (submitted) {
    const providerLabel =
      provider === "google" ? "Google" : provider === "github" ? "GitHub" : "email";

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-border bg-background mx-auto max-w-md rounded-2xl border p-8 text-center shadow-sm"
      >
        <span className="bg-accent/10 text-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h2 className="font-display mt-5 text-xl font-semibold">
          {isSignUp ? "Account created" : "Welcome back"}
        </h2>
        <p className="text-foreground-secondary mt-2 text-sm leading-relaxed">
          This is a portfolio demo — no account was actually{" "}
          {isSignUp ? "created" : "signed into"} via {providerLabel}.
        </p>
        <Link
          href="/"
          className="text-accent mt-6 inline-block text-sm font-semibold hover:underline"
        >
          Back to home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="border-border bg-background mx-auto max-w-md rounded-2xl border p-8 shadow-sm">
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleSubmit("google")}
          className="focus-ring border-border text-foreground hover:border-accent/40 hover:bg-background-secondary flex w-full items-center justify-center gap-2.5 rounded-xl border py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md"
        >
          <GoogleGlyph className="h-4 w-4" />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={handleSubmit("github")}
          className="focus-ring border-border text-foreground hover:border-accent/40 hover:bg-background-secondary flex w-full items-center justify-center gap-2.5 rounded-xl border py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md"
        >
          <GithubGlyph className="h-4 w-4" />
          Continue with GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="border-border h-px flex-1 border-t" />
        <span className="text-foreground-secondary text-xs">or continue with email</span>
        <span className="border-border h-px flex-1 border-t" />
      </div>

      <form onSubmit={handleSubmit("email")} className="space-y-5">
        {isSignUp && (
          <div>
            <label htmlFor="name" className="text-foreground text-sm font-semibold">
              Full name
            </label>
            <div className="relative mt-2">
              <User className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                className="focus-ring border-border bg-background-secondary text-foreground w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm"
                placeholder="Jordan Rivera"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-foreground text-sm font-semibold">
            Email
          </label>
          <div className="relative mt-2">
            <Mail className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="focus-ring border-border bg-background-secondary text-foreground w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="text-foreground text-sm font-semibold">
            Password
          </label>
          <div className="relative mt-2">
            <Lock className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className="focus-ring border-border bg-background-secondary text-foreground w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full justify-center">
          {isSignUp ? "Create account" : "Continue with Email"}
        </Button>
      </form>

      <p className="text-foreground-secondary mt-6 text-center text-sm">
        {isSignUp ? "Already have an account?" : "New to Lumière?"}{" "}
        <Link
          href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
          className="text-accent font-semibold hover:underline"
        >
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
