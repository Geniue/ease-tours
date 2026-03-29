"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ApiBlog } from "@/lib/api";

export default function BlogCard({ blog }: { blog: ApiBlog }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? blog.title_ar : blog.title_en;
  const excerpt = isAr ? blog.excerpt_ar : blog.excerpt_en;
  const slug = isAr ? blog.slug_ar : blog.slug_en;
  const categoryName = isAr ? blog.category.name_ar : blog.category.name_en;

  const publishedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link href={`/blog/${slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {blog.featured_image_url ? (
            <Image
              src={blog.featured_image_url}
              alt={title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a73a7] to-[#155d87] flex items-center justify-center">
              <span className="text-white/40 text-4xl font-bold">ET</span>
            </div>
          )}
          <div className="absolute top-3 start-3">
            <span className="bg-[#1a73a7] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {categoryName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1a73a7] transition-colors">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
          )}

          <div className="flex items-center justify-between">
            {publishedDate && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {publishedDate}
              </span>
            )}
            <span className="text-sm font-semibold text-[#f59e0b]">
              {t("readMore")} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
