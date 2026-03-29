import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourCard from "@/components/TourCard";
import { getTrips, getCategories } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "رحلات الحج والعمرة من مصر" : "Hajj & Umrah Trips from Egypt";
  const description = isAr
    ? "احجز رحلة حج أو عمرة مع إيز ترافل - باقات شاملة تشمل الطيران والإقامة والتأشيرة بأسعار تنافسية"
    : "Book your Hajj or Umrah trip with Ease Travel - comprehensive packages including flights, accommodation, and visa at competitive prices";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/hajj-umrah`,
      languages: { [locale]: `${SITE_URL}/${locale}/hajj-umrah`, [altLocale]: `${SITE_URL}/${altLocale}/hajj-umrah` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/hajj-umrah` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HajjUmrahPage() {
  const [trips, categories] = await Promise.all([
    getTrips(),
    getCategories(),
  ]);

  // Find the religious category
  const religiousCategory = categories.find((c) => c.type === "religious");
  const religiousTrips = religiousCategory
    ? trips.filter((trip) => trip.category_id === religiousCategory.id)
    : [];

  return (
    <>
      <Navbar />
      <main>
        <HajjHero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <HajjDescription />
            {religiousTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {religiousTrips.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <NoTripsMessage />
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function HajjHero() {
  const t = useTranslations("nav");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{t("hajjUmrah")}</h1>
      </div>
    </section>
  );
}

function HajjDescription() {
  const locale = useLocale();
  return (
    <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
      {locale === "ar"
        ? "نقدم لكم أفضل باقات الحج والعمرة بأسعار تنافسية مع ضمان أعلى مستويات الراحة والخدمة المتميزة طوال رحلتكم الروحانية."
        : "We offer the best Hajj & Umrah packages at competitive prices, ensuring the highest levels of comfort and exceptional service throughout your spiritual journey."}
    </p>
  );
}

function NoTripsMessage() {
  const t = useTranslations("tours");
  return <p className="text-center text-gray-500 py-10">{t("noTrips")}</p>;
}
