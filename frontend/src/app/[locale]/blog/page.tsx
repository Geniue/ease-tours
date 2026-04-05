import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getBlogsPaginated, getCategories } from "@/lib/api";
import BlogFilter from "@/components/BlogFilter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "المدونة - مقالات سياحية" : "Blog - Travel Articles";
  const description = isAr
    ? "اقرأ أحدث المقالات والنصائح عن السياحة في مصر والعالم - رحلات شرم الشيخ، العمرة، دبي واسطنبول"
    : "Read the latest articles and tips about tourism in Egypt and worldwide - Sharm El Sheikh trips, Umrah, Dubai, and Istanbul";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: { [locale]: `${SITE_URL}/${locale}/blog`, [altLocale]: `${SITE_URL}/${altLocale}/blog`, "x-default": `${SITE_URL}/ar/blog` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/blog` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPage() {
  const [{ data: blogs, meta }, categories] = await Promise.all([
    getBlogsPaginated({ page: "1" }),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BlogFilter
              initialBlogs={blogs}
              categories={categories}
              initialMeta={meta}
            />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function BlogHero() {
  const t = useTranslations("blog");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1920&q=85')",
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
