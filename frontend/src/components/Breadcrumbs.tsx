"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export default function Breadcrumbs({ items, variant = "light" }: BreadcrumbsProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  const homeLabel = isAr ? "الرئيسية" : "Home";
  const allItems: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }, ...items];

  const linkClass =
    variant === "dark"
      ? "hover:text-white transition-colors text-blue-200"
      : "hover:text-primary transition-colors text-foreground/50";

  const activeClass =
    variant === "dark" ? "text-white font-medium" : "text-foreground font-medium";

  const chevronClass =
    variant === "dark" ? "text-blue-300/60" : "text-foreground/30";

  return (
    <nav
      aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
      className="flex items-center gap-1.5 text-sm flex-wrap"
    >
      <ol className="flex items-center gap-1.5 list-none m-0 p-0 flex-wrap">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <Chevron size={12} className={chevronClass} aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className={activeClass} aria-current="page">
                  {i === 0 && <Home size={14} className="inline -mt-0.5 me-1" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={linkClass}>
                  {i === 0 && <Home size={14} className="inline -mt-0.5 me-1" aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
