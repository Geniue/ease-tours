import { notFound, redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { getBlogsPaginated, getCategories } from "@/lib/api";
import BlogFilter from "@/components/BlogFilter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, blogItemListSchema, collectionPageSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; n: string }>;
}): Promise<Metadata> {
  const { locale, n } = await params;
  const isAr = locale === "ar";
  const pageNum = Math.max(1, parseInt(n, 10) || 1);
  const baseTitle = isAr ? "المدونة - مقالات سياحية" : "Blog - Travel Articles";
  const title = `${baseTitle} — ${isAr ? "صفحة" : "Page"} ${pageNum}`;
  const description = isAr
    ? `الصفحة ${pageNum} من المقالات السياحية لإيز ترافل`
    : `Page ${pageNum} of Ease Travel articles`;
  const url = `${SITE_URL}/${locale}/blog/page/${pageNum}`;
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [altLocale]: `${SITE_URL}/${altLocale}/blog/page/${pageNum}`,
      },
    },
    openGraph: { type: "website", title, description, url },
    robots: pageNum === 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ locale: string; n: string }>;
}) {
  const { locale, n } = await params;
  const isAr = locale === "ar";
  const pageNum = parseInt(n, 10);
  if (!Number.isFinite(pageNum) || pageNum < 1) notFound();
  if (pageNum === 1) redirect(`/${locale}/blog`);

  const [{ data: blogs, meta }, categories] = await Promise.all([
    getBlogsPaginated({ page: String(pageNum) }),
    getCategories(),
  ]);

  if (pageNum > meta.last_page && meta.total > 0) notFound();

  const url = `${SITE_URL}/${locale}/blog/page/${pageNum}`;
  const pageTitle = isAr ? `المدونة — صفحة ${pageNum}` : `Blog — Page ${pageNum}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: isAr ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
        { name: isAr ? "المدونة" : "Blog", url: `${SITE_URL}/${locale}/blog` },
        { name: `${isAr ? "صفحة" : "Page"} ${pageNum}`, url },
      ])} />
      <JsonLd data={collectionPageSchema({
        name: pageTitle,
        description: pageTitle,
        url,
        locale,
        itemCount: meta.total,
      })} />
      {blogs.length > 0 && (
        <JsonLd data={blogItemListSchema(blogs, locale, pageTitle, url)} />
      )}
      <main>
        <BlogHero pageNum={pageNum} />
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

function BlogHero({ pageNum }: { pageNum: number }) {
  const t = useTranslations("blog");
  return (
    <section
      className="relative h-[40vh] min-h-[280px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute top-0 inset-x-0 z-10 pt-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: t("title"), href: "/blog" }, { label: `${t("page")} ${pageNum}` }]} variant="dark" />
        </div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold">{t("title")} — {t("page")} {pageNum}</h1>
      </div>
    </section>
  );
}
