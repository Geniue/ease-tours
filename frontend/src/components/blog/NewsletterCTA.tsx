"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Loader2, Check } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export default function NewsletterCTA({ source = "blog-detail" }: { source?: string }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setError(null);
    const res = await subscribeNewsletter({ email, locale, source });
    if (res.success) {
      setStatus("ok");
      setEmail("");
    } else {
      setStatus("error");
      setError(res.error || (isAr ? "حدث خطأ، حاول مجدداً" : "Something went wrong"));
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e] text-white rounded-2xl p-6 md:p-8 my-10" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/15 items-center justify-center flex-shrink-0">
          <Mail size={22} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{t("newsletterTitle")}</h3>
          <p className="text-sm text-white/85 mb-4">{t("newsletterSubtitle")}</p>
          {status === "ok" ? (
            <p className="inline-flex items-center gap-2 text-sm bg-white/15 rounded-lg px-4 py-2">
              <Check size={16} /> {t("newsletterSuccess")}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-white/60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] font-semibold transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : null}
                {t("newsletterSubmit")}
              </button>
            </form>
          )}
          {error && <p className="text-sm text-amber-200 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
