"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroContainer, heroChild } from "@/lib/tokens";
import { useLang } from "@/context/LangContext";

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden bg-bg"
    >
      {/* Wreath — decorative only. Fixed position so grain overlay stays above it.
          No parallax, no animation. Just presence. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/images/flower.png"
          alt=""
          width={1232}
          height={864}
          priority
          className="w-[min(980px,130vw)] h-auto translate-x-[6%] -translate-y-[3%]"
          style={{ mixBlendMode: "multiply", opacity: 0.38 }}
        />
      </div>

      {/* Content — z-10 clears the wreath */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-[860px]"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={heroChild}
          className="text-label font-body uppercase text-muted tracking-[0.25em] mb-12"
        >
          {t("eyebrow")}
        </motion.p>

        {/* Names + ampersand ─────────────────────────────────────────────
            Hierarchy fix from audit: names at text-display (max 120px),
            ampersand at ~60% of that height. The connector never outranks
            the people it connects. */}
        <motion.div variants={heroChild} className="flex flex-col items-center">
          <h1 className="font-display italic font-light text-display text-ink leading-[1.05] tracking-[-0.02em] text-balance">
            Marta
          </h1>

          {/* & — script font, subordinate size, muted tone */}
          <span
            className="font-script text-muted leading-[0.85] select-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBlock: "-0.06em" }}
            aria-hidden="true"
          >
            &amp;
          </span>

          <h1 className="font-display italic font-light text-display text-ink leading-[1.05] tracking-[-0.02em] text-balance">
            Anurag
          </h1>
        </motion.div>

        {/* Hairline divider */}
        <motion.div
          variants={heroChild}
          className="flex items-center gap-3 mt-10 mb-8"
          aria-hidden="true"
        >
          <div className="w-10 h-px bg-subtle" />
          <div className="w-1 h-1 rounded-full bg-subtle" />
          <div className="w-10 h-px bg-subtle" />
        </motion.div>

        {/* Announcement */}
        <motion.p
          variants={heroChild}
          className="font-display italic text-title text-muted mb-7 text-pretty"
        >
          {t("announcement")}
        </motion.p>

        {/* Date */}
        <motion.p
          variants={heroChild}
          className="text-label font-body uppercase text-ink tracking-[0.25em] mb-3"
        >
          {t("date")}
        </motion.p>

        {/* Venue */}
        <motion.p
          variants={heroChild}
          className="font-display italic text-body text-muted"
        >
          {t("venue")}
        </motion.p>
      </motion.div>

      {/* Scroll indicator — delayed past the entrance sequence */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <span className="text-micro font-body uppercase text-subtle tracking-[0.25em]">
          Scroll
        </span>
        {/* Animated drop line — transform only, no layout cost */}
        <div className="relative w-px h-9 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-subtle to-transparent"
            animate={{ y: ["0%", "100%"] }}
            transition={{
              duration: 1.6,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
