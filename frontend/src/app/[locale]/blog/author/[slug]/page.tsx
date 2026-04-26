import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Image from "next/image";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/blog/BrandIcons";
import { getAuthor, getBlogsPaginated } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbSchema,
  blogItemListSchema,
  authorProfileSchema,
} from "@/lib/schemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ease-travel.online";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const decoded = decodeURIComponent(slug);
  const author = await getAuthor(decoded);
  if (!author) return {};
  const isAr = locale === "ar";
  const name = isAr ? author.name_ar : author.name_en;
  const expertise = isAr ? author.expertise_ar : author.expertise_en;
  const bio = isAr ? author.bio_ar : author.bio_en;
  const title = expertise ? `${name} — ${expertise}` : `${name} — ${isAr ? "إيز ترافل" : "Ease Travel"}`;
  const description = bio || (isAr ? `مقالات بقلم ${name}` : `Articles by ${name}`);
  const altLocale = isAr ? "en" : "ar";
  const correctSlug = isAr ? author.slug_ar : author.slug_en;
  const altSlug = isAr ? author.slug_en : author.slug_ar;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(correctSlug)}`,
      languages: {
        [locale]: `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(correctSlug)}`,
        [altLocale]: `${SITE_URL}/${altLocale}/blog/author/${encodeURIComponent(altSlug)}`,
      },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      ...(author.photo_url && { images: [{ url: author.photo_url, alt: name }] }),
    },
  };
}

export default async function BlogAuthorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const decoded = decodeURIComponent(slug);
  const isAr = locale === "ar";

  const author = await getAuthor(decoded);
  if (!author) notFound();

  const { data: blogs, meta } = await getBlogsPaginated({ author_slug: decoded, per_page: "12" });

  const name = isAr ? author.name_ar : author.name_en;
  const expertise = isAr ? author.expertise_ar : author.expertise_en;
  const bio = isAr ? author.bio_ar : author.bio_en;
  const correctSlug = isAr ? author.slug_ar : author.slug_en;
  const url = `${SITE_URL}/${locale}/blog/author/${encodeURIComponent(correctSlug)}`;
  const pageTitle = isAr ? `مقالات بقلم ${name}` : `Articles by ${name}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: isAr ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
        { name: isAr ? "المدونة" : "Blog", url: `${SITE_URL}/${locale}/blog` },
        { name, url },
      ])} />
      <JsonLd data={authorProfileSchema(author, locale, blogs)} />
      {blogs.length > 0 && (
        <JsonLd data={blogItemListSchema(blogs, locale, pageTitle, url)} />
      )}
      <main>
        <AuthorHero author={author} name={name} expertise={expertise} bio={bio} isAr={isAr} count={meta.total} />

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                {isAr ? "لم يكتب هذا المؤلف أي مقالات بعد" : "This author hasn’t published any articles yet"}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function AuthorHero({
  author,
  name,
  expertise,
  bio,
  isAr,
  count,
}: {
  author: { photo_url: string | null; social_twitter: string | null; social_linkedin: string | null; social_facebook: string | null };
  name: string;
  expertise: string | null;
  bio: string | null;
  isAr: boolean;
  count: number;
}) {
  const t = useTranslations("blog");
  return (
    <section className="bg-gradient-to-br from-[#1a73a7] to-[#0d4a6e] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: isAr ? "المدونة" : "Blog", href: "/blog" },
            { label: name },
          ]}
          variant="dark"
        />
        <div className="mt-6 flex flex-col md:flex-row gap-6 items-start md:items-center" dir={isAr ? "rtl" : "ltr"}>
          {author.photo_url ? (
            <Image
              src={author.photo_url}
              alt={name}
              width={120}
              height={120}
              unoptimized
              className="rounded-full object-cover border-4 border-white/20 flex-shrink-0"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-white/15 text-white flex items-center justify-center text-4xl font-bold flex-shrink-0">
              {name.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
            {expertise && <p className="text-[#f59e0b] font-semibold mt-1">{expertise}</p>}
            {bio && <p className="text-white/85 mt-3 max-w-2xl leading-relaxed">{bio}</p>}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="text-sm text-white/80">
                {count} {isAr ? "مقال" : "articles"}
              </span>
              <div className="flex gap-3">
                {author.social_twitter && (
                  <a href={author.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/70 hover:text-white">
                    <XIcon size={18} />
                  </a>
                )}
                {author.social_linkedin && (
                  <a href={author.social_linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-white">
                    <LinkedInIcon size={18} />
                  </a>
                )}
                {author.social_facebook && (
                  <a href={author.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 hover:text-white">
                    <FacebookIcon size={18} />
                  </a>
                )}
              </div>
            </div>
            <p className="sr-only">{t("viewAuthorPosts")} {name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
