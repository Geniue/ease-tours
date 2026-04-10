import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { JsonLd, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "تواصل معنا" : "Contact Us";
  const description = isAr
    ? "تواصل مع إيز ترافل عبر الهاتف أو الواتساب أو البريد الإلكتروني. نسعد بخدمتك في أي وقت."
    : "Contact Ease Travel via phone, WhatsApp, or email. We're happy to serve you anytime.";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: { [locale]: `${SITE_URL}/${locale}/contact`, [altLocale]: `${SITE_URL}/${altLocale}/contact`, "x-default": `${SITE_URL}/ar/contact` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/contact` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", url: `${SITE_URL}/ar` },
        { name: "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627", url: `${SITE_URL}/ar/contact` },
      ])} />
      <main>
        <ContactContent />
      </main>
    </>
  );
}
