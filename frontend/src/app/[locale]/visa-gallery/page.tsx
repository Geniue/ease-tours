import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VisaGalleryGrid from "@/components/VisaGalleryGrid";
import WhatsAppTrackedLink from "@/components/WhatsAppTrackedLink";
import { getVisaGallery } from "@/lib/api";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  JsonLd,
} from "@/lib/schemas";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type Faq = {
  question: string;
  answer: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";
const WHATSAPP_MESSAGE_AR =
  "لدي استفسار عن تجهيز ملف تأشيرة وأرغب في التواصل مع Ease Travel";
const WHATSAPP_MESSAGE_EN =
  "I have a question about preparing a visa file through Ease Travel";

const fallbackCities = [
  { ar: "بنها", en: "Banha" },
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الإسكندرية", en: "Alexandria" },
  { ar: "أسوان", en: "Aswan" },
  { ar: "الجيزة", en: "Giza" },
  { ar: "المنصورة", en: "Mansoura" },
  { ar: "طنطا", en: "Tanta" },
  { ar: "الزقازيق", en: "Zagazig" },
];

const faqs = {
  ar: [
    {
      question: "هل هذه التأشيرات حقيقية؟",
      answer:
        "نعم، المعرض يعرض نماذج عامة وآمنة لحالات تأشيرات تم العمل عليها من خلال Ease Travel، مع إخفاء أي بيانات شخصية قبل النشر.",
    },
    {
      question: "هل يتم إخفاء بيانات العملاء؟",
      answer:
        "نعم. لا ننشر أسماء العملاء أو أرقام الجوازات أو أرقام التأشيرات أو تواريخ الميلاد أو QR أو MRZ أو أي بيانات تعريف شخصية.",
    },
    {
      question: "هل تضمن Ease Travel قبول التأشيرة؟",
      answer:
        "لا. قبول التأشيرة لا يمكن ضمانه، لأن القرار النهائي يعود للسفارة أو الجهة المختصة. دورنا هو تجهيز الملف ومراجعة الأوراق.",
    },
    {
      question: "هل تقدمون خدمات التأشيرات من بنها؟",
      answer:
        "نعم، نساعد عملاء بنها والقليوبية في تجهيز ملفات التأشيرات، مراجعة الأوراق، وحجز مواعيد السفارات أو مراكز التأشيرات عند توفر الخدمة.",
    },
    {
      question: "هل تقدمون خدمات التأشيرات من القاهرة؟",
      answer:
        "نعم، نقدم خدمات التأشيرات من القاهرة ومختلف محافظات مصر، مع متابعة متطلبات السفارات ومراكز التأشيرات حسب الدولة.",
    },
    {
      question: "هل تساعدون في تجهيز ملف شنغن؟",
      answer:
        "نعم، نساعد في تجهيز ملف فيزا شنغن، مراجعة كشف الحساب، الحجوزات، التأمين، وخطابات العمل أو الدراسة حسب حالة العميل.",
    },
    {
      question: "هل تساعدون في حجز موعد السفارة؟",
      answer:
        "نساعد في خطوات حجز موعد السفارة أو مركز التأشيرات عندما تكون الخدمة متاحة حسب الدولة ونظام الحجز المستخدم.",
    },
    {
      question: "كيف أبدأ تجهيز ملف التأشيرة؟",
      answer:
        "أرسل اسم الدولة، نوع التأشيرة، مدينتك، وموعد السفر المتوقع عبر واتساب، وسيقوم فريق Ease Travel بتوضيح الخطوات المطلوبة.",
    },
  ] satisfies Faq[],
  en: [
    {
      question: "Are these real visas?",
      answer:
        "Yes. The gallery shows public-safe examples of visa cases handled through Ease Travel, with personal data removed before publishing.",
    },
    {
      question: "Do you hide client data?",
      answer:
        "Yes. We do not publish client names, passport numbers, visa numbers, dates of birth, QR codes, MRZ lines, or personal identifiers.",
    },
    {
      question: "Does Ease Travel guarantee visa approval?",
      answer:
        "No. Visa approval cannot be guaranteed because the final decision belongs to the embassy or relevant authority. We prepare and review the file.",
    },
    {
      question: "Do you offer visa services from Banha?",
      answer:
        "Yes. We help clients from Banha and Qalyubia prepare visa files, review documents, and follow embassy or visa center appointment steps when available.",
    },
    {
      question: "Do you offer visa services from Cairo?",
      answer:
        "Yes. We provide visa services from Cairo and across Egypt, with destination-specific embassy and visa center requirement guidance.",
    },
    {
      question: "Can you help prepare a Schengen file?",
      answer:
        "Yes. We help prepare Schengen visa files, including bank statement review, bookings, insurance, and employment or study letters based on the client case.",
    },
    {
      question: "Do you help book embassy appointments?",
      answer:
        "We can guide or assist with embassy and visa center appointment steps when the service is available for the destination and booking system.",
    },
    {
      question: "How do I start preparing my visa file?",
      answer:
        "Send the country, visa type, city, and expected travel date on WhatsApp. Ease Travel will explain the required next steps.",
    },
  ] satisfies Faq[],
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "معرض التأشيرات المنفذة | Ease Travel"
    : "Processed Visas Gallery | Ease Travel";
  const description = isAr
    ? "شاهد نماذج تأشيرات سياحية تم تنفيذها عبر Ease Travel لعملاء من محافظات مصر مع تجهيز ملفات الفيزا ومراجعة الأوراق."
    : "See redacted examples of tourist visas processed through Ease Travel for clients across Egypt, with visa file preparation and document review.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/visa-gallery`,
      languages: {
        ar: `${SITE_URL}/ar/visa-gallery`,
        en: `${SITE_URL}/en/visa-gallery`,
        "x-default": `${SITE_URL}/ar/visa-gallery`,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_EG",
      title,
      description,
      url: `${SITE_URL}/${locale}/visa-gallery`,
      siteName: "Ease Travel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function pickSearchValue(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string
) {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function whatsappHref(isAr: boolean) {
  return `https://wa.me/201105001389?text=${encodeURIComponent(
    isAr ? WHATSAPP_MESSAGE_AR : WHATSAPP_MESSAGE_EN
  )}`;
}

export default async function VisaGalleryPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const region = pickSearchValue(resolvedSearchParams, "region");
  const city = pickSearchValue(resolvedSearchParams, "city");
  const governorateId = pickSearchValue(resolvedSearchParams, "governorate_id");

  const { data: items } = await getVisaGallery({
    per_page: "60",
    fields: "card",
    ...(region ? { region } : {}),
    ...(city ? { city } : {}),
    ...(governorateId ? { governorate_id: governorateId } : {}),
  });

  const pageTitle = isAr
    ? "معرض التأشيرات المنفذة من Ease Travel"
    : "Processed Visas Gallery by Ease Travel";
  const galleryLabel = isAr ? "معرض التأشيرات" : "Visa Gallery";
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const faqList = isAr ? faqs.ar : faqs.en;
  const cityChips = buildCityChips(items, locale);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => {
      const slug = isAr ? item.slug_ar || item.slug_en : item.slug_en || item.slug_ar;
      const name = isAr
        ? item.title_ar || `تأشيرة ${item.country_ar} لعميل من ${item.city_ar}`
        : item.title_en ||
          `${item.country_en || item.country_ar} visa for client from ${
            item.city_en || item.city_ar
          }`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name,
          url: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(slug || "")}`,
          ...(item.image_url && { image: item.image_url }),
        },
      };
    }),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isAr ? "خدمات التأشيرات السياحية في مصر" : "Tourist visa services in Egypt",
    provider: {
      "@type": "TravelAgency",
      name: "Ease Travel",
      url: SITE_URL,
    },
    serviceType: "Visa file preparation and document review",
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      ...fallbackCities.map((fallbackCity) => ({
        "@type": "City",
        name: isAr ? fallbackCity.ar : fallbackCity.en,
      })),
    ],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: galleryLabel, url: `${SITE_URL}/${locale}/visa-gallery` },
        ])}
      />
      <JsonLd
        data={collectionPageSchema({
          name: pageTitle,
          description: isAr
            ? "نماذج تأشيرات سياحية منقحة تم تنفيذها من خلال Ease Travel لعملاء من محافظات مصر."
            : "Redacted tourist visa examples processed through Ease Travel for clients across Egypt.",
          url: `${SITE_URL}/${locale}/visa-gallery`,
          locale,
          itemCount: items.length,
        })}
      />
      <JsonLd data={itemListSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqList)} />

      <main dir={isAr ? "rtl" : "ltr"} className="bg-slate-50 text-slate-950">
        <section className="relative overflow-hidden bg-primary-dark pt-28 text-white md:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.32),transparent_34%),linear-gradient(135deg,rgba(26,115,167,0.95),rgba(20,90,130,1))]" />
          <div className="relative mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-20">
            <Breadcrumbs items={[{ label: galleryLabel }]} variant="dark" />
            <div className="mt-10 max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black text-blue-50">
                {pageTitle}
              </p>
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                {isAr
                  ? "تأشيرات تم تنفيذها من خلال Ease Travel"
                  : "Visas Processed Through Ease Travel"}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50 md:text-lg">
                {isAr
                  ? "نماذج من طلبات تأشيرات سياحية تم العمل عليها لعملاء من محافظات ومدن مختلفة داخل مصر، مع الحفاظ الكامل على خصوصية بيانات العملاء."
                  : "Examples of tourist visa applications handled for clients from different cities and governorates across Egypt, with full protection of client privacy."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppTrackedLink
                  href={whatsappHref(isAr)}
                  ctaLocation="visa-gallery-hero"
                  sourceType="visa-gallery"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-amber-950/20 transition hover:bg-accent-dark"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {isAr ? "ابدأ تجهيز ملفك" : "Start your visa file"}
                </WhatsAppTrackedLink>
                <Link
                  href={`/${locale}/visa-requirements`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  {isAr ? "اعرف متطلبات التأشيرة" : "Check visa requirements"}
                  <ArrowIcon size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="prose prose-slate max-w-none text-slate-700">
              {isAr ? (
                <>
                  <h2>خدمات التأشيرات في مصر وتجهيز ملفات الفيزا</h2>
                  <p>
                    يساعدك معرض التأشيرات المنفذة من Ease Travel على رؤية نماذج
                    آمنة من خبرتنا في <strong>تأشيرات سياحية من مصر</strong>،
                    مثل <strong>فيزا شنغن</strong>،{" "}
                    <strong>تأشيرة أوروبا</strong>،{" "}
                    <strong>تأشيرة الإمارات</strong>،{" "}
                    <strong>تأشيرة اليابان</strong>، وملفات{" "}
                    <strong>تأشيرة أمريكا وكندا</strong>. نساعد العملاء في{" "}
                    <strong>تجهيز ملف التأشيرة</strong>،{" "}
                    <strong>مراجعة أوراق السفر</strong>، وترتيب خطوات{" "}
                    <strong>حجز موعد السفارة</strong> أو مركز التأشيرات حسب
                    الدولة.
                  </p>
                  <p>
                    نقدم <strong>خدمات التأشيرات في مصر</strong> لعملاء من بنها،
                    القاهرة، الإسكندرية، أسوان، الجيزة، المنصورة، طنطا،
                    الزقازيق، وباقي المحافظات. الصور المعروضة هنا منقحة وآمنة
                    للنشر، والغرض منها بناء الثقة وإظهار نطاق الخبرة بدون كشف
                    أي بيانات شخصية.
                  </p>
                </>
              ) : (
                <>
                  <h2>Visa services in Egypt and visa file preparation</h2>
                  <p>
                    The Ease Travel processed visas gallery shows public-safe
                    examples of our experience with{" "}
                    <strong>tourist visas from Egypt</strong>, including{" "}
                    <strong>Schengen visas</strong>, European visas, UAE visas,
                    Japan visas, and USA or Canada visa files. We help with{" "}
                    <strong>visa file preparation</strong>,{" "}
                    <strong>travel document review</strong>, and embassy or visa
                    center appointment steps based on the destination.
                  </p>
                  <p>
                    We support visa service requests from Banha, Cairo,
                    Alexandria, Aswan, Giza, Mansoura, Tanta, Zagazig, and other
                    Egyptian governorates. Images shown here are redacted and
                    safe for public display, with no personal client data.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                  {galleryLabel}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  {isAr
                    ? "فلتر الحالات حسب نوع التأشيرة أو المدينة وشاهد نماذج منقحة لحماية الخصوصية."
                    : "Filter cases by visa region or city and view redacted examples protected for privacy."}
                </p>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-primary/25 bg-white p-7 text-center shadow-sm">
                <h3 className="text-xl font-black text-slate-950">
                  {isAr
                    ? "لم يتم نشر نماذج تأشيرات بعد"
                    : "No visa examples published yet"}
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  {isAr
                    ? "سيتم إضافة نماذج التأشيرات بعد رفع صور منقحة تحافظ على خصوصية بيانات العملاء."
                    : "Visa examples will be added after redacted images are uploaded and approved for public display."}
                </p>
              </div>
            ) : (
              <VisaGalleryGrid
                items={items}
                locale={locale}
                initialRegion={isRegion(region) ? region : "all"}
                initialCity={city}
                initialGovernorateId={governorateId}
              />
            )}
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              {isAr
                ? "خدمات التأشيرات لعملاء من مختلف محافظات مصر"
                : "Visa services for clients across Egypt"}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 md:text-base">
              {isAr
                ? "نساعد العملاء في تجهيز ملفات التأشيرات من القاهرة، الجيزة، بنها، الإسكندرية، أسوان، المنصورة، طنطا، الزقازيق، وباقي محافظات مصر."
                : "We help clients prepare visa files from Cairo, Giza, Banha, Alexandria, Aswan, Mansoura, Tanta, Zagazig, and the rest of Egypt's governorates."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cityChips.map((chip) => (
                <Link
                  key={`${chip.label}-${chip.href}`}
                  href={chip.href}
                  className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-extrabold text-primary transition hover:bg-primary hover:text-white"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              <ShieldCheck
                className="mt-1 shrink-0 text-accent"
                size={22}
                aria-hidden="true"
              />
              <p>
                {isAr
                  ? "يتم عرض الصور بعد إخفاء البيانات الشخصية بالكامل. قبول التأشيرة لا يمكن ضمانه، لأن القرار النهائي يعود للسفارة أو الجهة المختصة."
                  : "Images are displayed only after personal data is fully hidden. Visa approval cannot be guaranteed because the final decision belongs to the embassy or relevant authority."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-6 text-center text-2xl font-black text-slate-950 md:text-3xl">
              {isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3">
              {faqList.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-base font-extrabold text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function isRegion(
  value: string
): value is "schengen" | "gulf" | "asia" | "africa" | "america" | "europe" | "other" {
  return [
    "schengen",
    "gulf",
    "asia",
    "africa",
    "america",
    "europe",
    "other",
  ].includes(value);
}

function buildCityChips(items: Awaited<ReturnType<typeof getVisaGallery>>["data"], locale: string) {
  const isAr = locale === "ar";
  const chips = new Map<string, { label: string; href: string }>();

  items.forEach((item) => {
    const label = isAr ? item.city_ar : item.city_en || item.city_ar;
    const govSlug = item.governorate
      ? isAr
        ? item.governorate.slug_ar
        : item.governorate.slug_en
      : null;
    const href = govSlug
      ? `/${locale}/areas/${encodeURIComponent(govSlug)}`
      : `/${locale}/visa-gallery?city=${encodeURIComponent(label)}`;
    chips.set(label, { label, href });
  });

  fallbackCities.forEach((city) => {
    const label = isAr ? city.ar : city.en;
    if (!chips.has(label)) {
      chips.set(label, {
        label,
        href: `/${locale}/visa-gallery?city=${encodeURIComponent(label)}`,
      });
    }
  });

  return Array.from(chips.values());
}
