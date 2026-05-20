"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import WhatsAppTrackedLink from "@/components/WhatsAppTrackedLink";

type NavLinkItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState({ open: false, path: pathname });
  const isHome = pathname === "/";
  const mobileOpen = mobileMenu.path === pathname && mobileMenu.open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => ({
      path: pathname,
      open: prev.path === pathname ? !prev.open : true,
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenu({ path: pathname, open: false });
  };

  const solid = scrolled || !isHome;
  const visaServicesLabel = locale === "ar" ? "خدمات التأشيرات" : "Visa Services";
  const visaGalleryLabel = locale === "ar" ? "معرض التأشيرات" : "Visa Gallery";

  const navLinks: NavLinkItem[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/tours", label: t("tours") },
    { href: "/services", label: t("services") },
    { href: "/visa-requirements", label: visaServicesLabel },
    { href: "/hajj-umrah", label: t("hajjUmrah") },
    { href: "/booking/flights", label: t("flights") },
    { href: "/visa-gallery", label: visaGalleryLabel },
    { href: "/areas", label: t("areas") },
    { href: "/embassy", label: t("embassy") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const galleryIndex = navLinks.findIndex(
    (link) => link.href === "/visa-gallery"
  );
  const desktopSplitIndex =
    galleryIndex > -1 ? galleryIndex : Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, desktopSplitIndex);
  const rightLinks = navLinks.slice(desktopSplitIndex);
  const switchLocale = locale === "ar" ? "en" : "ar";
  const linkColor = solid ? "text-foreground" : "text-white";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const desktopLinkClass = (href: string) =>
    `whitespace-nowrap text-[12px] font-semibold transition-colors hover:text-accent xl:text-[13px] 2xl:text-sm ${
      isActive(href) ? "text-accent" : linkColor
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto hidden h-20 grid-cols-[1fr_auto_1fr] items-center px-4 lg:grid"
        aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
      >
        <ul className="m-0 flex min-w-0 list-none items-center justify-end gap-2 p-0 xl:gap-3 2xl:gap-5">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={desktopLinkClass(link.href)}
                {...(isActive(link.href)
                  ? { "aria-current": "page" as const }
                  : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mx-5 shrink-0 xl:mx-7"
          aria-label={
            locale === "ar" ? "إيز ترافل - الصفحة الرئيسية" : "Ease Travel - Home"
          }
        >
          <Image
            src="/logo.png"
            alt={
              locale === "ar"
                ? "إيز ترافل - شركة سياحة مصرية"
                : "Ease Travel - Egyptian Tourism Company"
            }
            width={160}
            height={160}
            className="h-24 w-auto object-contain drop-shadow-md xl:h-28"
            priority
          />
        </Link>

        <div className="flex min-w-0 items-center justify-start gap-2 xl:gap-3 2xl:gap-5">
          <ul className="m-0 flex min-w-0 list-none items-center justify-start gap-2 p-0 xl:gap-3 2xl:gap-5">
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={desktopLinkClass(link.href)}
                  {...(isActive(link.href)
                    ? { "aria-current": "page" as const }
                    : {})}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={pathname}
            locale={switchLocale}
            className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors xl:px-3 ${
              solid
                ? "border-foreground/20 hover:bg-primary/10"
                : "border-white/30 hover:bg-white/10"
            } ${linkColor}`}
            aria-label={
              switchLocale === "ar" ? "التبديل للعربية" : "Switch to English"
            }
          >
            <Globe size={14} />
            {switchLocale === "ar" ? "العربية" : "EN"}
          </Link>
        </div>
      </nav>

      <nav
        className="container mx-auto flex h-20 items-center justify-between px-4 lg:hidden"
        aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
      >
        <div className="flex flex-1 items-center">
          <button
            className={linkColor}
            onClick={toggleMobileMenu}
            aria-label={
              mobileOpen
                ? locale === "ar"
                  ? "إغلاق القائمة"
                  : "Close menu"
                : locale === "ar"
                  ? "فتح القائمة"
                  : "Open menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <Link
          href="/"
          className="mx-4 shrink-0"
          aria-label={
            locale === "ar" ? "إيز ترافل - الصفحة الرئيسية" : "Ease Travel - Home"
          }
        >
          <Image
            src="/logo.png"
            alt={
              locale === "ar"
                ? "إيز ترافل - شركة سياحة مصرية"
                : "Ease Travel - Egyptian Tourism Company"
            }
            width={150}
            height={150}
            className="h-24 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>

        <div className="flex flex-1 justify-end">
          <Link
            href={pathname}
            locale={switchLocale}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-sm transition-colors ${
              solid
                ? "border-foreground/20 hover:bg-primary/10"
                : "border-white/30 hover:bg-white/10"
            } ${linkColor}`}
            aria-label={
              switchLocale === "ar" ? "التبديل للعربية" : "Switch to English"
            }
          >
            <Globe size={14} />
            {switchLocale === "ar" ? "العربية" : "EN"}
          </Link>
        </div>
      </nav>

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2.5 px-2 rounded-lg font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-gray-50"
                    }`}
                    {...(isActive(link.href)
                      ? { "aria-current": "page" as const }
                      : {})}
                    onClick={closeMobileMenu}
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
                  aria-label={
                    switchLocale === "ar"
                      ? "التبديل للعربية"
                      : "Switch to English"
                  }
                >
                  <Globe size={16} />
                  {switchLocale === "ar" ? "العربية" : "English"}
                </Link>
              </li>
              <li>
                <WhatsAppTrackedLink
                  href="https://wa.me/201105001389"
                  className="bg-accent text-white text-center font-semibold px-5 py-2.5 rounded-full mt-2 block"
                  ctaLocation="mobile-nav"
                  sourceType="navbar"
                >
                  {t("bookNow")}
                </WhatsAppTrackedLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
