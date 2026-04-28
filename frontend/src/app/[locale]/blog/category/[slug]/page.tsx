import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getBlogsPaginated, getCategoryBySlug, getCategories } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, blogItemListSchema, collectionPageSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const decoded = decodeURIComponent(slug);
  const category = await getCategoryBySlug(decoded);
  if (!category) return {};
  const isAr = locale === "ar";
  const name = isAr ? category.name_ar : category.name_en;
  const title = isAr ? `${name} - مقالات إيز ترافل` : `${name} - Ease Travel Articles`;
  const description = (isAr ? category.description_ar : category.description_en) || title;
  const altLocale = isAr ? "en" : "ar";
  const altSlug = isAr ? category.slug_en : category.slug_ar;
  const correctSlug = isAr ? category.slug_ar : category.slug_en;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/blog/category/${encodeURIComponent(altSlug)}`,
      },
    },
    openGraph: { type: "website", title, description },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const decoded = decodeURIComponent(slug);
  const isAr = locale === "ar";

  const category = await getCategoryBySlug(decoded);
  if (!category) notFound();

  const [{ data: blogs, meta }, allCategories] = await Promise.all([
    getBlogsPaginated({ category_slug: decoded, per_page: "12" }),
    getCategories(),
  ]);

  const name = isAr ? category.name_ar : category.name_en;
  const description = (isAr ? category.description_ar : category.description_en) || (isAr ? `جميع المقالات ضمن ${name}` : `All articles in ${name}`);
  const correctSlug = isAr ? category.slug_ar : category.slug_en;
  const url = `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(correctSlug)}`;
  const pageTitle = isAr ? `${name} - مقالات` : `${name} — Articles`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: isAr ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
        { name: isAr ? "المدونة" : "Blog", url: `${SITE_URL}/${locale}/blog` },
        { name, url },
      ])} />
      <JsonLd data={collectionPageSchema({
        name: pageTitle,
        description,
        url,
        locale,
        itemCount: meta.total,
      })} />
      {blogs.length > 0 && (
        <JsonLd data={blogItemListSchema(blogs, locale, pageTitle, url)} />
      )}
      <main>
        <section className="bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e] text-white pt-36 pb-16 md:pt-40">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: isAr ? "المدونة" : "Blog", href: "/blog" },
                { label: name },
              ]}
              variant="dark"
            />
            <h1 className="text-3xl md:text-5xl font-bold mt-4">{name}</h1>
            <p className="text-white/85 mt-2 max-w-2xl">{description}</p>
            <p className="text-sm text-white/70 mt-3">
              {meta.total} {isAr ? "مقال" : "articles"}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Link href="/blog" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
                {isAr ? "كل المقالات" : "All articles"}
              </Link>
              {allCategories.map((c) => {
                const cSlug = isAr ? c.slug_ar : c.slug_en;
                const active = c.id === category.id;
                return (
                  <Link
                    key={c.id}
                    href={`/blog/category/${cSlug}`}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      active
                        ? "bg-[#1a73a7] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isAr ? c.name_ar : c.name_en}
                  </Link>
                );
              })}
            </div>

            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                {isAr ? "لا توجد مقالات في هذا التصنيف بعد" : "No articles in this category yet"}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
