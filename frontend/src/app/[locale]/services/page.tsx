import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceGrid from "@/components/ServiceGrid";
import { getServicesPaginated } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "خدماتنا - إيز ترافل للسياحة"
    : "Our Services - Ease Travel Tourism";
  const description = isAr
    ? "تعرف على جميع خدمات إيز ترافل: حجز طيران، فنادق، تأشيرات، رحلات جماعية، شهر عسل، سياحة داخلية ودينية، واستشارات سفر"
    : "Discover all Ease Travel services: flight booking, hotels, visas, group tours, honeymoon, domestic and religious tourism, and travel consultation";
  const altLocale = isAr ? "en" : "ar";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        [locale]: `/${locale}/services`,
        [altLocale]: `/${altLocale}/services`,
        "x-default": `/ar/services`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description,
      url: `${SITE_URL}/${locale}/services`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicesPage() {
  const { data: services, meta } = await getServicesPaginated({ page: "1" });

  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ServiceGrid initialServices={services} initialMeta={meta} />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function ServicesHero() {
  const t = useTranslations("services");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
