"use client";

/**
 * Data layer — all calls go to the backend via SDK.
 * Returns empty states on error (no mock fallbacks).
 */

import { TZ, getAppConfig } from "./tz";

// SDK returns TZQuery (thenable), coerce to Promise
const q = <T>(query: any): Promise<T> => Promise.resolve(query);

async function tryOr<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Opportunity {
  id: string;
  providerId: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  city: string;
  workMode: string;
  hoursNeeded: number;
  hourlyBudget: number;
  scheduledDate?: string;
  scheduledTime?: string;
  isRecurring: boolean;
  status: string;
  applicants: number;
  createdAt: string;
  // Enriched by FE
  matchScore?: number;
}

export interface MarketplaceProfile {
  id: string;
  userId: string;
  userType: string;
  categories: string[];
  subcategories: string[];
  city: string;
  workMode: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  hoursBand?: string;
  scheduleSlots: string[];
  headline?: string;
  pitchText?: string;
  trustScore: number;
  avgRating: number;
  reviewCount: number;
  totalHours: number;
  totalEarned: number;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  experiencerId: string;
  providerId: string;
  experienceId: string;
  date: string;
  startTime?: string;
  durationHours: number;
  hourlyRate: number;
  totalAmount: number;
  message?: string;
  status: string;
  experience?: Opportunity;
  createdAt: string;
}

export interface AdminStats {
  totalProfiles: number;
  totalOpportunities: number;
  totalBookings: number;
  activeSubscriptions: number;
  experiencers: number;
  providers: number;
}

// ─── Config ─────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<string[]> {
  const config: any = await getAppConfig();
  return config?.sidekaam?.categories || config?.marketplace?.categories || [];
}

export async function getLaunchedCities(): Promise<string[]> {
  const config: any = await getAppConfig();
  return config?.sidekaam?.launched_cities || config?.marketplace?.launched_cities || [];
}

// ─── Matches ────────────────────────────────────────────────────────────────

export async function getMatches(): Promise<Opportunity[]> {
  return tryOr(async () => {
    const data: any = await q(TZ.storefront.marketplace.getMatches());
    return data || [];
  }, []);
}

// ─── Opportunities ──────────────────────────────────────────────────────────

export async function searchOpportunities(params?: any): Promise<{ items: Opportunity[]; total: number }> {
  return tryOr(async () => {
    const result: any = await q(TZ.storefront.marketplace.searchOpportunities(params));
    return { items: result?.items || [], total: result?.total || 0 };
  }, { items: [], total: 0 });
}

export async function getOpportunity(id: string): Promise<Opportunity | null> {
  return tryOr(async () => {
    const opp: any = await q(TZ.storefront.marketplace.getOpportunity(id));
    return opp;
  }, null);
}


// ─── Profiles ───────────────────────────────────────────────────────────────

export async function getMyProfile(): Promise<MarketplaceProfile | null> {
  return tryOr(async () => {
    const profile: any = await q(TZ.storefront.marketplace.getProfile());
    return profile;
  }, null);
}

export async function searchProfiles(params?: any): Promise<{ items: MarketplaceProfile[]; total: number }> {
  return tryOr(async () => {
    const result: any = await q(TZ.storefront.marketplace.searchProfiles(params));
    return { items: result?.items || [], total: result?.total || 0 };
  }, { items: [], total: 0 });
}

// ─── Bookings ───────────────────────────────────────────────────────────────

export async function getMyBookings(role?: "experiencer" | "provider"): Promise<Booking[]> {
  return tryOr(async () => {
    const data: any = await q(TZ.storefront.marketplace.getMyBookings(role));
    return data || [];
  }, []);
}

// ─── Reviews ────────────────────────────────────────────────────────────────

export async function getReviews(userId: string) {
  return tryOr(async () => {
    const data: any = await q(TZ.storefront.marketplace.getReviews(userId));
    return data || [];
  }, []);
}

// ─── Admin ──────────────────────────────────────────────────────────────────

export async function getAdminStats(): Promise<AdminStats> {
  return tryOr<AdminStats>(async () => {
    // Admin SDK uses staff auth — for now return from marketplace admin
    const data: any = await q((TZ as any).admin?.marketplace?.getStats());
    return data;
  }, { totalProfiles: 0, totalOpportunities: 0, totalBookings: 0, activeSubscriptions: 0, experiencers: 0, providers: 0 });
}

export async function adminListProfiles(params?: any) {
  return tryOr(async () => {
    const data: any = await q((TZ as any).admin?.marketplace?.listProfiles(params));
    return data;
  }, { items: [], total: 0 });
}

export async function adminListOpportunities(params?: any) {
  return tryOr(async () => {
    const data: any = await q((TZ as any).admin?.marketplace?.listOpportunities(params));
    return data;
  }, { items: [], total: 0 });
}

export async function adminListBookings(params?: any) {
  return tryOr(async () => {
    const data: any = await q((TZ as any).admin?.marketplace?.listBookings(params));
    return data;
  }, { items: [], total: 0 });
}
