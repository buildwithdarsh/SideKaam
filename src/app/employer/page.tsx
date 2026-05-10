import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Send, Building2, Users, Shield, IndianRupee } from "lucide-react";
import { Logo } from "@/components/logo";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Hire Verified Part-Time Talent in India | SideKaam for Employers",
  description:
    "Get 5 AI-matched, Aadhaar-verified candidates daily. UPI escrow payments and GST invoicing included. Start hiring part-time professionals across 20+ Indian cities.",
  alternates: {
    canonical: "/employer",
  },
  openGraph: {
    title: "Hire Verified Part-Time Talent in India | SideKaam for Employers",
    description:
      "Get 5 AI-matched, Aadhaar-verified candidates daily. UPI escrow payments and GST invoicing included.",
    url: "https://sidekaam.in/employer",
    siteName: "SideKaam",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Verified Part-Time Talent in India | SideKaam for Employers",
    description:
      "Get 5 AI-matched, Aadhaar-verified candidates daily. UPI escrow payments and GST invoicing included.",
  },
};

function EmployerIllustration() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs" aria-hidden="true">
      {/* Office building */}
      <rect x="110" y="60" width="100" height="140" rx="12" fill="#16a34a" fillOpacity="0.06" stroke="#16a34a" strokeOpacity="0.2" strokeWidth="1.5"/>
      {/* Windows */}
      {[80, 110, 140, 170].map((y) => (
        <g key={y}>
          <rect x="125" y={y} width="16" height="16" rx="3" fill="#16a34a" fillOpacity="0.12"/>
          <rect x="149" y={y} width="16" height="16" rx="3" fill="#6366f1" fillOpacity="0.1"/>
          <rect x="173" y={y} width="16" height="16" rx="3" fill="#16a34a" fillOpacity="0.08"/>
        </g>
      ))}
      {/* Door */}
      <rect x="145" y="175" width="30" height="25" rx="4" fill="#16a34a" fillOpacity="0.2"/>
      {/* Left building */}
      <rect x="40" y="100" width="60" height="100" rx="10" fill="#6366f1" fillOpacity="0.04" stroke="#6366f1" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="52" y="115" width="10" height="10" rx="2" fill="#6366f1" fillOpacity="0.1"/>
      <rect x="68" y="115" width="10" height="10" rx="2" fill="#6366f1" fillOpacity="0.1"/>
      <rect x="52" y="135" width="10" height="10" rx="2" fill="#6366f1" fillOpacity="0.08"/>
      <rect x="68" y="135" width="10" height="10" rx="2" fill="#6366f1" fillOpacity="0.08"/>
      {/* Right building */}
      <rect x="220" y="110" width="55" height="90" rx="10" fill="#f59e0b" fillOpacity="0.04" stroke="#f59e0b" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="232" y="125" width="10" height="10" rx="2" fill="#f59e0b" fillOpacity="0.1"/>
      <rect x="248" y="125" width="10" height="10" rx="2" fill="#f59e0b" fillOpacity="0.1"/>
      <rect x="232" y="145" width="10" height="10" rx="2" fill="#f59e0b" fillOpacity="0.08"/>
      <rect x="248" y="145" width="10" height="10" rx="2" fill="#f59e0b" fillOpacity="0.08"/>
      {/* Ground */}
      <line x1="20" y1="200" x2="300" y2="200" stroke="#e5e5e0" strokeWidth="1.5"/>
      {/* People dots */}
      <circle cx="75" cy="215" r="5" fill="#6366f1" fillOpacity="0.15"/>
      <circle cx="90" cy="218" r="4" fill="#16a34a" fillOpacity="0.15"/>
      <circle cx="160" cy="220" r="5" fill="#f59e0b" fillOpacity="0.15"/>
      <circle cx="230" cy="216" r="4.5" fill="#f43f5e" fillOpacity="0.12"/>
      <circle cx="250" cy="220" r="3.5" fill="#16a34a" fillOpacity="0.12"/>
      {/* Flag on main building */}
      <line x1="160" y1="40" x2="160" y2="60" stroke="#16a34a" strokeOpacity="0.3" strokeWidth="1.5"/>
      <rect x="160" y="40" width="20" height="12" rx="2" fill="#16a34a" fillOpacity="0.2"/>
      {/* Connecting lines (representing network) */}
      <path d="M75 210 Q120 190 145 200" stroke="#6366f1" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M230 210 Q200 190 175 200" stroke="#f59e0b" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  );
}

export default function EmployerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "SideKaam for Employers",
        description:
          "Hire verified part-time talent from across India with AI-powered matching, Aadhaar verification, and UPI payments.",
        url: "https://sidekaam.in/employer",
        isPartOf: {
          "@type": "WebSite",
          name: "SideKaam",
          url: "https://sidekaam.in",
        },
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
            name: "For Employers",
            item: "https://sidekaam.in/employer",
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

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-5 py-3.5 max-w-5xl mx-auto">
          <Link href="/"><Logo size="sm" /></Link>
          <Link href="/" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors" aria-label="Back to homepage">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="max-w-lg space-y-8">
          <div className="text-left">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "For Employers", href: "/employer" }]} />
          </div>
          <EmployerIllustration />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-sk-indigo/8 px-4 py-1.5">
              <Building2 className="h-3.5 w-3.5 text-sk-indigo" />
              <span className="text-[12px] font-semibold text-sk-indigo">For Indian Businesses</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Hire verified part-time
              <br />
              talent from across India
            </h1>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md mx-auto">
              We&apos;re currently onboarding employers by invitation only.
              Send us your details and our team will set up your account within 24 hours.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {[
              { Icon: Users, color: "text-sk-emerald", bg: "bg-sk-emerald/8", title: "Matched Talent", desc: "Get 5 AI-matched candidates daily" },
              { Icon: Shield, color: "text-sk-indigo", bg: "bg-sk-indigo/8", title: "Verified Profiles", desc: "Aadhaar + LinkedIn verified professionals" },
              { Icon: IndianRupee, color: "text-sk-amber", bg: "bg-sk-amber/8", title: "INR Billing", desc: "UPI, escrow, GST invoicing included" },
            ].map(({ Icon, color, bg, title, desc }, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 shadow-soft space-y-2">
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className="text-[13px] font-semibold">{title}</p>
                <p className="text-[11px] text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <a
              href="mailto:employers@sidekaam.in?subject=Employer%20Invite%20Request&body=Company%20Name:%0ACity:%0AWhat%20roles%20do%20you%20need?:%0A"
              className="inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-8 py-4 text-[15px] font-semibold shadow-soft hover:shadow-card active:scale-[0.98] transition-all"
            >
              <Send className="h-4 w-4" />
              Request an Invite
            </a>
            <p className="text-[12px] text-muted-foreground">
              Or email us at <span className="font-medium text-foreground">employers@sidekaam.in</span>
            </p>
          </div>

          <p className="text-[11px] text-muted-foreground">
            India only. Plans starting at ₹999/month.
          </p>
        </div>
      </main>
    </div>
  );
}
