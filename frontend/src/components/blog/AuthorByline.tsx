"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/blog/BrandIcons";
import type { ApiAuthor } from "@/lib/api";

export default function AuthorByline({
  author,
  variant = "full",
}: {
  author: ApiAuthor;
  variant?: "full" | "compact";
}) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const name = isAr ? author.name_ar : author.name_en;
  const expertise = isAr ? author.expertise_ar : author.expertise_en;
  const bio = isAr ? author.bio_ar : author.bio_en;
  const slug = isAr ? author.slug_ar : author.slug_en;

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/author/${slug}`}
        className="inline-flex items-center gap-2 group"
      >
        {author.photo_url ? (
          <Image
            src={author.photo_url}
            alt={name}
            width={28}
            height={28}
            unoptimized
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#1a73a7] text-white flex items-center justify-center text-xs font-bold">
            {name.charAt(0)}
          </div>
        )}
        <span className="text-sm text-gray-700 group-hover:text-[#1a73a7]">{name}</span>
      </Link>
    );
  }

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-10 flex gap-5 items-start" dir={isAr ? "rtl" : "ltr"}>
      {author.photo_url ? (
        <Image
          src={author.photo_url}
          alt={name}
          width={72}
          height={72}
          unoptimized
          className="rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-[72px] h-[72px] rounded-full bg-[#1a73a7] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {name.charAt(0)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Link
          href={`/blog/author/${slug}`}
          className="text-lg font-bold text-gray-900 hover:text-[#1a73a7]"
        >
          {name}
        </Link>
        {expertise && <p className="text-sm text-[#1a73a7] font-medium">{expertise}</p>}
        {bio && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{bio}</p>}
        <div className="flex gap-3 mt-3">
          {author.social_twitter && (
            <a href={author.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-gray-400 hover:text-[#1a73a7]">
              <XIcon size={18} />
            </a>
          )}
          {author.social_linkedin && (
            <a href={author.social_linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#1a73a7]">
              <LinkedInIcon size={18} />
            </a>
          )}
          {author.social_facebook && (
            <a href={author.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#1a73a7]">
              <FacebookIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
