"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  const rightLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/tours", label: t("tours") },
    { href: "/services", label: t("services") },
    { href: "/areas", label: t("areas") },
  ];

  const leftLinks = [
    { href: "/hajj-umrah", label: t("hajjUmrah") },
    { href: "/embassy", label: t("embassy") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const allLinks = [...rightLinks, ...leftLinks];
  const switchLocale = locale === "ar" ? "en" : "ar";
  const linkColor = solid ? "text-foreground" : "text-white";

  return (
    <nav
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile: Hamburger | Desktop: Language Switcher */}
        <div className="flex items-center flex-1 lg:flex-none">
          {/* Mobile hamburger */}
          <button
            className={`lg:hidden ${linkColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop language switcher */}
          <Link href={pathname} locale={switchLocale} className="hidden lg:block">
            <button
              className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                solid
                  ? "border-foreground/20 hover:bg-primary/10"
                  : "border-white/30 hover:bg-white/10"
              } ${linkColor}`}
            >
              <Globe size={14} />
              {switchLocale === "ar" ? "العربية" : "EN"}
            </button>
          </Link>
        </div>

        {/* Right Links (desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-accent ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Centered Logo */}
        <Link href="/" className="mx-4 lg:mx-8 shrink-0 mt-4">
          <Image
            src="/logo.png"
            alt="Ease Travel"
            width={160}
            height={160}
            className="h-36 lg:h-40 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>

        {/* Left Links (desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-accent ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: Language Switcher (far end to balance hamburger) */}
        <div className="lg:hidden flex-1 flex justify-end">
          <Link href={pathname} locale={switchLocale}>
            <button
              className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-full border transition-colors cursor-pointer ${
                solid
                  ? "border-foreground/20 hover:bg-primary/10"
                  : "border-white/30 hover:bg-white/10"
              } ${linkColor}`}
            >
              <Globe size={14} />
              {switchLocale === "ar" ? "العربية" : "EN"}
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-foreground hover:text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={pathname} locale={switchLocale}>
                <button className="flex items-center gap-1 text-sm mt-2 cursor-pointer">
                  <Globe size={16} />
                  {switchLocale === "ar" ? "العربية" : "English"}
                </button>
              </Link>
              <a
                href="https://wa.me/201105001389"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white text-center font-semibold px-5 py-2 rounded-full mt-2"
              >
                {t("bookNow")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
