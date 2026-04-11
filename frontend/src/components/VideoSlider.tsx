"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface VideoItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
}

export default function VideoSlider({ videos }: { videos: VideoItem[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const absScroll = Math.abs(scrollLeft);
    setCanScrollLeft(absScroll > 10);
    setCanScrollRight(absScroll + clientWidth < scrollWidth - 10);

    // Calculate active index based on scroll position
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 280;
    const gap = 24;
    const idx = Math.round(absScroll / (cardWidth + gap));
    setActiveIndex(Math.min(idx, videos.length - 1));
  }, [videos.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 280;
    const gap = 24;
    const amount = cardWidth + gap;
    // RTL: left scroll goes "forward", so invert for RTL
    const mult = isAr
      ? direction === "right" ? -1 : 1
      : direction === "right" ? 1 : -1;
    el.scrollBy({ left: amount * mult, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 280;
    const gap = 24;
    const pos = index * (cardWidth + gap);
    el.scrollTo({ left: isAr ? -pos : pos, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Navigation arrows — desktop only */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label={isAr ? "الفيديو السابق" : "Previous video"}
        className="hidden md:flex absolute -start-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-0 disabled:pointer-events-none shadow-lg"
      >
        {isAr ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label={isAr ? "الفيديو التالي" : "Next video"}
        className="hidden md:flex absolute -end-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-0 disabled:pointer-events-none shadow-lg"
      >
        {isAr ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        role="region"
        aria-label={isAr ? "معرض فيديوهات دهب" : "Dahab video gallery"}
        tabIndex={0}
      >
        {videos.map((video, i) => {
          const title = isAr ? video.titleAr : video.titleEn;
          const desc = isAr ? video.descAr : video.descEn;
          return (
            <article
              key={video.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-center"
            >
              {/* Video card */}
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 hover:ring-[#1a73a7]/60 transition-all duration-500 group">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-b from-[#1a73a7]/0 via-[#1a73a7]/0 to-[#1a73a7]/0 group-hover:from-[#1a73a7]/20 group-hover:via-transparent group-hover:to-[#1a73a7]/20 rounded-2xl transition-all duration-700 pointer-events-none" />
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                {/* Video number badge */}
                <div className="absolute top-3 start-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold border border-white/20">
                  {i + 1}
                </div>
              </div>
              {/* Info */}
              <div className="mt-4 px-1">
                <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-1">
                  {title}
                </h3>
                <p className="text-white/40 text-xs md:text-sm line-clamp-2">
                  {desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label={isAr ? "اختر الفيديو" : "Select video"}>
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`${isAr ? "فيديو" : "Video"} ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-8 h-2.5 bg-[#1a73a7]"
                : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint — mobile only */}
      <p className="text-center text-white/30 text-xs mt-4 md:hidden" aria-hidden="true">
        {isAr ? "← اسحب لمشاهدة المزيد →" : "← Swipe for more →"}
      </p>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
