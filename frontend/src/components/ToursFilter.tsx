"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import TourCard from "@/components/TourCard";
import type { ApiTrip, ApiCategory } from "@/lib/api";

interface ToursFilterProps {
  trips: ApiTrip[];
  categories: ApiCategory[];
}

export default function ToursFilter({ trips, categories }: ToursFilterProps) {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filtered = activeCategory
    ? trips.filter((trip) => trip.category_id === activeCategory)
    : trips;

  return (
    <>
      {/* Category filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-6 py-2 rounded-full font-medium transition-colors"
          style={{
            backgroundColor: activeCategory === null ? "#1a73a7" : "#f3f4f6",
            color: activeCategory === null ? "#fff" : "#374151",
          }}
        >
          {t("all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-6 py-2 rounded-full font-medium transition-colors"
            style={{
              backgroundColor:
                activeCategory === cat.id ? "#1a73a7" : "#f3f4f6",
              color: activeCategory === cat.id ? "#fff" : "#374151",
            }}
          >
            {locale === "ar" ? cat.name_ar : cat.name_en}
          </button>
        ))}
      </div>

      {/* Tours grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">{t("noTrips")}</p>
      )}
    </>
  );
}
