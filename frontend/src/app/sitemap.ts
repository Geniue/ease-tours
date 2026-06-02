import type { MetadataRoute } from "next";
import {
  getAuthors,
  getBlogsForSitemap,
  getCategories,
  getGovernoratesForSitemap,
  getServicesForSitemap,
  getTags,
  getTripsForSitemap,
  getVisaGalleryForSitemap,
} from "@/lib/api";

const SITE_URL = "https://ease-travel.online";

type SitemapEntry = MetadataRoute.Sitemap[number];
type SitemapEntryInput = Omit<SitemapEntry, "lastModified">;
type SitemapDateValue = string | null | undefined;

function stableDate(...candidates: SitemapDateValue[]): Date | undefined {
  for (const candidate of candidates) {
    if (!candidate?.trim()) continue;

    const date = new Date(candidate);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return undefined;
}

function entry(input: SitemapEntryInput, ...lastModifiedCandidates: SitemapDateValue[]): SitemapEntry {
  const lastModified = stableDate(...lastModifiedCandidates);
  return lastModified ? { ...input, lastModified } : input;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, blogs, services, categories, tags, authors, governorates, visaGallery] = await Promise.all([
    getTripsForSitemap("500"),
    getBlogsForSitemap("500"),
    getServicesForSitemap("500"),
    getCategories(),
    getTags(),
    getAuthors(),
    getGovernoratesForSitemap("100"),
    getVisaGalleryForSitemap("500"),
  ]);

  const staticPages = [
    "",
    "/tours",
    "/blog",
    "/about",
    "/contact",
    "/hajj-umrah",
    "/services",
    "/embassy",
    "/areas",
    "/booking/flights",
    "/visa-gallery",
    "/visa-requirements",
  ];
  const locales = ["ar", "en"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}${page}`,
      changeFrequency: page === "" ? "daily" as const : "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  const tripEntries: MetadataRoute.Sitemap = trips.flatMap((trip) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(locale === "ar" ? trip.slug_ar : trip.slug_en)}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }, trip.updated_at, trip.created_at))
  );

  const blogEntries: MetadataRoute.Sitemap = blogs.flatMap((blog) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(locale === "ar" ? blog.slug_ar : blog.slug_en)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }, blog.updated_at, blog.published_at, blog.created_at))
  );

  const serviceEntries: MetadataRoute.Sitemap = services.flatMap((service) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/services/${encodeURIComponent(locale === "ar" ? service.slug_ar : service.slug_en)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }, service.updated_at, service.created_at))
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(locale === "ar" ? cat.slug_ar : cat.slug_en)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }, cat.updated_at, cat.created_at))
  );

  const tagEntries: MetadataRoute.Sitemap = tags.flatMap((tag) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/blog/tag/${encodeURIComponent(locale === "ar" ? tag.slug_ar : tag.slug_en)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }, tag.updated_at, tag.created_at))
  );

  const authorEntries: MetadataRoute.Sitemap = authors.flatMap((author) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(locale === "ar" ? author.slug_ar : author.slug_en)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }, author.updated_at, author.created_at))
  );

  const governorateEntries: MetadataRoute.Sitemap = governorates.flatMap((governorate) =>
    locales.map((locale) => entry({
      url: `${SITE_URL}/${locale}/areas/${encodeURIComponent(locale === "ar" ? governorate.slug_ar : governorate.slug_en)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }, governorate.updated_at, governorate.created_at))
  );

  const visaGalleryEntries: MetadataRoute.Sitemap = visaGallery.flatMap((item) =>
    locales.flatMap((locale) => {
      const slug = locale === "ar" ? item.slug_ar : item.slug_en;
      if (!slug) return [];

      return [entry({
        url: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(slug)}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }, item.updated_at, item.published_at, item.created_at)];
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
    ...governorateEntries,
    ...visaGalleryEntries,
  ];
}
