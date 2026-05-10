import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | SideKaam",
  description:
    "SideKaam privacy policy — how we collect, use, and protect your data. DPDP Act compliant.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Privacy Policy",
        description:
          "SideKaam privacy policy — how we collect, use, and protect your data.",
        url: "https://sidekaam.in/privacy",
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
            name: "Privacy Policy",
            item: "https://sidekaam.in/privacy",
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          SideKaam by Darsh Gupta is committed to protecting your privacy and complying with the Digital Personal Data Protection (DPDP) Act, 2023.
        </p>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          This page is under construction. For privacy-related inquiries, contact us at{" "}
          <a href="mailto:hello@build.withdarsh.com" className="text-sk-emerald font-medium">hello@build.withdarsh.com</a>.
        </p>
      </main>
    </div>
  );
}
