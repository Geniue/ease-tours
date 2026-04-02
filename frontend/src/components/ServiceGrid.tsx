"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, ChevronDown } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import type { ApiService, PaginatedMeta } from "@/lib/api";
import { API_URL } from "@/lib/api";

interface ServiceGridProps {
  initialServices: ApiService[];
  initialMeta: PaginatedMeta;
}

export default function ServiceGrid({
  initialServices,
  initialMeta,
}: ServiceGridProps) {
  const t = useTranslations("services");
  const [services, setServices] = useState<ApiService[]>(initialServices);
  const [page, setPage] = useState(initialMeta.current_page);
  const [lastPage, setLastPage] = useState(initialMeta.last_page);
  const [total, setTotal] = useState(initialMeta.total);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_URL}/services?page=${nextPage}`);
      if (!res.ok) return;
      const json = await res.json();
      const items: ApiService[] = json.data ?? [];
      setServices((prev) => [...prev, ...items]);
      setPage(json.meta.current_page);
      setLastPage(json.meta.last_page);
      setTotal(json.meta.total);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const hasMore = page < lastPage;

  if (services.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">{t("noServices")}</p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

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
          {services.length} / {total}
        </p>
      )}
    </>
  );
}
