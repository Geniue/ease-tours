"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Script from "next/script";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plane,
  Shield,
  Clock,
  Search,
  Globe,
  CreditCard,
} from "lucide-react";

interface Faq {
  q: string;
  a: string;
}

export default function FlightsContent({ faqs }: { faqs: Faq[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  const popularRoutes = isAr
    ? [
        { from: "القاهرة", to: "اسطنبول", emoji: "🇹🇷", price: "من 4,500 ج.م" },
        { from: "القاهرة", to: "دبي", emoji: "🇦🇪", price: "من 5,200 ج.م" },
        { from: "القاهرة", to: "جدة", emoji: "🇸🇦", price: "من 3,800 ج.م" },
        { from: "القاهرة", to: "شرم الشيخ", emoji: "🏖️", price: "من 1,500 ج.م" },
        { from: "القاهرة", to: "كوالالمبور", emoji: "🇲🇾", price: "من 12,000 ج.م" },
        { from: "القاهرة", to: "لندن", emoji: "🇬🇧", price: "من 15,000 ج.م" },
        { from: "الإسكندرية", to: "اسطنبول", emoji: "🇹🇷", price: "من 5,000 ج.م" },
        { from: "القاهرة", to: "باريس", emoji: "🇫🇷", price: "من 14,000 ج.م" },
      ]
    : [
        { from: "Cairo", to: "Istanbul", emoji: "🇹🇷", price: "From 4,500 EGP" },
        { from: "Cairo", to: "Dubai", emoji: "🇦🇪", price: "From 5,200 EGP" },
        { from: "Cairo", to: "Jeddah", emoji: "🇸🇦", price: "From 3,800 EGP" },
        { from: "Cairo", to: "Sharm El Sheikh", emoji: "🏖️", price: "From 1,500 EGP" },
        { from: "Cairo", to: "Kuala Lumpur", emoji: "🇲🇾", price: "From 12,000 EGP" },
        { from: "Cairo", to: "London", emoji: "🇬🇧", price: "From 15,000 EGP" },
        { from: "Alexandria", to: "Istanbul", emoji: "🇹🇷", price: "From 5,000 EGP" },
        { from: "Cairo", to: "Paris", emoji: "🇫🇷", price: "From 14,000 EGP" },
      ];

  const features = isAr
    ? [
        {
          icon: Search,
          title: "مقارنة فورية",
          desc: "قارن أسعار أكثر من 700 شركة طيران في ثوانٍ",
        },
        {
          icon: Shield,
          title: "حجز آمن 100%",
          desc: "بتكمل الحجز على الموقع الرسمي لشركة الطيران",
        },
        {
          icon: CreditCard,
          title: "بدون رسوم إضافية",
          desc: "السعر اللي بتشوفه هو السعر النهائي — صفر رسوم خفية",
        },
        {
          icon: Globe,
          title: "+200 وجهة عالمية",
          desc: "رحلات من كل مطارات مصر لأي مكان في العالم",
        },
        {
          icon: Clock,
          title: "24/7 متاح",
          desc: "ابحث واحجز في أي وقت — ودعم على الواتساب طول اليوم",
        },
        {
          icon: Plane,
          title: "داخلي + دولي",
          desc: "رحلات داخلية بين مدن مصر ورحلات دولية لكل العالم",
        },
      ]
    : [
        {
          icon: Search,
          title: "Instant Comparison",
          desc: "Compare prices from 700+ airlines in seconds",
        },
        {
          icon: Shield,
          title: "100% Secure Booking",
          desc: "Complete your booking on the airline's official website",
        },
        {
          icon: CreditCard,
          title: "Zero Extra Fees",
          desc: "The price you see is the final price — no hidden charges",
        },
        {
          icon: Globe,
          title: "200+ Destinations",
          desc: "Flights from all Egyptian airports to anywhere in the world",
        },
        {
          icon: Clock,
          title: "Available 24/7",
          desc: "Search and book anytime — WhatsApp support all day",
        },
        {
          icon: Plane,
          title: "Domestic + International",
          desc: "Domestic flights between Egyptian cities and international worldwide",
        },
      ];

  const airlines = [
    "EgyptAir",
    "Air Cairo",
    "Nile Air",
    "Turkish Airlines",
    "Emirates",
    "Flynas",
    "FlyDubai",
    "Qatar Airways",
    "Etihad Airways",
    "Pegasus Airlines",
    "Wizz Air",
    "Air Arabia",
  ];

  return (
    <article dir={isAr ? "rtl" : "ltr"}>
      {/* Travelpayouts Drive script — loads lazily */}
      <Script
        src="https://emrldtp.com/NTE2OTIw.js?t=516920"
        strategy="lazyOnload"
      />

      {/* ═══════ Hero + Search Widget ═══════ */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[200px] leading-none">✈️</div>
          <div className="absolute bottom-10 right-10 text-[150px] leading-none">🌍</div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <Chevron size={14} />
            <span className="text-white font-medium">
              {isAr ? "حجز الطيران" : "Flight Booking"}
            </span>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {isAr ? (
                <>
                  احجز أرخص <span className="text-yellow-400">تذاكر الطيران</span> من مصر
                </>
              ) : (
                <>
                  Book the Cheapest <span className="text-yellow-400">Flights</span> from Egypt
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {isAr
                ? "قارن الأسعار من أكثر من 700 شركة طيران واحجز في ثوانٍ. رحلات من القاهرة، الإسكندرية، شرم الشيخ والغردقة لأكثر من 200 وجهة حول العالم."
                : "Compare prices from 700+ airlines and book in seconds. Flights from Cairo, Alexandria, Sharm El Sheikh & Hurghada to 200+ destinations worldwide."}
            </p>

            {/* Travelpayouts widget container */}
            <div
              id="tp-search-widget"
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl mx-auto"
            >
              <div className="text-gray-700 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-3">
                  <Search size={24} />
                  <span className="font-bold text-lg">
                    {isAr ? "ابحث عن رحلتك" : "Search Your Flight"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {isAr
                    ? "اختر وجهتك وتاريخ السفر وقارن الأسعار فوراً"
                    : "Choose your destination, travel date, and compare prices instantly"}
                </p>
                {/* The Travelpayouts Drive widget auto-injects here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Why Book With Us ═══════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            {isAr
              ? "ليه تحجز الطيران من إيز ترافل؟"
              : "Why Book Flights with Ease Travel?"}
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            {isAr
              ? "مش مجرد محرك بحث. إيز ترافل شركة سياحة مرخصة بتقدملك خدمة متكاملة."
              : "Not just a search engine. Ease Travel is a licensed travel agency offering you a complete service."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Popular Routes ═══════ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            {isAr
              ? "أشهر خطوط الطيران من مصر"
              : "Most Popular Flight Routes from Egypt"}
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            {isAr
              ? "أكثر الوجهات بحثاً وحجزاً من المسافرين المصريين. الأسعار تقريبية وتتغير حسب التاريخ."
              : "Top searched and booked destinations by Egyptian travelers. Prices are approximate and vary by date."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{route.emoji}</span>
                  <div>
                    <div className="text-sm text-gray-500">{route.from}</div>
                    <div className="flex items-center gap-1">
                      <Plane
                        size={14}
                        className="text-blue-500 group-hover:translate-x-1 transition-transform"
                      />
                      <span className="font-bold text-gray-800">
                        {route.to}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-blue-600 font-bold text-sm">
                  {route.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Partner Airlines ═══════ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-8">
            {isAr
              ? "شركات الطيران المتاحة في محرك البحث"
              : "Airlines Available in Our Search Engine"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {airlines.map((airline) => (
              <span
                key={airline}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {airline}
              </span>
            ))}
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              {isAr ? "+700 شركة أخرى" : "+700 more airlines"}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ SEO Content Section ═══════ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
            {isAr ? (
              <>
                <h2>حجز طيران رخيص من مصر — دليلك الشامل</h2>
                <p>
                  بتدور على أرخص تذاكر طيران من مصر؟ إيز ترافل بتوفرلك محرك بحث متطور
                  بيقارن أسعار أكثر من 700 شركة طيران في نفس اللحظة. سواء بتسافر من
                  <strong> القاهرة</strong>، <strong>الإسكندرية</strong>،{" "}
                  <strong>شرم الشيخ</strong>، أو <strong>الغردقة</strong> — هتلاقي
                  أفضل سعر لرحلتك في ثوانٍ.
                </p>

                <h3>رحلات طيران داخلية في مصر</h3>
                <p>
                  محتاج تسافر بين مدن مصر بسرعة؟ بتقدر تحجز رحلات داخلية بين القاهرة
                  وشرم الشيخ، الغردقة، الأقصر، أسوان، أبو سمبل، ومرسى علم. شركات
                  زي EgyptAir و Air Cairo و Nile Air بتقدم رحلات يومية بأسعار تنافسية.
                </p>

                <h3>رحلات طيران دولية من مصر</h3>
                <p>
                  من القاهرة للعالم كله. احجز طيران لاسطنبول، دبي، جدة، كوالالمبور،
                  لندن، باريس، روما، وأكثر من 200 وجهة عالمية. نقارن أسعار Turkish
                  Airlines، Emirates، Qatar Airways، والمزيد عشان تلاقي أفضل عرض.
                </p>

                <h3>نصائح لحجز أرخص طيران</h3>
                <ul>
                  <li>احجز قبل السفر بـ 3-4 أسابيع على الأقل</li>
                  <li>السفر يوم الثلاثاء والأربعاء عادةً أرخص</li>
                  <li>استخدم خيار &quot;تواريخ مرنة&quot; لو مش محدد يوم معين</li>
                  <li>قارن الأسعار من أكتر من مصدر قبل ما تحجز</li>
                  <li>الرحلات بتكون أرخص في غير المواسم (مارس-مايو وسبتمبر-نوفمبر)</li>
                </ul>

                <h3>ليه إيز ترافل مختلفة؟</h3>
                <p>
                  إيز ترافل مش مجرد محرك بحث عن طيران. إحنا <strong>شركة سياحة مرخصة في مصر</strong>{" "}
                  بنقدم خدمة متكاملة: حجز طيران + فنادق + تأشيرات + برامج سياحية. يعني
                  لو حجزت طيران لاسطنبول مثلاً، ممكن نرتبلك الفندق والبرنامج
                  السياحي والمواصلات كمان.
                </p>
              </>
            ) : (
              <>
                <h2>Cheap Flight Booking from Egypt — Complete Guide</h2>
                <p>
                  Looking for the cheapest flights from Egypt? Ease Travel offers an
                  advanced search engine that compares prices from 700+ airlines
                  instantly. Whether flying from <strong>Cairo</strong>,{" "}
                  <strong>Alexandria</strong>, <strong>Sharm El Sheikh</strong>, or{" "}
                  <strong>Hurghada</strong> — find the best price for your trip in
                  seconds.
                </p>

                <h3>Domestic Flights in Egypt</h3>
                <p>
                  Need to travel between Egyptian cities quickly? Book domestic flights
                  between Cairo and Sharm El Sheikh, Hurghada, Luxor, Aswan, Abu
                  Simbel, and Marsa Alam. Airlines like EgyptAir, Air Cairo, and Nile
                  Air offer daily flights at competitive prices.
                </p>

                <h3>International Flights from Egypt</h3>
                <p>
                  From Cairo to the world. Book flights to Istanbul, Dubai, Jeddah,
                  Kuala Lumpur, London, Paris, Rome, and 200+ worldwide destinations.
                  We compare Turkish Airlines, Emirates, Qatar Airways, and more to
                  find you the best deal.
                </p>

                <h3>Tips for Booking Cheapest Flights</h3>
                <ul>
                  <li>Book at least 3-4 weeks before travel</li>
                  <li>Tuesday and Wednesday flights are usually cheaper</li>
                  <li>Use &quot;flexible dates&quot; option if your dates aren&apos;t fixed</li>
                  <li>Compare prices from multiple sources before booking</li>
                  <li>Off-season flights (March-May and September-November) are cheapest</li>
                </ul>

                <h3>Why Ease Travel is Different</h3>
                <p>
                  Ease Travel isn&apos;t just a flight search engine. We&apos;re a{" "}
                  <strong>licensed Egyptian travel agency</strong> offering a complete
                  service: flights + hotels + visas + tour packages. So if you book a
                  flight to Istanbul, we can arrange the hotel, tour itinerary, and
                  transportation too.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ FAQs ═══════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            {isAr
              ? "أسئلة شائعة عن حجز الطيران"
              : "Frequently Asked Questions About Flight Booking"}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Bottom CTA ═══════ */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isAr
              ? "محتاج مساعدة في حجز الطيران؟"
              : "Need Help Booking Your Flight?"}
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {isAr
              ? "فريقنا جاهز يساعدك على الواتساب. ابعتلنا وجهتك وتاريخ السفر وهنجيبلك أفضل عرض."
              : "Our team is ready to help on WhatsApp. Send us your destination and travel date and we'll find you the best deal."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201551555498?text=%D8%B9%D8%A7%D9%8A%D8%B2+%D8%A3%D8%AD%D8%AC%D8%B2+%D8%AA%D8%B0%D9%83%D8%B1%D8%A9+%D8%B7%D9%8A%D8%B1%D8%A7%D9%86"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.591-.838-6.311-2.236l-.44-.362-3.22 1.08 1.08-3.22-.362-.44A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {isAr ? "احجز عبر الواتساب" : "Book via WhatsApp"}
            </a>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/30"
            >
              {isAr ? "تصفح باقات السفر" : "Browse Travel Packages"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

/* ── FAQ Accordion Item ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-blue-600 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}
