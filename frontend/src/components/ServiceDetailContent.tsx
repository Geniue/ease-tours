"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { ApiService } from "@/lib/api";

export default function ServiceDetailContent({
  service,
}: {
  service: ApiService;
}) {
  const t = useTranslations("services");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? service.title_ar : service.title_en;
  const body = isAr ? service.body_ar : service.body_en;
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  return (
    <article className="pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#1a73a7]">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <Chevron size={14} />
          <Link href="/services" className="hover:text-[#1a73a7]">
            {t("title")}
          </Link>
          <Chevron size={14} />
          <span className="text-gray-800 font-medium">{title}</span>
        </nav>

        {/* Featured Image */}
        {service.featured_image_url && (
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={service.featured_image_url}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          {service.icon && <span className="text-4xl">{service.icon}</span>}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h1>
        </div>

        {/* Body */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#1a73a7] prose-a:text-[#1a73a7]"
          dir={isAr ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/201105001389"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            {t("contactForService")}
          </a>
        </div>
      </div>
    </article>
  );
}
