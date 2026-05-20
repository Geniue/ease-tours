import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Images, MapPinned } from "lucide-react";
import VisaRequirementsContent, {
  getVisaRequirementsCopy,
} from "@/components/VisaRequirementsContent";
import { getEmbassies, getServices } from "@/lib/api";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schemas";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const altLocale = isAr ? "en" : "ar";
  const title = isAr
    ? "متطلبات التأشيرات السياحية | Ease Travel"
    : "Tourist Visa Requirements | Ease Travel";
  const description = isAr
    ? "اعرف متطلبات التأشيرات السياحية من مصر وجهز ملفك مع Ease Travel لخدمات الفيزا، المواعيد، ومراجعة الأوراق قبل التقديم."
    : "Check tourist visa requirements from Egypt and prepare your application with Ease Travel visa experts.";
  const url = `${SITE_URL}/${locale}/visa-requirements`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [altLocale]: `${SITE_URL}/${altLocale}/visa-requirements`,
        "x-default": `${SITE_URL}/ar/visa-requirements`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Ease Travel",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_EG",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/hero-travel.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/hero-travel.jpg`],
    },
  };
}

export default async function VisaRequirementsPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const copy = getVisaRequirementsCopy(locale);

  const [embassies, services] = await Promise.all([
    getEmbassies().catch(() => []),
    getServices({ all: "1", fields: "card" }).catch(() => []),
  ]);

  const visaServicesCount = services.filter((service) => {
    const haystack = [
      service.title_ar,
      service.title_en,
      service.excerpt_ar,
      service.excerpt_en,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      haystack.includes("visa") ||
      haystack.includes("فيزا") ||
      haystack.includes("تأش")
    );
  }).length;

  const breadcrumbs = isAr
    ? [
        { name: "الرئيسية", url: `${SITE_URL}/ar` },
        {
          name: "خدمات التأشيرات",
          url: `${SITE_URL}/ar/visa-requirements`,
        },
      ]
    : [
        { name: "Home", url: `${SITE_URL}/en` },
        {
          name: "Visa Requirements",
          url: `${SITE_URL}/en/visa-requirements`,
        },
      ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(copy.faqs)} />
      <main>
        <VisaRequirementsContent
          locale={locale}
          embassyCount={embassies.length}
          visaServicesCount={visaServicesCount}
        />
        <VisaRequirementsInternalLinks locale={locale} />
      </main>
    </>
  );
}

function VisaRequirementsInternalLinks({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const links = [
    {
      href: `/${locale}/visa-gallery`,
      title: isAr
        ? "شاهد نماذج من التأشيرات المنفذة"
        : "View processed visa examples",
      text: isAr
        ? "اطلع على معرض الصور المنقحة لحالات تأشيرات تم العمل عليها مع حماية خصوصية العملاء."
        : "Browse redacted public-safe examples of visa cases handled by Ease Travel.",
      Icon: Images,
    },
    {
      href: `/${locale}/areas`,
      title: isAr
        ? "تعرف على مناطق الخدمة داخل مصر"
        : "See service areas across Egypt",
      text: isAr
        ? "نساعد العملاء في تجهيز ملفات التأشيرات من القاهرة، الجيزة، بنها، الإسكندرية وباقي المحافظات."
        : "We help clients prepare visa files from Cairo, Giza, Banha, Alexandria and other governorates.",
      Icon: MapPinned,
    },
  ];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.Icon size={22} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-black text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary">
                {item.title}
                <ArrowIcon size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
