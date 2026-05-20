"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Filter, MapPin, ShieldCheck } from "lucide-react";
import type { ApiVisaGalleryItem, ApiVisaGalleryRegion } from "@/lib/api";
import { getImageUrl } from "@/lib/api";

type FilterKey = "all" | ApiVisaGalleryRegion;

const regionKeys: FilterKey[] = [
  "all",
  "schengen",
  "gulf",
  "asia",
  "africa",
  "america",
  "europe",
  "other",
];

const labels = {
  ar: {
    all: "الكل",
    schengen: "شنغن",
    gulf: "الخليج",
    asia: "آسيا",
    africa: "أفريقيا",
    america: "أمريكا",
    europe: "أوروبا",
    other: "أخرى",
    cityAll: "كل المدن",
    governorateAll: "كل المحافظات",
    processedFor: "تم العمل على الطلب لعميل من",
    processedAt: "تمت المعالجة في",
    privacyBadge: "صورة منقحة لحماية الخصوصية",
    view: "عرض تفاصيل الحالة",
    noItems: "لا توجد حالات منشورة مطابقة حالياً.",
  },
  en: {
    all: "All",
    schengen: "Schengen",
    gulf: "Gulf",
    asia: "Asia",
    africa: "Africa",
    america: "America",
    europe: "Europe",
    other: "Other",
    cityAll: "All cities",
    governorateAll: "All governorates",
    processedFor: "Case handled for a client from",
    processedAt: "Processed in",
    privacyBadge: "Redacted image for privacy protection",
    view: "View case details",
    noItems: "No matching published cases are available right now.",
  },
};

const monthNames = {
  ar: [
    "",
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  en: [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

function localizedTitle(item: ApiVisaGalleryItem, isAr: boolean) {
  if (isAr) {
    return item.title_ar || `تأشيرة ${item.country_ar} لعميل من ${item.city_ar}`;
  }

  return (
    item.title_en ||
    `${item.country_en || item.country_ar} visa for a client from ${
      item.city_en || item.city_ar
    }`
  );
}

function localizedSlug(item: ApiVisaGalleryItem, isAr: boolean) {
  return isAr ? item.slug_ar || item.slug_en : item.slug_en || item.slug_ar;
}

function monthYear(item: ApiVisaGalleryItem, isAr: boolean) {
  if (!item.processed_year) return null;
  if (!item.processed_month) return String(item.processed_year);

  return `${monthNames[isAr ? "ar" : "en"][item.processed_month]} ${
    item.processed_year
  }`;
}

export default function VisaGalleryGrid({
  items,
  locale,
  initialRegion = "all",
  initialCity = "",
  initialGovernorateId = "",
}: {
  items: ApiVisaGalleryItem[];
  locale: string;
  initialRegion?: FilterKey;
  initialCity?: string;
  initialGovernorateId?: string;
}) {
  const isAr = locale === "ar";
  const t = isAr ? labels.ar : labels.en;
  const [region, setRegion] = useState<FilterKey>(initialRegion);
  const [city, setCity] = useState(initialCity);
  const [governorateId, setGovernorateId] = useState(initialGovernorateId);

  const cities = useMemo(() => {
    const values = new Map<string, string>();
    items.forEach((item) => {
      const value = isAr ? item.city_ar : item.city_en || item.city_ar;
      values.set(value, value);
    });
    return Array.from(values.values()).sort();
  }, [items, isAr]);

  const governorates = useMemo(() => {
    const values = new Map<string, string>();
    items.forEach((item) => {
      if (!item.governorate) return;
      values.set(
        String(item.governorate.id),
        isAr ? item.governorate.name_ar : item.governorate.name_en
      );
    });
    return Array.from(values.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [items, isAr]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const cityName = isAr ? item.city_ar : item.city_en || item.city_ar;
      const matchesRegion = region === "all" || item.region === region;
      const matchesCity = !city || cityName === city;
      const matchesGovernorate =
        !governorateId || String(item.governorate_id) === governorateId;

      return matchesRegion && matchesCity && matchesGovernorate;
    });
  }, [items, region, city, governorateId, isAr]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {regionKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRegion(key)}
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-extrabold transition ${
                region === key
                  ? "bg-primary text-white shadow-lg shadow-blue-950/10"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {key === "all" && <Filter size={15} aria-hidden="true" />}
              {t[key]}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {cities.length > 0 && (
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="">{t.cityAll}</option>
              {cities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {governorates.length > 0 && (
            <select
              value={governorateId}
              onChange={(event) => setGovernorateId(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="">{t.governorateAll}</option>
              {governorates.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-bold text-slate-500">
          {t.noItems}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const title = localizedTitle(item, isAr);
            const slug = localizedSlug(item, isAr);
            const imageSrc = item.image_url || getImageUrl(item.image_path);
            const country = isAr ? item.country_ar : item.country_en || item.country_ar;
            const visaType = isAr
              ? item.visa_type_ar
              : item.visa_type_en || item.visa_type_ar;
            const cityName = isAr ? item.city_ar : item.city_en || item.city_ar;
            const governorate = item.governorate
              ? isAr
                ? item.governorate.name_ar
                : item.governorate.name_en
              : null;
            const processed = monthYear(item, isAr);

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={(isAr ? item.alt_ar : item.alt_en) || title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute inset-x-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-primary shadow-sm">
                    <ShieldCheck size={14} aria-hidden="true" />
                    {t.privacyBadge}
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                      {country}
                    </span>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                      {visaType}
                    </span>
                  </div>
                  <h3 className="text-lg font-black leading-7 text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <MapPin className="mt-1 shrink-0 text-accent" size={16} />
                    <span>
                      {t.processedFor} {cityName}
                      {governorate ? `, ${governorate}` : ""}
                    </span>
                  </p>
                  {processed && (
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {t.processedAt} {processed}
                    </p>
                  )}
                  {slug && (
                    <Link
                      href={`/${locale}/visa-gallery/${encodeURIComponent(slug)}`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-extrabold text-white transition hover:bg-primary-dark"
                    >
                      <Eye size={16} aria-hidden="true" />
                      {t.view}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
