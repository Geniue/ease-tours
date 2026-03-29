"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { image: "/felix-rostig-UmV2wr-Vbq8-unsplash.jpg", titleKey: "slide1Title", subtitleKey: "slide1Subtitle" },
  { image: "/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg", titleKey: "slide2Title", subtitleKey: "slide2Subtitle" },
  { image: "/rui-silvestre-NYbbON5Afs0-unsplash.jpg", titleKey: "slide3Title", subtitleKey: "slide3Subtitle" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={t(slide.titleKey)}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-lg">
              {t(slide.titleKey)}
            </h1>

            {/* Accent Line */}
            <div className="w-16 h-1 bg-accent rounded-full mb-6" />

            <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-2xl drop-shadow">
              {t(slide.subtitleKey)}
            </p>

            {/* Book Now CTA */}
            <a
              href="https://wa.me/201105001389"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-10 py-3 rounded-full text-lg transition-colors"
            >
              {t("cta")}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Brand Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-16 text-sm md:text-base tracking-[0.5em] text-white/60 uppercase font-light"
        >
          E A S E &nbsp; T R A V E L
        </motion.p>
      </div>

      {/* Dot Indicators — at the very bottom of the hero */}
      <div className="absolute bottom-4 z-10 flex items-center justify-center w-full gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="cursor-pointer p-1"
          >
            <span
              style={{ width: i === current ? 32 : 12, height: 12 }}
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-accent"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
