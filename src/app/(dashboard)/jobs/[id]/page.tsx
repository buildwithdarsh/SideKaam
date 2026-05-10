import type { Metadata } from "next";
import { getOpportunityServer } from "@/lib/data-server";
import { JobDetailClient } from "./job-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opp = await getOpportunityServer(id);

  if (!opp) {
    return {
      title: "Opportunity Not Found | SideKaam",
      robots: { index: false },
    };
  }

  const title = `${opp.title} — ₹${opp.hourlyBudget}/hr in ${opp.city} | SideKaam`;
  const description = opp.description
    ? opp.description.slice(0, 155)
    : `${opp.title} — ${opp.hoursNeeded} hours, ₹${opp.hourlyBudget}/hr in ${opp.city}. Part-time opportunity on SideKaam.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://sidekaam.in/jobs/${id}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `/jobs/${id}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const opp = await getOpportunityServer(id);

  const jsonLd = opp
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: opp.title,
        description: opp.description || `${opp.title} — part-time opportunity in ${opp.city}`,
        datePosted: opp.createdAt,
        employmentType: "PART_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: opp.provider?.headline || "SideKaam Provider",
          sameAs: "https://sidekaam.in",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: opp.city,
            addressCountry: "IN",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            value: opp.hourlyBudget,
            unitText: "HOUR",
          },
        },
        ...(opp.workMode === "remote" && {
          jobLocationType: "TELECOMMUTE",
        }),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <JobDetailClient id={id} />
    </>
  );
}
