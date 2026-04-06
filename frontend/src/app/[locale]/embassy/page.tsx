import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmbassyList from "@/components/EmbassyList";
import { getEmbassies } from "@/lib/api";
import { JsonLd, organizationSchema, breadcrumbSchema } from "@/lib/schemas";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "مواعيد السفارات وفتح حجز المواعيد - إيز ترافل"
    : "Embassy Appointment Times & Visa Booking Status - Ease Travel";
  const description = isAr
    ? "تعرف على مواعيد فتح وغلق حجز مواعيد السفارات، أقرب معاد متاح للتقديم على التأشيرة، وأسعار مواعيد السفارات. سفارات اسبانيا، المانيا، ايطاليا، فرنسا، امريكا، انجلترا وأكثر."
    : "Check embassy appointment opening and closing times, next available visa application dates, and appointment prices. Spain, Germany, Italy, France, USA, UK embassies and more.";
  const altLocale = isAr ? "en" : "ar";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/embassy`,
      languages: {
        [locale]: `/${locale}/embassy`,
        [altLocale]: `/${altLocale}/embassy`,
        "x-default": `/ar/embassy`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description,
      url: `${SITE_URL}/${locale}/embassy`,
      siteName: isAr ? "إيز ترافل" : "Ease Travel",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function EmbassyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const embassies = await getEmbassies();
  const isAr = locale === "ar";

  const breadcrumbs = breadcrumbSchema([
    {
      name: isAr ? "الرئيسية" : "Home",
      url: `${SITE_URL}/${locale}`,
    },
    {
      name: isAr ? "مواعيد السفارات" : "Embassy Appointments",
      url: `${SITE_URL}/${locale}/embassy`,
    },
  ]);

  // GovernmentService schema for each embassy
  const embassySchemas = embassies.map((e) => ({
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: isAr
      ? `سفارة ${e.country_name_ar} - حجز موعد تأشيرة`
      : `${e.country_name_en} Embassy - Visa Appointment`,
    description: isAr
      ? `حالة حجز مواعيد سفارة ${e.country_name_ar}: ${
          e.appointment_status === "open"
            ? "مفتوح للحجز"
            : e.appointment_status === "stopped"
            ? "متوقف حتى إشعار آخر"
            : "مغلق حالياً"
        }${e.next_open_date ? ` - أقرب موعد: ${e.next_open_date}` : ""}${
          e.appointment_price ? ` - السعر: ${e.appointment_price} ${e.price_currency}` : ""
        }`
      : `${e.country_name_en} Embassy appointment status: ${
          e.appointment_status === "open"
            ? "Open for booking"
            : e.appointment_status === "stopped"
            ? "Stopped until further notice"
            : "Currently closed"
        }${e.next_open_date ? ` - Next date: ${e.next_open_date}` : ""}${
          e.appointment_price ? ` - Price: ${e.appointment_price} ${e.price_currency}` : ""
        }`,
    serviceType: "Visa Appointment Booking",
    provider: {
      "@type": "TravelAgency",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: isAr ? e.country_name_ar : e.country_name_en,
    },
    ...(e.appointment_price && {
      offers: {
        "@type": "Offer",
        price: parseFloat(e.appointment_price),
        priceCurrency: e.price_currency,
        availability:
          e.appointment_status === "open"
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
      },
    }),
  }));

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={breadcrumbs} />
      {embassySchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navbar />
      <main>
        <EmbassyHero />

        {/* SEO intro content */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-gray-700">
              {isAr ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    مواعيد السفارات وحجز التأشيرات
                  </h2>
                  <p className="leading-relaxed mb-4">
                    هل تبحث عن <strong>أقرب موعد سفارة متاح</strong> للتقديم على
                    التأشيرة؟ في إيز ترافل نوفر لك معلومات محدثة عن{" "}
                    <strong>مواعيد فتح وغلق حجز مواعيد السفارات</strong> في مصر
                    بما في ذلك سفارات اسبانيا، المانيا، ايطاليا، فرنسا، هولندا،
                    امريكا، انجلترا، قبرص، اليونان، البرتغال، المجر، البرازيل،
                    كرواتيا، التشيك، وبولندا.
                  </p>
                  <p className="leading-relaxed">
                    اختر السفارة من القائمة أدناه لمعرفة{" "}
                    <strong>حالة الحجز</strong>، <strong>أقرب تاريخ متاح</strong>
                    ، <strong>سعر الموعد</strong>، وأي ملاحظات خاصة بالتأشيرات
                    المتوقفة. يمكنك أيضاً التواصل معنا مباشرة عبر واتساب لحجز
                    موعدك.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Embassy Appointment Times & Visa Booking
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Looking for the{" "}
                    <strong>nearest available embassy appointment</strong> to
                    apply for a visa? At Ease Travel, we provide up-to-date
                    information on{" "}
                    <strong>
                      embassy appointment opening and closing schedules
                    </strong>{" "}
                    in Egypt, including embassies of Spain, Germany, Italy,
                    France, Netherlands, USA, UK, Cyprus, Greece, Portugal,
                    Hungary, Brazil, Croatia, Czech Republic, and Poland.
                  </p>
                  <p className="leading-relaxed">
                    Select an embassy from the list below to see the{" "}
                    <strong>booking status</strong>,{" "}
                    <strong>next available date</strong>,{" "}
                    <strong>appointment price</strong>, and any notes about
                    suspended visa types. You can also contact us directly via
                    WhatsApp to book your appointment.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Embassy list section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <EmbassyList embassies={embassies} />
          </div>
        </section>

        {/* FAQ section for SEO */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <EmbassyFAQ />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function EmbassyHero() {
  const t = useTranslations("embassy");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1554672408-17407e0322ce?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}

function EmbassyFAQ() {
  const t = useTranslations("embassy");
  const locale = useLocale();
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        {
          q: "إزاي أعرف أقرب موعد سفارة متاح؟",
          a: "اختر السفارة من القائمة في الصفحة دي وهتلاقي حالة الحجز وأقرب تاريخ متاح. لو السفارة مفتوحة للحجز، هتلاقي تاريخ الإغلاق. لو مغلقة، هتلاقي تاريخ الفتح القادم.",
        },
        {
          q: "بكام موعد السفارة؟",
          a: "أسعار المواعيد بتختلف من سفارة للتانية. اختر السفارة من القائمة وهتلاقي السعر المحدث. تواصل معانا على واتساب لمزيد من التفاصيل.",
        },
        {
          q: "إيه معنى إن السفارة متوقفة حتى إشعار آخر؟",
          a: "يعني السفارة أوقفت استقبال طلبات التأشيرة مؤقتاً ومفيش تاريخ محدد لإعادة الفتح. تابعنا للتحديثات أول ما الوضع يتغير.",
        },
        {
          q: "إزاي أحجز موعد سفارة من خلال إيز ترافل؟",
          a: "تواصل معانا على واتساب أو تليفون وهنساعدك في حجز الموعد وتجهيز كل الأوراق المطلوبة.",
        },
      ]
    : [
        {
          q: "How do I find the nearest available embassy appointment?",
          a: "Select the embassy from the list on this page and you'll see the booking status and next available date. If the embassy is open, you'll see the closing date. If closed, you'll find the next opening date.",
        },
        {
          q: "How much does an embassy appointment cost?",
          a: "Appointment prices vary by embassy. Select the embassy from the list to see the updated price. Contact us on WhatsApp for more details.",
        },
        {
          q: "What does 'Stopped until further notice' mean?",
          a: "It means the embassy has temporarily suspended visa applications with no specific reopening date. Follow our updates for the latest status changes.",
        },
        {
          q: "How can I book an embassy appointment through Ease Travel?",
          a: "Contact us via WhatsApp or phone and we'll help you book the appointment and prepare all required documents.",
        },
      ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isAr ? "أسئلة شائعة عن مواعيد السفارات" : "Embassy Appointment FAQs"}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
          >
            <summary className="p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors list-none flex justify-between items-center">
              {faq.q}
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-4 pb-4 text-gray-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      {/* FAQPage schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />
    </div>
  );
}
