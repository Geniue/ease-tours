import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import TourCard from "@/components/TourCard";
import { getTrips, getCategories } from "@/lib/api";
import ToursFilter from "@/components/ToursFilter";
import Breadcrumbs from "@/components/Breadcrumbs";
import VideoSlider from "@/components/VideoSlider";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schemas";
import { Link } from "@/i18n/navigation";
import { Play, MapPin, ArrowRight } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "جميع الرحلات السياحية" : "All Tours";
  const description = isAr
    ? "استكشف جميع الرحلات السياحية مع إيز ترافل — جولات بمرشدين، رحلات خاصة، رحلات داخلية وخارجية وحج وعمرة بأفضل الأسعار"
    : "Explore all tours with Ease Travel — guided tours, private tours, domestic & outbound trips, Hajj & Umrah packages at the best prices";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/tours`,
      languages: { [locale]: `${SITE_URL}/${locale}/tours`, [altLocale]: `${SITE_URL}/${altLocale}/tours`, "x-default": `${SITE_URL}/ar/tours` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/tours` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToursPage() {
  const [trips, categories, locale] = await Promise.all([
    getTrips(),
    getCategories(),
    getLocale(),
  ]);
  const isAr = locale === "ar";

  const videos = [
    {
      id: "x07XVtPgaIU",
      titleAr: "استكشف الشعاب المرجانية في دهب 🐠",
      titleEn: "Explore Dahab's Coral Reefs 🐠",
      descAr: "عالم تحت الماء مذهل — شعاب مرجانية وأسماك ملونة في البحر الأحمر",
      descEn: "Stunning underwater world — vibrant coral reefs & tropical fish in the Red Sea",
      thumbnail: "https://i.ytimg.com/vi/x07XVtPgaIU/hq720.jpg",
      duration: "PT0M33S",
      uploadDate: "2026-04-11T00:00:00+02:00",
    },
    {
      id: "fO2g4AAE-SY",
      titleAr: "جنة دهب تحت الماء 🌊",
      titleEn: "Dahab's Underwater Paradise 🌊",
      descAr: "غوص في أجمل شعاب البحر الأحمر — مياه كريستالية وحياة بحرية خلابة",
      descEn: "Dive into the Red Sea's most beautiful reefs — crystal-clear water & mesmerizing marine life",
      thumbnail: "https://i.ytimg.com/vi/fO2g4AAE-SY/hq720.jpg",
      duration: "PT0M22S",
      uploadDate: "2026-04-11T00:00:00+02:00",
    },
    {
      id: "frYG2X4lZ20",
      titleAr: "كافيه فرش دهب بالليل 🔥",
      titleEn: "Farsh Café Dahab at Night 🔥",
      descAr: "أجمل كافيه في مصر — محفور في الجبل بمئات الفوانيس والأجواء الساحرة",
      descEn: "Egypt's most magical café — carved into a mountain with hundreds of lanterns",
      thumbnail: "https://i.ytimg.com/vi/frYG2X4lZ20/hq720.jpg",
      duration: "PT0M22S",
      uploadDate: "2026-04-11T00:00:00+02:00",
    },
    {
      id: "T_AL4tMbAHc",
      titleAr: "إطلالة دهب على البحر الأحمر ☀️",
      titleEn: "Dahab Red Sea Views That Heal Your Soul ☀️",
      descAr: "كافيهات دهب على البحر — مياه فيروزية ونسمة هوا وراحة بال",
      descEn: "Dahab's seaside cafés — turquoise water, sea breeze, and pure peace",
      thumbnail: "https://i.ytimg.com/vi/T_AL4tMbAHc/hq720.jpg",
      duration: "PT0M11S",
      uploadDate: "2026-04-11T00:00:00+02:00",
    },
  ];

  const videoSchemas = videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: isAr ? v.titleAr : v.titleEn,
    description: isAr ? v.descAr : v.descEn,
    thumbnailUrl: v.thumbnail,
    uploadDate: v.uploadDate,
    duration: v.duration,
    contentUrl: `https://www.youtube.com/shorts/${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: {
      "@type": "Organization",
      name: "Ease Travel",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", url: `${SITE_URL}/ar` },
        { name: "\u0627\u0644\u0631\u062d\u0644\u0627\u062a", url: `${SITE_URL}/ar/tours` },
      ])} />
      <JsonLd data={itemListSchema(trips, locale)} />
      {videoSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <main>
        <ToursHero />
        <ToursIntro />
        <ToursVideoGallery videos={videos} />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ToursFilter trips={trips} categories={categories} />
          </div>
        </section>
      </main>
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
      <div className="absolute top-0 inset-x-0 z-10 pt-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: t("title") }]} variant="dark" />
        </div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-lg md:text-xl text-white/90">{t("subtitle")}</p>
      </div>
    </section>
  );
}

function ToursIntro() {
  const t = useTranslations("tours");
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
          {t("introText")}
        </p>
        <h2 className="text-2xl font-bold text-foreground mb-4">{t("whyTitle")}</h2>
        <ul className="inline-grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-start mb-6">
          <li className="flex items-start gap-2 text-foreground/80">
            <span className="text-primary mt-1 shrink-0">✓</span> {t("whyItem1")}
          </li>
          <li className="flex items-start gap-2 text-foreground/80">
            <span className="text-primary mt-1 shrink-0">✓</span> {t("whyItem2")}
          </li>
          <li className="flex items-start gap-2 text-foreground/80">
            <span className="text-primary mt-1 shrink-0">✓</span> {t("whyItem3")}
          </li>
          <li className="flex items-start gap-2 text-foreground/80">
            <span className="text-primary mt-1 shrink-0">✓</span> {t("whyItem4")}
          </li>
        </ul>
        <p className="text-foreground/60 text-sm">{t("browseCta")}</p>
      </div>
    </section>
  );
}

interface VideoItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
}

function ToursVideoGallery({ videos }: { videos: VideoItem[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a1628]" aria-label={isAr ? "فيديوهات رحلات دهب" : "Dahab Tour Videos"}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 start-10 w-72 h-72 bg-[#1a73a7] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 end-10 w-96 h-96 bg-[#1a73a7] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a73a7] rounded-full blur-[200px] opacity-50" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#5bb8f5] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/5">
            <Play size={14} fill="currentColor" />
            {isAr ? "شاهد قبل ما تحجز" : "Watch Before You Book"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {isAr ? "اكتشف دهب من خلال عدستنا" : "Discover Dahab Through Our Lens"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {isAr
              ? "شعاب مرجانية ساحرة، أجواء ليلية خرافية، إطلالات بحرية مذهلة — اسحب وشاهد بنفسك"
              : "Mesmerizing coral reefs, magical nightlife, stunning sea views — swipe and see for yourself"}
          </p>
        </div>

        {/* Slider */}
        <VideoSlider videos={videos} />

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/tours/enchanting-dahab-trips"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1a73a7] to-[#2196f3] hover:from-[#155d8a] hover:to-[#1a73a7] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#1a73a7]/30 hover:shadow-xl hover:shadow-[#1a73a7]/40 hover:scale-105"
          >
            <MapPin size={18} />
            {isAr ? "احجز رحلة دهب الآن" : "Book Your Dahab Trip Now"}
            <ArrowRight size={18} className={isAr ? "rotate-180" : ""} />
          </Link>
        </div>
      </div>
    </section>
  );
}
