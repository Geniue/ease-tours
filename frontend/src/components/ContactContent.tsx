"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MessageCircle, MapPin, CheckCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/api";

export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await sendContactMessage(formData);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(locale === "ar" ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong, please try again");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t("phone"),
      value: "+20 11 05001389",
      href: "tel:+201105001389",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "easetravel93@gmail.com",
      href: "mailto:easetravel93@gmail.com",
    },
    {
      icon: MessageCircle,
      label: t("whatsapp"),
      value: "+20 11 05001389",
      href: "https://wa.me/201105001389",
    },
    {
      icon: MapPin,
      label: t("address"),
      value: t("addressText"),
      href: null,
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl md:text-2xl text-white/90">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a73a7]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#1a73a7]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-[#1a73a7] hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#25d366]/10 rounded-2xl">
                <p className="text-gray-700 font-medium mb-3">
                  {t("orWhatsapp")}
                </p>
                <a
                  href="https://wa.me/201105001389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25d366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1da851] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a73a7] mb-6">
                {t("formTitle")}
              </h2>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-[#25d366] mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-800">
                    {locale === "ar" ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً" : "Message sent successfully! We'll get back to you soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a73a7] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a73a7] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a73a7] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("message")}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a73a7] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1a73a7] text-white py-3 rounded-lg font-medium hover:bg-[#155d87] transition-colors disabled:opacity-50"
                  >
                    {loading ? (locale === "ar" ? "جاري الإرسال..." : "Sending...") : t("send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
