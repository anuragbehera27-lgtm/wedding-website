"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";
import { reveal, staggerContainer } from "@/lib/tokens";

export function Details() {
  const { t } = useLang();

  const columns = [
    {
      label: t("ceremony"),
      main:  t("ceremonyTime"),
      lines: ["Agriturismo da Pippo", "Cassignanica, Italy"],
    },
    {
      label: t("reception"),
      main:  t("receptionTime"),
      lines: [t("dinnerNote")],
    },
    {
      label: t("dresscode"),
      main:  t("dresscodeType"),
      lines: [t("dresscodeNote")],
    },
  ];

  return (
    <section id="details" className="py-24 px-4 bg-bg">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("detailsTag")} title={t("detailsTitle")} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {columns.map((col, i) => (
            <motion.div
              key={i}
              variants={reveal}
              className={`py-10 md:py-0 md:px-10 ${
                i === 0 ? "md:pl-0" : "border-t border-subtle md:border-t-0 md:border-l md:border-subtle"
              } ${i === columns.length - 1 ? "md:pr-0" : ""}`}
            >
              <div className="w-8 h-px bg-accent mb-6" />
              <p className="text-label font-body uppercase tracking-[0.25em] text-accent mb-4">
                {col.label}
              </p>
              <p className="font-display italic text-title text-ink mb-3">{col.main}</p>
              {col.lines.map((line, j) => (
                <p key={j} className="text-body text-muted">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
