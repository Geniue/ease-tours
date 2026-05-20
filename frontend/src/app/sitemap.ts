import type { MetadataRoute } from "next";
import {
  getAuthors,
  getBlogsForSitemap,
  getCategories,
  getServicesForSitemap,
  getTags,
  getTripsForSitemap,
  getVisaGalleryForSitemap,
} from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, blogs, services, categories, tags, authors, visaGallery] = await Promise.all([
    getTripsForSitemap("500"),
    getBlogsForSitemap("500"),
    getServicesForSitemap("500"),
    getCategories(),
    getTags(),
    getAuthors(),
    getVisaGalleryForSitemap("500"),
  ]);

  const staticPages = ["", "/tours", "/blog", "/about", "/contact", "/hajj-umrah", "/services", "/embassy", "/visa-gallery"];
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
      lastModified: new Date(blog.updated_at),
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

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(locale === "ar" ? cat.slug_ar : cat.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  const tagEntries: MetadataRoute.Sitemap = tags.flatMap((tag) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/tag/${encodeURIComponent(locale === "ar" ? tag.slug_ar : tag.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }))
  );

  const authorEntries: MetadataRoute.Sitemap = authors.flatMap((author) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(locale === "ar" ? author.slug_ar : author.slug_en)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }))
  );

  const visaGalleryEntries: MetadataRoute.Sitemap = visaGallery.flatMap((item) =>
    locales.flatMap((locale) => {
      const slug = locale === "ar" ? item.slug_ar : item.slug_en;
      if (!slug) return [];

      return [{
        url: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(slug)}`,
        lastModified: new Date(item.updated_at || item.published_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }];
    })
  );

  return [
    ...staticEntries,
    ...tripEntries,
    ...blogEntries,
    ...serviceEntries,
    ...categoryEntries,
    ...tagEntries,
    ...authorEntries,
    ...visaGalleryEntries,
  ];
}
