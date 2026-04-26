"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, ChevronDown, Search, X } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchBlogs = useCallback(
    async (pageNum: number, categoryId: number | null, q: string, append: boolean) => {
      setLoading(true);
      try {
        const url = new URL(`${API_URL}/blogs`);
        url.searchParams.set("page", String(pageNum));
        if (categoryId) url.searchParams.set("category_id", String(categoryId));
        if (q.trim()) url.searchParams.set("q", q.trim());
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
    fetchBlogs(1, categoryId, searchTerm, false);
  };

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Skip the first effect on mount when value is empty AND we already have initial data
    if (!searchTerm && blogs === initialBlogs) return;
    debounceRef.current = setTimeout(() => {
      setBlogs([]);
      fetchBlogs(1, activeCategory, searchTerm, false);
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleLoadMore = () => {
    fetchBlogs(page + 1, activeCategory, searchTerm, true);
  };

  const hasMore = page < lastPage;

  return (
    <>
      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search
            size={18}
            className={`absolute top-1/2 -translate-y-1/2 ${locale === "ar" ? "right-4" : "left-4"} text-gray-400`}
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className={`w-full h-12 ${locale === "ar" ? "pr-11 pl-11" : "pl-11 pr-11"} rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73a7]/30 focus:border-[#1a73a7] text-sm`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className={`absolute top-1/2 -translate-y-1/2 ${locale === "ar" ? "left-3" : "right-3"} w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center text-gray-500`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

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
        <p className="text-center text-gray-500 py-10">
          {searchTerm ? t("noResults") : t("noPosts")}
        </p>
      )}

      {loading && blogs.length === 0 && (
        <div className="flex justify-center py-16">
          <Loader2 size={32} className="animate-spin text-[#1a73a7]" />
        </div>
      )}

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

      {total > 0 && (
        <p className="text-center text-sm text-gray-400 mt-6">
          {blogs.length} / {total}
        </p>
      )}
    </>
  );
}
