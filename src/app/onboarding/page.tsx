"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/lib/onboarding-store";
import { getScreenFlow } from "@/lib/onboarding-screens";
import { getMyProfile } from "@/lib/data";
import type { OnboardingData } from "@/lib/onboarding-types";
import { ScreenPathSelector } from "@/components/onboarding/screen-path-selector";
import { ScreenSingleSelect } from "@/components/onboarding/screen-single-select";
import { ScreenMultiSelect } from "@/components/onboarding/screen-multi-select";
import { ScreenSubcategoryChips } from "@/components/onboarding/screen-subcategory-chips";
import { ScreenCitySearch } from "@/components/onboarding/screen-city-search";
import { ScreenLoading } from "@/components/onboarding/screen-loading";
import { ScreenReveal } from "@/components/onboarding/screen-reveal";
import { ScreenEmailCapture } from "@/components/onboarding/screen-email-capture";
import { Logo, LogoMark } from "@/components/logo";
import { ScreenPaywall } from "@/components/onboarding/screen-paywall";
import { ScreenMotivation } from "@/components/onboarding/screen-motivation";
import { SidebarIllustration } from "@/components/onboarding/sidebar-illustration";
import { ChevronLeft, Loader2 } from "lucide-react";
import { TZ } from "@/lib/tz";

export default function OnboardingPage() {
  const { data, step, setField, toggleArray, setStep, getMatchCount } = useOnboarding();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get("edit") === "true";
  const [editReady, setEditReady] = useState(!isEditMode);
  const didInit = useRef(false);

  // In edit mode: pre-populate store from existing profile and start at step 1
  useEffect(() => {
    if (!isEditMode || didInit.current) return;
    didInit.current = true;
    getMyProfile().then((profile) => {
      if (profile) {
        const userType = profile.userType === "provider" ? "finder" : "seeker";
        setField("user_type", userType as any);
        if (userType === "seeker") {
          setField("sidekaam_categories", profile.categories as any);
          setField("sidekaam_subcategories", profile.subcategories as any);
          setField("sidekaam_work_mode", profile.workMode as any);
          setField("sidekaam_hours_band", profile.hoursBand as any);
        } else {
          setField("need_categories", profile.categories as any);
          setField("need_where", profile.city as any);
        }
        setField("city", profile.city as any);
      }
      setStep(0);
      setEditReady(true);
    });
  }, [isEditMode]);

  const fullFlow = useMemo(() => getScreenFlow(data.user_type), [data.user_type]);

  // In edit mode, exclude email-capture, paywall, loading, and reveal screens
  const flow = useMemo(() => {
    if (!isEditMode) return fullFlow;
    return fullFlow.filter(
      (s) => !["email-capture", "paywall", "loading", "reveal", "path-selector"].includes(s.type)
    );
  }, [fullFlow, isEditMode]);

  const currentScreen = flow[step] || flow[0];
  const totalScreens = flow.length;
  const progress = totalScreens > 1 ? ((step) / (totalScreens - 1)) * 100 : 0;

  // In edit mode, save profile and redirect after last step
  const saveAndFinish = useCallback(async () => {
    const onboardingData = {
      userType: data.user_type === "seeker" ? "experiencer" : "provider",
      categories: data.user_type === "seeker" ? data.sidekaam_categories : data.need_categories,
      subcategories: data.sidekaam_subcategories,
      hourlyRateBand: data.hourly_rate_band,
      hoursBand: data.sidekaam_hours_band,
      scheduleSlots: data.schedule_slots,
      city: data.city || data.need_where,
      workMode: data.sidekaam_work_mode,
      budgetBand: data.budget_band,
      needWhen: data.need_when,
    };
    try {
      await Promise.resolve(TZ.storefront.marketplace.saveOnboarding(onboardingData as any));
    } catch { /* non-blocking */ }
    router.push("/profile");
  }, [data, router]);

  const goNext = useCallback(() => {
    if (step < totalScreens - 1) {
      setStep(step + 1);
    } else if (isEditMode) {
      saveAndFinish();
    }
  }, [step, totalScreens, isEditMode, saveAndFinish]);

  const goBack = useCallback(() => {
    if (step > 0) setStep(step - 1);
    else if (isEditMode) router.push("/profile");
  }, [step, isEditMode, router]);

  const handleSingleSelect = useCallback(
    (value: string) => {
      if (currentScreen.dataKey) setField(currentScreen.dataKey, value as never);
      setTimeout(goNext, 400);
    },
    [currentScreen, setField, goNext]
  );

  const handleMultiToggle = useCallback(
    (value: string) => {
      if (currentScreen.dataKey) toggleArray(currentScreen.dataKey, value);
    },
    [currentScreen, toggleArray]
  );

  const showContinue = useMemo(() => {
    const type = currentScreen.type;
    if (type === "reveal" || type === "motivation") return true;
    if (type === "question-multi" || type === "question-chips") {
      const val = data[currentScreen.dataKey as keyof OnboardingData];
      return Array.isArray(val) && val.length > 0;
    }
    return false;
  }, [currentScreen, data]);

  // Determine sidebar phase label
  const sidebarPhase = !data.user_type ? "A" : data.user_type === "seeker"
    ? (step <= 3 ? "B" : step <= 6 ? "C" : "E")
    : (step <= 3 ? "B" : "E");

  const renderScreen = () => {
    switch (currentScreen.type) {
      case "path-selector":
        return (
          <ScreenPathSelector
            onSelect={(path) => {
              setField("user_type", path);
              setTimeout(() => setStep(1), 300);
            }}
          />
        );
      case "question-single":
        return (
          <ScreenSingleSelect
            screen={currentScreen}
            value={(data[currentScreen.dataKey as keyof OnboardingData] as string) || ""}
            onSelect={handleSingleSelect}
          />
        );
      case "question-multi":
        return (
          <ScreenMultiSelect
            screen={currentScreen}
            values={(data[currentScreen.dataKey as keyof OnboardingData] as string[]) || []}
            onToggle={handleMultiToggle}
          />
        );
      case "question-chips":
        return (
          <ScreenSubcategoryChips
            categories={data.user_type === "seeker" ? data.sidekaam_categories : data.need_categories}
            values={data.sidekaam_subcategories}
            onToggle={(v) => toggleArray("sidekaam_subcategories", v)}
          />
        );
      case "motivation":
        return currentScreen.motivationProps ? (
          <ScreenMotivation {...currentScreen.motivationProps} />
        ) : null;
      case "question-search":
        return (
          <ScreenCitySearch
            value={(data[currentScreen.dataKey as keyof OnboardingData] as string) || ""}
            onSelect={(city) => {
              if (currentScreen.dataKey) setField(currentScreen.dataKey, city as never);
              setTimeout(goNext, 400);
            }}
          />
        );
      case "loading":
        return <ScreenLoading onComplete={goNext} />;
      case "reveal":
        return <ScreenReveal matchCount={getMatchCount()} />;
      case "email-capture":
        return (
          <ScreenEmailCapture
            value={data.email}
            onboardingData={{
              userType: data.user_type === "seeker" ? "experiencer" : "provider",
              categories: data.user_type === "seeker" ? data.sidekaam_categories : data.need_categories,
              subcategories: data.sidekaam_subcategories,
              hourlyRateBand: data.hourly_rate_band,
              hoursBand: data.sidekaam_hours_band,
              scheduleSlots: data.schedule_slots,
              city: data.city || data.need_where,
              workMode: data.sidekaam_work_mode,
              budgetBand: data.budget_band,
              needWhen: data.need_when,
            }}
            onSubmit={(email) => { setField("email", email); goNext(); }}
          />
        );
      case "paywall":
        return <ScreenPaywall email={data.email} />;
      default:
        return null;
    }
  };

  if (!editReady) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sk-emerald animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[440px] xl:w-[500px] shrink-0 flex-col bg-foreground text-background sticky top-0 h-dvh overflow-hidden">
        <div className="flex flex-col h-full p-8 xl:p-10">
          <Logo size="md" className="[&_span]:text-background" />

          <div className="flex-1 flex items-center justify-center py-8">
            <SidebarIllustration phase={sidebarPhase} step={step} />
          </div>

          <div className="rounded-xl bg-sk-amber/10 border border-sk-amber/20 p-3 mb-4">
            <p className="text-[11px] text-sk-amber leading-relaxed">
              SideKaam is for actively working professionals. False information may lead to account suspension.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-background/30">sidekaam.in</p>
            <p className="text-[11px] text-background/30">by Darsh Gupta</p>
          </div>
        </div>
      </aside>

      {/* Main form */}
      <div className="flex-1 flex flex-col min-h-dvh">
        {/* Header */}
        {/* Header — hidden on mobile for path selector */}
        {(step > 0 || isEditMode) && (
          <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg">
            <div className="flex items-center justify-between px-4 lg:px-8 py-3 max-w-2xl mx-auto w-full">
              <button onClick={goBack} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors active:scale-95">
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <div className="lg:hidden"><Logo size="sm" /></div>
              <span className="hidden lg:block text-xs text-muted-foreground font-medium">
                {isEditMode ? `Edit ${step + 1} of ${totalScreens}` : `Step ${step} of ${totalScreens - 1}`}
              </span>
              <div className="w-9" />
            </div>
            {/* Progress bar */}
            <div className="px-5 pb-2 max-w-2xl mx-auto w-full">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-sk-emerald rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </header>
        )}

        {/* Content */}
        <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="flex-1 flex flex-col justify-center py-4 lg:py-8">
            <div key={`${data.user_type}-${step}`} className="lg:px-4">
              {renderScreen()}
            </div>
          </div>
        </main>

        {/* Continue button */}
        {showContinue && (
          <footer className="sticky bottom-0 bg-background/90 backdrop-blur-lg p-4 pb-6 lg:pb-4">
            <div className="max-w-2xl mx-auto w-full lg:px-4">
              <button
                onClick={goNext}
                className={cn(
                  "w-full lg:w-auto lg:min-w-[200px] lg:float-right rounded-2xl py-4 lg:py-3 px-8 text-[15px] font-semibold",
                  "bg-foreground text-background shadow-soft hover:shadow-card active:scale-[0.98] transition-all"
                )}
              >
                {isEditMode && step === totalScreens - 1 ? "Save Changes" : "Continue"}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
