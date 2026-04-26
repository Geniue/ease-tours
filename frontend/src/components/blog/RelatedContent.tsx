"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Briefcase, Stamp } from "lucide-react";
import type { ApiTrip, ApiService, ApiEmbassy } from "@/lib/api";

interface RelatedContentProps {
  trips?: ApiTrip[];
  services?: ApiService[];
  embassies?: ApiEmbassy[];
}

export default function RelatedContent({ trips = [], services = [], embassies = [] }: RelatedContentProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAr = locale === "ar";
  if (trips.length === 0 && services.length === 0 && embassies.length === 0) return null;

  const arrowDir = isAr ? "rotate-180" : "";

  return (
    <section className="my-10 space-y-8" dir={isAr ? "rtl" : "ltr"}>
      {trips.length > 0 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#1a73a7]" /> {t("relatedTours")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => {
              const title = isAr ? trip.title_ar : trip.title_en;
              const slug = isAr ? trip.slug_ar : trip.slug_en;
              const dest = isAr ? trip.destination_ar : trip.destination_en;
              return (
                <Link
                  key={trip.id}
                  href={`/tours/${slug}`}
                  className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  {trip.featured_image_url && (
                    <div className="relative h-32">
                      <Image
                        src={trip.featured_image_url}
                        alt={title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{dest}</p>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#1a73a7]">{title}</h3>
                    <p className="mt-2 text-sm text-[#f59e0b] font-semibold inline-flex items-center gap-1">
                      {t("viewTour")} <ArrowRight size={14} className={arrowDir} />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-[#1a73a7]" /> {t("relatedServices")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => {
              const title = isAr ? s.title_ar : s.title_en;
              const slug = isAr ? s.slug_ar : s.slug_en;
              const excerpt = isAr ? s.excerpt_ar : s.excerpt_en;
              return (
                <Link
                  key={s.id}
                  href={`/services/${slug}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1a73a7]">{title}</h3>
                  {excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excerpt}</p>}
                  <p className="mt-2 text-sm text-[#f59e0b] font-semibold inline-flex items-center gap-1">
                    {t("viewService")} <ArrowRight size={14} className={arrowDir} />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {embassies.length > 0 && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Stamp size={20} className="text-[#1a73a7]" /> {t("relatedEmbassies")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {embassies.map((e) => {
              const country = isAr ? e.country_name_ar : e.country_name_en;
              return (
                <Link
                  key={e.id}
                  href={`/embassy`}
                  className="group flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
                >
                  <span className="text-2xl">{e.flag_emoji || "🛂"}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1a73a7] truncate">{country}</h3>
                    <p className="text-xs text-gray-500">
                      {e.appointment_status === "open"
                        ? isAr ? "مفتوح" : "Open"
                        : e.appointment_status === "stopped"
                        ? isAr ? "متوقف" : "Stopped"
                        : isAr ? "مغلق" : "Closed"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
