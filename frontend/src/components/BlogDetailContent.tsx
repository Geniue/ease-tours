"use client";

import { useLocale, useTranslations } from "next-intl";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import type { ApiBlog } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const body = isAr ? blog.body_ar : blog.body_en;
  const categoryName = isAr ? blog.category.name_ar : blog.category.name_en;

  const publishedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Direction follows the active locale — Arabic content is RTL, English is LTR
  const contentDir = isAr ? "rtl" : "ltr";

  return (
    <>
      {/* Hero Banner */}
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
        <div className="absolute inset-x-0 top-0 p-6 md:p-10 pt-24 z-10">
          <div className="container mx-auto">
            <Breadcrumbs items={[{ label: t("title"), href: "/blog" }, { label: title }]} variant="dark" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 pt-20">
          <div className="container mx-auto">
            <span className="inline-block bg-[#1a73a7] text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
              <Tag size={12} className="inline me-1" />
              {categoryName}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h1>
            {publishedDate && (
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar size={14} />
                <span>
                  {t("publishedAt")} {publishedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <article
            dir={contentDir}
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
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
        </div>
      </section>

      {/* Related Posts */}
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
