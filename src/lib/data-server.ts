/**
 * Server-side data fetching — no "use client" directive.
 * Used by server components and generateMetadata.
 */

import { TZ } from "@buildwithdarsh/sdk";

// Initialize for server context
TZ.init({
  orgSlug: "sidekaam",
  orgKey: process.env["NEXT_PUBLIC_TZ_ORG_KEY"] || "",
  env: process.env["NEXT_PUBLIC_TZ_ENV"] === "production" ? "production" : "dev",
  keyPrefix: "sk",
});

export interface OpportunitySummary {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  city: string;
  workMode: string;
  hoursNeeded: number;
  hourlyBudget: number;
  scheduledDate?: string;
  isRecurring: boolean;
  status: string;
  applicants: number;
  createdAt: string;
  provider?: {
    headline?: string;
    city?: string;
    avgRating: number;
    reviewCount: number;
  };
}

export async function getOpportunityServer(id: string): Promise<OpportunitySummary | null> {
  try {
    const opp: any = await Promise.resolve(TZ.storefront.marketplace.getOpportunity(id));
    return opp || null;
  } catch {
    return null;
  }
}
