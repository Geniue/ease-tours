import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import Script from "next/script";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schemas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    robots: "index, follow",
    metadataBase: new URL(SITE_URL),
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
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <div className={`${cairo.variable} min-h-screen flex flex-col font-[family-name:var(--font-cairo)] antialiased`}>
          <JsonLd data={organizationSchema(locale)} />
          <JsonLd data={websiteSchema(locale)} />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </div>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="zYKVFyEjUTFYgD8B6w/WVg"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18050243563"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage':          'denied',
              'ad_user_data':        'denied',
              'ad_personalization':  'denied',
              'analytics_storage':   'denied',
              'wait_for_update':     500
            });
            gtag('js', new Date());
            gtag('config', 'AW-18050243563');
          `}
        </Script>
      </body>
    </html>
  );
}
