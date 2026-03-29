import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourCard from "@/components/TourCard";
import { getTrips, getCategories } from "@/lib/api";
import ToursFilter from "@/components/ToursFilter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "جميع الرحلات السياحية" : "All Tours";
  const description = isAr
    ? "استكشف جميع الرحلات السياحية مع إيز ترافل - رحلات داخلية وخارجية وحج وعمرة بأفضل الأسعار"
    : "Explore all tours with Ease Travel - domestic, outbound, Hajj & Umrah trips at the best prices";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/tours`,
      languages: { [locale]: `${SITE_URL}/${locale}/tours`, [altLocale]: `${SITE_URL}/${altLocale}/tours` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/tours` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToursPage() {
  const [trips, categories] = await Promise.all([
    getTrips(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <ToursHero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ToursFilter trips={trips} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function ToursHero() {
  const t = useTranslations("tours");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
      </div>
    </section>
  );
}
