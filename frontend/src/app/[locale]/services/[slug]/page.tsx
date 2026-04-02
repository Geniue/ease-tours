import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getService } from "@/lib/api";
import ServiceDetailContent from "@/components/ServiceDetailContent";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(decodeURIComponent(slug));
  if (!service) return {};

  const isAr = locale === "ar";
  const title = isAr ? service.title_ar : service.title_en;
  const excerpt = isAr ? service.excerpt_ar : service.excerpt_en;
  const correctSlug = isAr ? service.slug_ar : service.slug_en;
  const altLocale = isAr ? "en" : "ar";
  const altSlug = isAr ? service.slug_en : service.slug_ar;

  return {
    title,
    description: excerpt || title,
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/services/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/services/${encodeURIComponent(altSlug)}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description: excerpt || title,
      url: `${SITE_URL}/${locale}/services/${encodeURIComponent(correctSlug)}`,
      ...(service.featured_image_url && {
        images: [{ url: service.featured_image_url, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt || title,
      ...(service.featured_image_url && {
        images: [service.featured_image_url],
      }),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await getService(decodeURIComponent(slug));
  if (!service) notFound();

  const isAr = locale === "ar";
  const correctSlug = isAr ? service.slug_ar : service.slug_en;
  if (decodeURIComponent(slug) !== correctSlug) {
    redirect(`/${locale}/services/${encodeURIComponent(correctSlug)}`);
  }

  const title = isAr ? service.title_ar : service.title_en;
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const servicesLabel = isAr ? "خدماتنا" : "Our Services";

  return (
    <>
      <JsonLd data={serviceSchema(service, locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: servicesLabel, url: `${SITE_URL}/${locale}/services` },
          {
            name: title,
            url: `${SITE_URL}/${locale}/services/${encodeURIComponent(correctSlug)}`,
          },
        ])}
      />
      <Navbar />
      <main>
        <ServiceDetailContent service={service} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
