"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { OnboardingData } from "./onboarding-types";

const STORAGE_KEY = "sidekaam_onboarding_v2";

const defaultData: OnboardingData = {
  user_type: "",
  // Seeker
  sidekaam_categories: [],
  sidekaam_subcategories: [],
  hourly_rate_band: "",
  sidekaam_hours_band: "",
  schedule_slots: [],
  city: "",
  sidekaam_work_mode: "",
  about_pitch: "",
  // Finder
  need_categories: [],
  need_description: "",
  budget_band: "",
  need_when: "",
  need_where: "",
  // Shared
  email: "",
  auth_provider: "",
  selected_plan: "",
};

let currentData: OnboardingData = { ...defaultData };
let currentStep = 0; // index into the screen flow
let listeners: Set<() => void> = new Set();

function emit() {
  listeners.forEach((l) => l());
}

function loadFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      currentData = { ...defaultData, ...parsed.data };
      currentStep = parsed.step || 0;
    }
  } catch { /* ignore */ }
}

function saveToStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: currentData, step: currentStep }));
  } catch { /* ignore */ }
}

if (typeof window !== "undefined") loadFromStorage();

export function setField<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
  currentData = { ...currentData, [key]: value };
  saveToStorage();
  emit();
}

export function toggleArrayField(key: keyof OnboardingData, value: string) {
  const current = currentData[key];
  if (!Array.isArray(current)) return;
  const arr = current as string[];
  const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  currentData = { ...currentData, [key]: next };
  saveToStorage();
  emit();
}

export function setStep(step: number) {
  currentStep = step;
  saveToStorage();
  emit();
}

export function getMatchCount(): number {
  const cats = currentData.user_type === "seeker"
    ? currentData.sidekaam_categories.length
    : currentData.need_categories.length;
  const subs = currentData.sidekaam_subcategories.length;
  return Math.floor(200 * Math.max(1, cats + subs * 0.5) * 1.1);
}

export function getHourlyRate(): number {
  switch (currentData.hourly_rate_band) {
    case "2000+": return 2500;
    case "1000-2000": return 1500;
    case "500-1000": return 750;
    case "300-500": return 400;
    case "lt300": return 250;
    default: return 500;
  }
}

export function getEarningsProjection() {
  const rate = getHourlyRate();
  const hours = currentData.sidekaam_hours_band;
  const weeklyHours = hours === "15+" ? 15 : hours === "8-15" ? 10 : hours === "4-8" ? 6 : 3;
  const monthly = rate * weeklyHours * 4;
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return { hourly: fmt(rate), weekly: fmt(rate * weeklyHours), monthly: fmt(monthly), yearly: fmt(monthly * 12) };
}

export function resetOnboarding() {
  currentData = { ...defaultData };
  currentStep = 0;
  saveToStorage();
  emit();
}

let cachedSnapshot = { data: currentData, step: currentStep };

function getSnapshot() {
  if (cachedSnapshot.data !== currentData || cachedSnapshot.step !== currentStep) {
    cachedSnapshot = { data: currentData, step: currentStep };
  }
  return cachedSnapshot;
}

const serverSnapshot = { data: defaultData, step: 0 };
function getServerSnapshot() { return serverSnapshot; }

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOnboarding() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setFieldCb = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => setField(key, value),
    []
  );

  const toggleArrayCb = useCallback(
    (key: keyof OnboardingData, value: string) => toggleArrayField(key, value),
    []
  );

  return {
    data: state.data,
    step: state.step,
    setField: setFieldCb,
    toggleArray: toggleArrayCb,
    setStep,
    getMatchCount,
    getHourlyRate,
    getEarningsProjection,
    resetOnboarding,
  };
}
