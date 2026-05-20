import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  FileSearch,
  Images,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import BlogCard from "@/components/BlogCard";
import ServiceCard from "@/components/ServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
// import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import {
  getBlogs,
  getImageUrl,
  getServices,
  getTrips,
  getVisaGallery,
  type ApiVisaGalleryItem,
} from "@/lib/api";
import { Link } from "@/i18n/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const altLocale = locale === "ar" ? "en" : "ar";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}`,
        [altLocale]: `${SITE_URL}/${altLocale}`,
        "x-default": `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: locale === "ar" ? "إيز ترافل" : "Ease Travel",
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const emptyVisaGallery = {
    data: [] as ApiVisaGalleryItem[],
    meta: { current_page: 1, last_page: 1, per_page: 3, total: 0 },
  };
  const [trips, blogs, services, visaGallery] = await Promise.all([
    getTrips({ featured: "1" }),
    getBlogs({ featured: "1", limit: "3" }),
    getServices({ featured: "1", limit: "6" }),
    getVisaGallery({ per_page: "3", fields: "card" }).catch(
      () => emptyVisaGallery
    ),
  ]);
  const visaGalleryItems = visaGallery.data.slice(0, 3);

  return (
    <>
      <main>
        <Hero />
        <VisaHomeSection locale={locale} />
        <VisaProofPreview locale={locale} items={visaGalleryItems} />

        {/* Featured Tours */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              <ToursHeading />
            </h2>
            {trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trips.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm leading-7 text-gray-600">
                  {locale === "ar"
                    ? "سيتم عرض الرحلات المميزة هنا عند توفرها. يمكنك تصفح كل الرحلات المتاحة من الصفحة المخصصة."
                    : "Featured tours will appear here when available. You can browse all available trips from the dedicated tours page."}
                </p>
                <Link
                  href="/tours"
                  className="mt-4 inline-flex rounded-full bg-[#1a73a7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#155d87]"
                >
                  {locale === "ar" ? "تصفح الرحلات" : "Browse tours"}
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Featured Services */}
        {services.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                <ServicesHeading />
              </h2>
              <p className="text-center text-gray-500 mb-14">
                <ServicesSubheading />
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/services"
                  className="inline-block bg-[#1a73a7] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#155d87] transition-colors"
                >
                  <ViewAllServicesText />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Blog Posts */}
        {blogs.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                <BlogHeading />
              </h2>
              <p className="text-center text-gray-500 mb-14">
                <BlogSubheading />
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/blog"
                  className="inline-block bg-[#1a73a7] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#155d87] transition-colors"
                >
                  <ViewAllText />
                </Link>
              </div>
            </div>
          </section>
        )}

        <WhyChooseUs />

        {/* <GoogleReviewsSection /> */}
      </main>
    </>
  );
}

function VisaHomeSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const cards = [
    {
      href: "/visa-requirements",
      title: isAr ? "متطلبات التأشيرات" : "Visa Requirements",
      text: isAr
        ? "اعرف متطلبات الفيزا قبل التقديم"
        : "Check visa requirements before applying",
      Icon: FileSearch,
      className: "bg-primary/10 text-primary",
    },
    {
      href: "/visa-gallery",
      title: isAr ? "معرض التأشيرات المنفذة" : "Processed Visas Gallery",
      text: isAr
        ? "شاهد نماذج من التأشيرات المنفذة مع إخفاء بيانات العملاء"
        : "View redacted examples of handled visa cases",
      Icon: Images,
      className: "bg-amber-100 text-amber-700",
    },
    {
      href: "/areas",
      title: isAr ? "مناطق الخدمة" : "Service Areas",
      text: isAr
        ? "نخدم العملاء من مختلف محافظات مصر"
        : "We serve clients across Egypt's governorates",
      Icon: MapPinned,
      className: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary">
              Ease Travel Visa Services
            </p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">
              {isAr ? "خدمات التأشيرات من مصر" : "Visa Services from Egypt"}
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600 md:text-base">
              {isAr
                ? "مع Ease Travel نساعدك في معرفة متطلبات التأشيرة، تجهيز ملف السفر، مراجعة الأوراق، وحجز مواعيد السفارات لعملاء من القاهرة، الجيزة، بنها، الإسكندرية، أسوان، المنصورة وباقي محافظات مصر."
                : "Ease Travel helps travelers from Cairo, Giza, Banha, Alexandria, Aswan, Mansoura and across Egypt prepare visa files, review documents, and understand embassy requirements."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
              >
                <span
                  className={`mb-4 inline-flex size-11 items-center justify-center rounded-2xl ${card.className}`}
                >
                  <card.Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-base font-black text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">
                  {card.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-primary">
                  {card.title}
                  <ArrowIcon
                    size={16}
                    aria-hidden="true"
                    className={`transition ${
                      isAr
                        ? "group-hover:-translate-x-0.5"
                        : "group-hover:translate-x-0.5"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisaProofPreview({
  locale,
  items,
}: {
  locale: string;
  items: ApiVisaGalleryItem[];
}) {
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-black text-primary shadow-sm">
              <ShieldCheck size={15} aria-hidden="true" />
              {isAr ? "خصوصية العملاء أولاً" : "Privacy-first proof"}
            </p>
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              {isAr
                ? "نماذج تأشيرات تم العمل عليها"
                : "Visa Cases Handled by Ease Travel"}
            </h2>
          </div>
          <Link
            href="/visa-gallery"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-dark"
          >
            {isAr ? "مشاهدة معرض التأشيرات" : "View Visa Gallery"}
            <ArrowIcon size={17} aria-hidden="true" />
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item) => {
              const slug = isAr
                ? item.slug_ar || item.slug_en
                : item.slug_en || item.slug_ar;
              const href = slug
                ? `/visa-gallery/${encodeURIComponent(slug)}`
                : "/visa-gallery";
              const imageSrc =
                item.image_url || getImageUrl(item.image_path) || "/hero-travel.jpg";
              const country = isAr
                ? item.country_ar
                : item.country_en || item.country_ar;
              const visaType = isAr
                ? item.visa_type_ar
                : item.visa_type_en || item.visa_type_ar;
              const city = isAr ? item.city_ar : item.city_en || item.city_ar;
              const alt = isAr
                ? item.alt_ar || `صورة تأشيرة منقحة لطلب ${country}`
                : item.alt_en || `Redacted visa image for ${country}`;

              return (
                <Link
                  key={item.id}
                  href={href}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-primary shadow-sm">
                      {isAr ? "صورة منقحة" : "Redacted image"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-black text-slate-950">
                      {country}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {visaType}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {isAr
                        ? `تم العمل على الطلب لعميل من ${city}`
                        : `Case handled for a client from ${city}`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary/25 bg-white p-6 text-center shadow-sm">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              {isAr
                ? "سيتم عرض نماذج التأشيرات المنفذة بعد رفع الصور المنقحة من لوحة التحكم مع إخفاء بيانات العملاء بالكامل."
                : "Redacted visa examples will appear here after approved public-safe images are uploaded from the admin panel."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ToursHeading() {
  const t = useTranslations();
  return <>{t("nav.tours")}</>;
}

function ServicesHeading() {
  const t = useTranslations("services");
  return <>{t("title")}</>;
}

function ServicesSubheading() {
  const t = useTranslations("services");
  return <>{t("subtitle")}</>;
}

function ViewAllServicesText() {
  const t = useTranslations("services");
  return <>{t("viewAll")}</>;
}

function BlogHeading() {
  const t = useTranslations("blog");
  return <>{t("latestPosts")}</>;
}

function BlogSubheading() {
  const t = useTranslations("blog");
  return <>{t("title")}</>;
}

function ViewAllText() {
  const t = useTranslations("blog");
  return <>{t("viewAll")}</>;
}
