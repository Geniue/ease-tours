"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link as LinkIcon, Check } from "lucide-react";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/blog/BrandIcons";

export default function SocialShare({ title, url }: { title: string; url: string }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [copied, setCopied] = useState(false);

  const shareLabel = isAr ? "مشاركة المقال" : "Share this article";
  const copyLabel = copied ? (isAr ? "تم النسخ" : "Copied") : (isAr ? "نسخ الرابط" : "Copy link");

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      bg: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.46-7.54c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "#1877F2",
      icon: <FacebookIcon />,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      bg: "#000",
      icon: <XIcon />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: "#0A66C2",
      icon: <LinkedInIcon />,
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — silent */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 my-8 py-5 border-y border-gray-200">
      <span className="text-sm font-semibold text-gray-700 me-2">{shareLabel}</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={l.name}
          className="w-10 h-10 rounded-full inline-flex items-center justify-center text-white hover:opacity-90 transition"
          style={{ backgroundColor: l.bg }}
        >
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
        className="inline-flex items-center gap-2 px-3 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition"
      >
        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
        <span>{copyLabel}</span>
      </button>
    </div>
  );
}
