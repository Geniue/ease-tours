"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Hotel,
  Bus,
  Users,
  Heart,
} from "lucide-react";

const iconMap = [ShieldCheck, Clock, Hotel, Bus, Users, Heart];
const keys = [
  "licenseA",
  "experience",
  "hotels",
  "transport",
  "guides",
  "satisfaction",
] as const;

export default function WhyChooseUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-14"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {keys.map((key, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={24} />
                </div>
                <p className="text-foreground font-medium pt-2.5">{t(key)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
