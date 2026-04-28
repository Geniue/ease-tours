import type { ApiTrip, ApiBlog, ApiService, ApiGovernorate, ApiAuthor, ApiTag, ApiCategory } from "@/lib/api";
import { countWords } from "@/lib/blogUtils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

// ── Organization / TravelAgency (global) ──
export function organizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: locale === "ar" ? "إيز ترافل" : "Ease Travel",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    email: "easetravel93@gmail.com",
    telephone: "+201105001389",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61587378845962",
      "https://www.instagram.com/ease16732",
      "https://www.tiktok.com/@easetravel8",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+201105001389",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
  };
}

// ── WebSite with SearchAction ──
export function websiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: locale === "ar" ? "إيز ترافل" : "Ease Travel",
    url: SITE_URL,
    inLanguage: locale === "ar" ? "ar-EG" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/tours?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ── BreadcrumbList ──
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── TouristTrip (tour detail pages) ──
export function touristTripSchema(trip: ApiTrip, locale: string) {
  const isAr = locale === "ar";
  const title = isAr ? trip.title_ar : trip.title_en;
  const description = isAr ? trip.description_ar : trip.description_en;
  const destination = isAr ? trip.destination_ar : trip.destination_en;
  const slug = isAr ? trip.slug_ar : trip.slug_en;
  const price = trip.discounted_price || trip.base_price;
  const hasDiscount = trip.discounted_price && trip.discounted_price !== trip.base_price;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: description || title,
    touristType: isAr ? trip.category.name_ar : trip.category.name_en,
    url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(slug)}`,
    ...(trip.featured_image_url && { image: trip.featured_image_url }),
    ...(trip.video_url && {
      video: {
        "@type": "VideoObject",
        name: title,
        description: description || title,
        contentUrl: trip.video_url,
        ...(trip.video_thumbnail_url
          ? { thumbnailUrl: trip.video_thumbnail_url }
          : trip.featured_image_url
            ? { thumbnailUrl: trip.featured_image_url }
            : {}),
        uploadDate: trip.start_date || new Date().toISOString().split("T")[0],
      },
    }),
    ...(trip.itinerary_ar && {
      itinerary: {
        "@type": "ItemList",
        description: isAr ? trip.itinerary_ar : trip.itinerary_en,
      },
    }),
    offers: hasDiscount
      ? {
          "@type": "AggregateOffer",
          lowPrice: parseFloat(trip.discounted_price!),
          highPrice: parseFloat(trip.base_price),
          priceCurrency: trip.currency || "EGP",
          availability: trip.is_active
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
          ...(trip.start_date && { validFrom: trip.start_date }),
        }
      : {
          "@type": "Offer",
          price: parseFloat(price),
          priceCurrency: trip.currency || "EGP",
          availability: trip.is_active
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
          ...(trip.start_date && { validFrom: trip.start_date }),
        },
    provider: {
      "@type": "TravelAgency",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/logo.png`,
      telephone: "+201105001389",
      priceRange: "$$",
    },
    ...(destination && {
      touristDestination: {
        "@type": "Place",
        name: destination,
      },
    }),
  };
}

// ── BlogPosting (blog detail pages) ──
export function blogPostingSchema(blog: ApiBlog, locale: string) {
  const isAr = locale === "ar";
  const title = isAr ? blog.title_ar : blog.title_en;
  const excerpt = isAr ? blog.excerpt_ar : blog.excerpt_en;
  const slug = isAr ? blog.slug_ar : blog.slug_en;
  const keywords = isAr ? blog.keywords_ar : blog.keywords_en;
  const body = (isAr ? blog.body_ar : blog.body_en) || "";
  const categoryName = isAr ? blog.category.name_ar : blog.category.name_en;

  const authorEntity = blog.author
    ? {
        "@type": "Person",
        name: isAr ? blog.author.name_ar : blog.author.name_en,
        url: `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(
          isAr ? blog.author.slug_ar : blog.author.slug_en
        )}`,
        ...(blog.author.photo_url && { image: blog.author.photo_url }),
        ...(blog.author.bio_ar && {
          description: isAr ? blog.author.bio_ar : blog.author.bio_en,
        }),
        ...(blog.author.expertise_ar && {
          jobTitle: isAr ? blog.author.expertise_ar : blog.author.expertise_en,
        }),
        ...((blog.author.social_twitter || blog.author.social_linkedin || blog.author.social_facebook) && {
          sameAs: [
            blog.author.social_twitter,
            blog.author.social_linkedin,
            blog.author.social_facebook,
          ].filter(Boolean),
        }),
      }
    : {
        "@type": "Organization",
        name: isAr ? "إيز ترافل" : "Ease Travel",
        url: SITE_URL,
      };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(excerpt && { description: excerpt }),
    url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`,
    ...(blog.featured_image_url && {
      image: {
        "@type": "ImageObject",
        url: blog.featured_image_url,
        description: title,
      },
    }),
    ...(blog.published_at && { datePublished: blog.published_at }),
    ...(blog.updated_at && { dateModified: blog.updated_at }),
    inLanguage: isAr ? "ar-EG" : "en",
    articleSection: categoryName,
    ...(keywords && { keywords }),
    ...(blog.tags && blog.tags.length > 0 && {
      about: blog.tags.map((tag) => ({
        "@type": "Thing",
        name: isAr ? tag.name_ar : tag.name_en,
      })),
    }),
    wordCount: countWords(body),
    author: authorEntity,
    publisher: {
      "@type": "Organization",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`,
    },
  };
}

// ── ItemList for blog listing pages ──
export function blogItemListSchema(
  blogs: ApiBlog[],
  locale: string,
  pageName: string,
  pageUrl: string
) {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageName,
    url: pageUrl,
    numberOfItems: blogs.length,
    itemListElement: blogs.map((blog, i) => {
      const title = isAr ? blog.title_ar : blog.title_en;
      const slug = isAr ? blog.slug_ar : blog.slug_en;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "BlogPosting",
          headline: title,
          url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`,
          ...(blog.featured_image_url && { image: blog.featured_image_url }),
          ...(blog.published_at && { datePublished: blog.published_at }),
        },
      };
    }),
  };
}

// ── CollectionPage (category / tag listing pages) ──
export function collectionPageSchema(args: {
  name: string;
  description: string;
  url: string;
  locale: string;
  itemCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: args.locale === "ar" ? "ar-EG" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: args.locale === "ar" ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: args.itemCount,
    },
  };
}

// ── ProfilePage (author pages) ──
export function authorProfileSchema(author: ApiAuthor, locale: string, blogs: ApiBlog[]) {
  const isAr = locale === "ar";
  const name = isAr ? author.name_ar : author.name_en;
  const slug = isAr ? author.slug_ar : author.slug_en;
  const url = `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name,
    url,
    inLanguage: isAr ? "ar-EG" : "en",
    mainEntity: {
      "@type": "Person",
      name,
      url,
      ...(author.photo_url && { image: author.photo_url }),
      ...(author.bio_ar && { description: isAr ? author.bio_ar : author.bio_en }),
      ...(author.expertise_ar && { jobTitle: isAr ? author.expertise_ar : author.expertise_en }),
      ...((author.social_twitter || author.social_linkedin || author.social_facebook) && {
        sameAs: [author.social_twitter, author.social_linkedin, author.social_facebook].filter(Boolean),
      }),
      worksFor: {
        "@type": "TravelAgency",
        name: isAr ? "إيز ترافل" : "Ease Travel",
        url: SITE_URL,
      },
    },
    hasPart: blogs.slice(0, 10).map((b) => ({
      "@type": "BlogPosting",
      headline: isAr ? b.title_ar : b.title_en,
      url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(isAr ? b.slug_ar : b.slug_en)}`,
    })),
  };
}

// Re-exportable helpers used in pages — avoid unused-import warnings
export type { ApiTag, ApiCategory };

// ── Service (service detail pages) ──
export function serviceSchema(service: ApiService, locale: string) {
  const isAr = locale === "ar";
  const title = isAr ? service.title_ar : service.title_en;
  const excerpt = isAr ? service.excerpt_ar : service.excerpt_en;
  const slug = isAr ? service.slug_ar : service.slug_en;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    ...(excerpt && { description: excerpt }),
    url: `${SITE_URL}/${locale}/services/${encodeURIComponent(slug)}`,
    ...(service.featured_image_url && { image: service.featured_image_url }),
    provider: {
      "@type": "TravelAgency",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      telephone: "+201105001389",
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
  };
}

// ── Governorate / Service Area (governorate pages) ──
export function governorateSchema(gov: ApiGovernorate, locale: string) {
  const isAr = locale === "ar";
  const name = isAr ? gov.name_ar : gov.name_en;
  const slug = isAr ? gov.slug_ar : gov.slug_en;
  const excerpt = isAr ? gov.excerpt_ar : gov.excerpt_en;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/${locale}/areas/${encodeURIComponent(slug)}`,
    name: isAr ? `إيز ترافل — ${name}` : `Ease Travel — ${name}`,
    description: excerpt || name,
    url: `${SITE_URL}/${locale}/areas/${encodeURIComponent(slug)}`,
    ...(gov.featured_image_url && { image: gov.featured_image_url }),
    telephone: "+201105001389",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: isAr ? gov.capital_ar : gov.capital_en,
      addressRegion: name,
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(gov.latitude),
      longitude: parseFloat(gov.longitude),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: name,
    },
    parentOrganization: {
      "@type": "TravelAgency",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
    },
  };
}

// ── FAQ Page schema ──
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── ItemList (tours listing page — triggers rich results) ──
export function itemListSchema(trips: ApiTrip[], locale: string) {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "جميع الرحلات السياحية — إيز ترافل" : "All Tours — Ease Travel",
    description: isAr
      ? "استكشف أفضل الرحلات السياحية في مصر والعالم مع إيز ترافل"
      : "Explore the best tours in Egypt and worldwide with Ease Travel",
    numberOfItems: trips.length,
    itemListElement: trips.map((trip, i) => {
      const title = isAr ? trip.title_ar : trip.title_en;
      const slug = isAr ? trip.slug_ar : trip.slug_en;
      const price = trip.discounted_price || trip.base_price;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristTrip",
          name: title,
          url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(slug)}`,
          ...(trip.featured_image_url && { image: trip.featured_image_url }),
          ...(trip.destination_en && {
            touristDestination: {
              "@type": "Place",
              name: isAr ? trip.destination_ar : trip.destination_en,
            },
          }),
          offers: {
            "@type": "Offer",
            price: parseFloat(price),
            priceCurrency: trip.currency || "EGP",
            availability: trip.is_active && !trip.coming_soon
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
          },
          provider: {
            "@type": "TravelAgency",
            name: isAr ? "إيز ترافل" : "Ease Travel",
            url: SITE_URL,
          },
        },
      };
    }),
  };
}

// ── Render as <script type="application/ld+json"> ──
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // Only escape </script> to prevent XSS — keep all other content as clean JSON
  const json = JSON.stringify(data).replace(/<\/script/gi, "\\u003c/script");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
