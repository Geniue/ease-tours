import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

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
      <main>
        <ContactContent />
      </main>
    </>
  );
}
