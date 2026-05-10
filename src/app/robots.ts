import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/employer"],
        disallow: [
          "/admin/*",
          "/feed",
          "/jobs",
          "/jobs/*",
          "/matches",
          "/pitches",
          "/profile",
          "/settings",
          "/login",
          "/onboarding",
        ],
      },
    ],
    sitemap: "https://sidekaam.in/sitemap.xml",
  };
}
