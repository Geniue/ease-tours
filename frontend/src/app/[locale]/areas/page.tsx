import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getGovernorates, getImageUrl } from "@/lib/api";
import { JsonLd, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "مناطق خدمتنا في مصر | إيز ترافل — شركة سياحة تخدم جميع المحافظات"
    : "Our Service Areas in Egypt | Ease Travel — Serving All Governorates";
  const description = isAr
    ? "إيز ترافل تخدم جميع محافظات مصر الـ 27. رحلات داخلية وخارجية، عمرة، واستخراج فيزا من أي محافظة. احجز أونلاين الآن!"
    : "Ease Travel serves all 27 Egyptian governorates. Domestic tours, international trips, Umrah, and visa services from any governorate. Book online now!";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/areas`,
      languages: {
        ar: `${SITE_URL}/ar/areas`,
        en: `${SITE_URL}/en/areas`,
        "x-default": `${SITE_URL}/ar/areas`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description,
      url: `${SITE_URL}/${locale}/areas`,
    },
  };
}

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const governorates = await getGovernorates();

  const homeLabel = isAr ? "الرئيسية" : "Home";
  const areasLabel = isAr ? "مناطق الخدمة" : "Service Areas";

  // Group by region
  const regions = governorates.reduce(
    (acc, gov) => {
      const region = isAr ? (gov.region_ar || "أخرى") : (gov.region_en || "Other");
      if (!acc[region]) acc[region] = [];
      acc[region].push(gov);
      return acc;
    },
    {} as Record<string, typeof governorates>
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: areasLabel, url: `${SITE_URL}/${locale}/areas` },
        ])}
      />
      <Navbar />
      <main dir={isAr ? "rtl" : "ltr"}>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {isAr
                ? "إيز ترافل تخدم جميع محافظات مصر"
                : "Ease Travel Serves All Egyptian Governorates"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {isAr
                ? "27 محافظة — خدمة واحدة متميزة. احجز رحلتك من أي مكان في مصر عبر الإنترنت أو الواتساب."
                : "27 governorates — one exceptional service. Book your trip from anywhere in Egypt online or via WhatsApp."}
            </p>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {Object.entries(regions).map(([region, govs]) => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2 inline-block">
                  {region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {govs.map((gov) => {
                    const name = isAr ? gov.name_ar : gov.name_en;
                    const capital = isAr ? gov.capital_ar : gov.capital_en;
                    const excerpt = isAr ? gov.excerpt_ar : gov.excerpt_en;
                    const slug = isAr ? gov.slug_ar : gov.slug_en;
                    const imgUrl = getImageUrl(gov.featured_image);

                    return (
                      <Link
                        key={gov.id}
                        href={`/${locale}/areas/${encodeURIComponent(slug)}`}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                          {imgUrl ? (
                            <Image
                              src={imgUrl}
                              alt={name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <svg
                                className="w-16 h-16 text-blue-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          )}
                          {gov.is_featured && (
                            <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                              {isAr ? "مميز" : "Featured"}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {isAr ? "العاصمة: " : "Capital: "}
                            {capital}
                          </p>
                          {excerpt && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                            {gov.population && (
                              <span>👥 {gov.population}</span>
                            )}
                            {gov.area_km2 && (
                              <span>📐 {gov.area_km2} km²</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isAr
                ? "مش لاقي محافظتك؟ تواصل معنا!"
                : "Can't find your governorate? Contact us!"}
            </h2>
            <p className="text-blue-100 mb-6">
              {isAr
                ? "إيز ترافل تخدم كل مكان في مصر. تواصل معنا على الواتساب واحجز رحلتك."
                : "Ease Travel serves everywhere in Egypt. Contact us on WhatsApp and book your trip."}
            </p>
            <a
              href="https://wa.me/201551555498"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.591-.838-6.311-2.236l-.44-.362-3.22 1.08 1.08-3.22-.362-.44A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {isAr ? "تواصل واتساب" : "WhatsApp Us"}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
