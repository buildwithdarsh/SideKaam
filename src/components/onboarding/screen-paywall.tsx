"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, Tag, Shield, Star, Loader2 } from "lucide-react";
import { TZ, getAppConfig } from "@/lib/tz";

interface Props {
  email: string;
}

interface Plan {
  id: string;
  name: string;
  amount: number;
  gst: number;
  total: number;
}

function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Razorpay) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

function formatPrice(n: number) {
  return n.toLocaleString("en-IN");
}

export function ScreenPaywall({ email }: Props) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selected, setSelected] = useState("yearly");
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"choose" | "paying">("choose");
  const [razorpayKey, setRazorpayKey] = useState("");

  // Fetch plans from DB + config (already pre-fetched at app init)
  useEffect(() => {
    (async () => {
      try {
        const [plansData, config]: any[] = await Promise.all([
          TZ.storefront.subscriptions.getPlans(),
          getAppConfig(),
        ]);
        setPlans(plansData);
        if (plansData.length) setSelected(plansData[plansData.length - 1].id);
        // Razorpay publishable key from org settings
        const key = config?.payment?.razorpay_key_id || "";
        if (key) setRazorpayKey(key);
      } catch {
        setError("Unable to load plans. Please check your connection and try again.");
      } finally {
        setLoadingPlans(false);
      }
    })();
  }, []);

  const selectedPlan = plans.find((p) => p.id === selected);

  const handlePay = async () => {
    if (!selectedPlan) return;
    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create subscription
      const sub: any = await TZ.storefront.subscriptions.create({ planId: selected });

      // Step 2: Create payment order (amount in rupees — backend converts to paise)
      const order: any = await TZ.storefront.payments.createOrder({
        productId: sub.id,
        amount: sub.total,
        currency: "INR",
        metadata: { subscriptionId: sub.id, planId: selected },
      });

      // Step 3: Razorpay checkout
      await loadRazorpay();

      const rzp = new (window as any).Razorpay({
        key: razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        currency: "INR",
        name: "SideKaam",
        description: `${selectedPlan.name} Plan`,
        order_id: order.providerOrderId,
        prefill: { email },
        theme: { color: "#10B981" },
        handler: async (response: any) => {
          setStep("paying");
          try {
            // Step 4: Verify payment
            await Promise.resolve(TZ.storefront.payments.verify({
              orderId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }));

            // Step 5: Activate subscription
            await Promise.resolve(TZ.storefront.subscriptions.activate(sub.id, {
              providerOrderId: response.razorpay_order_id,
              providerPaymentId: response.razorpay_payment_id,
            }));

            window.location.href = "/feed";
          } catch {
            // Payment succeeded but activation failed — still redirect
            window.location.href = "/feed";
          }
        },
        modal: {
          ondismiss: () => { setProcessing(false); setStep("choose"); },
        },
      });

      rzp.open();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setProcessing(false);
      setStep("choose");
    }
  };

  if (step === "paying") {
    return (
      <div className="animate-fade-scale flex flex-col items-center gap-6 px-5 py-10 text-center">
        <Loader2 className="h-10 w-10 text-sk-emerald animate-spin" />
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Activating your plan...</h2>
          <p className="text-[13px] text-muted-foreground">Just a moment.</p>
        </div>
      </div>
    );
  }

  if (loadingPlans) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <Loader2 className="h-6 w-6 text-sk-emerald animate-spin" />
        <p className="text-[13px] text-muted-foreground">Loading plans...</p>
      </div>
    );
  }

  // Sort: yearly last (most expensive = recommended)
  const sortedPlans = [...plans].sort((a, b) => a.amount - b.amount);

  return (
    <div className="animate-slide-up flex flex-col gap-5 px-5">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-sk-amber/10 flex items-center justify-center mx-auto">
          <Shield className="h-6 w-6 text-sk-amber" />
        </div>
        <h2 className="text-[22px] font-bold tracking-tight">
          Prove that you&apos;re serious.
        </h2>
        <p className="text-[13px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
          The subscription keeps our community real — only committed professionals.
        </p>
      </div>

      {/* Plans from DB */}
      <div className="space-y-2.5">
        {sortedPlans.map((plan, i) => {
          const isSelected = selected === plan.id;
          const isLast = i === sortedPlans.length - 1;
          const perMonth = plan.id === "yearly" ? Math.round(plan.amount / 12) : plan.id === "half-yearly" ? Math.round(plan.amount / 6) : plan.amount;
          const savePercent = plan.id === "yearly" ? Math.round((1 - plan.amount / (sortedPlans[0].amount * 12)) * 100) : plan.id === "half-yearly" ? Math.round((1 - plan.amount / (sortedPlans[0].amount * 6)) * 100) : 0;

          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={cn(
                "relative w-full rounded-2xl px-4 py-4 text-left transition-all duration-200 active:scale-[0.98]",
                isSelected ? "bg-card ring-2 ring-sk-emerald shadow-card" : "bg-card shadow-soft"
              )}
            >
              {isLast && (
                <div className="absolute -top-2.5 right-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sk-emerald text-white text-[10px] font-bold">
                    <Star className="h-2.5 w-2.5" /> Recommended
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  isSelected ? "border-sk-emerald" : "border-border"
                )}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-sk-emerald" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold">{plan.name}</span>
                    {savePercent > 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sk-emerald/10 text-sk-emerald">
                        Save {savePercent}%
                      </span>
                    )}
                  </div>
                  {plan.id !== "monthly" && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">₹{formatPrice(perMonth)}/mo</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-bold tabular-nums">₹{formatPrice(plan.amount)}</span>
                  <p className="text-[9px] text-muted-foreground">+₹{formatPrice(plan.gst)} GST</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* What you get */}
      <div className="space-y-2">
        {[
          "AI-matched experiences & providers weekly",
          "Verified profiles — real people, real work",
          "Unlimited messaging & booking",
          "No Recurring charges — cancel anytime",
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Check className="h-3.5 w-3.5 text-sk-emerald shrink-0" />
            <span className="text-[12px] text-muted-foreground">{text}</span>
          </div>
        ))}
      </div>

      {/* Promo */}
      {!showPromo ? (
        <button onClick={() => setShowPromo(true)} className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground">
          <Tag className="h-3 w-3" /> Have a promo code?
        </button>
      ) : (
        <div className="flex gap-2">
          <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter code" className="flex-1 rounded-xl bg-card shadow-soft px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sk-emerald" />
          <button className="rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium">Apply</button>
        </div>
      )}

      {error && <p className="text-[12px] text-destructive text-center">{error}</p>}

      {/* CTA */}
      <button
        onClick={handlePay}
        disabled={processing || !selectedPlan}
        className={cn(
          "w-full rounded-2xl py-4 text-[15px] font-bold",
          "bg-foreground text-background shadow-card",
          "active:scale-[0.98] transition-all",
          "flex items-center justify-center gap-2",
          processing && "opacity-70 cursor-not-allowed"
        )}
      >
        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : (
          <>
            Pay ₹{selectedPlan ? formatPrice(selectedPlan.total) : "—"}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Fine print */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
          <span>UPI</span><span className="text-border">|</span>
          <span>Cards</span><span className="text-border">|</span>
          <span>Net Banking</span>
        </div>
      </div>
    </div>
  );
}
