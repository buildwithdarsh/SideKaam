import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | SideKaam",
  description:
    "SideKaam terms of service — rules governing use of the platform, payments, and dispute resolution.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Terms of Service",
        description:
          "SideKaam terms of service — rules governing use of the platform, payments, and dispute resolution.",
        url: "https://sidekaam.in/terms",
        isPartOf: {
          "@type": "WebSite",
          name: "SideKaam",
          url: "https://sidekaam.in",
        },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sidekaam.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Terms of Service",
            item: "https://sidekaam.in/terms",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-5 py-3 max-w-3xl mx-auto">
          <Link href="/"><Logo size="sm" /></Link>
          <Link href="/" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors" aria-label="Back to homepage">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="flex-1 px-5 py-12 max-w-3xl mx-auto w-full space-y-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]} />
        <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          By using SideKaam, you agree to the following terms and conditions governing platform usage, payments, and dispute resolution.
        </p>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          This page is under construction. For questions, contact us at{" "}
          <a href="mailto:hello@build.withdarsh.com" className="text-sk-emerald font-medium">hello@build.withdarsh.com</a>.
        </p>
      </main>
    </div>
  );
}
