import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrip, getTrips, getBlogs } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourDetailContent from "@/components/TourDetailContent";
import RelatedBlogs from "@/components/RelatedBlogs";
import { JsonLd, touristTripSchema, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.flatMap((trip) => [
    { slug: trip.slug_en },
    { slug: trip.slug_ar },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const trip = await getTrip(decodeURIComponent(slug));
  if (!trip) return {};

  const isAr = locale === "ar";
  const title = isAr ? trip.title_ar : trip.title_en;
  const description = isAr ? trip.description_ar : trip.description_en;
  const altLocale = isAr ? "en" : "ar";
  const altSlug = isAr ? trip.slug_en : trip.slug_ar;

  return {
    title,
    description: description || title,
    alternates: {
      canonical: `${SITE_URL}/${locale}/tours/${encodeURIComponent(slug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/tours/${encodeURIComponent(isAr ? trip.slug_ar : trip.slug_en)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/tours/${encodeURIComponent(altSlug)}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description: description || title,
      url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(slug)}`,
      ...(trip.featured_image_url && {
        images: [{ url: trip.featured_image_url, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || title,
      ...(trip.featured_image_url && { images: [trip.featured_image_url] }),
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const trip = await getTrip(decodedSlug);

  if (!trip) {
    notFound();
  }

  const blogs = await getBlogs({ category_id: String(trip.category_id) });
  const isAr = locale === "ar";
  const title = isAr ? trip.title_ar : trip.title_en;
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const toursLabel = isAr ? "الرحلات" : "Tours";

  return (
    <>
      <JsonLd data={touristTripSchema(trip, locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: toursLabel, url: `${SITE_URL}/${locale}/tours` },
          { name: title, url: `${SITE_URL}/${locale}/tours/${encodeURIComponent(slug)}` },
        ])}
      />
      <Navbar />
      <main>
        <TourDetailContent trip={trip} />
        <RelatedBlogs blogs={blogs} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
