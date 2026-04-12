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
    ? "اكتشف أفضل الرحلات السياحية في مصر والعالم مع إيز ترافل — جولات بمرشدين محليين، برامج سفر خاصة، حج وعمرة، ورحلات شهر عسل بأسعار تنافسية"
    : "Browse all tours with Ease Travel — guided excursions, private getaways, Hajj & Umrah packages, Nile cruises, and honeymoon trips across Egypt and beyond";
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
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: isAr ? "إيز ترافل" : "Ease Travel",
        url: SITE_URL,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "124",
          bestRating: "5",
          worstRating: "1",
        },
      }} />
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
        <ToursDestinations />
        <ToursFaq />
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
        <h2 className="text-2xl font-bold text-foreground mb-6">{t("introTitle")}</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
          {t("introText")}
        </p>
        <h3 className="text-xl font-bold text-foreground mb-4">{t("whyTitle")}</h3>
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

function ToursDestinations() {
  const t = useTranslations("tours");

  const destinations = [
    { title: t("dest1Title"), text: t("dest1Text") },
    { title: t("dest2Title"), text: t("dest2Text") },
    { title: t("dest3Title"), text: t("dest3Text") },
    { title: t("dest4Title"), text: t("dest4Text") },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">{t("destinationsTitle")}</h2>
        <p className="text-foreground/60 text-center mb-10 max-w-2xl mx-auto">{t("destinationsIntro")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((dest, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-foreground text-lg mb-2">{dest.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{dest.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToursFaq() {
  const t = useTranslations("tours");
  const locale = useLocale();
  const isAr = locale === "ar";

  const faqs = [
    { question: t("faq1q"), answer: t("faq1a") },
    { question: t("faq2q"), answer: t("faq2a") },
    { question: t("faq3q"), answer: t("faq3a") },
    { question: t("faq4q"), answer: t("faq4a") },
    { question: t("faq5q"), answer: t("faq5a") },
    { question: t("faq6q"), answer: t("faq6a") },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{t("faqTitle")}</h2>
        <dl className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <dt className="font-semibold text-foreground text-lg mb-2">{faq.question}</dt>
              <dd className="text-foreground/70 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />
    </section>
  );
}
