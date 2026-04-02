"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ApiService } from "@/lib/api";

export default function ServiceCard({ service }: { service: ApiService }) {
  const t = useTranslations("services");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? service.title_ar : service.title_en;
  const excerpt = isAr ? service.excerpt_ar : service.excerpt_en;
  const slug = isAr ? service.slug_ar : service.slug_en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link href={`/services/${slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {service.featured_image_url ? (
            <Image
              src={service.featured_image_url}
              alt={title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a73a7] to-[#155d87] flex items-center justify-center">
              {service.icon ? (
                <span className="text-5xl">{service.icon}</span>
              ) : (
                <span className="text-white/40 text-4xl font-bold">ET</span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            {service.icon && <span className="text-2xl">{service.icon}</span>}
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#1a73a7] transition-colors">
              {title}
            </h3>
          </div>

          {excerpt && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{excerpt}</p>
          )}

          <span className="text-sm font-semibold text-[#f59e0b]">
            {t("readMore")} →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
