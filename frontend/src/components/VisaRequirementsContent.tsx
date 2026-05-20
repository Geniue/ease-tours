import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MapPinned,
  MessageCircle,
  Plane,
  ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VisaCountryGrid from "@/components/VisaCountryGrid";
import VisaLeadForm from "@/components/VisaLeadForm";
import WhatsAppTrackedLink from "@/components/WhatsAppTrackedLink";

type VisaFaq = {
  question: string;
  answer: string;
};

type ProofCard = {
  title: string;
  description: string;
  marker: string;
};

type StepCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type CountryStripCard = {
  name: string;
  label: string;
  flag: string;
};

export type VisaRequirementsCopy = {
  hero: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    imageTitle: string;
    imageText: string;
    stats: {
      embassyLabel: string;
      embassyFallback: string;
      serviceLabel: string;
      serviceFallback: string;
      reviewLabel: string;
      reviewValue: string;
    };
  };
  ctaBanner: {
    text: string;
    button: string;
  };
  service: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    button: string;
  };
  proof: {
    title: string;
    description: string;
    cards: ProofCard[];
    note: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    description: string;
    cards: StepCard[];
  };
  schengen: {
    title: string;
    description: string;
    countries: CountryStripCard[];
  };
  faqTitle: string;
  whatsappMessage: string;
  faqs: VisaFaq[];
};

const WHATSAPP_NUMBER = "201105001389";

const arCopy: VisaRequirementsCopy = {
  hero: {
    breadcrumb: "خدمات التأشيرات",
    eyebrow: "Ease Travel Visa Services",
    title: "خدمات التأشيرات",
    subtitle:
      "اعرف متطلبات التأشيرات السياحية من مصر، وجهز ملفك بخطوات واضحة مع فريق يراجع الأوراق والمواعيد قبل التقديم.",
    primaryCta: "تواصل مع خبير التأشيرات",
    secondaryCta: "اعرف المتطلبات",
  },
  intro: {
    imageTitle: "ملف تأشيرة منظم قبل التقديم",
    imageText:
      "نراجع المتطلبات حسب الدولة، ونوضح المستندات الداعمة، ونساعدك في ترتيب الخطوات من أول سؤال حتى موعد السفارة أو مركز التأشيرات.",
    stats: {
      embassyLabel: "سفارات نتابع مواعيدها",
      embassyFallback: "متابعة مواعيد السفارات",
      serviceLabel: "خدمات سفر مرتبطة",
      serviceFallback: "تأشيرات وسفر",
      reviewLabel: "مراجعة قبل التقديم",
      reviewValue: "حسب حالة العميل",
    },
  },
  ctaBanner: {
    text: "ابدأ على أصول السفر حول العالم في خطوتين مع باقات خدمات التأشيرات الفردية",
    button: "ابدأ عبر واتساب",
  },
  service: {
    eyebrow: "تجهيز ومتابعة",
    title: "خدمات التأشيرات السياحية",
    description:
      "التقديم على التأشيرة يصبح أسهل عندما تعرف المطلوب بدقة. Ease Travel تساعدك في تجهيز الملف، مراجعة الأوراق، ترتيب الحجوزات الداعمة، متابعة المواعيد، وتوضيح خطوات التقديم حسب كل دولة.",
    bullets: [
      "مراجعة جواز السفر، الصور، كشف الحساب، وخطابات العمل أو الدراسة.",
      "تجهيز حجوزات الطيران والفنادق والتأمين الطبي عند الحاجة.",
      "إرشاد بخصوص مواعيد السفارات ومراكز التأشيرات وخطوات التقديم.",
    ],
    button: "اسأل عن ملفك",
  },
  proof: {
    title: "تأشيرات تم العمل عليها من خلال Ease Travel",
    description:
      "نماذج من الملفات والخدمات التي تعامل معها فريقنا، بصياغة عامة وآمنة بدون عرض أي بيانات شخصية أو مستندات عملاء.",
    cards: [
      {
        title: "تأشيرات شنغن",
        description:
          "مراجعة الأوراق، تجهيز الملف، وحجز موعد السفارة حسب الدولة.",
        marker: "🇪🇺",
      },
      {
        title: "تأشيرة الإمارات",
        description:
          "تجهيز طلبات السفر والسياحة والمتابعة حتى صدور القرار.",
        marker: "🇦🇪",
      },
      {
        title: "تأشيرة اليابان",
        description:
          "تجهيز ملف التقديم ومراجعة كشف الحساب والأوراق المطلوبة.",
        marker: "🇯🇵",
      },
      {
        title: "تأشيرات أمريكا وكندا",
        description:
          "مساعدة في تجهيز البيانات، النماذج، وخطوات التقديم.",
        marker: "🇺🇸",
      },
    ],
    note: "كل طلب تأشيرة يتم مراجعته حسب حالة العميل ومتطلبات السفارة، ولا يمكن ضمان القبول لأن القرار النهائي يعود للجهة المختصة.",
  },
  steps: {
    eyebrow: "التحقق من متطلبات التأشيرة",
    title: "اعرف المطلوب في 3 خطوات بسيطة",
    description:
      "ابدأ باسم الدولة ونوع التأشيرة، ونساعدك في تحويل المتطلبات إلى قائمة واضحة قبل تجهيز الملف.",
    cards: [
      {
        title: "اختر الدولة",
        description: "حدد الوجهة ونوع التأشيرة والغرض من السفر.",
        icon: MapPinned,
      },
      {
        title: "اعرف المتطلبات",
        description: "استلم قائمة الأوراق والخطوات المناسبة لحالتك.",
        icon: ClipboardCheck,
      },
      {
        title: "تواصل مع خبير التأشيرات",
        description: "راجع الملف قبل التقديم وتابع المواعيد المتاحة.",
        icon: MessageCircle,
      },
    ],
  },
  schengen: {
    title: "دول الشنغن الأكثر طلباً",
    description:
      "وجهات أوروبية يطلبها عملاؤنا كثيراً مع مراجعة متطلبات كل سفارة قبل التقديم.",
    countries: [
      { name: "فرنسا", label: "تأشيرة شنغن سياحية", flag: "🇫🇷" },
      { name: "إيطاليا", label: "ملف سياحة وزيارات", flag: "🇮🇹" },
      { name: "اليونان", label: "تأشيرة سياحية", flag: "🇬🇷" },
      { name: "هولندا", label: "مراجعة متطلبات VFS", flag: "🇳🇱" },
      { name: "إسبانيا", label: "تجهيز ملف شنغن", flag: "🇪🇸" },
      { name: "المجر", label: "موعد وملف تأشيرة", flag: "🇭🇺" },
      { name: "ألمانيا", label: "متطلبات سياحية", flag: "🇩🇪" },
      { name: "النمسا", label: "تأشيرة شنغن", flag: "🇦🇹" },
    ],
  },
  faqTitle: "أسئلة شائعة",
  whatsappMessage:
    "لدي استفسار عن متطلبات التأشيرة وأرغب في تجهيز الملف من خلال Ease Travel",
  faqs: [
    {
      question: "ما هي متطلبات التأشيرة السياحية؟",
      answer:
        "تختلف حسب الدولة، لكنها غالباً تشمل جواز سفر سارٍ، صور شخصية، كشف حساب، حجوزات سفر، تأمين طبي، وخطاب عمل أو مستندات داعمة حسب حالة المسافر.",
    },
    {
      question: "هل تختلف المتطلبات حسب الدولة؟",
      answer:
        "نعم. كل دولة وسفارة أو مركز تأشيرات له قائمة متطلبات وطريقة تقديم مختلفة، لذلك نراجع الوجهة ونوع التأشيرة قبل تجهيز الملف.",
    },
    {
      question: "هل يمكنكم تجهيز ملف التأشيرة بالكامل؟",
      answer:
        "نساعدك في مراجعة المتطلبات، تجهيز المستندات الداعمة، ترتيب الحجوزات المطلوبة، ومتابعة خطوات التقديم حسب نظام كل سفارة أو مركز تأشيرات.",
    },
    {
      question: "هل تضمن Ease Travel قبول التأشيرة؟",
      answer:
        "لا. لا يمكن ضمان قبول أي تأشيرة لأن القرار النهائي يعود للسفارة أو الجهة المختصة. دورنا هو تجهيز الملف ومراجعته بشكل منظم حسب المتطلبات المعلنة.",
    },
    {
      question: "كم تستغرق إجراءات التأشيرة؟",
      answer:
        "المدة تختلف حسب الدولة، نوع التأشيرة، ضغط المواعيد، ووقت مراجعة السفارة. سنوضح لك المدة المتوقعة عند معرفة الدولة وحالة الملف.",
    },
    {
      question: "هل تساعدون في حجز موعد السفارة؟",
      answer:
        "نعم، يمكننا إرشادك أو مساعدتك في خطوات حجز موعد السفارة أو مركز التأشيرات عندما تكون الخدمة متاحة حسب الدولة والنظام المستخدم.",
    },
    {
      question: "كيف أتواصل لمعرفة متطلبات دولة معينة؟",
      answer:
        "أرسل اسم الدولة ونوع التأشيرة وموعد السفر المتوقع عبر واتساب، وسيقوم أحد خبرائنا بمراجعة طلبك وتوضيح الخطوات المناسبة.",
    },
  ],
};

const enCopy: VisaRequirementsCopy = {
  hero: {
    breadcrumb: "Visa Requirements",
    eyebrow: "Ease Travel Visa Services",
    title: "Visa Services",
    subtitle:
      "Check tourist visa requirements from Egypt and prepare your application with clear guidance on documents, appointments, and submission steps.",
    primaryCta: "Talk to a visa expert",
    secondaryCta: "Check requirements",
  },
  intro: {
    imageTitle: "A more organized visa file",
    imageText:
      "We review requirements by destination, explain supporting documents, and help you plan each step up to the embassy or visa center appointment.",
    stats: {
      embassyLabel: "Embassies tracked",
      embassyFallback: "Embassy appointment support",
      serviceLabel: "Related travel services",
      serviceFallback: "Visas and travel",
      reviewLabel: "Pre-submission review",
      reviewValue: "Case by case",
    },
  },
  ctaBanner: {
    text: "Start your international travel plans in two simple steps with individual visa service packages",
    button: "Start on WhatsApp",
  },
  service: {
    eyebrow: "Preparation and follow-up",
    title: "Tourist Visa Services",
    description:
      "Visa applications are easier when the requirements are clear. Ease Travel helps you prepare the file, review documents, arrange supporting bookings, track appointment steps, and understand each destination's process.",
    bullets: [
      "Passport, photos, bank statements, employment, and study document review.",
      "Flight, hotel, and medical insurance support when required.",
      "Guidance on embassy and visa center appointments and submission steps.",
    ],
    button: "Ask about your file",
  },
  proof: {
    title: "Visa Work Handled by Ease Travel",
    description:
      "Examples of visa services our team has handled, shown safely without client names, passport numbers, or private documents.",
    cards: [
      {
        title: "Schengen Visas",
        description:
          "Document review, file preparation, and embassy appointments by country.",
        marker: "🇪🇺",
      },
      {
        title: "UAE Visa",
        description:
          "Travel and tourism application preparation with follow-up until the decision is issued.",
        marker: "🇦🇪",
      },
      {
        title: "Japan Visa",
        description:
          "Application file preparation and review of bank statements and required papers.",
        marker: "🇯🇵",
      },
      {
        title: "USA and Canada Visas",
        description: "Support with information, forms, and application steps.",
        marker: "🇺🇸",
      },
    ],
    note: "Every visa application is reviewed based on the client’s case and embassy requirements. Approval cannot be guaranteed because the final decision belongs to the relevant authority.",
  },
  steps: {
    eyebrow: "Visa requirements checker",
    title: "Know what you need in 3 simple steps",
    description:
      "Start with the destination and visa type, then we help turn the requirements into a clear checklist before you prepare the file.",
    cards: [
      {
        title: "Choose the country",
        description: "Tell us the destination, visa type, and travel purpose.",
        icon: MapPinned,
      },
      {
        title: "Check requirements",
        description: "Get a document and step checklist for your case.",
        icon: ClipboardCheck,
      },
      {
        title: "Talk to a visa expert",
        description: "Review your file and follow the available appointments.",
        icon: MessageCircle,
      },
    ],
  },
  schengen: {
    title: "Most Requested Schengen Countries",
    description:
      "Popular European destinations with embassy requirements reviewed before submission.",
    countries: [
      { name: "France", label: "Schengen tourist visa", flag: "🇫🇷" },
      { name: "Italy", label: "Tourism and visit file", flag: "🇮🇹" },
      { name: "Greece", label: "Tourist visa", flag: "🇬🇷" },
      { name: "Netherlands", label: "VFS requirements review", flag: "🇳🇱" },
      { name: "Spain", label: "Schengen file prep", flag: "🇪🇸" },
      { name: "Hungary", label: "Appointment and file", flag: "🇭🇺" },
      { name: "Germany", label: "Tourist requirements", flag: "🇩🇪" },
      { name: "Austria", label: "Schengen visa", flag: "🇦🇹" },
    ],
  },
  faqTitle: "Frequently Asked Questions",
  whatsappMessage:
    "I have a question about visa requirements and would like to prepare my file through Ease Travel",
  faqs: [
    {
      question: "What are tourist visa requirements?",
      answer:
        "They vary by country, but usually include a valid passport, personal photos, bank statements, travel bookings, medical insurance, and employment or supporting documents based on the traveler profile.",
    },
    {
      question: "Do requirements differ by country?",
      answer:
        "Yes. Each destination, embassy, or visa center has its own checklist and process, so we review the country and visa type before preparing the file.",
    },
    {
      question: "Can you prepare the full visa file?",
      answer:
        "We help review the requirements, prepare supporting documents, arrange required bookings, and follow the submission steps according to each embassy or visa center process.",
    },
    {
      question: "Does Ease Travel guarantee visa approval?",
      answer:
        "No. Visa approval cannot be guaranteed because the final decision belongs to the embassy or relevant authority. Our role is to prepare and review the file according to published requirements.",
    },
    {
      question: "How long does the visa process take?",
      answer:
        "Processing time depends on the country, visa type, appointment availability, and embassy review time. We explain the expected timeline after reviewing your destination and case.",
    },
    {
      question: "Do you help with embassy appointments?",
      answer:
        "Yes, we can guide you or assist with embassy and visa center appointment steps when the service is available for the selected country.",
    },
    {
      question: "How can I ask about a specific country?",
      answer:
        "Send the country name, visa type, and expected travel date on WhatsApp, and one of our experts will review your request and explain the next steps.",
    },
  ],
};

export function getVisaRequirementsCopy(locale: string): VisaRequirementsCopy {
  return locale === "en" ? enCopy : arCopy;
}

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-8 max-w-2xl text-center"
          : "mb-6 max-w-2xl"
      }
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-bold text-accent">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function VisaRequirementsContent({
  locale,
  embassyCount,
  visaServicesCount,
}: {
  locale: string;
  embassyCount: number;
  visaServicesCount: number;
}) {
  const copy = getVisaRequirementsCopy(locale);
  const isAr = locale !== "en";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const ctaHref = whatsappHref(copy.whatsappMessage);
  const textAlign = isAr ? "text-right" : "text-left";

  const stats = [
    {
      value: embassyCount > 0 ? `${embassyCount}+` : "24/7",
      label:
        embassyCount > 0
          ? copy.intro.stats.embassyLabel
          : copy.intro.stats.embassyFallback,
    },
    {
      value: visaServicesCount > 0 ? `${visaServicesCount}+` : "Visa",
      label:
        visaServicesCount > 0
          ? copy.intro.stats.serviceLabel
          : copy.intro.stats.serviceFallback,
    },
    {
      value: copy.intro.stats.reviewValue,
      label: copy.intro.stats.reviewLabel,
    },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="bg-slate-50 text-slate-950">
      <section className="relative isolate min-h-[360px] overflow-hidden bg-primary-dark text-white md:min-h-[430px]">
        <Image
          src="/hero-travel.jpg"
          alt={copy.hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[360px] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[430px] md:px-6">
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: copy.hero.breadcrumb }]}
              variant="dark"
            />
          </div>
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-100 backdrop-blur">
              {copy.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-blue-50 md:text-lg">
              {copy.hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppTrackedLink
                href={ctaHref}
                ctaLocation="visa-hero-primary"
                sourceType="visa-requirements"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-amber-950/20 transition hover:bg-accent-dark"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {copy.hero.primaryCta}
              </WhatsAppTrackedLink>
              <a
                href="#visa-countries"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.hero.secondaryCta}
                <ArrowIcon size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pb-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" dir="ltr">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
              <div className="relative h-72 md:h-[420px]">
                <Image
                  src="/rui-silvestre-NYbbON5Afs0-unsplash.jpg"
                  alt={copy.intro.imageTitle}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                <div
                  dir={isAr ? "rtl" : "ltr"}
                  className={`absolute inset-x-0 bottom-0 p-5 text-white ${textAlign}`}
                >
                  <h2 className="text-2xl font-black">
                    {copy.intro.imageTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-white/85">
                    {copy.intro.imageText}
                  </p>
                </div>
              </div>
              <div
                dir={isAr ? "rtl" : "ltr"}
                className="grid grid-cols-3 divide-x divide-slate-100 rtl:divide-x-reverse"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="p-4 text-center">
                    <p className="text-lg font-black text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div dir={isAr ? "rtl" : "ltr"}>
              <VisaLeadForm locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-primary-dark px-5 py-8 text-white shadow-xl md:px-8">
            <Image
              src="/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg"
              alt={copy.ctaBanner.text}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary-dark/80" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <h2 className="max-w-3xl text-2xl font-black leading-10 md:text-3xl">
                {copy.ctaBanner.text}
              </h2>
              <WhatsAppTrackedLink
                href={ctaHref}
                ctaLocation="visa-horizontal-banner"
                sourceType="visa-requirements"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white transition hover:bg-accent-dark"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {copy.ctaBanner.button}
              </WhatsAppTrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 md:h-[420px]">
            <Image
              src="/felix-rostig-UmV2wr-Vbq8-unsplash.jpg"
              alt={copy.service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className={textAlign}>
            <SectionHeading
              eyebrow={copy.service.eyebrow}
              title={copy.service.title}
              description={copy.service.description}
              align="start"
            />
            <div className="space-y-3">
              {copy.service.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3"
                >
                  <CheckCircle2
                    className="mt-1 shrink-0 text-accent"
                    size={18}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-7 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
            <WhatsAppTrackedLink
              href={ctaHref}
              ctaLocation="visa-service-explainer"
              sourceType="visa-requirements"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-950/10 transition hover:bg-primary-dark"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {copy.service.button}
            </WhatsAppTrackedLink>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            title={copy.proof.title}
            description={copy.proof.description}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.proof.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {card.marker}
                </span>
                <h3 className="text-lg font-black text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
            <ShieldCheck
              className="mt-1 shrink-0 text-accent"
              size={20}
              aria-hidden="true"
            />
            <p>{copy.proof.note}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow={copy.steps.eyebrow}
            title={copy.steps.title}
            description={copy.steps.description}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.steps.cards.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <p className="mb-2 text-xs font-black text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-black text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className={textAlign}>
              <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
                {copy.schengen.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                {copy.schengen.description}
              </p>
            </div>
            <Plane className="hidden text-accent md:block" size={34} />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {copy.schengen.countries.map((country) => (
              <article
                key={country.name}
                className="min-w-[170px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-4xl">
                  {country.flag}
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  {country.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-primary">
                  {country.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VisaCountryGrid locale={locale} />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <SectionHeading title={copy.faqTitle} />
          <div className="space-y-3">
            {copy.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-slate-950">
                  <span>{faq.question}</span>
                  <FileSearch
                    className="shrink-0 text-primary transition group-open:rotate-12"
                    size={20}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
