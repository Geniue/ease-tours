import type { ApiTrip, ApiBlog } from "@/lib/api";

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

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(excerpt && { description: excerpt }),
    url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`,
    ...(blog.featured_image_url && { image: blog.featured_image_url }),
    ...(blog.published_at && { datePublished: blog.published_at }),
    inLanguage: isAr ? "ar-EG" : "en",
    author: {
      "@type": "Organization",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
    },
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

// ── Render as <script type="application/ld+json"> ──
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // Escape closing script tags to prevent XSS breakout
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
