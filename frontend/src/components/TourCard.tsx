"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { type ApiTrip } from "@/lib/api";

export default function TourCard({ tour }: { tour: ApiTrip }) {
  const t = useTranslations("tourCard");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? tour.title_ar : tour.title_en;
  const destination = isAr ? tour.destination_ar : tour.destination_en;
  const slug = isAr ? tour.slug_ar : tour.slug_en;
  const price = parseFloat(tour.base_price);
  const discounted = tour.discounted_price ? parseFloat(tour.discounted_price) : null;
  const isComingSoon = tour.coming_soon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {tour.featured_image_url && (
          <Image
            src={tour.featured_image_url}
            alt={title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {destination}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {tour.duration_days} {t("days")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {isComingSoon ? (
              <p className="text-amber-500 font-bold text-lg">
                {t("comingSoon")}
              </p>
            ) : discounted ? (
              <>
                <p className="text-foreground/40 line-through text-sm">
                  {price.toLocaleString()} {t("egp")}
                </p>
                <p className="text-primary font-bold text-lg">
                  {t("from")} {discounted.toLocaleString()} {t("egp")}
                </p>
              </>
            ) : (
              <p className="text-primary font-bold text-lg">
                {t("from")} {price.toLocaleString()} {t("egp")}
              </p>
            )}
          </div>
          <Link
            href={`/tours/${slug}`}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            {isComingSoon ? t("comingSoon") : t("bookNow")}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
