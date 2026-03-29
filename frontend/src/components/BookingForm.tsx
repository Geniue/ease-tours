"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { createBooking, type ApiTrip } from "@/lib/api";

export default function BookingForm({
  trip,
  onClose,
}: {
  trip: ApiTrip;
  onClose: () => void;
}) {
  const t = useTranslations("booking");
  const tCard = useTranslations("tourCard");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? trip.title_ar : trip.title_en;
  const unitPrice = trip.discounted_price
    ? parseFloat(trip.discounted_price)
    : parseFloat(trip.base_price);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    num_passengers: 1,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const totalPrice = unitPrice * form.num_passengers;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "num_passengers" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const result = await createBooking({
      trip_id: trip.id,
      ...form,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setErrorMsg(result.error || t("errorMsg"));
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
            <p className="text-sm text-foreground/60">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success State */}
        {status === "success" ? (
          <div className="p-8 text-center">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t("successTitle")}
            </h3>
            <p className="text-foreground/60 mb-6">{t("successMsg")}</p>
            <button
              onClick={onClose}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              {t("bookAnother")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Error Banner */}
            {status === "error" && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                {t("fullName")}
              </label>
              <input
                type="text"
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                {t("email")}
              </label>
              <input
                type="email"
                name="customer_email"
                value={form.customer_email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                {t("phone")}
              </label>
              <input
                type="tel"
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                {t("passengers")}
              </label>
              <select
                name="num_passengers"
                value={form.num_passengers}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition bg-white"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                {t("notes")}
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder={t("notesPlaceholder")}
                maxLength={1000}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none"
              />
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <span className="font-semibold text-foreground">
                {t("totalPrice")}
              </span>
              <span className="text-xl font-bold text-primary">
                {totalPrice.toLocaleString()} {tCard("egp")}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/60 text-white font-bold py-3 px-6 rounded-full transition-colors cursor-pointer text-lg"
            >
              {status === "submitting" ? t("submitting") : t("submit")}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
