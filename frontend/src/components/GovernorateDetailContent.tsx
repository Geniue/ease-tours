"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { ApiGovernorate } from "@/lib/api";

export default function GovernorateDetailContent({
  governorate: gov,
}: {
  governorate: ApiGovernorate;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const name = isAr ? gov.name_ar : gov.name_en;
  const capital = isAr ? gov.capital_ar : gov.capital_en;
  const body = isAr ? gov.body_ar : gov.body_en;
  const excerpt = isAr ? gov.excerpt_ar : gov.excerpt_en;
  const region = isAr ? gov.region_ar : gov.region_en;
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  const faqs = (gov.faqs || []).map((faq) => ({
    question: isAr ? faq.question_ar : faq.question_en,
    answer: isAr ? faq.answer_ar : faq.answer_en,
  }));

  // Use place name query so Google Maps renders the administrative boundary (red border)
  const mapQuery = encodeURIComponent(`${gov.name_en} Governorate, Egypt`);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=${gov.map_zoom || 10}&output=embed&hl=${locale}`;

  return (
    <article>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        {gov.cover_image_url && (
          <Image
            src={gov.cover_image_url}
            alt={name}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <Chevron size={14} />
            <Link href="/areas" className="hover:text-white">
              {isAr ? "مناطق الخدمة" : "Service Areas"}
            </Link>
            <Chevron size={14} />
            <span className="text-white font-medium">{name}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {isAr
              ? `خدمات إيز ترافل في ${name}`
              : `Ease Travel Services in ${name}`}
          </h1>
          {excerpt && (
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
              {excerpt}
            </p>
          )}

          {/* Quick Facts Bar */}
          <div className="flex flex-wrap gap-4 mt-8">
            {region && (
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                📍 {isAr ? "المنطقة: " : "Region: "}
                {region}
              </span>
            )}
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              🏛️ {isAr ? "العاصمة: " : "Capital: "}
              {capital}
            </span>
            {gov.population && (
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                👥 {isAr ? "السكان: " : "Population: "}
                {gov.population}
              </span>
            )}
            {gov.area_km2 && (
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                📐 {isAr ? "المساحة: " : "Area: "}
                {gov.area_km2} km²
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Map + Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {gov.featured_image_url && (
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={gov.featured_image_url}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}

              {/* Body Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600 prose-strong:text-gray-900"
                dir={isAr ? "rtl" : "ltr"}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Google Map */}
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-4 bg-blue-900 text-white">
                    <h2 className="text-lg font-bold">
                      {isAr ? `موقع ${capital} على الخريطة` : `${capital} on the Map`}
                    </h2>
                  </div>
                  <div className="aspect-square">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${isAr ? "خريطة" : "Map of"} ${capital}`}
                    />
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
                  <h3 className="text-lg font-bold mb-2">
                    {isAr
                      ? `عايز تحجز من ${name}؟`
                      : `Want to book from ${name}?`}
                  </h3>
                  <p className="text-green-50 text-sm mb-4">
                    {isAr
                      ? "تواصل معنا على الواتساب واحجز رحلتك الآن"
                      : "Contact us on WhatsApp and book your trip now"}
                  </p>
                  <a
                    href="https://wa.me/201551555498"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-green-600 font-bold py-2.5 px-6 rounded-full hover:bg-green-50 transition-colors"
                  >
                    {isAr ? "واتساب الآن" : "WhatsApp Now"}
                  </a>
                  <div className="mt-3 text-green-100 text-xs">
                    {isAr ? "أو اتصل: " : "Or call: "}
                    <a href="tel:+201105001389" className="underline">
                      01105001389
                    </a>
                  </div>
                </div>

                {/* Services Available */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {isAr ? "خدماتنا المتاحة" : "Available Services"}
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: "✈️",
                        ar: "رحلات داخلية وخارجية",
                        en: "Domestic & International Tours",
                      },
                      {
                        icon: "🕋",
                        ar: "حجز عمرة",
                        en: "Umrah Booking",
                      },
                      {
                        icon: "🛂",
                        ar: "استخراج فيزا",
                        en: "Visa Processing",
                      },
                      {
                        icon: "🏨",
                        ar: "حجز فنادق",
                        en: "Hotel Booking",
                      },
                      {
                        icon: "🚌",
                        ar: "نقل سياحي",
                        en: "Tourist Transport",
                      },
                    ].map((svc) => (
                      <li
                        key={svc.en}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <span className="text-xl">{svc.icon}</span>
                        <span>{isAr ? svc.ar : svc.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              {isAr
                ? `أسئلة شائعة عن خدماتنا في ${name}`
                : `FAQs About Our Services in ${name}`}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isAr
              ? `احجز رحلتك من ${name} الآن`
              : `Book Your Trip from ${name} Now`}
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {isAr
              ? "إيز ترافل جاهزة لخدمتك. رحلات سياحية، عمرة، واستخراج فيزا بأفضل الأسعار."
              : "Ease Travel is ready to serve you. Tours, Umrah, and visa services at the best prices."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201551555498"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              {isAr ? "احجز عبر الواتساب" : "Book via WhatsApp"}
            </a>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/30"
            >
              {isAr ? "تصفح الرحلات" : "Browse Tours"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

/* ── FAQ Accordion Item ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-blue-600 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}
