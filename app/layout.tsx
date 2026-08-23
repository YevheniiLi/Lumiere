import type { Metadata, Viewport } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { PageTransition } from "@/components/layout/page-transition";

const siteUrl = "https://lumiere-travel.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lumière — A calmer way to travel",
    template: "%s · Lumière",
  },
  description:
    "Lumière is a premium travel planning concept: vetted stays, paced itineraries, and local guides — a frontend portfolio project built with Next.js.",
  keywords: [
    "travel platform",
    "portfolio project",
    "Next.js",
    "React",
    "frontend developer",
    "travel planning",
  ],
  authors: [{ name: "Yevhenii" }],
  openGraph: {
    title: "Lumière — A calmer way to travel",
    description:
      "A premium travel planning concept — vetted stays, paced itineraries, and local guides.",
    url: siteUrl,
    siteName: "Lumière",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière — A calmer way to travel",
    description:
      "A premium travel planning concept — vetted stays, paced itineraries, and local guides.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-pt-16 antialiased">
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main-content"
            className="bg-primary text-primary-foreground fixed top-4 left-4 z-[100] -translate-y-20 rounded-lg px-4 py-2 text-sm font-medium transition-transform focus-visible:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
