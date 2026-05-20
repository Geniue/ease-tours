import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppTrackedLink from "@/components/WhatsAppTrackedLink";
import { getImageUrl, getVisaGalleryItem } from "@/lib/api";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schemas";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

const monthNames = {
  ar: [
    "",
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  en: [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getVisaGalleryItem(decodeURIComponent(slug));
  if (!item) return {};

  const isAr = locale === "ar";
  const country = isAr ? item.country_ar : item.country_en || item.country_ar;
  const visaType = isAr
    ? item.visa_type_ar
    : item.visa_type_en || item.visa_type_ar;
  const city = isAr ? item.city_ar : item.city_en || item.city_ar;
  const correctSlug = localizedSlug(item, isAr);
  const altLocale = isAr ? "en" : "ar";
  const altSlug = localizedSlug(item, !isAr) || correctSlug;
  const title = isAr
    ? `${country} ${visaType} لعميل من ${city} | Ease Travel`
    : `${country} ${visaType} for Client from ${city} | Ease Travel`;
  const description = isAr
    ? `نموذج تأشيرة ${country} تم العمل عليه من خلال Ease Travel لعميل من ${city}. نساعدك في تجهيز ملف التأشيرة ومراجعة الأوراق قبل التقديم.`
    : `Example of a ${country} ${visaType} handled through Ease Travel for a client from ${city}. We help prepare visa files and review documents before submission.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(
        correctSlug || slug
      )}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(
          correctSlug || slug
        )}`,
        [altLocale]: `${SITE_URL}/${altLocale}/visa-gallery/${encodeURIComponent(
          altSlug || slug
        )}`,
        "x-default": `${SITE_URL}/ar/visa-gallery/${encodeURIComponent(
          item.slug_ar || correctSlug || slug
        )}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isAr ? "ar_EG" : "en_US",
      title,
      description,
      url: `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(
        correctSlug || slug
      )}`,
      ...(item.image_url && {
        images: [{ url: item.image_url, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(item.image_url && { images: [item.image_url] }),
    },
  };
}

export default async function VisaGalleryDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const item = await getVisaGalleryItem(decodeURIComponent(slug));
  if (!item) notFound();

  const isAr = locale === "ar";
  const correctSlug = localizedSlug(item, isAr);
  if (correctSlug && decodeURIComponent(slug) !== correctSlug) {
    redirect(`/${locale}/visa-gallery/${encodeURIComponent(correctSlug)}`);
  }

  const galleryLabel = isAr ? "معرض التأشيرات" : "Visa Gallery";
  const homeLabel = isAr ? "الرئيسية" : "Home";
  const country = isAr ? item.country_ar : item.country_en || item.country_ar;
  const visaType = isAr
    ? item.visa_type_ar
    : item.visa_type_en || item.visa_type_ar;
  const city = isAr ? item.city_ar : item.city_en || item.city_ar;
  const governorate = item.governorate
    ? isAr
      ? item.governorate.name_ar
      : item.governorate.name_en
    : null;
  const title = isAr
    ? `${country} ${visaType} لعميل من ${city}`
    : `${country} ${visaType} for client from ${city}`;
  const summary =
    (isAr ? item.summary_ar : item.summary_en) ||
    (isAr
      ? `نموذج تأشيرة ${country} تم العمل عليه من خلال Ease Travel لعميل من ${city}. نساعدك في تجهيز ملف التأشيرة ومراجعة الأوراق قبل التقديم، مع الحفاظ الكامل على خصوصية بيانات العملاء.`
      : `Example of a ${country} ${visaType} handled through Ease Travel for a client from ${city}. We help prepare the visa file and review documents before submission while protecting client privacy.`);
  const imageSrc = item.image_url || getImageUrl(item.image_path);
  const processed = monthYear(item, isAr);
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const areaSlug = item.governorate
    ? isAr
      ? item.governorate.slug_ar
      : item.governorate.slug_en
    : null;
  const detailFaqs = detailFaqList(isAr, country, visaType, city);
  const pageUrl = `${SITE_URL}/${locale}/visa-gallery/${encodeURIComponent(
    correctSlug || slug
  )}`;
  const whatsappMessage = isAr
    ? `لدي استفسار عن تجهيز ملف ${visaType} ${country} من خلال Ease Travel`
    : `I have a question about preparing a ${country} ${visaType} file through Ease Travel`;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: summary,
    url: pageUrl,
    ...(imageSrc && {
      image: {
        "@type": "ImageObject",
        url: imageSrc,
        caption: isAr
          ? "صورة منقحة لحماية خصوصية العميل"
          : "Redacted image to protect client privacy",
      },
    }),
    publisher: {
      "@type": "TravelAgency",
      name: "Ease Travel",
      url: SITE_URL,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isAr
      ? `تجهيز ملف ${visaType} ${country}`
      : `${country} ${visaType} file preparation`,
    provider: {
      "@type": "TravelAgency",
      name: "Ease Travel",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "City", name: city },
      ...(governorate ? [{ "@type": "AdministrativeArea", name: governorate }] : []),
    ],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: homeLabel, url: `${SITE_URL}/${locale}` },
          { name: galleryLabel, url: `${SITE_URL}/${locale}/visa-gallery` },
          { name: title, url: pageUrl },
        ])}
      />
      {imageSrc && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ImageObject",
            url: imageSrc,
            name: title,
            caption: isAr
              ? "صورة تأشيرة منقحة لحماية الخصوصية"
              : "Redacted visa image for privacy protection",
          }}
        />
      )}
      <JsonLd data={creativeWorkSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(detailFaqs)} />

      <main dir={isAr ? "rtl" : "ltr"} className="bg-slate-50 text-slate-950">
        <section className="bg-primary-dark pt-28 text-white md:pt-32">
          <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
            <Breadcrumbs
              items={[
                { label: galleryLabel, href: "/visa-gallery" },
                { label: title },
              ]}
              variant="dark"
            />
            <div className="mt-8 max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black text-blue-50">
                {isAr
                  ? "تم العمل على الحالة من خلال Ease Travel"
                  : "Visa processed through Ease Travel"}
              </p>
              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-base leading-8 text-blue-50">
                {summary}
              </p>
            </div>
          </div>
        </section>

        <section className="-mt-8 pb-12">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
              <div className="relative aspect-[4/3] bg-slate-100">
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={(isAr ? item.alt_ar : item.alt_en) || title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute inset-x-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-primary shadow-sm">
                  <ShieldCheck size={16} aria-hidden="true" />
                  {isAr
                    ? "صورة منقحة لحماية الخصوصية"
                    : "Redacted image for privacy protection"}
                </span>
              </div>
            </div>

            <aside className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 md:p-6">
              <h2 className="text-xl font-black text-slate-950">
                {isAr ? "تفاصيل الحالة" : "Case Details"}
              </h2>
              <div className="mt-5 space-y-3">
                <DetailRow label={isAr ? "الدولة" : "Country"} value={country} />
                <DetailRow
                  label={isAr ? "نوع التأشيرة" : "Visa type"}
                  value={visaType}
                />
                <DetailRow
                  label={isAr ? "مدينة العميل" : "Client city"}
                  value={governorate ? `${city}, ${governorate}` : city}
                />
                {processed && (
                  <DetailRow
                    label={isAr ? "تاريخ المعالجة" : "Processed"}
                    value={processed}
                    icon={CalendarDays}
                  />
                )}
                {item.processing_days && (
                  <DetailRow
                    label={isAr ? "مدة المعالجة" : "Processing time"}
                    value={
                      isAr
                        ? `${item.processing_days} يوم`
                        : `${item.processing_days} days`
                    }
                    icon={Clock}
                  />
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
                {isAr
                  ? "Final visa decision belongs to the embassy/authority. لا يمكن ضمان قبول التأشيرة، ودورنا هو تجهيز الملف ومراجعة الأوراق حسب المتطلبات."
                  : "Final visa decision belongs to the embassy/authority. Approval cannot be guaranteed; our role is to prepare and review the file according to requirements."}
              </div>

              <WhatsAppTrackedLink
                href={`https://wa.me/201105001389?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                ctaLocation="visa-gallery-detail"
                sourceType="visa-gallery-case"
                sourceId={item.id}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-dark"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {isAr ? "اسأل عن ملف مشابه" : "Ask about a similar file"}
              </WhatsAppTrackedLink>

              {areaSlug && (
                <Link
                  href={`/${locale}/areas/${encodeURIComponent(areaSlug)}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 text-sm font-extrabold text-primary transition hover:bg-primary hover:text-white"
                >
                  <MapPin size={18} aria-hidden="true" />
                  {isAr
                    ? `خدماتنا في ${governorate}`
                    : `Our services in ${governorate}`}
                  <ArrowIcon size={16} aria-hidden="true" />
                </Link>
              )}
            </aside>
          </div>
        </section>

        {item.related_items && item.related_items.length > 0 && (
          <section className="bg-white py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                {isAr ? "حالات تأشيرة ذات صلة" : "Related Visa Cases"}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {item.related_items.map((related) => {
                  const relatedSlug = localizedSlug(related, isAr);
                  const relatedTitle = isAr
                    ? related.title_ar ||
                      `تأشيرة ${related.country_ar} لعميل من ${related.city_ar}`
                    : related.title_en ||
                      `${related.country_en || related.country_ar} visa for client from ${
                        related.city_en || related.city_ar
                      }`;
                  const relatedImage =
                    related.image_url || getImageUrl(related.image_path);

                  return (
                    <Link
                      key={related.id}
                      href={`/${locale}/visa-gallery/${encodeURIComponent(
                        relatedSlug || ""
                      )}`}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100">
                        {relatedImage && (
                          <Image
                            src={relatedImage}
                            alt={relatedTitle}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-black leading-6 text-slate-950 group-hover:text-primary">
                          {relatedTitle}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-6 text-center text-2xl font-black text-slate-950 md:text-3xl">
              {isAr ? "أسئلة عن هذه الحالة" : "Questions About This Case"}
            </h2>
            <div className="space-y-3">
              {detailFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
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

function localizedSlug(
  item: Awaited<ReturnType<typeof getVisaGalleryItem>>,
  isAr: boolean
) {
  if (!item) return null;
  return isAr ? item.slug_ar || item.slug_en : item.slug_en || item.slug_ar;
}

function monthYear(
  item: Awaited<ReturnType<typeof getVisaGalleryItem>>,
  isAr: boolean
) {
  if (!item?.processed_year) return null;
  if (!item.processed_month) return String(item.processed_year);

  return `${monthNames[isAr ? "ar" : "en"][item.processed_month]} ${
    item.processed_year
  }`;
}

function detailFaqList(
  isAr: boolean,
  country: string,
  visaType: string,
  city: string
) {
  return isAr
    ? [
        {
          question: `هل يمكن تجهيز ملف ${visaType} ${country} من ${city}؟`,
          answer:
            "نعم، يمكن لفريق Ease Travel مراجعة متطلبات الدولة وتجهيز ملف التأشيرة حسب حالة العميل والمستندات المطلوبة.",
        },
        {
          question: "هل الصورة المعروضة تحتوي على بيانات شخصية؟",
          answer:
            "لا. يتم نشر الصور فقط بعد إخفاء البيانات الشخصية مثل الاسم، رقم الجواز، رقم التأشيرة، QR، وMRZ.",
        },
        {
          question: "هل قبول التأشيرة مضمون؟",
          answer:
            "لا. القرار النهائي يعود للسفارة أو الجهة المختصة، ولا يمكن لأي شركة سياحة ضمان القبول.",
        },
      ]
    : [
        {
          question: `Can you prepare a ${country} ${visaType} file from ${city}?`,
          answer:
            "Yes. Ease Travel can review destination requirements and help prepare the visa file based on the client case and required documents.",
        },
        {
          question: "Does the displayed image contain personal data?",
          answer:
            "No. Images are published only after hiding personal data such as names, passport numbers, visa numbers, QR codes, and MRZ lines.",
        },
        {
          question: "Is visa approval guaranteed?",
          answer:
            "No. The final decision belongs to the embassy or relevant authority, and no travel agency can guarantee approval.",
        },
      ];
}

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  const DisplayIcon = Icon || MapPin;

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
      <DisplayIcon className="mt-1 shrink-0 text-accent" size={18} aria-hidden="true" />
      <div>
        <p className="text-xs font-black text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-extrabold text-slate-950">{value}</p>
      </div>
    </div>
  );
}
