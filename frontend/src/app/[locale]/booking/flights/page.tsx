import type { Metadata } from "next";
import FlightsContent from "@/components/FlightsContent";
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
    ? "حجز طيران رخيص من مصر — قارن أسعار تذاكر الطيران | إيز ترافل"
    : "Cheap Flight Booking from Egypt — Compare Airfare Prices | Ease Travel";
  const description = isAr
    ? "قارن أسعار تذاكر الطيران واحجز أرخص رحلات من القاهرة، الإسكندرية، شرم الشيخ والغردقة. حجز طيران داخلي ودولي لأكثر من 200 وجهة عالمية مع إيز ترافل."
    : "Compare airfare prices and book the cheapest flights from Cairo, Alexandria, Sharm El Sheikh & Hurghada. Domestic and international flight booking to 200+ destinations worldwide with Ease Travel.";

  const altLocale = isAr ? "en" : "ar";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/booking/flights`,
      languages: {
        ar: `${SITE_URL}/ar/booking/flights`,
        en: `${SITE_URL}/en/booking/flights`,
        "x-default": `${SITE_URL}/ar/booking/flights`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_EG",
      title,
      description,
      url: `${SITE_URL}/${locale}/booking/flights`,
      siteName: isAr ? "إيز ترافل" : "Ease Travel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: isAr
      ? [
          "حجز طيران",
          "حجز طيران رخيص",
          "تذاكر طيران من مصر",
          "طيران القاهرة اسطنبول",
          "أرخص طيران من القاهرة",
          "حجز طيران داخلي",
          "طيران دولي من مصر",
          "مقارنة أسعار الطيران",
          "طيران شرم الشيخ",
          "حجز رحلات طيران",
          "إيز ترافل",
        ]
      : [
          "flight booking",
          "cheap flights from Egypt",
          "Cairo flights",
          "book flights online",
          "Egypt flight deals",
          "compare airfare",
          "international flights from Cairo",
          "domestic flights Egypt",
          "Ease Travel flights",
        ],
  };
}

export default async function FlightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const homeLabel = isAr ? "الرئيسية" : "Home";
  const flightsLabel = isAr ? "حجز الطيران" : "Flight Booking";

  // WebPage + SearchAction schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: flightsLabel,
    description: isAr
      ? "قارن أسعار تذاكر الطيران واحجز أرخص رحلات من مصر"
      : "Compare airfare prices and book cheapest flights from Egypt",
    url: `${SITE_URL}/${locale}/booking/flights`,
    inLanguage: isAr ? "ar-EG" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
    },
    provider: {
      "@type": "TravelAgency",
      name: isAr ? "إيز ترافل" : "Ease Travel",
      url: SITE_URL,
      telephone: "+201105001389",
      logo: `${SITE_URL}/logo.png`,
      areaServed: { "@type": "Country", name: "Egypt" },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/booking/flights?q={search_term}`,
      "query-input": "required name=search_term",
    },
  };

  // FAQ schema
  const faqsAr = [
    {
      q: "إزاي أحجز أرخص تذكرة طيران من مصر؟",
      a: "استخدم محرك البحث بتاعنا لمقارنة الأسعار من كل شركات الطيران. احجز قبل السفر بـ 3-4 أسابيع على الأقل، واختار أيام الأسبوع بدل عطلة نهاية الأسبوع — التذاكر بتكون أرخص يوم الثلاثاء والأربعاء.",
    },
    {
      q: "هل حجز الطيران عبر إيز ترافل آمن؟",
      a: "بالطبع. إيز ترافل شركة سياحة مرخصة في مصر. محرك البحث بيجيب الأسعار من شركات الطيران مباشرة وبتكمل الحجز على موقع شركة الطيران الرسمي.",
    },
    {
      q: "إيه أشهر الوجهات من القاهرة؟",
      a: "أكثر الوجهات طلباً: اسطنبول، دبي، جدة (عمرة)، شرم الشيخ، الغردقة، كوالالمبور، لندن، وباريس. محرك البحث بيغطي أكثر من 200 وجهة عالمية.",
    },
    {
      q: "هل فيه رسوم إضافية على الحجز؟",
      a: "لا. إيز ترافل بتعرض نفس أسعار شركات الطيران بدون أي رسوم إضافية. السعر اللي بتشوفه هو السعر النهائي.",
    },
    {
      q: "أقدر أحجز طيران داخلي في مصر؟",
      a: "أيوه. بتقدر تبحث عن رحلات داخلية بين القاهرة وشرم الشيخ، الغردقة، الأقصر، أسوان، الإسكندرية وأي مطار داخلي في مصر.",
    },
    {
      q: "إيه الفرق بين الحجز من إيز ترافل ومواقع الحجز التانية؟",
      a: "إيز ترافل بتجمع أسعار من كل شركات الطيران في مكان واحد. بالإضافة إننا شركة سياحة مصرية ممكن نساعدك في الفيزا والفنادق والبرنامج السياحي كامل — مش مجرد تذكرة طيران.",
    },
  ];

  const faqsEn = [
    {
      q: "How do I find the cheapest flight from Egypt?",
      a: "Use our flight search engine to compare prices across all airlines. Book at least 3-4 weeks before your trip, and choose weekdays instead of weekends — Tuesday and Wednesday flights are typically the cheapest.",
    },
    {
      q: "Is booking through Ease Travel safe?",
      a: "Absolutely. Ease Travel is a licensed Egyptian travel agency. Our search engine fetches prices directly from airlines and you complete your booking on the airline's official website.",
    },
    {
      q: "What are the most popular destinations from Cairo?",
      a: "Top destinations: Istanbul, Dubai, Jeddah (Umrah), Sharm El Sheikh, Hurghada, Kuala Lumpur, London, and Paris. Our search engine covers 200+ worldwide destinations.",
    },
    {
      q: "Are there extra fees for booking?",
      a: "No. Ease Travel displays the same airline prices with zero additional fees. The price you see is the final price.",
    },
    {
      q: "Can I book domestic flights within Egypt?",
      a: "Yes. You can search for domestic flights between Cairo and Sharm El Sheikh, Hurghada, Luxor, Aswan, Alexandria and any domestic Egyptian airport.",
    },
    {
      q: "What's the difference between Ease Travel and other booking sites?",
      a: "Ease Travel aggregates prices from all airlines in one place. Plus, as an Egyptian travel agency, we can help you with visa processing, hotels, and complete tour packages — not just a flight ticket.",
    },
  ];

  const faqs = isAr ? faqsAr : faqsEn;

  const faqSchemaData = {
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
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchemaData} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: flightsLabel, url: `${SITE_URL}/${locale}/booking/flights` },
        ])}
      />
      <main>
        <FlightsContent faqs={faqs} />
      </main>
    </>
  );
}
