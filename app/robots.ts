import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dascareproviders.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/", // Prevent search engines from crawling the admin panel
        "/api/",   // Prevent crawling backend API routes
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
