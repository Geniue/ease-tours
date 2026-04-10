import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import Link from "next/link";
import TourCard from "@/components/TourCard";
import { getTrips, getCategories, getBlogs } from "@/lib/api";
import { JsonLd, breadcrumbSchema } from "@/lib/schemas";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "رحلات عمرة من مصر 2026 — أسعار وباقات الحج والعمرة | إيز ترافل"
    : "Umrah Trips from Egypt 2026 — Hajj & Umrah Packages & Prices | Ease Travel";
  const description = isAr
    ? "احجز رحلة عمرة من مصر مع إيز ترافل — باقات عمرة شاملة تشمل الطيران والإقامة والتأشيرة بأسعار تنافسية. تعرف على تكاليف العمرة من مصر وأفضل برامج الحج والعمرة 2026."
    : "Book your Umrah trip from Egypt with Ease Travel — all-inclusive Umrah packages with flights, accommodation & visa at competitive prices. Discover Hajj & Umrah costs and best programs 2026.";
  const altLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/hajj-umrah`,
      languages: { [locale]: `${SITE_URL}/${locale}/hajj-umrah`, [altLocale]: `${SITE_URL}/${altLocale}/hajj-umrah`, "x-default": `${SITE_URL}/ar/hajj-umrah` },
    },
    openGraph: { type: "website", locale: isAr ? "ar_EG" : "en_US", title, description, url: `${SITE_URL}/${locale}/hajj-umrah` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HajjUmrahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const [trips, categories, blogs] = await Promise.all([
    getTrips(),
    getCategories(),
    getBlogs({ category_id: "3", limit: "6" }).catch(() => []),
  ]);

  // Find the religious category
  const religiousCategory = categories.find((c) => c.type === "religious");
  const religiousTrips = religiousCategory
    ? trips.filter((trip) => trip.category_id === religiousCategory.id)
    : [];

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
    { name: isAr ? "حج وعمرة" : "Hajj & Umrah", url: `${SITE_URL}/${locale}/hajj-umrah` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isAr ? [
      { "@type": "Question", name: "كم تكلفة العمرة من مصر؟", acceptedAnswer: { "@type": "Answer", text: "تتراوح تكاليف العمرة من مصر بين 15,000 إلى 50,000 جنيه مصري حسب الموسم ومستوى الفندق ومدة الإقامة وشركة الطيران. الباقات الاقتصادية تبدأ من حوالي 15,000 جنيه والباقات الفاخرة قد تصل إلى 50,000 جنيه أو أكثر." } },
      { "@type": "Question", name: "ما هي أفضل شركة عمرة من مصر؟", acceptedAnswer: { "@type": "Answer", text: "أفضل شركات العمرة هي المرخصة من وزارة السياحة المصرية والتي تقدم باقات شاملة بأسعار شفافة. إيز ترافل تقدم باقات عمرة متكاملة تشمل الطيران والإقامة والتأشيرة والمواصلات مع مرشدين متخصصين." } },
      { "@type": "Question", name: "ما هي المستندات المطلوبة للعمرة من مصر؟", acceptedAnswer: { "@type": "Answer", text: "تحتاج جواز سفر ساري لمدة 6 أشهر على الأقل، صور شخصية بخلفية بيضاء، شهادة تطعيم الحمى الشوكية، وتأشيرة العمرة الإلكترونية (نوسك). بالنسبة للسيدات تحت 45 سنة يشترط وجود محرم." } },
      { "@type": "Question", name: "كم مدة رحلة العمرة من مصر؟", acceptedAnswer: { "@type": "Answer", text: "تتراوح مدة رحلات العمرة بين 7 إلى 14 يوماً. أغلب البرامج تكون 7 أو 10 أيام وتشمل الإقامة في مكة المكرمة والمدينة المنورة." } },
    ] : [
      { "@type": "Question", name: "How much does Umrah cost from Egypt?", acceptedAnswer: { "@type": "Answer", text: "Umrah costs from Egypt range from EGP 15,000 to EGP 50,000 depending on the season, hotel level, duration, and airline. Budget packages start around EGP 15,000 while premium packages can reach EGP 50,000 or more." } },
      { "@type": "Question", name: "What documents are needed for Umrah from Egypt?", acceptedAnswer: { "@type": "Answer", text: "You need a passport valid for at least 6 months, white background photos, meningitis vaccination certificate, and an electronic Umrah visa (Nusuk). Women under 45 must be accompanied by a mahram." } },
    ],
  };

  return (
    <>
      <main>
        <JsonLd data={breadcrumbSchema(breadcrumbs)} />
        <JsonLd data={faqSchema} />
        <HajjHero />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <HajjDescription />

            {/* Trips Section */}
            <h2 className="text-3xl font-bold text-center mt-16 mb-4">
              {isAr ? "باقات العمرة والحج المتاحة" : "Available Umrah & Hajj Packages"}
            </h2>
            <p className="text-center text-gray-500 mb-10">
              {isAr ? "اختر البرنامج الأنسب لك واحجز مكانك الآن" : "Choose the best program for you and book your spot today"}
            </p>

            {religiousTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {religiousTrips.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <NoTripsMessage />
            )}

            {/* Why Choose Us Section */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10">
                {isAr ? "لماذا تختار إيز ترافل لرحلة العمرة؟" : "Why Choose Ease Travel for Your Umrah?"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(isAr ? [
                  { icon: "✈️", title: "باقات عمرة شاملة", desc: "طيران + إقامة + تأشيرة + مواصلات في باقة واحدة بسعر تنافسي" },
                  { icon: "🏨", title: "فنادق قريبة من الحرم", desc: "إقامة في فنادق 3 إلى 5 نجوم على بُعد دقائق من الحرم المكي والمسجد النبوي" },
                  { icon: "📋", title: "تأشيرة العمرة الإلكترونية", desc: "نتولى استخراج تأشيرة العمرة الإلكترونية (نوسك) بدون أي متاعب" },
                  { icon: "👨‍🏫", title: "مرشدين دينيين متخصصين", desc: "مرشدين معتمدين يرافقونك لأداء المناسك بيسر وراحة" },
                ] : [
                  { icon: "✈️", title: "All-Inclusive Packages", desc: "Flights + Hotels + Visa + Transport in one competitive package" },
                  { icon: "🏨", title: "Hotels Near Haram", desc: "Stay in 3-5 star hotels minutes from the Holy Mosque and Prophet's Mosque" },
                  { icon: "📋", title: "E-Visa Processing", desc: "We handle the electronic Umrah visa (Nusuk) hassle-free" },
                  { icon: "👨‍🏫", title: "Expert Religious Guides", desc: "Certified guides to help you perform rituals with ease" },
                ]).map((item, i) => (
                  <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-6">
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10">
                {isAr ? "أسئلة شائعة عن العمرة من مصر" : "Umrah from Egypt FAQ"}
              </h2>
              <div className="space-y-4">
                {(isAr ? [
                  { q: "كم تكلفة العمرة من مصر؟", a: "تتراوح تكاليف العمرة من مصر بين 15,000 إلى 50,000 جنيه مصري حسب الموسم ومستوى الفندق ومدة الإقامة وشركة الطيران. تواصل معنا للحصول على أسعار العمرة المحدّثة." },
                  { q: "ما هي أفضل شركة عمرة من مصر؟", a: "اختر شركة مرخصة من وزارة السياحة وتقدم باقات شفافة الأسعار. إيز ترافل تقدم باقات عمرة متكاملة بأسعار تنافسية مع ضمان الجودة والراحة." },
                  { q: "ما المستندات المطلوبة للعمرة؟", a: "جواز سفر ساري 6 أشهر، صور شخصية حديثة، شهادة تطعيم الحمى الشوكية، وتأشيرة العمرة الإلكترونية (نوسك). السيدات تحت 45 يشترط محرم." },
                  { q: "كم مدة رحلة العمرة؟", a: "تتراوح بين 7 إلى 14 يوماً. أغلب البرامج 7 أو 10 أيام تشمل مكة والمدينة المنورة." },
                  { q: "هل يمكن أداء العمرة في رمضان؟", a: "نعم، العمرة في رمضان لها فضل عظيم وتعادل حجة كما ورد في الحديث. تكاليف عمرة رمضان أعلى بسبب الموسم. احجز مبكراً لضمان مكانك." },
                ] : [
                  { q: "How much does Umrah cost from Egypt?", a: "Umrah packages from Egypt range from EGP 15,000 to EGP 50,000 depending on season, hotel, duration, and airline. Contact us for updated prices." },
                  { q: "What documents are needed?", a: "Valid passport (6 months), recent photos, meningitis vaccination certificate, and electronic Umrah visa (Nusuk). Women under 45 need a mahram." },
                  { q: "How long is an Umrah trip?", a: "Typically 7-14 days. Most programs are 7 or 10 days covering Mecca and Medina." },
                ]).map((item, i) => (
                  <details key={i} className="group bg-gray-50 rounded-xl">
                    <summary className="cursor-pointer font-semibold p-5 flex justify-between items-center">
                      {item.q}
                      <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="px-5 pb-5 text-gray-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Related Blog Articles */}
            {blogs.length > 0 && (
              <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-4">
                  {isAr ? "مقالات عن الحج والعمرة" : "Hajj & Umrah Articles"}
                </h2>
                <p className="text-center text-gray-500 mb-10">
                  {isAr ? "أدلة ونصائح لرحلتك الروحانية" : "Guides and tips for your spiritual journey"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.slice(0, 3).map((blog) => {
                    const title = isAr ? blog.title_ar : blog.title_en;
                    const slug = isAr ? blog.slug_ar : blog.slug_en;
                    const excerpt = isAr ? blog.excerpt_ar : blog.excerpt_en;
                    return (
                      <Link key={blog.id} href={`/${locale}/blog/${slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        {blog.featured_image_url && (
                          <div className="relative h-48 overflow-hidden">
                            <img src={blog.featured_image_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1a73a7] transition-colors">{title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
                          <span className="text-sm font-semibold text-[#f59e0b] mt-3 inline-block">
                            {isAr ? "اقرأ المزيد →" : "Read more →"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <Link href={`/${locale}/blog`} className="inline-block bg-[#1a73a7] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#155d87] transition-colors">
                    {isAr ? "عرض جميع المقالات" : "View All Articles"}
                  </Link>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-20 bg-gradient-to-r from-[#1a73a7] to-[#155d87] rounded-2xl p-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {isAr ? "جاهز لحجز رحلة العمرة؟" : "Ready to Book Your Umrah Trip?"}
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                {isAr
                  ? "تواصل مع فريق إيز ترافل الآن للحصول على أفضل أسعار العمرة من مصر وباقات مخصصة حسب ميزانيتك"
                  : "Contact the Ease Travel team now for the best Umrah prices from Egypt and customized packages for your budget"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/201105001389" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-8 py-3 rounded-full transition-colors">
                  {isAr ? "واتساب" : "WhatsApp"}
                </a>
                <a href="tel:+201105001389" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition-colors border border-white/30">
                  {isAr ? "اتصل بنا: 01105001389" : "Call: 01105001389"}
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

function HajjHero() {
  const t = useTranslations("nav");
  return (
    <section
      className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <div className="mb-6"><Breadcrumbs items={[{ label: t("hajjUmrah") }]} variant="dark" /></div>
        <h1 className="text-4xl md:text-5xl font-bold">{t("hajjUmrah")}</h1>
      </div>
    </section>
  );
}

function HajjDescription() {
  const locale = useLocale();
  const isAr = locale === "ar";
  return (
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-lg text-gray-700 mb-6">
        {isAr
          ? "هل تبحث عن رحلات عمرة من مصر بأسعار مناسبة وخدمة متميزة؟ إيز ترافل تقدم لكم أفضل باقات الحج والعمرة الشاملة — من استخراج تأشيرة العمرة الإلكترونية وحجز الطيران، إلى الإقامة في فنادق قريبة من الحرم المكي والمسجد النبوي، مع مرشدين دينيين متخصصين يرافقونكم طوال رحلتكم الروحانية."
          : "Looking for Umrah trips from Egypt at affordable prices with excellent service? Ease Travel offers the best all-inclusive Hajj and Umrah packages — from electronic Umrah visa processing and flight booking, to accommodation in hotels near the Holy Mosque and Prophet's Mosque, with specialized religious guides throughout your spiritual journey."}
      </p>
      <p className="text-gray-600">
        {isAr
          ? "سواء كنت تخطط لعمرة رمضان أو عمرة في أي وقت من العام، فريقنا يساعدك في اختيار البرنامج الأنسب لميزانيتك. تعرف على تكاليف العمرة من مصر واحجز مكانك الآن."
          : "Whether you're planning a Ramadan Umrah or an Umrah at any time of the year, our team helps you choose the best program for your budget. Discover Umrah costs from Egypt and book your spot now."}
      </p>
    </div>
  );
}

function NoTripsMessage() {
  const t = useTranslations("tours");
  return <p className="text-center text-gray-500 py-10">{t("noTrips")}</p>;
}
