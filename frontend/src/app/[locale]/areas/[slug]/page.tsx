import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getGovernorate } from "@/lib/api";
import GovernorateDetailContent from "@/components/GovernorateDetailContent";
import {
  JsonLd,
  governorateSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schemas";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const gov = await getGovernorate(decodeURIComponent(slug));
  if (!gov) return {};

  const isAr = locale === "ar";
  const title =
    (isAr ? gov.meta_title_ar : gov.meta_title_en) ||
    (isAr ? gov.name_ar : gov.name_en);
  const description =
    (isAr ? gov.meta_description_ar : gov.meta_description_en) ||
    (isAr ? gov.excerpt_ar : gov.excerpt_en) ||
    title;
  const correctSlug = isAr ? gov.slug_ar : gov.slug_en;
  const altLocale = isAr ? "en" : "ar";
  const altSlug = isAr ? gov.slug_en : gov.slug_ar;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/areas/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/areas/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/areas/${encodeURIComponent(altSlug)}`,
        "x-default": `${SITE_URL}/ar/areas/${encodeURIComponent(isAr ? correctSlug : altSlug)}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description,
      url: `${SITE_URL}/${locale}/areas/${encodeURIComponent(correctSlug)}`,
      ...(gov.featured_image_url && {
        images: [{ url: gov.featured_image_url, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(gov.featured_image_url && {
        images: [gov.featured_image_url],
      }),
    },
  };
}

export default async function GovernorateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const gov = await getGovernorate(decodeURIComponent(slug));
  if (!gov) notFound();

  const isAr = locale === "ar";
  const correctSlug = isAr ? gov.slug_ar : gov.slug_en;
  if (decodeURIComponent(slug) !== correctSlug) {
    redirect(`/${locale}/areas/${encodeURIComponent(correctSlug)}`);
  }

  const name = isAr ? gov.name_ar : gov.name_en;
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const areasLabel = isAr ? "مناطق الخدمة" : "Service Areas";

  // Build localized FAQ list for schema
  const localizedFaqs = (gov.faqs || []).map((faq) => ({
    question: isAr ? faq.question_ar : faq.question_en,
    answer: isAr ? faq.answer_ar : faq.answer_en,
  }));

  return (
    <>
      <JsonLd data={governorateSchema(gov, locale)} />
      {localizedFaqs.length > 0 && <JsonLd data={faqSchema(localizedFaqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: areasLabel, url: `${SITE_URL}/${locale}/areas` },
          {
            name,
            url: `${SITE_URL}/${locale}/areas/${encodeURIComponent(correctSlug)}`,
          },
        ])}
      />
      <main>
        <GovernorateDetailContent governorate={gov} />
      </main>
    </>
  );
}
