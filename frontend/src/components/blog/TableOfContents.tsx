"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface TocItem {
  id: string;
  level: number;
  text: string;
}

export default function TableOfContents({ html }: { html: string }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article[data-blog-body]");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const collected: TocItem[] = headings.map((h, i) => {
      if (!h.id) {
        const text = h.textContent || "";
        const slug = text
          .trim()
          .toLowerCase()
          .replace(/[‎‏]/g, "")
          .replace(/[^\p{L}\p{N}\s-]/gu, "")
          .replace(/\s+/g, "-")
          .slice(0, 60) || `section-${i}`;
        h.id = `s-${i}-${slug}`;
      }
      return {
        id: h.id,
        level: parseInt(h.tagName.substring(1), 10),
        text: h.textContent?.trim() || "",
      };
    });
    const frame = requestAnimationFrame(() => setItems(collected));

    if (collected.length === 0) {
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [html]);

  if (items.length < 3) return null;

  const heading = isAr ? "محتويات المقال" : "Table of contents";

  return (
    <nav
      aria-label={heading}
      className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 lg:sticky lg:top-24"
      dir={isAr ? "rtl" : "ltr"}
    >
      <p className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">{heading}</p>
      <ol className="space-y-2 text-sm">
        {items.map((it) => (
          <li
            key={it.id}
            style={{ paddingInlineStart: it.level === 3 ? "1rem" : 0 }}
          >
            <a
              href={`#${it.id}`}
              className={`block transition-colors hover:text-[#1a73a7] ${
                activeId === it.id ? "text-[#1a73a7] font-semibold" : "text-gray-600"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
