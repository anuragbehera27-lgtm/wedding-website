"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { reveal } from "@/lib/tokens";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";

const TIMELINE: {
  year: string;
  en: { title: string; note: string };
  it: { title: string; note: string };
}[] = [
  {
    year: "2016",
    en: {
      title: "A Diwali in Milan",
      note: "Two PhD students met at a Diwali celebration and never quite looked away.",
    },
    it: {
      title: "Un Diwali a Milano",
      note: "Due dottorandi si incontrarono a una festa di Diwali — e non smisero più di guardarsi.",
    },
  },
  {
    year: "2020",
    en: {
      title: "Lockdown, together",
      note: "The world stopped. We discovered we were each other's home.",
    },
    it: {
      title: "Il lockdown, insieme",
      note: "Il mondo si fermò. Scoprimmo di essere la casa l'uno dell'altra.",
    },
  },
  {
    year: "2022",
    en: {
      title: "Doctors, both",
      note: "Years of research, late nights, and hard-won pages — finally done.",
    },
    it: {
      title: "Dottori, entrambi",
      note: "Anni di ricerca, notti tarde e pagine sudate — finalmente conclusi.",
    },
  },
  {
    year: "2023",
    en: {
      title: "España",
      note: "A new country, a new chapter. And then Chichu joined the family.",
    },
    it: {
      title: "Spagna",
      note: "Un nuovo paese, un nuovo capitolo. E poi Chichu è entrato in famiglia.",
    },
  },
  {
    year: "2025",
    en: {
      title: "Olivia",
      note: "She made us three.",
    },
    it: {
      title: "Olivia",
      note: "Ci ha fatti diventare tre.",
    },
  },
  {
    year: "2026",
    en: {
      title: "Forever",
      note: "Now we make it official — surrounded by everyone we love, in Italy.",
    },
    it: {
      title: "Per sempre",
      note: "Ora lo rendiamo ufficiale — circondati da tutti quelli che amiamo, in Italia.",
    },
  },
];

export function Story() {
  const { t, lang } = useLang();

  return (
    <section id="story" className="py-24 px-4 bg-bg overflow-hidden">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("storyTag")} title={t("storyTitle")} />

        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* ── Image column ─────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={reveal}
          >
            <div className="relative pr-3 pb-3">
              <div
                className="absolute top-3 left-3 right-0 bottom-0 border border-subtle rounded-md"
                aria-hidden="true"
              />
              <motion.div
                className="relative z-10 aspect-[4/5] rounded-md overflow-hidden shadow-sm"
                whileHover={{
                  x: -4,
                  y: -4,
                  boxShadow:
                    "0 4px 20px rgba(28, 24, 38, 0.08), 0 1px 4px rgba(28, 24, 38, 0.04)",
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/images/story.jpeg"
                  alt="Marta and Anurag"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Timeline column ───────────────────────────────────────── */}
          <motion.div
            className="md:pl-6 lg:pl-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13 } },
            }}
          >
            <div className="relative">
              {/* Vertical connecting line */}
              <div
                className="absolute left-[3px] top-3 bottom-3 w-px bg-subtle"
                aria-hidden="true"
              />

              {TIMELINE.map((m, i) => {
                const entry = lang === "it" ? m.it : m.en;
                return (
                  <motion.div
                    key={i}
                    variants={reveal}
                    className="relative pl-7 pb-9 last:pb-0"
                  >
                    {/* Dot marker */}
                    <div
                      className="absolute left-0 top-[0.45rem] w-[7px] h-[7px] rounded-full border border-subtle bg-bg"
                      aria-hidden="true"
                    />

                    <span className="font-body text-label uppercase tracking-[0.2em] text-subtle block mb-1.5">
                      {m.year}
                    </span>
                    <p className="font-display italic text-title text-ink leading-tight mb-1.5">
                      {entry.title}
                    </p>
                    <p className="text-body text-muted text-pretty max-w-[48ch]">
                      {entry.note}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
