import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import BlogCard from "@/components/BlogCard";
import ServiceCard from "@/components/ServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getTrips, getBlogs, getServices } from "@/lib/api";
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

export default async function HomePage() {
  const [trips, blogs, services] = await Promise.all([
    getTrips({ featured: "1" }),
    getBlogs({ featured: "1", limit: "3" }),
    getServices({ featured: "1", limit: "6" }),
  ]);

  return (
    <>
      <main>
        <Hero />

        {/* Featured Tours */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              <ToursHeading />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
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
      </main>
    </>
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
