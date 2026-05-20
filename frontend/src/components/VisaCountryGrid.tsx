"use client";

import { useMemo, useState } from "react";
import { Filter, MessageCircle } from "lucide-react";
import WhatsAppTrackedLink from "@/components/WhatsAppTrackedLink";

type Region = "schengen" | "asia" | "gulf" | "africa" | "america" | "other";
type FilterKey = "all" | Exclude<Region, "other">;

type VisaCountry = {
  ar: string;
  en: string;
  region: Region;
  flag: string;
};

const WHATSAPP_NUMBER = "201105001389";

const countries: VisaCountry[] = [
  { ar: "أستراليا", en: "Australia", region: "other", flag: "🇦🇺" },
  { ar: "إسبانيا", en: "Spain", region: "schengen", flag: "🇪🇸" },
  { ar: "أذربيجان", en: "Azerbaijan", region: "asia", flag: "🇦🇿" },
  { ar: "فرنسا", en: "France", region: "schengen", flag: "🇫🇷" },
  { ar: "البرازيل", en: "Brazil", region: "america", flag: "🇧🇷" },
  { ar: "البحرين", en: "Bahrain", region: "gulf", flag: "🇧🇭" },
  { ar: "الإمارات", en: "United Arab Emirates", region: "gulf", flag: "🇦🇪" },
  { ar: "جورجيا", en: "Georgia", region: "asia", flag: "🇬🇪" },
  { ar: "الأردن", en: "Jordan", region: "asia", flag: "🇯🇴" },
  { ar: "الصين", en: "China", region: "asia", flag: "🇨🇳" },
  { ar: "الجزائر", en: "Algeria", region: "africa", flag: "🇩🇿" },
  { ar: "السعودية", en: "Saudi Arabia", region: "gulf", flag: "🇸🇦" },
  { ar: "المجر", en: "Hungary", region: "schengen", flag: "🇭🇺" },
  { ar: "هولندا", en: "Netherlands", region: "schengen", flag: "🇳🇱" },
  { ar: "بريطانيا", en: "United Kingdom", region: "other", flag: "🇬🇧" },
  { ar: "أمريكا", en: "United States", region: "america", flag: "🇺🇸" },
  { ar: "اليونان", en: "Greece", region: "schengen", flag: "🇬🇷" },
  { ar: "اليابان", en: "Japan", region: "asia", flag: "🇯🇵" },
  { ar: "تايلاند", en: "Thailand", region: "asia", flag: "🇹🇭" },
  { ar: "عمان", en: "Oman", region: "gulf", flag: "🇴🇲" },
  { ar: "أوغندا", en: "Uganda", region: "africa", flag: "🇺🇬" },
  { ar: "إندونيسيا", en: "Indonesia", region: "asia", flag: "🇮🇩" },
  { ar: "جنوب أفريقيا", en: "South Africa", region: "africa", flag: "🇿🇦" },
  { ar: "تونس", en: "Tunisia", region: "africa", flag: "🇹🇳" },
  { ar: "تنزانيا", en: "Tanzania", region: "africa", flag: "🇹🇿" },
  { ar: "تركيا", en: "Turkey", region: "asia", flag: "🇹🇷" },
  { ar: "سريلانكا", en: "Sri Lanka", region: "asia", flag: "🇱🇰" },
  { ar: "رومانيا", en: "Romania", region: "schengen", flag: "🇷🇴" },
  { ar: "جيبوتي", en: "Djibouti", region: "africa", flag: "🇩🇯" },
  { ar: "غانا", en: "Ghana", region: "africa", flag: "🇬🇭" },
  { ar: "سنغافورة", en: "Singapore", region: "asia", flag: "🇸🇬" },
  { ar: "سويسرا", en: "Switzerland", region: "schengen", flag: "🇨🇭" },
  { ar: "سلوفاكيا", en: "Slovakia", region: "schengen", flag: "🇸🇰" },
  { ar: "فيتنام", en: "Vietnam", region: "asia", flag: "🇻🇳" },
  { ar: "النرويج", en: "Norway", region: "schengen", flag: "🇳🇴" },
  { ar: "كولومبيا", en: "Colombia", region: "america", flag: "🇨🇴" },
  { ar: "كندا", en: "Canada", region: "america", flag: "🇨🇦" },
  { ar: "كمبوديا", en: "Cambodia", region: "asia", flag: "🇰🇭" },
  { ar: "قبرص", en: "Cyprus", region: "other", flag: "🇨🇾" },
  { ar: "ليتوانيا", en: "Lithuania", region: "schengen", flag: "🇱🇹" },
  { ar: "لاوس", en: "Laos", region: "asia", flag: "🇱🇦" },
  { ar: "كينيا", en: "Kenya", region: "africa", flag: "🇰🇪" },
  { ar: "البوسنة", en: "Bosnia", region: "other", flag: "🇧🇦" },
  { ar: "نيجيريا", en: "Nigeria", region: "africa", flag: "🇳🇬" },
  { ar: "كوت ديفوار", en: "Cote d'Ivoire", region: "africa", flag: "🇨🇮" },
];

const labels = {
  ar: {
    title: "استخراج التأشيرات",
    description:
      "اختار الدولة لمعرفة متطلبات التأشيرة السياحية وابدأ تجهيز الملف مع Ease Travel.",
    filters: {
      all: "الكل",
      schengen: "شنغن",
      asia: "آسيا",
      gulf: "الخليج",
      africa: "أفريقيا",
      america: "أمريكا",
    },
    region: {
      schengen: "شنغن",
      asia: "آسيا",
      gulf: "الخليج",
      africa: "أفريقيا",
      america: "أمريكا",
      other: "دول أخرى",
    },
    line: "متطلبات التأشيرة السياحية",
    cta: "اعرف المتطلبات",
    message:
      "لدي استفسار عن متطلبات التأشيرة وأرغب في تجهيز الملف من خلال Ease Travel",
  },
  en: {
    title: "Visa Processing",
    description:
      "Choose a country to check tourist visa requirements and start preparing your file with Ease Travel.",
    filters: {
      all: "All",
      schengen: "Schengen",
      asia: "Asia",
      gulf: "Gulf",
      africa: "Africa",
      america: "America",
    },
    region: {
      schengen: "Schengen",
      asia: "Asia",
      gulf: "Gulf",
      africa: "Africa",
      america: "America",
      other: "Other",
    },
    line: "Tourist visa requirements",
    cta: "Check requirements",
    message:
      "I have a question about visa requirements and would like to prepare my file through Ease Travel",
  },
};

const filterKeys: FilterKey[] = [
  "all",
  "schengen",
  "asia",
  "gulf",
  "africa",
  "america",
];

function whatsappHref(locale: string, country: VisaCountry) {
  const isAr = locale !== "en";
  const t = isAr ? labels.ar : labels.en;
  const countryName = isAr ? country.ar : country.en;
  const message = [t.message, "", `${isAr ? "الدولة" : "Country"}: ${countryName}`].join(
    "\n"
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function VisaCountryGrid({ locale }: { locale: string }) {
  const isAr = locale !== "en";
  const t = isAr ? labels.ar : labels.en;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredCountries = useMemo(() => {
    if (activeFilter === "all") return countries;
    return countries.filter((country) => country.region === activeFilter);
  }, [activeFilter]);

  return (
    <section id="visa-countries" className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className={isAr ? "text-right" : "text-left"}>
            <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
              {t.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              {t.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterKeys.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-extrabold transition ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-blue-950/10"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {filter === "all" && <Filter size={15} aria-hidden="true" />}
                  {t.filters[filter]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {filteredCountries.map((country) => {
            const name = isAr ? country.ar : country.en;
            return (
              <article
                key={country.en}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    {country.flag}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-black text-primary">
                    {t.region[country.region]}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-950">{name}</h3>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                  {t.line}
                </p>
                <WhatsAppTrackedLink
                  href={whatsappHref(locale, country)}
                  ctaLocation={`visa-country-${country.en
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z-]/g, "")}`}
                  sourceType="visa-country-card"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-primary ring-1 ring-primary/15 transition hover:bg-primary hover:text-white"
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  {t.cta}
                </WhatsAppTrackedLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
