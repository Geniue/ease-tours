"use client";

import { useLocale, useTranslations } from "next-intl";
import { Calendar, Tag as TagIcon, Clock, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ApiBlog } from "@/lib/api";
import { processBodyImages } from "@/lib/blogUtils";
import { readingTimeLabel } from "@/lib/readingTime";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShare from "@/components/blog/SocialShare";
import AuthorByline from "@/components/blog/AuthorByline";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import RelatedContent from "@/components/blog/RelatedContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export default function BlogDetailContent({
  blog,
  relatedBlogs,
}: {
  blog: ApiBlog;
  relatedBlogs: ApiBlog[];
}) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? blog.title_ar : blog.title_en;
  const body = processBodyImages((isAr ? blog.body_ar : blog.body_en) || "");
  const categoryName = isAr ? blog.category.name_ar : blog.category.name_en;
  const slug = isAr ? blog.slug_ar : blog.slug_en;
  const shareUrl = `${SITE_URL}/${locale}/blog/${encodeURIComponent(slug)}`;
  const readTime = body ? readingTimeLabel(body, isAr ? "ar" : "en") : null;

  const publishedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const updatedDate = blog.updated_at
    ? new Date(blog.updated_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const showUpdated = updatedDate && publishedDate && updatedDate !== publishedDate;

  const contentDir = isAr ? "rtl" : "ltr";
  const tags = blog.tags ?? [];
  const trips = blog.related_trips ?? [];
  const services = blog.related_services ?? [];
  const embassies = blog.related_embassies ?? [];

  return (
    <>
      <section className="relative h-80 md:h-[28rem] overflow-hidden">
        {blog.featured_image_url ? (
          <Image
            src={blog.featured_image_url}
            alt={title}
            fill
            unoptimized
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 pt-20">
          <div className="container mx-auto">
            <span className="inline-block bg-[#1a73a7] text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <TagIcon size={12} className="inline me-1" />
              {categoryName}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/85 text-sm">
              {publishedDate && (
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  {t("publishedAt")} {publishedDate}
                </span>
              )}
              {showUpdated && (
                <span className="inline-flex items-center gap-1">
                  <RefreshCcw size={14} />
                  {t("lastUpdated")} {updatedDate}
                </span>
              )}
              {readTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} /> {readTime}
                </span>
              )}
              {blog.author && (
                <span>
                  {t("byAuthor")}{" "}
                  <Link
                    href={`/blog/author/${isAr ? blog.author.slug_ar : blog.author.slug_en}`}
                    className="underline decoration-white/40 hover:decoration-white"
                  >
                    {isAr ? blog.author.name_ar : blog.author.name_en}
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: t("title"), href: "/blog" }, { label: title }]} variant="light" />
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
            <div className="min-w-0">
              <article
                data-blog-body
                dir={contentDir}
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b-2 prose-h2:border-[#1a73a7]/20 prose-h2:pb-3
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#1a73a7]
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[#1a73a7] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:my-4 prose-ul:space-y-2
                  prose-ol:my-4 prose-ol:space-y-2
                  prose-li:text-gray-700
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-table:border-collapse prose-table:w-full prose-table:overflow-hidden prose-table:rounded-lg
                  prose-th:bg-[#1a73a7] prose-th:text-white prose-th:px-4 prose-th:py-3 prose-th:text-sm
                  prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-3 prose-td:text-sm"
                style={{ direction: contentDir, textAlign: isAr ? "right" : "left" }}
                dangerouslySetInnerHTML={{ __html: body }}
              />

              <SocialShare title={title} url={shareUrl} />

              {tags.length > 0 && (
                <div className="my-8 flex flex-wrap items-center gap-2" dir={contentDir}>
                  <span className="text-sm font-semibold text-gray-700">{t("tagsLabel")}:</span>
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tag/${isAr ? tag.slug_ar : tag.slug_en}`}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-[#1a73a7] hover:text-white rounded-full text-gray-700 transition"
                    >
                      #{isAr ? tag.name_ar : tag.name_en}
                    </Link>
                  ))}
                </div>
              )}

              {blog.author && <AuthorByline author={blog.author} />}

              <RelatedContent trips={trips} services={services} embassies={embassies} />

              <NewsletterCTA source="blog-detail" />
            </div>

            <aside className="hidden lg:block">
              <TableOfContents html={body} />
            </aside>
          </div>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {t("relatedPosts")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
