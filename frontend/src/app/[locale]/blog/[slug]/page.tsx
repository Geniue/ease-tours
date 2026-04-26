import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getBlog, getBlogs } from "@/lib/api";
import BlogDetailContent from "@/components/BlogDetailContent";
import { extractFaqs } from "@/components/blog/extractFaqs";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
  faqSchema,
} from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = await getBlog(decodeURIComponent(slug));
  if (!blog) return {};

  const isAr = locale === "ar";
  const title = isAr ? blog.title_ar : blog.title_en;
  const excerpt = isAr ? blog.excerpt_ar : blog.excerpt_en;
  const correctSlug = isAr ? blog.slug_ar : blog.slug_en;
  const altLocale = isAr ? "en" : "ar";
  const altSlug = isAr ? blog.slug_en : blog.slug_ar;

  const metaTitle = (isAr ? blog.seo_title_ar : blog.seo_title_en) || title;
  const metaDescription =
    (isAr ? blog.seo_description_ar : blog.seo_description_en) || excerpt || title;
  const keywords = isAr ? blog.keywords_ar : blog.keywords_en;
  const authorName = blog.author ? (isAr ? blog.author.name_ar : blog.author.name_en) : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    ...(keywords && { keywords }),
    ...(authorName && { authors: [{ name: authorName }] }),
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/blog/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/blog/${encodeURIComponent(altSlug)}`,
        "x-default": `${SITE_URL}/ar/blog/${encodeURIComponent(isAr ? correctSlug : altSlug)}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isAr ? "ar_EG" : "en_US",
      title: metaTitle,
      description: metaDescription,
      url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(correctSlug)}`,
      ...(blog.published_at && { publishedTime: blog.published_at }),
      ...(blog.updated_at && { modifiedTime: blog.updated_at }),
      ...(authorName && { authors: [authorName] }),
      ...(blog.featured_image_url && {
        images: [{ url: blog.featured_image_url, alt: metaTitle }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      ...(blog.featured_image_url && { images: [blog.featured_image_url] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const blog = await getBlog(decodeURIComponent(slug));
  if (!blog) notFound();

  const isAr = locale === "ar";
  const correctSlug = isAr ? blog.slug_ar : blog.slug_en;
  if (decodeURIComponent(slug) !== correctSlug) {
    redirect(`/${locale}/blog/${encodeURIComponent(correctSlug)}`);
  }

  const allBlogs = await getBlogs({ category_id: String(blog.category_id), limit: "10" });
  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const title = isAr ? blog.title_ar : blog.title_en;
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const blogLabel = isAr ? "المدونة" : "Blog";

  const body = isAr ? blog.body_ar : blog.body_en;
  const faqs = extractFaqs(body);

  return (
    <>
      <JsonLd data={blogPostingSchema(blog, locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: blogLabel, url: `${SITE_URL}/${locale}/blog` },
          { name: title, url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(correctSlug)}` },
        ])}
      />
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <main>
        <BlogDetailContent blog={blog} relatedBlogs={relatedBlogs} />
      </main>
    </>
  );
}
