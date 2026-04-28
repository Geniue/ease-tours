import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogsPaginated, getTag } from "@/lib/api";
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
  const tag = await getTag(decoded);
  if (!tag) return {};
  const isAr = locale === "ar";
  const name = isAr ? tag.name_ar : tag.name_en;
  const title = isAr ? `#${name} — مقالات إيز ترافل` : `#${name} — Ease Travel Articles`;
  const description = (isAr ? tag.description_ar : tag.description_en) ||
    (isAr ? `جميع المقالات الموسومة بـ ${name}` : `All articles tagged with ${name}`);
  const altLocale = isAr ? "en" : "ar";
  const correctSlug = isAr ? tag.slug_ar : tag.slug_en;
  const altSlug = isAr ? tag.slug_en : tag.slug_ar;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/tag/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/blog/tag/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/blog/tag/${encodeURIComponent(altSlug)}`,
      },
    },
    openGraph: { type: "website", title, description },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const decoded = decodeURIComponent(slug);
  const isAr = locale === "ar";

  const tag = await getTag(decoded);
  if (!tag) notFound();

  const { data: blogs, meta } = await getBlogsPaginated({ tag_slug: decoded, per_page: "12" });

  const name = isAr ? tag.name_ar : tag.name_en;
  const description = (isAr ? tag.description_ar : tag.description_en) ||
    (isAr ? `جميع المقالات الموسومة بـ ${name}` : `All articles tagged with ${name}`);
  const correctSlug = isAr ? tag.slug_ar : tag.slug_en;
  const url = `${SITE_URL}/${locale}/blog/tag/${encodeURIComponent(correctSlug)}`;
  const pageTitle = isAr ? `#${name}` : `#${name}`;

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
        <section className="bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e] text-white pt-36 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: isAr ? "المدونة" : "Blog", href: "/blog" },
                { label: `#${name}` },
              ]}
              variant="dark"
            />
            <h1 className="text-3xl md:text-5xl font-bold mt-4">#{name}</h1>
            {description && <p className="text-white/85 mt-2 max-w-2xl">{description}</p>}
            <p className="text-sm text-white/70 mt-3">{meta.total} {isAr ? "مقال" : "articles"}</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                {isAr ? "لا توجد مقالات بهذا الوسم بعد" : "No articles with this tag yet"}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
