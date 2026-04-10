import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Shield, Eye, Target, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "من نحن - إيز ترافل" : "About Us - Ease Travel";
  const description = isAr
    ? "تعرف على شركة إيز ترافل للسياحة - شركة سياحة مصرية رائدة متخصصة في الحج والعمرة والسياحة الداخلية والخارجية"
    : "Learn about Ease Travel Tourism Company - a leading Egyptian travel agency specializing in Hajj, Umrah, domestic and outbound tourism";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: { [locale]: `${SITE_URL}/${locale}/about`, [altLocale]: `${SITE_URL}/${altLocale}/about`, "x-default": `${SITE_URL}/ar/about` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/about` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://ease-travel.online/ar" },
        { name: "من نحن", url: "https://ease-travel.online/ar/about" },
      ])} />
      <main>
        <AboutContent />
      </main>
    </>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  const values = [
    { icon: Shield, text: t("value1") },
    { icon: Eye, text: t("value2") },
    { icon: Target, text: t("value3") },
    { icon: Users, text: t("value4") },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 inset-x-0 z-10 pt-24">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: t("title") }]} variant="dark" />
          </div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl md:text-2xl text-white/90">{t("subtitle")}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg leading-relaxed text-gray-700 text-center">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1a73a7] mb-4">
                {t("mission")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("missionText")}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1a73a7] mb-4">
                {t("vision")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("visionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1a73a7]">
            {t("values")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow"
              >
                <v.icon className="w-12 h-12 text-[#f59e0b] mb-4" />
                <p className="font-semibold text-gray-800">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
