"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Search, SearchX, X } from "lucide-react";
import { countries } from "@/data/countries";
import type { CountryEntry } from "@/data/countries";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";

const RECENTS_KEY = "lumiere:recent-countries";
const MAX_RECENTS = 6;
const REGION_ORDER = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

interface CountryBrowserProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (country: CountryEntry) => void;
}

function readRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecents(codes: string[]) {
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(codes));
  } catch {
    // localStorage can throw in private-browsing/storage-restricted contexts;
    // recents are a nice-to-have, so fail silently.
  }
}

export function CountryBrowser({ open, onClose, onSelect }: CountryBrowserProps) {
  const [query, setQuery] = useState("");
  const [grouping, setGrouping] = useState<"continent" | "alphabetical">("continent");
  const [recentCodes, setRecentCodes] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Reset transient state whenever the modal opens, and load recents from
  // localStorage. Doing this during render (rather than in an effect) is
  // React's recommended "reset state on prop change" pattern.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setHighlighted(0);
      setRecentCodes(readRecents());
    }
  }

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const recents = useMemo(
    () =>
      recentCodes
        .map((code) => countries.find((c) => c.code === code))
        .filter((c): c is CountryEntry => Boolean(c)),
    [recentCodes],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q),
    );
  }, [query]);

  // Grouped, in the exact order rendered — used for both display and
  // flattening into a single keyboard-navigable sequence.
  const groups = useMemo(() => {
    if (grouping === "continent") {
      return REGION_ORDER.map((region) => ({
        label: region,
        items: results
          .filter((c) => c.region === region)
          .sort((a, b) => a.name.localeCompare(b.name)),
      })).filter((g) => g.items.length > 0);
    }
    const byLetter = new Map<string, CountryEntry[]>();
    for (const c of [...results].sort((a, b) => a.name.localeCompare(b.name))) {
      const letter = c.name[0]?.toUpperCase() ?? "#";
      if (!byLetter.has(letter)) byLetter.set(letter, []);
      byLetter.get(letter)!.push(c);
    }
    return [...byLetter.entries()].map(([label, items]) => ({ label, items }));
  }, [results, grouping]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const safeHighlighted = Math.min(highlighted, Math.max(flat.length - 1, 0));

  const destinationCountries = useMemo(
    () => new Set(destinations.map((d) => d.country.toLowerCase())),
    [],
  );

  const router = useRouter();

  const handleSelect = (country: CountryEntry) => {
    const next = [country.code, ...recentCodes.filter((c) => c !== country.code)].slice(
      0,
      MAX_RECENTS,
    );
    setRecentCodes(next);
    writeRecents(next);

    const destination = destinations.find(
      (d) => d.country.toLowerCase() === country.name.toLowerCase(),
    );
    onClose();
    if (destination) {
      router.push(`/destinations/${destination.slug}`);
    } else {
      onSelect?.(country);
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((i) => Math.min(i + 1, flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const country = flat[safeHighlighted];
        if (country) handleSelect(country);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flat, safeHighlighted, onClose]);

  useEffect(() => {
    const current = flat[safeHighlighted];
    if (!current) return;
    itemRefs.current.get(current.code)?.scrollIntoView({ block: "nearest" });
  }, [safeHighlighted, flat]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Browse countries"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="border-border bg-background/95 glass flex max-h-[76vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
          >
            <div className="border-border flex items-center gap-3 border-b px-5 py-4">
              <Search className="text-foreground-secondary h-4 w-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                placeholder="Search countries or capitals…"
                className="text-foreground placeholder:text-foreground-secondary min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="focus-ring text-foreground-secondary hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {query.trim().length === 0 && (
              <div className="border-border flex items-center gap-2 border-b px-5 py-2.5">
                <div className="flex flex-1 items-center gap-1 text-xs">
                  {(["continent", "alphabetical"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setGrouping(mode)}
                      aria-pressed={grouping === mode}
                      className={cn(
                        "focus-ring rounded-full px-2.5 py-1 font-medium transition-colors",
                        grouping === mode
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground-secondary hover:text-foreground",
                      )}
                    >
                      {mode === "continent" ? "By continent" : "A–Z"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-2">
              {query.trim().length === 0 && recents.length > 0 && (
                <div className="mb-2">
                  <p className="text-foreground-secondary flex items-center gap-1.5 px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide uppercase">
                    <Clock className="h-3 w-3" />
                    Recent
                  </p>
                  <div className="flex flex-wrap gap-1.5 px-3 pb-2">
                    {recents.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleSelect(country)}
                        className="focus-ring border-border bg-background hover:border-accent/40 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                      >
                        <span aria-hidden="true">{country.flag}</span>
                        {country.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {flat.length === 0 ? (
                <div className="flex flex-col items-center px-4 py-14 text-center">
                  <SearchX className="text-foreground-secondary h-7 w-7" />
                  <p className="font-display mt-3 text-sm font-semibold">No matches</p>
                  <p className="text-foreground-secondary mt-1 text-xs">
                    Try a different name or capital.
                  </p>
                </div>
              ) : (
                groups.map((group) => (
                  <div key={group.label}>
                    <p className="text-foreground-secondary px-3 pt-3 pb-1 text-[11px] font-semibold tracking-wide uppercase">
                      {group.label}
                    </p>
                    {group.items.map((country) => {
                      const index = flat.indexOf(country);
                      const isHighlighted = index === safeHighlighted;
                      return (
                        <button
                          key={country.code}
                          ref={(el) => {
                            if (el) itemRefs.current.set(country.code, el);
                            else itemRefs.current.delete(country.code);
                          }}
                          type="button"
                          onMouseEnter={() => setHighlighted(index)}
                          onClick={() => handleSelect(country)}
                          className={cn(
                            "focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            isHighlighted
                              ? "bg-primary/10 text-foreground"
                              : "text-foreground hover:bg-background-secondary",
                          )}
                        >
                          <span className="text-lg" aria-hidden="true">
                            {country.flag}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{country.name}</span>
                          {destinationCountries.has(country.name.toLowerCase()) && (
                            <span
                              className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full"
                              aria-hidden="true"
                              title="Destination page available"
                            />
                          )}
                          <span className="text-foreground-secondary shrink-0 text-xs">
                            {country.subregion}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="border-border text-foreground-secondary flex items-center gap-4 border-t px-5 py-2.5 text-[11px]">
              <span className="flex items-center gap-1">
                <kbd className="border-border rounded border px-1.5 py-0.5">↑↓</kbd>{" "}
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border-border rounded border px-1.5 py-0.5">Enter</kbd>{" "}
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border-border rounded border px-1.5 py-0.5">Esc</kbd>{" "}
                Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
