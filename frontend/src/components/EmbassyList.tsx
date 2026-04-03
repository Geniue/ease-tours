"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import type { ApiEmbassy } from "@/lib/api";

/* ─── status colour helpers ─── */

function statusBg(s: ApiEmbassy["appointment_status"]) {
  if (s === "open") return "bg-emerald-50 border-emerald-200";
  if (s === "stopped") return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

function statusDot(s: ApiEmbassy["appointment_status"]) {
  if (s === "open") return "bg-emerald-500";
  if (s === "stopped") return "bg-amber-500";
  return "bg-red-500";
}

/* ─── human-readable date ─── */

function humanDate(dateStr: string | null, locale: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr.length === 10 ? dateStr + "T00:00:00" : dateStr);
  if (isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return d.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", opts);
}

/* ─── days until helper ─── */

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr.length === 10 ? dateStr + "T00:00:00" : dateStr);
  if (isNaN(target.getTime())) return null;
  const diff = Math.ceil((target.getTime() - now.getTime()) / 86400000);
  return diff;
}

/* ─── Card component ─── */

function EmbassyCard({
  embassy,
  isSelected,
  onClick,
}: {
  embassy: ApiEmbassy;
  isSelected: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("embassy");
  const locale = useLocale();
  const isAr = locale === "ar";
  const name = isAr ? embassy.country_name_ar : embassy.country_name_en;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-start rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-[#1a73a7] bg-[#1a73a7]/5 shadow-lg ring-2 ring-[#1a73a7]/20"
          : "border-gray-200 bg-white hover:border-[#1a73a7]/40 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        {embassy.flag_emoji && (
          <span className="text-3xl">{embassy.flag_emoji}</span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${statusDot(embassy.appointment_status)}`}
            />
            <span className="text-xs font-medium text-gray-600">
              {t(`status_${embassy.appointment_status}`)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Detail panel ─── */

function EmbassyDetail({ embassy }: { embassy: ApiEmbassy }) {
  const t = useTranslations("embassy");
  const locale = useLocale();
  const isAr = locale === "ar";
  const name = isAr ? embassy.country_name_ar : embassy.country_name_en;
  const notes = isAr ? embassy.notes_ar : embassy.notes_en;
  const stoppedVisas = isAr ? embassy.stopped_visas_ar : embassy.stopped_visas_en;

  const daysToOpen = daysUntil(embassy.next_open_date);
  const daysToClose = daysUntil(embassy.next_close_date);

  return (
    <motion.div
      key={embassy.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border-2 p-6 md:p-8 ${statusBg(embassy.appointment_status)}`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {embassy.flag_emoji && (
          <span className="text-5xl">{embassy.flag_emoji}</span>
        )}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {name}
          </h2>
          <p className="text-lg text-gray-600 mt-1">
            {t("embassyOf")} {name}
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div className="mb-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            embassy.appointment_status === "open"
              ? "bg-emerald-500 text-white"
              : embassy.appointment_status === "stopped"
              ? "bg-amber-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              embassy.appointment_status === "open"
                ? "bg-white animate-pulse"
                : "bg-white/60"
            }`}
          />
          {t(`status_${embassy.appointment_status}`)}
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Next open date */}
        {embassy.next_open_date && (
          <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t("nextOpenDate")}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {humanDate(embassy.next_open_date, locale)}
            </p>
            {daysToOpen !== null && daysToOpen > 0 && (
              <p className="text-sm text-[#1a73a7] mt-1 font-medium">
                {t("inDays", { count: daysToOpen })}
              </p>
            )}
            {daysToOpen !== null && daysToOpen === 0 && (
              <p className="text-sm text-emerald-600 mt-1 font-bold">
                {t("today")}
              </p>
            )}
          </div>
        )}

        {/* Next close date */}
        {embassy.next_close_date && (
          <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t("nextCloseDate")}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {humanDate(embassy.next_close_date, locale)}
            </p>
            {daysToClose !== null && daysToClose > 0 && (
              <p className="text-sm text-red-500 mt-1 font-medium">
                {t("closesInDays", { count: daysToClose })}
              </p>
            )}
            {daysToClose !== null && daysToClose === 0 && (
              <p className="text-sm text-red-600 mt-1 font-bold">
                {t("closesToday")}
              </p>
            )}
          </div>
        )}

        {/* Price */}
        {embassy.appointment_price && (
          <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {t("appointmentPrice")}
            </p>
            <p className="text-2xl font-bold text-[#1a73a7]">
              {parseFloat(embassy.appointment_price).toLocaleString(
                isAr ? "ar-EG" : "en-US"
              )}{" "}
              <span className="text-base font-medium text-gray-500">
                {embassy.price_currency}
              </span>
            </p>
          </div>
        )}

        {/* Appointment status summary */}
        <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {t("bookingStatus")}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {embassy.appointment_status === "open"
              ? t("acceptingBookings")
              : embassy.appointment_status === "stopped"
              ? t("stoppedUntilFurtherNotice")
              : t("notAcceptingBookings")}
          </p>
        </div>
      </div>

      {/* Stopped visas notice */}
      {stoppedVisas && (
        <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-2">
            ⚠️ {t("stoppedVisas")}
          </p>
          <p className="text-gray-800 whitespace-pre-line">{stoppedVisas}</p>
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("notes")}
          </p>
          <p className="text-gray-700 whitespace-pre-line">{notes}</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <a
          href="https://wa.me/201105001389"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe57] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.52 5.86L0 24l6.336-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.632-.506-5.148-1.39l-.37-.216-3.822.999 1.02-3.71-.24-.38A9.698 9.698 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
          </svg>
          {t("contactForAppointment")}
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main EmbassyList component ─── */

export default function EmbassyList({
  embassies,
}: {
  embassies: ApiEmbassy[];
}) {
  const t = useTranslations("embassy");
  const locale = useLocale();
  const [selectedId, setSelectedId] = useState<number | null>(
    embassies.length > 0 ? embassies[0].id : null
  );
  const [filter, setFilter] = useState<"all" | "open" | "closed" | "stopped">(
    "all"
  );

  const filtered =
    filter === "all"
      ? embassies
      : embassies.filter((e) => e.appointment_status === filter);

  const selected = embassies.find((e) => e.id === selectedId) ?? null;

  const counts = {
    all: embassies.length,
    open: embassies.filter((e) => e.appointment_status === "open").length,
    closed: embassies.filter((e) => e.appointment_status === "closed").length,
    stopped: embassies.filter((e) => e.appointment_status === "stopped").length,
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(["all", "open", "closed", "stopped"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? "bg-[#1a73a7] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t(`filter_${f}`)} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Summary text for SEO */}
      <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {t("summaryText", {
            total: embassies.length,
            open: counts.open,
            closed: counts.closed,
            stopped: counts.stopped,
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Embassy list sidebar */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:max-h-[700px] lg:overflow-y-auto lg:pe-2">
            {filtered.map((embassy) => (
              <EmbassyCard
                key={embassy.id}
                embassy={embassy}
                isSelected={selectedId === embassy.id}
                onClick={() => setSelectedId(embassy.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                {t("noEmbassies")}
              </p>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <EmbassyDetail embassy={selected} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 flex items-center justify-center text-gray-400">
              {t("selectEmbassy")}
            </div>
          )}
        </div>
      </div>

      {/* SEO-rich table for crawlers */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t("allEmbassiesTable")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-start p-3 font-semibold text-gray-700 border-b">
                  {t("country")}
                </th>
                <th className="text-start p-3 font-semibold text-gray-700 border-b">
                  {t("statusHeader")}
                </th>
                <th className="text-start p-3 font-semibold text-gray-700 border-b">
                  {t("nextDate")}
                </th>
                <th className="text-start p-3 font-semibold text-gray-700 border-b">
                  {t("priceHeader")}
                </th>
              </tr>
            </thead>
            <tbody>
              {embassies.map((embassy) => {
                const isAr = locale === "ar";
                const name = isAr
                  ? embassy.country_name_ar
                  : embassy.country_name_en;

                return (
                  <tr
                    key={embassy.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedId(embassy.id)}
                  >
                    <td className="p-3 font-medium">
                      {embassy.flag_emoji} {name}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          embassy.appointment_status === "open"
                            ? "bg-emerald-100 text-emerald-700"
                            : embassy.appointment_status === "stopped"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t(`status_${embassy.appointment_status}`)}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {embassy.appointment_status === "open"
                        ? embassy.next_close_date
                          ? humanDate(embassy.next_close_date, locale)
                          : "—"
                        : embassy.next_open_date
                        ? humanDate(embassy.next_open_date, locale)
                        : "—"}
                    </td>
                    <td className="p-3 font-semibold text-[#1a73a7]">
                      {embassy.appointment_price
                        ? `${parseFloat(embassy.appointment_price).toLocaleString(isAr ? "ar-EG" : "en-US")} ${embassy.price_currency}`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
