"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";
import { reveal, staggerContainer } from "@/lib/tokens";
export function Travel() {
  const { t } = useLang();

  const cards: Array<{
    label: string;
    body: string;
    cta: { text: string; href: string } | null;
  }> = [
    {
      label: t("accommodation"),
      body:  t("accommodationNote"),
      cta:   null,
    },
    {
      label: t("gettingThere"),
      body:  t("gettingThereNote"),
      cta:   { text: t("viewMap"), href: "#" },
    },
    {
      label: t("thingsToDo"),
      body:  t("thingsToDoNote"),
      cta:   { text: t("ourPicks"), href: "#" },
    },
  ];

  return (
    <section id="travel" className="py-24 px-4 bg-bg">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("travelTag")} title={t("travelTitle")} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={reveal}
              className="flex flex-col border border-subtle rounded-md p-8"
            >
              <div className="w-8 h-px bg-accent mb-5" />
              <p className="text-label font-body uppercase tracking-[0.25em] text-accent mb-4">
                {card.label}
              </p>
              <p className="text-body text-muted flex-1 text-pretty">{card.body}</p>
              {card.cta && (
                <a
                  href={card.cta.href}
                  className="mt-6 text-label font-body uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors duration-fast ease-out-expo inline-flex items-center gap-2"
                >
                  {card.cta.text}
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
