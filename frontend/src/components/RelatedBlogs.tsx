"use client";

import { useTranslations } from "next-intl";
import BlogCard from "@/components/BlogCard";
import type { ApiBlog } from "@/lib/api";

export default function RelatedBlogs({ blogs }: { blogs: ApiBlog[] }) {
  const t = useTranslations("blog");

  if (blogs.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t("relatedPosts")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
