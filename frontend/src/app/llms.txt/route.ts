import {
  getBlogs,
  getEmbassies,
  getGovernorates,
  getServices,
  getTrips,
  getVisaGallery,
  type ApiBlog,
  type ApiEmbassy,
  type ApiGovernorate,
  type ApiService,
  type ApiTrip,
  type ApiVisaGalleryItem,
} from "@/lib/api";

const SITE_URL = "https://ease-travel.online";
const MAX_SECTION_ITEMS = 50;
const REVALIDATE_SECONDS = 86400;

export const revalidate = 86400;

type LinkItem = {
  title: string;
  url: string;
  description: string;
};

function cleanText(value: string | null | undefined, maxLength = 170): string {
  const text = (value ?? "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength).replace(/\s+\S*$/, "").trim();
  return `${truncated || text.slice(0, maxLength).trim()}...`;
}

function markdownEscape(value: string): string {
  return cleanText(value, 220).replace(/[[\]\\]/g, (match) => `\\${match}`);
}

function urlFor(path: string): string {
  return `${SITE_URL}${path}`;
}

function isPublicUrl(url: string): boolean {
  if (!url.startsWith(SITE_URL)) return false;

  const { pathname } = new URL(url);
  return ![
    "/admin",
    "/api",
    "/auth",
    "/dashboard",
    "/login",
    "/register",
    "/_next",
  ].some((privatePath) => pathname === privatePath || pathname.startsWith(`${privatePath}/`));
}

async function safe<T>(loader: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await loader();
  } catch {
    return fallback;
  }
}

function preferredLocalizedUrl(basePath: string, slugAr?: string | null, slugEn?: string | null): string | null {
  if (slugAr?.trim()) {
    return urlFor(`/ar/${basePath}/${encodeURIComponent(slugAr.trim())}`);
  }

  if (slugEn?.trim()) {
    return urlFor(`/en/${basePath}/${encodeURIComponent(slugEn.trim())}`);
  }

  return null;
}

function isVisaService(service: ApiService): boolean {
  const haystack = [
    service.title_ar,
    service.title_en,
    service.excerpt_ar,
    service.excerpt_en,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /visa|schengen|embassy|فيزا|تأشير|تاشير|سفارة|سفارات/.test(haystack);
}

function addSectionLinks(target: LinkItem[], items: LinkItem[], usedUrls: Set<string>): void {
  for (const item of items) {
    if (target.length >= MAX_SECTION_ITEMS) return;
    if (!isPublicUrl(item.url) || usedUrls.has(item.url)) continue;

    usedUrls.add(item.url);
    target.push(item);
  }
}

function renderSection(title: string, items: LinkItem[]): string {
  const lines = [`## ${title}`];

  if (items.length === 0) {
    lines.push("- No public entries are available right now.");
  } else {
    items.forEach((item) => {
      lines.push(
        `- [${markdownEscape(item.title)}](${item.url}): ${markdownEscape(item.description)}`
      );
    });
  }

  return lines.join("\n");
}

function serviceLink(service: ApiService): LinkItem | null {
  const url = preferredLocalizedUrl("services", service.slug_ar, service.slug_en);
  if (!url) return null;

  const title = service.title_ar || service.title_en;
  if (!title) return null;

  return {
    title,
    url,
    description:
      cleanText(service.excerpt_ar || service.excerpt_en) ||
      "Public Ease Travel service page for Egyptian travelers.",
  };
}

function tripLink(trip: ApiTrip): LinkItem | null {
  const url = preferredLocalizedUrl("tours", trip.slug_ar, trip.slug_en);
  if (!url) return null;

  const title = trip.title_ar || trip.title_en;
  if (!title) return null;

  return {
    title,
    url,
    description:
      cleanText(trip.description_ar || trip.description_en) ||
      `Travel offer for ${trip.destination_ar || trip.destination_en}.`,
  };
}

function blogLink(blog: ApiBlog): LinkItem | null {
  const url = preferredLocalizedUrl("blog", blog.slug_ar, blog.slug_en);
  if (!url) return null;

  const title = blog.title_ar || blog.title_en;
  if (!title) return null;

  return {
    title,
    url,
    description:
      cleanText(blog.excerpt_ar || blog.excerpt_en || blog.seo_description_ar || blog.seo_description_en) ||
      "Travel, visa, or destination guide from the Ease Travel blog.",
  };
}

function governorateLink(governorate: ApiGovernorate): LinkItem | null {
  const url = preferredLocalizedUrl("areas", governorate.slug_ar, governorate.slug_en);
  if (!url) return null;

  const name = governorate.name_ar || governorate.name_en;
  if (!name) return null;

  return {
    title: `خدمات إيز ترافل في ${name}`,
    url,
    description:
      cleanText(governorate.excerpt_ar || governorate.meta_description_ar || governorate.excerpt_en || governorate.meta_description_en) ||
      `Governorate travel and visa service page for ${name}.`,
  };
}

function visaGalleryLink(item: ApiVisaGalleryItem): LinkItem | null {
  const url = preferredLocalizedUrl("visa-gallery", item.slug_ar, item.slug_en);
  if (!url) return null;

  const country = item.country_ar || item.country_en || "Visa case";
  const visaType = item.visa_type_ar || item.visa_type_en || "visa";
  const city = item.city_ar || item.city_en || "Egypt";

  return {
    title: item.title_ar || item.title_en || `${country} ${visaType}`,
    url,
    description:
      cleanText(item.summary_ar || item.summary_en || item.alt_ar || item.alt_en) ||
      `Public-safe redacted ${visaType} example for a client from ${city}.`,
  };
}

function embassySummary(embassies: ApiEmbassy[], locale: "ar" | "en"): LinkItem {
  const openCount = embassies.filter((embassy) => embassy.appointment_status === "open").length;
  const sampleNames = embassies
    .slice(0, 6)
    .map((embassy) => (locale === "ar" ? embassy.country_name_ar : embassy.country_name_en))
    .filter(Boolean)
    .join(", ");

  return {
    title: locale === "ar" ? "مواعيد السفارات" : "Embassy Appointments",
    url: urlFor(`/${locale}/embassy`),
    description:
      locale === "ar"
        ? `صفحة عامة لمتابعة ${embassies.length} سفارة، منها ${openCount} مفتوحة للحجز حاليا. أمثلة: ${sampleNames}.`
        : `Public embassy appointment tracker for ${embassies.length} embassies, with ${openCount} currently open for booking. Examples: ${sampleNames}.`,
  };
}

export async function GET() {
  const [trips, blogs, services, governorates, embassies, visaGallery] = await Promise.all([
    safe(() => getTrips({ per_page: "50", fields: "card" }, REVALIDATE_SECONDS), [] as ApiTrip[]),
    safe(() => getBlogs({ limit: "50", fields: "card" }, REVALIDATE_SECONDS), [] as ApiBlog[]),
    safe(() => getServices({ limit: "50", fields: "card" }, REVALIDATE_SECONDS), [] as ApiService[]),
    safe(() => getGovernorates({ limit: "50" }, REVALIDATE_SECONDS), [] as ApiGovernorate[]),
    safe(() => getEmbassies(REVALIDATE_SECONDS), [] as ApiEmbassy[]),
    safe(() => getVisaGallery({ per_page: "50", fields: "card" }, REVALIDATE_SECONDS).then((response) => response.data), [] as ApiVisaGalleryItem[]),
  ]);

  const usedUrls = new Set<string>();

  const mainPages: LinkItem[] = [
    {
      title: "Home",
      url: urlFor("/en"),
      description: "English homepage for Ease Travel tours, visa services, blog guides, and travel support.",
    },
    {
      title: "Arabic Home",
      url: urlFor("/ar"),
      description: "Arabic homepage for Egyptian travelers planning tours, visas, Umrah, embassy appointments, and travel services.",
    },
    {
      title: "Visa Requirements",
      url: urlFor("/ar/visa-requirements"),
      description: "Guidance for tourist visa requirements, documents, embassy steps, and file preparation from Egypt.",
    },
    {
      title: "Visa Gallery",
      url: urlFor("/ar/visa-gallery"),
      description: "Public-safe redacted examples of real visa cases handled through Ease Travel.",
    },
    {
      title: "Services",
      url: urlFor("/ar/services"),
      description: "Overview of Ease Travel services including visas, flights, hotels, tours, and travel consultation.",
    },
    {
      title: "Blog",
      url: urlFor("/ar/blog"),
      description: "Travel and visa guides written for Egyptian travelers in Arabic and English.",
    },
  ];
  mainPages.forEach((item) => usedUrls.add(item.url));

  const visaServices: LinkItem[] = [];
  addSectionLinks(
    visaServices,
    services.filter(isVisaService).map(serviceLink).filter((item): item is LinkItem => Boolean(item)),
    usedUrls
  );
  if (!usedUrls.has(urlFor("/ar/visa-requirements"))) {
    addSectionLinks(
      visaServices,
      [{
        title: "خدمات التأشيرات السياحية في مصر",
        url: urlFor("/ar/visa-requirements"),
        description: "Visa requirements, document review, and file preparation guidance for travelers from Egypt.",
      }],
      usedUrls
    );
  }

  const visaGalleryLinks: LinkItem[] = [];
  addSectionLinks(
    visaGalleryLinks,
    visaGallery.map(visaGalleryLink).filter((item): item is LinkItem => Boolean(item)),
    usedUrls
  );

  const blogGuides: LinkItem[] = [];
  addSectionLinks(
    blogGuides,
    blogs.map(blogLink).filter((item): item is LinkItem => Boolean(item)),
    usedUrls
  );

  const governoratePages: LinkItem[] = [];
  addSectionLinks(
    governoratePages,
    governorates.map(governorateLink).filter((item): item is LinkItem => Boolean(item)),
    usedUrls
  );

  const embassyPages: LinkItem[] = [];
  if (embassies.length > 0) {
    addSectionLinks(embassyPages, [embassySummary(embassies, "ar"), embassySummary(embassies, "en")], usedUrls);
  }

  const travelServices: LinkItem[] = [];
  addSectionLinks(
    travelServices,
    [
      ...trips.map(tripLink),
      ...services.filter((service) => !isVisaService(service)).map(serviceLink),
    ].filter((item): item is LinkItem => Boolean(item)),
    usedUrls
  );

  const body = [
    "# Ease Travel",
    "> Ease Travel is a bilingual travel and visa services platform helping Egyptian travelers understand visa requirements, embassies, travel services, governorate travel pages, blog guides, and real visa examples.",
    "",
    renderSection("Main Pages", mainPages),
    "",
    renderSection("Visa Services", visaServices),
    "",
    renderSection("Visa Gallery", visaGalleryLinks),
    "",
    renderSection("Blog Guides", blogGuides),
    "",
    renderSection("Governorate Pages", governoratePages),
    "",
    renderSection("Embassy Pages", embassyPages),
    "",
    renderSection("Travel Services", travelServices),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
