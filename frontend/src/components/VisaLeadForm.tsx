"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { MessageCircle, UserRound } from "lucide-react";
import { trackLeadEvent } from "@/lib/tracking";

const WHATSAPP_NUMBER = "201105001389";

type FormState = {
  name: string;
  phone: string;
  country: string;
  visaType: string;
};

const copy = {
  ar: {
    title: "اترك بياناتك وسوف يتواصل معك أحد خبرائنا",
    subtitle:
      "اكتب الدولة ونوع التأشيرة، وسنرسل لك الخطوات المناسبة لتجهيز الملف.",
    name: "الاسم",
    phone: "رقم الهاتف",
    country: "الدولة المطلوبة",
    visaType: "نوع التأشيرة",
    tourist: "سياحية",
    visit: "زيارة",
    business: "أعمال",
    other: "أخرى",
    submit: "إرسال عبر واتساب",
    note: "لا يتم حفظ البيانات في نموذج داخلي. سيتم فتح واتساب برسالة جاهزة.",
    baseMessage:
      "لدي استفسار عن متطلبات التأشيرة وأرغب في تجهيز الملف من خلال Ease Travel",
  },
  en: {
    title: "Leave your details and one of our experts will contact you",
    subtitle:
      "Tell us the destination and visa type, and we will guide you through the next steps.",
    name: "Name",
    phone: "Phone number",
    country: "Required country",
    visaType: "Visa type",
    tourist: "Tourist",
    visit: "Visit",
    business: "Business",
    other: "Other",
    submit: "Send on WhatsApp",
    note: "No internal form submission is created. WhatsApp will open with a prepared message.",
    baseMessage:
      "I have a question about visa requirements and would like to prepare my file through Ease Travel",
  },
};

function initialState(): FormState {
  return {
    name: "",
    phone: "",
    country: "",
    visaType: "",
  };
}

export default function VisaLeadForm({ locale }: { locale: string }) {
  const isAr = locale !== "en";
  const t = isAr ? copy.ar : copy.en;
  const [form, setForm] = useState<FormState>(initialState);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      t.baseMessage,
      "",
      `${t.name}: ${form.name}`,
      `${t.phone}: ${form.phone}`,
      `${t.country}: ${form.country}`,
      `${t.visaType}: ${form.visaType}`,
    ].join("\n");

    trackLeadEvent({
      event_type: "whatsapp_click",
      locale,
      cta_location: "visa-lead-form",
      source_type: "visa-requirements",
      metadata: {
        requested_country: form.country,
        visa_type: form.visaType,
        has_phone: Boolean(form.phone.trim()),
      },
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 md:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserRound size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-black leading-8 text-slate-950">
            {t.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          {t.name}
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          {t.phone}
          <input
            required
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          {t.country}
          <input
            required
            value={form.country}
            onChange={(event) => updateField("country", event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            autoComplete="country-name"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          {t.visaType}
          <select
            required
            value={form.visaType}
            onChange={(event) => updateField("visaType", event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          >
            <option value="" disabled />
            <option value={t.tourist}>{t.tourist}</option>
            <option value={t.visit}>{t.visit}</option>
            <option value={t.business}>{t.business}</option>
            <option value={t.other}>{t.other}</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-950/10 transition hover:bg-primary-dark"
      >
        <MessageCircle size={18} aria-hidden="true" />
        {t.submit}
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">{t.note}</p>
    </form>
  );
}
