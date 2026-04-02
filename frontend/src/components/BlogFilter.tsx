"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, ChevronDown } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import type { ApiBlog, ApiCategory, PaginatedMeta } from "@/lib/api";
import { API_URL } from "@/lib/api";

interface BlogFilterProps {
  initialBlogs: ApiBlog[];
  categories: ApiCategory[];
  initialMeta: PaginatedMeta;
}

export default function BlogFilter({
  initialBlogs,
  categories,
  initialMeta,
}: BlogFilterProps) {
  const t = useTranslations("blog");
  const tours = useTranslations("tours");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<ApiBlog[]>(initialBlogs);
  const [page, setPage] = useState(initialMeta.current_page);
  const [lastPage, setLastPage] = useState(initialMeta.last_page);
  const [total, setTotal] = useState(initialMeta.total);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(
    async (pageNum: number, categoryId: number | null, append: boolean) => {
      setLoading(true);
      try {
        const url = new URL(`${API_URL}/blogs`);
        url.searchParams.set("page", String(pageNum));
        if (categoryId)
          url.searchParams.set("category_id", String(categoryId));
        const res = await fetch(url.toString());
        if (!res.ok) return;
        const json = await res.json();
        const items: ApiBlog[] = json.data ?? [];
        setBlogs((prev) => (append ? [...prev, ...items] : items));
        setPage(json.meta.current_page);
        setLastPage(json.meta.last_page);
        setTotal(json.meta.total);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleCategoryChange = (categoryId: number | null) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setBlogs([]);
    fetchBlogs(1, categoryId, false);
  };

  const handleLoadMore = () => {
    fetchBlogs(page + 1, activeCategory, true);
  };

  const hasMore = page < lastPage;

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategoryChange(null)}
          className="px-6 py-2 rounded-full font-medium transition-colors"
          style={{
            backgroundColor: activeCategory === null ? "#1a73a7" : "#f3f4f6",
            color: activeCategory === null ? "#fff" : "#374151",
          }}
        >
          {tours("all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className="px-6 py-2 rounded-full font-medium transition-colors"
            style={{
              backgroundColor:
                activeCategory === cat.id ? "#1a73a7" : "#f3f4f6",
              color: activeCategory === cat.id ? "#fff" : "#374151",
            }}
          >
            {locale === "ar" ? cat.name_ar : cat.name_en}
          </button>
        ))}
      </div>

      {/* Blog grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : loading ? null : (
        <p className="text-center text-gray-500 py-10">{t("noPosts")}</p>
      )}

      {/* Loading indicator for category switch */}
      {loading && blogs.length === 0 && (
        <div className="flex justify-center py-16">
          <Loader2 size={32} className="animate-spin text-[#1a73a7]" />
        </div>
      )}

      {/* Load More button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <motion.button
            onClick={handleLoadMore}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#1a73a7] to-[#155d87] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{t("loading")}</span>
              </>
            ) : (
              <>
                <span>{t("loadMore")}</span>
                <ChevronDown
                  size={20}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Results count */}
      {total > 0 && (
        <p className="text-center text-sm text-gray-400 mt-6">
          {blogs.length} / {total}
        </p>
      )}
    </>
  );
}
