import type { MetadataRoute } from "next";
import { getTrips, getBlogs, getServices, getGovernorates } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, blogs, services, governorates] = await Promise.all([getTrips(), getBlogs({ limit: "500" }), getServices(), getGovernorates()]);

  const staticPages = ["", "/tours", "/blog", "/about", "/contact", "/hajj-umrah", "/services", "/embassy", "/areas", "/booking/flights"];
  const locales = ["ar", "en"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" as const : "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  const tripEntries: MetadataRoute.Sitemap = trips.flatMap((trip) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(locale === "ar" ? trip.slug_ar : trip.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = blogs.flatMap((blog) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(locale === "ar" ? blog.slug_ar : blog.slug_en)}`,
      lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const serviceEntries: MetadataRoute.Sitemap = services.flatMap((service) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/services/${encodeURIComponent(locale === "ar" ? service.slug_ar : service.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const governorateEntries: MetadataRoute.Sitemap = governorates.flatMap((gov) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/areas/${encodeURIComponent(locale === "ar" ? gov.slug_ar : gov.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...tripEntries, ...blogEntries, ...serviceEntries, ...governorateEntries];
}
