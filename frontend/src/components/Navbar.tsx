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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
    { href: "/booking/flights", label: t("flights") },
    { href: "/embassy", label: t("embassy") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const allLinks = [...rightLinks, ...leftLinks];
  const switchLocale = locale === "ar" ? "en" : "ar";
  const linkColor = solid ? "text-foreground" : "text-white";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 h-20 flex items-center justify-between"
        aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
      >
        {/* Mobile: Hamburger | Desktop: Language Switcher */}
        <div className="flex items-center flex-1 lg:flex-none">
          {/* Mobile hamburger */}
          <button
            className={`lg:hidden ${linkColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen
              ? (locale === "ar" ? "إغلاق القائمة" : "Close menu")
              : (locale === "ar" ? "فتح القائمة" : "Open menu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop language switcher */}
          <Link
            href={pathname}
            locale={switchLocale}
            className={`hidden lg:flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border transition-colors ${
              solid
                ? "border-foreground/20 hover:bg-primary/10"
                : "border-white/30 hover:bg-white/10"
            } ${linkColor}`}
            aria-label={switchLocale === "ar" ? "التبديل للعربية" : "Switch to English"}
          >
            <Globe size={14} />
            {switchLocale === "ar" ? "العربية" : "EN"}
          </Link>
        </div>

        {/* Right Links (desktop) */}
        <ul className="hidden lg:flex items-center gap-6 flex-1 justify-end list-none m-0 p-0">
          {rightLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-accent ${
                  isActive(link.href) ? "text-accent" : linkColor
                }`}
                {...(isActive(link.href) ? { "aria-current": "page" as const } : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Centered Logo */}
        <Link href="/" className="mx-4 lg:mx-8 shrink-0 mt-4" aria-label={locale === "ar" ? "إيز ترافل - الصفحة الرئيسية" : "Ease Travel - Home"}>
          <Image
            src="/logo.png"
            alt={locale === "ar" ? "إيز ترافل - شركة سياحة مصرية" : "Ease Travel - Egyptian Tourism Company"}
            width={160}
            height={160}
            className="h-36 lg:h-40 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>

        {/* Left Links (desktop) */}
        <ul className="hidden lg:flex items-center gap-6 flex-1 list-none m-0 p-0">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-accent ${
                  isActive(link.href) ? "text-accent" : linkColor
                }`}
                {...(isActive(link.href) ? { "aria-current": "page" as const } : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: Language Switcher (far end to balance hamburger) */}
        <div className="lg:hidden flex-1 flex justify-end">
          <Link
            href={pathname}
            locale={switchLocale}
            className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-full border transition-colors ${
              solid
                ? "border-foreground/20 hover:bg-primary/10"
                : "border-white/30 hover:bg-white/10"
            } ${linkColor}`}
            aria-label={switchLocale === "ar" ? "التبديل للعربية" : "Switch to English"}
          >
            <Globe size={14} />
            {switchLocale === "ar" ? "العربية" : "EN"}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label={locale === "ar" ? "قائمة الجوال" : "Mobile menu"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-1 p-4 list-none m-0">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2.5 px-2 rounded-lg font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-gray-50"
                    }`}
                    {...(isActive(link.href) ? { "aria-current": "page" as const } : {})}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={pathname}
                  locale={switchLocale}
                  className="flex items-center gap-1 text-sm mt-2 px-2 py-2"
                  aria-label={switchLocale === "ar" ? "التبديل للعربية" : "Switch to English"}
                >
                  <Globe size={16} />
                  {switchLocale === "ar" ? "العربية" : "English"}
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/201105001389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white text-center font-semibold px-5 py-2.5 rounded-full mt-2 block"
                >
                  {t("bookNow")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
