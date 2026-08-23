import Link from "next/link";
import { Mail, Plane } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "@/components/ui/social-icons";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Countries", href: "/#explore" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why us", href: "/#why-us" },
      { label: "Stories", href: "/#testimonials" },
      { label: "Plan a trip", href: "/plan" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border bg-background-secondary border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Link
              href="/"
              className="focus-ring flex w-fit items-center gap-2 rounded-lg"
            >
              <span className="from-primary to-accent flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white">
                <Plane className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Lumière
              </span>
            </Link>
            <p className="text-foreground-secondary mt-4 max-w-xs text-sm leading-relaxed">
              A quieter way to plan travel — considered routes, vetted stays, and guides
              who know the place.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://github.com" label="GitHub">
                <GithubGlyph className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <LinkedinGlyph className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="mailto:hello@lumiere.travel" label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="focus-ring text-foreground-secondary hover:text-foreground rounded text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border text-foreground-secondary mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} Lumière Travel. A portfolio project — not a real
            booking service.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="focus-ring hover:text-foreground rounded">
              Privacy
            </Link>
            <Link href="/" className="focus-ring hover:text-foreground rounded">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="focus-ring border-border bg-background text-foreground-secondary hover:border-primary/30 hover:text-primary flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}
