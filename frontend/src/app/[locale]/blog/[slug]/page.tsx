import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getBlog, getBlogs } from "@/lib/api";
import BlogDetailContent from "@/components/BlogDetailContent";
import { JsonLd, blogPostingSchema, breadcrumbSchema } from "@/lib/schemas";

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

  return {
    title,
    description: excerpt || title,
    alternates: {
      canonical: `/${locale}/blog/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `/${locale}/blog/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `/${altLocale}/blog/${encodeURIComponent(altSlug)}`,
        "x-default": `/ar/blog/${encodeURIComponent(isAr ? correctSlug : altSlug)}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description: excerpt || title,
      url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(correctSlug)}`,
      ...(blog.published_at && { publishedTime: blog.published_at }),
      ...(blog.featured_image_url && {
        images: [{ url: blog.featured_image_url, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt || title,
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

  // Redirect to the correct slug for the current locale
  const isAr = locale === "ar";
  const correctSlug = isAr ? blog.slug_ar : blog.slug_en;
  if (decodeURIComponent(slug) !== correctSlug) {
    redirect(`/${locale}/blog/${encodeURIComponent(correctSlug)}`);
  }

  // Get related blogs from same category
  const allBlogs = await getBlogs({ category_id: String(blog.category_id), limit: "10" });
  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const title = isAr ? blog.title_ar : blog.title_en;
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const blogLabel = isAr ? "المدونة" : "Blog";

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
      <Navbar />
      <main>
        <BlogDetailContent blog={blog} relatedBlogs={relatedBlogs} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
