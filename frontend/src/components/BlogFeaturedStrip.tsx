"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Star } from "lucide-react";
import type { ApiBlog } from "@/lib/api";
import { readingTimeLabel } from "@/lib/readingTime";

export default function BlogFeaturedStrip({ blogs }: { blogs: ApiBlog[] }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAr = locale === "ar";

  if (blogs.length === 0) return null;

  const arrow = isAr ? "rotate-180" : "";
  const [hero, ...rest] = blogs;

  function card(b: ApiBlog, large: boolean) {
    const title = isAr ? b.title_ar : b.title_en;
    const excerpt = isAr ? b.excerpt_ar : b.excerpt_en;
    const slug = isAr ? b.slug_ar : b.slug_en;
    const cat = isAr ? b.category.name_ar : b.category.name_en;
    const body = isAr ? b.body_ar : b.body_en;
    const rt = body ? readingTimeLabel(body, isAr ? "ar" : "en") : null;

    return (
      <Link
        href={`/blog/${slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-gray-900 text-white"
      >
        {b.featured_image_url ? (
          <Image
            src={b.featured_image_url}
            alt={title}
            fill
            unoptimized
            sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 30vw"}
            className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition duration-500"
            priority={large}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className={`relative ${large ? "h-[420px]" : "h-[200px]"} flex flex-col justify-end p-5 md:p-6`}>
          <span className="inline-flex items-center gap-1 self-start bg-[#f59e0b] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Star size={12} /> {cat}
          </span>
          <h3 className={`font-bold ${large ? "text-2xl md:text-3xl" : "text-base md:text-lg"} mb-2 line-clamp-2`}>
            {title}
          </h3>
          {large && excerpt && <p className="text-sm text-white/80 mb-3 line-clamp-2">{excerpt}</p>}
          <div className="flex items-center justify-between text-xs text-white/70">
            {rt && <span>{rt}</span>}
            <span className="inline-flex items-center gap-1 font-semibold text-[#f59e0b]">
              {t("readMore")} <ArrowRight size={14} className={arrow} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <section className="container mx-auto px-4 mt-10" dir={isAr ? "rtl" : "ltr"}>
      <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
        <Star size={22} className="text-[#f59e0b]" /> {t("featuredPosts")}
      </h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">{card(hero, true)}</div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((b) => (
            <div key={b.id}>{card(b, false)}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
