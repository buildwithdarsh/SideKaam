import Link from "next/link";
import {
  ArrowRight, Zap, Shield, IndianRupee,
  Users, MapPin, Clock,
} from "lucide-react";
import { HourlyCalculator } from "@/components/hourly-calculator";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SideKaam",
        url: "https://sidekaam.in",
        description:
          "India's platform for verified part-time jobs and professional networking.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://sidekaam.in/jobs?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "SideKaam",
        url: "https://sidekaam.in",
        logo: "https://sidekaam.in/logo.png",
        description:
          "India's platform for part-time jobs and professional networking. AI-powered matching, verified profiles, INR payments.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@build.withdarsh.com",
          contactType: "customer service",
        },
        sameAs: [],
      },
      {
        "@type": "Product",
        name: "SideKaam Subscription",
        description:
          "Unlimited access to part-time job matching, verified profiles, and UPI payments across 20+ Indian cities.",
        brand: {
          "@type": "Brand",
          name: "SideKaam",
        },
        offers: [
          {
            "@type": "Offer",
            name: "1 Month Plan",
            price: "499",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://sidekaam.in/onboarding",
          },
          {
            "@type": "Offer",
            name: "6 Months Plan",
            price: "2499",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://sidekaam.in/onboarding",
          },
          {
            "@type": "Offer",
            name: "12 Months Plan",
            price: "4499",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://sidekaam.in/onboarding",
          },
        ],
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
        ],
      },
      {
        "@type": "HowTo",
        name: "How SideKaam Works",
        description:
          "Get started with SideKaam in three steps: pick an experience, show up for 1 hour, and get paid.",
        step: [
          {
            "@type": "HowToStep",
            name: "Pick an experience",
            text: "Browse real opportunities by category and city",
            position: 1,
          },
          {
            "@type": "HowToStep",
            name: "Show up for 1 hour",
            text: "Work, learn, and contribute — no commitment",
            position: 2,
          },
          {
            "@type": "HowToStep",
            name: "Get paid + experience",
            text: "Earn money, gain a new skill, repeat",
            position: 3,
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
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-5 py-3 max-w-5xl mx-auto">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link href="/employer" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              For Providers
            </Link>
            <Link href="/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/onboarding"
              className="rounded-full bg-foreground text-background px-5 py-2 text-[13px] font-semibold active:scale-95 transition-transform"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-sk-emerald/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="relative flex flex-col items-center text-center px-5 pt-10 pb-6 sm:pt-20 sm:pb-12 max-w-3xl mx-auto stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-sk-emerald/8 px-4 py-2 border border-sk-emerald/12 mb-6">
            <span className="text-base">🇮🇳</span>
            <span className="text-[11px] font-bold text-sk-emerald tracking-widest uppercase">
              Made in India
            </span>
          </div>

          {/* Headline — bigger, bolder */}
          <h1 className="text-[40px] sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-4">
            Your 9-to-5 pays bills.
            <br />
            <span className="text-sk-emerald relative">
              Side Kaam
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-sk-emerald/20" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 7 Q50 0 100 5 Q150 0 200 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}builds you.
          </h1>

          {/* Subtitle — shorter, punchier */}
          <p className="text-[15px] sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
            Try real work outside your career — for just 1 hour.
            <span className="block mt-1 text-foreground/80 font-medium">Bake. Shoot. Coach. Code. Get paid.</span>
          </p>

          {/* CTA — moved up, more prominent */}
          <div className="flex flex-col items-center gap-3 w-full mb-10">
            <Link
              href="/onboarding"
              className="animate-pulse-glow w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-sk-emerald text-white px-8 py-4 text-[16px] sm:text-[17px] font-bold shadow-lg hover:shadow-xl active:scale-[0.97] transition-all"
            >
              Give It One Hour
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-[11px] text-muted-foreground">
              No commitment. Plans from ₹499/mo.
            </p>
          </div>

          {/* Live-feel stats — compact row */}
          <div className="flex items-center gap-3 sm:gap-5 mb-8">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sk-emerald/60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sk-emerald" />
              </span>
              <span className="text-[12px] font-semibold text-foreground/70">10K+ professionals</span>
            </div>
            <span className="text-border">|</span>
            <span className="text-[12px] font-semibold text-foreground/70">20+ cities</span>
            <span className="text-border">|</span>
            <span className="text-[12px] text-muted-foreground">🇮🇳</span>
          </div>
        </div>

        {/* Marquee — full-bleed scrolling experiences */}
        <div className="relative w-full overflow-hidden py-4 bg-secondary/40 border-y border-border/40">
          <div className="flex animate-marquee w-max gap-3">
            {[
              { exp: "Work at a bakery", rate: "₹500/hr", emoji: "🧁" },
              { exp: "Assist a photographer", rate: "₹800/hr", emoji: "📸" },
              { exp: "Shadow a CA", rate: "₹1,200/hr", emoji: "📊" },
              { exp: "Coach at a gym", rate: "₹600/hr", emoji: "💪" },
              { exp: "Work a fashion shoot", rate: "₹1,000/hr", emoji: "👗" },
              { exp: "Help at an event", rate: "₹700/hr", emoji: "🎪" },
              { exp: "Teach guitar", rate: "₹900/hr", emoji: "🎸" },
              { exp: "Assist a chef", rate: "₹550/hr", emoji: "👨‍🍳" },
              { exp: "Work at a bakery", rate: "₹500/hr", emoji: "🧁" },
              { exp: "Assist a photographer", rate: "₹800/hr", emoji: "📸" },
              { exp: "Shadow a CA", rate: "₹1,200/hr", emoji: "📊" },
              { exp: "Coach at a gym", rate: "₹600/hr", emoji: "💪" },
              { exp: "Work a fashion shoot", rate: "₹1,000/hr", emoji: "👗" },
              { exp: "Help at an event", rate: "₹700/hr", emoji: "🎪" },
              { exp: "Teach guitar", rate: "₹900/hr", emoji: "🎸" },
              { exp: "Assist a chef", rate: "₹550/hr", emoji: "👨‍🍳" },
            ].map(({ exp, rate, emoji }, i) => (
              <span key={i} className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card shadow-soft text-[13px] border border-border/50">
                <span>{emoji}</span>
                <span className="text-foreground/80 font-medium">{exp}</span>
                <span className="font-bold text-sk-emerald">{rate}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — Ashoka Chakra inspired step circles */}
      <section className="px-5 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
            <p className="text-[14px] text-muted-foreground max-w-md mx-auto">
              You&apos;re a software engineer who wants to try baking? A CA who wants to assist a photographer?
              Pick, show up, work, learn, earn.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { step: "1", title: "Pick an experience", desc: "Browse real opportunities by category and city", color: "border-[#FF9933]", text: "text-sk-amber" },
              { step: "2", title: "Show up for 1 hour", desc: "Work, learn, and contribute — no commitment", color: "border-[#000080]", text: "text-sk-indigo" },
              { step: "3", title: "Get paid + experience", desc: "Earn money, gain a new skill, repeat", color: "border-sk-emerald", text: "text-sk-emerald" },
            ].map(({ step, title, desc, color, text }, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 shadow-soft text-center space-y-3">
                <div className={`w-10 h-10 rounded-full border-2 ${color} flex items-center justify-center mx-auto`}>
                  <span className={`text-sm font-bold ${text}`}>{step}</span>
                </div>
                <p className="text-[14px] font-semibold">{title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences — light clean */}
      <section className="px-5 py-12 sm:py-16 border-y border-border/50">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Not just tech. Everything.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              { title: "Food & Culinary", examples: "Work at a bakery, assist a caterer, prep meals" },
              { title: "Fashion & Styling", examples: "Assist a designer, work a boutique, style shoots" },
              { title: "Creative & Arts", examples: "Assist a photographer, join a music session" },
              { title: "Tech & Digital", examples: "Pair-code, shadow a designer, manage social" },
              { title: "Learning & Coaching", examples: "Tutor students, assist a coach, run workshops" },
              { title: "Finance & Legal", examples: "Shadow a CA, assist filings, learn compliance" },
              { title: "Fitness & Wellness", examples: "Co-train at a gym, assist yoga, meal planning" },
              { title: "Lifestyle & Local", examples: "Help plan events, assist a designer, pet care" },
            ].map(({ title, examples }, i) => (
              <div key={i} className="bg-card rounded-xl p-4 sm:p-5 shadow-soft space-y-2">
                <div className="w-2 h-2 rounded-full bg-sk-emerald" />
                <p className="text-[14px] sm:text-[15px] font-semibold">{title}</p>
                <p className="text-[11px] sm:text-[13px] text-muted-foreground leading-relaxed">{examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — tricolor accents */}
      <section className="px-5 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Why 10K+ professionals use SideKaam
            </h2>
            <p className="text-[14px] sm:text-base text-muted-foreground">Built for how India actually works.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { Icon: Zap, title: "AI Matching", desc: "We connect experiencers with providers based on skills, schedule, and city." },
              { Icon: Shield, title: "Verified People", desc: "Aadhaar + LinkedIn verification. Trust scores for both sides." },
              { Icon: IndianRupee, title: "UPI Payments", desc: "Direct UPI transfers. No middleman. Transparent hourly rates." },
              { Icon: Clock, title: "Zero Commitment", desc: "Try for 1 hour. Come back if you love it. No contracts." },
              { Icon: Users, title: "Both Sides Win", desc: "Experiencers learn + earn. Providers get motivated talent." },
              { Icon: MapPin, title: "20+ Indian Cities", desc: "Delhi to Bangalore. In-person or online experiences." },
            ].map((f, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sk-emerald/8 flex items-center justify-center">
                  <f.Icon className="h-6 w-6 text-sk-emerald" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[16px] font-semibold">{f.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-5 py-12 sm:py-16 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <HourlyCalculator />
        </div>
      </section>

      {/* Pricing */}
      <section className="px-5 py-16 sm:py-20">
        <div className="max-w-lg mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Prove you&apos;re serious.</h2>
            <p className="text-[14px] text-muted-foreground">One subscription. Unlimited experiences.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "1 Month", price: "499", note: "₹17/day" },
              { name: "6 Months", price: "2,499", note: "₹417/mo" },
              { name: "12 Months", price: "4,499", note: "₹375/mo", popular: true },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-4 space-y-2 ${
                  plan.popular ? "bg-card ring-2 ring-[#138808] shadow-card" : "bg-card shadow-soft"
                }`}
              >
                {plan.popular && (
                  <span className="text-[10px] font-bold text-sk-emerald uppercase tracking-wider">
                    Most popular
                  </span>
                )}
                <p className="text-[11px] text-muted-foreground">{plan.name}</p>
                <p className="text-xl font-bold tabular-nums">₹{plan.price}</p>
                <p className="text-[10px] text-muted-foreground">{plan.note}</p>
              </div>
            ))}
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-8 py-4 text-[15px] font-bold shadow-soft active:scale-[0.98] transition-all"
          >
            Start Your Side Kaam
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer — tricolor bottom */}
      <footer className="px-5 py-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span>2026 SideKaam by Darsh Gupta — Made in India</span>
          </div>
          <div className="flex items-center gap-4">
            <span>sidekaam.in</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
