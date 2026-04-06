"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  Tag,
  ChevronDown,
  Play,
} from "lucide-react";
import Image from "next/image";
import { type ApiTrip } from "@/lib/api";
import BookingForm from "@/components/BookingForm";

export default function TourDetailContent({ trip }: { trip: ApiTrip }) {
  const t = useTranslations("tourDetail");
  const tCard = useTranslations("tourCard");
  const locale = useLocale();
  const isAr = locale === "ar";

  const title = isAr ? trip.title_ar : trip.title_en;
  const description = isAr ? trip.description_ar : trip.description_en;
  const destination = isAr ? trip.destination_ar : trip.destination_en;
  const itinerary = isAr ? trip.itinerary_ar : trip.itinerary_en;
  const inclusions = isAr ? trip.inclusions_ar : trip.inclusions_en;
  const categoryName = isAr ? trip.category.name_ar : trip.category.name_en;
  const price = parseFloat(trip.base_price);
  const discounted = trip.discounted_price
    ? parseFloat(trip.discounted_price)
    : null;
  const displayPrice = discounted ?? price;

  const [openSection, setOpenSection] = useState<string | null>("overview");
  const [showBooking, setShowBooking] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = !!trip.video_url;
  const videoPoster = trip.video_thumbnail_url || trip.featured_image_url || undefined;

  const isTripEnded = trip.end_date
    ? new Date(trip.end_date) < new Date(new Date().toDateString())
    : false;
  const isComingSoon = trip.coming_soon;
  const canBook = !isTripEnded && !isComingSoon;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-80 md:h-[28rem] overflow-hidden">
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={trip.video_url!}
              poster={videoPoster}
              preload="metadata"
              playsInline
              controls={isVideoPlaying}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover"
              aria-label={title}
            />
            {!isVideoPlaying && (
              <button
                onClick={() => videoRef.current?.play()}
                className="absolute inset-0 z-10 flex items-center justify-center group cursor-pointer"
                aria-label={isAr ? "تشغيل الفيديو" : "Play video"}
              >
                <span className="w-20 h-20 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play size={36} className="text-primary ms-1" fill="currentColor" />
                </span>
              </button>
            )}
          </>
        ) : (
          trip.featured_image_url && (
            <Image
              src={trip.featured_image_url}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="100vw"
            />
          )
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent ${isVideoPlaying ? "pointer-events-none opacity-0" : ""} transition-opacity`} />
        <div className={`absolute inset-x-0 bottom-0 p-6 md:p-10 pt-20 ${isVideoPlaying ? "pointer-events-none opacity-0" : ""} transition-opacity`}>
          <div className="container mx-auto">
            <span className="inline-block bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
              {categoryName}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {destination}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {trip.duration_days} {t("daysUnit")}
              </span>
              {trip.start_date && (
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(trip.start_date)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Overview Accordion */}
            <AccordionSection
              title={t("overview")}
              isOpen={openSection === "overview"}
              onToggle={() => toggleSection("overview")}
            >
              {description ? (
                <div
                  className="prose prose-lg max-w-none text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <p className="text-foreground/60">—</p>
              )}
            </AccordionSection>

            {/* Itinerary Accordion */}
            {itinerary && (
              <AccordionSection
                title={t("itinerary")}
                isOpen={openSection === "itinerary"}
                onToggle={() => toggleSection("itinerary")}
              >
                <div
                  className="prose max-w-none text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: itinerary }}
                />
              </AccordionSection>
            )}

            {/* Inclusions Accordion */}
            {inclusions && (
              <AccordionSection
                title={t("inclusions")}
                isOpen={openSection === "inclusions"}
                onToggle={() => toggleSection("inclusions")}
              >
                <div
                  className="prose max-w-none text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: inclusions }}
                />
              </AccordionSection>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-6 space-y-5">
              {/* Price */}
              <div className="text-center border-b pb-5">
                {isComingSoon ? (
                  <p className="text-2xl font-bold text-amber-500">
                    {t("comingSoon")}
                  </p>
                ) : discounted ? (
                  <>
                    <p className="text-foreground/40 line-through text-lg">
                      {price.toLocaleString()} {tCard("egp")}
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {discounted.toLocaleString()} {tCard("egp")}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    {price.toLocaleString()} {tCard("egp")}
                  </p>
                )}
                {!isComingSoon && (
                  <p className="text-foreground/50 text-sm mt-1">
                    {t("perPerson")}
                  </p>
                )}
              </div>

              {/* Trip Info */}
              <div className="space-y-3 text-sm">
                <InfoRow
                  icon={<Clock size={16} />}
                  label={t("duration")}
                  value={`${trip.duration_days} ${t("daysUnit")}`}
                />
                <InfoRow
                  icon={<MapPin size={16} />}
                  label={t("destination")}
                  value={destination}
                />
                <InfoRow
                  icon={<Tag size={16} />}
                  label={t("category")}
                  value={categoryName}
                />
                {trip.start_date && (
                  <InfoRow
                    icon={<Calendar size={16} />}
                    label={t("startDate")}
                    value={formatDate(trip.start_date)}
                  />
                )}
                {trip.end_date && (
                  <InfoRow
                    icon={<Calendar size={16} />}
                    label={t("endDate")}
                    value={formatDate(trip.end_date)}
                  />
                )}
                {trip.max_participants && (
                  <InfoRow
                    icon={<Users size={16} />}
                    label={t("maxParticipants")}
                    value={`${trip.max_participants} ${t("participants")}`}
                  />
                )}
              </div>

              {/* Book Button */}
              {isComingSoon ? (
                <button
                  disabled
                  className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full text-lg cursor-not-allowed opacity-80"
                >
                  {t("comingSoon")}
                </button>
              ) : isTripEnded ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-full text-lg cursor-not-allowed"
                >
                  {t("tripEnded")}
                </button>
              ) : (
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition-colors cursor-pointer text-lg"
                >
                  {t("bookThisTrip")}
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <BookingForm trip={trip} onClose={() => setShowBooking(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-start font-bold text-lg text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
      >
        {title}
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-foreground/60">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
