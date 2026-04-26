import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getBlogsPaginated, getCategories, getBlogs, getTags } from "@/lib/api";
import BlogFilter from "@/components/BlogFilter";
import BlogFeaturedStrip from "@/components/BlogFeaturedStrip";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbSchema, blogItemListSchema, collectionPageSchema } from "@/lib/schemas";

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

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const [{ data: blogs, meta }, categories, featured, tags] = await Promise.all([
    getBlogsPaginated({ page: "1" }),
    getCategories(),
    getBlogs({ featured: "1", limit: "3" }),
    getTags(),
  ]);

  const pageUrl = `${SITE_URL}/${locale}/blog`;
  const pageTitle = isAr ? "المدونة - مقالات سياحية" : "Blog - Travel Articles";
  const pageDescription = isAr
    ? "اقرأ أحدث المقالات والنصائح عن السياحة في مصر والعالم"
    : "Read the latest travel articles and tips for Egypt and worldwide";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: isAr ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
        { name: isAr ? "المدونة" : "Blog", url: pageUrl },
      ])} />
      <JsonLd data={collectionPageSchema({
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        locale,
        itemCount: meta.total,
      })} />
      {blogs.length > 0 && (
        <JsonLd data={blogItemListSchema(blogs, locale, pageTitle, pageUrl)} />
      )}
      <main>
        <BlogHero />
        {featured.length > 0 && <BlogFeaturedStrip blogs={featured} />}
        {tags.length > 0 && <PopularTags tags={tags.slice(0, 12)} locale={locale} />}
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
      <div className="absolute top-0 inset-x-0 z-10 pt-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: t("title") }]} variant="dark" />
        </div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="text-base md:text-lg text-white/85 mt-3 max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>
    </section>
  );
}

function PopularTags({ tags, locale }: { tags: { id: number; name_ar: string; name_en: string; slug_ar: string; slug_en: string }[]; locale: string }) {
  const isAr = locale === "ar";
  return (
    <section className="container mx-auto px-4 mt-10" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-700 me-2">#</span>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${isAr ? tag.slug_ar : tag.slug_en}`}
            className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-[#1a73a7] hover:text-white hover:border-[#1a73a7] transition"
          >
            {isAr ? tag.name_ar : tag.name_en}
          </Link>
        ))}
      </div>
    </section>
  );
}
