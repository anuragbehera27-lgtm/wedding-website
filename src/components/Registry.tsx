"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";
import { reveal, staggerContainer } from "@/lib/tokens";

export function Registry() {
  const { t } = useLang();

  return (
    <section id="registry" className="py-24 px-4 bg-ink">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("registryTag")} title={t("registryTitle")} light />

        <motion.div
          className="max-w-lg mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.p variants={reveal} className="text-body text-white/55 mb-12 text-pretty">
            {t("registryNote")}
          </motion.p>

          <motion.div
            variants={reveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/25 rounded-full text-label font-body uppercase tracking-[0.2em] text-bg/75 hover:border-white/55 hover:text-bg transition-all duration-fast ease-out-expo"
            >
              {t("giftRegistry")}
            </a>
            <a
              href="#"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/25 rounded-full text-label font-body uppercase tracking-[0.2em] text-bg/75 hover:border-white/55 hover:text-bg transition-all duration-fast ease-out-expo"
            >
              {t("honeymoonFund")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
