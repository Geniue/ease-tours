import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import HtmlAttrs from "@/components/HtmlAttrs";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const altLocale = locale === "ar" ? "en" : "ar";

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    robots: "index, follow",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}`,
        [altLocale]: `${SITE_URL}/${altLocale}`,
        "x-default": `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: locale === "ar" ? "إيز ترافل" : "Ease Travel",
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      images: [{ url: `${SITE_URL}/logo.png`, width: 512, height: 512, alt: "Ease Travel" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/logo.png`],
    },
    icons: {
      icon: "/fav-ico.png",
      apple: "/fav-ico.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className={`${cairo.variable} min-h-screen flex flex-col font-[family-name:var(--font-cairo)] antialiased`}>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HtmlAttrs />
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
