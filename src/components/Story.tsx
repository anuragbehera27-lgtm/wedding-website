"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { reveal } from "@/lib/tokens";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";

export function Story() {
  const { t } = useLang();

  return (
    <section id="story" className="py-24 px-4 bg-bg overflow-hidden">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("storyTag")} title={t("storyTitle")} />

        {/* Two-column grid: image 5fr · text 7fr.
            Asymmetric split breaks the 50/50 symmetry from the original. */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden:   {},
            visible:  { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* ── Image column ─────────────────────────────────────────── */}
          <motion.div variants={reveal}>
            {/* pr-3 pb-3 creates space for the offset border frame to show */}
            <div className="relative pr-3 pb-3">
              {/* Offset border frame — visually behind the image */}
              <div
                className="absolute top-3 left-3 right-0 bottom-0 border border-subtle rounded-md"
                aria-hidden="true"
              />

              {/* Image — sits above the frame, lifts on hover toward top-left */}
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

          {/* ── Text column ──────────────────────────────────────────── */}
          <motion.div variants={reveal} className="md:pl-6 lg:pl-12">
            {/* Lead paragraph with oversized opening quote */}
            <div className="relative mb-8 pl-1">
              <span
                className="absolute font-display leading-none text-subtle select-none pointer-events-none"
                style={{
                  fontSize: "clamp(4rem, 8vw, 5.5rem)",
                  opacity: 0.35,
                  top: "-1.5rem",
                  left: "-0.75rem",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-display italic text-title text-ink pt-3 text-pretty">
                {t("storyLead")}
              </p>
            </div>

            {/* Body paragraphs — muted, readable line length */}
            <p className="text-body text-muted mb-5 text-pretty max-w-[60ch]">
              {t("storyBody1")}
            </p>
            <p className="text-body text-muted text-pretty max-w-[60ch]">
              {t("storyBody2")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
