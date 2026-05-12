"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { reveal, staggerContainer } from "@/lib/tokens";
import { useLang } from "@/context/LangContext";

const WEDDING_DATE = new Date("2026-09-05T16:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

// key={str} forces remount on value change → replays initial→animate.
// suppressHydrationWarning: build-time and client-time values differ by design.
function AnimatedNumber({ value, pad }: { value: number; pad: number }) {
  const str = String(value).padStart(pad, "0");
  return (
    <motion.span
      key={str}
      suppressHydrationWarning
      initial={{ opacity: 0.4, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="font-display font-light text-ink tabular leading-none block"
      style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
    >
      {str}
    </motion.span>
  );
}

function CounterBlock({
  value,
  pad,
  label,
}: {
  value: number;
  pad: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedNumber value={value} pad={pad} />
      <span className="text-label font-body uppercase text-muted tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

// Thin vertical rule between blocks — hidden on mobile where gaps are tight
function Sep() {
  return (
    <div
      className="hidden sm:block w-px bg-subtle self-stretch my-2 shrink-0"
      aria-hidden="true"
    />
  );
}

export function Countdown() {
  const { t } = useLang();
  // Initialize at zero to avoid server/client hydration mismatch.
  // useEffect updates to real values immediately on mount.
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="bg-surface py-24 px-4">
      <motion.div
        className="max-w-site mx-auto flex flex-col items-center gap-14"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Label */}
        <motion.p
          variants={reveal}
          className="font-display italic text-title text-muted text-center text-pretty"
        >
          {t("countdownLabel")}
        </motion.p>

        {/* Timer — flex row at all sizes, gaps tighten on mobile */}
        <motion.div
          variants={reveal}
          className="flex items-center gap-5 sm:gap-10 md:gap-14"
        >
          <CounterBlock value={time.days}    pad={3} label={t("days")} />
          <Sep />
          <CounterBlock value={time.hours}   pad={2} label={t("hours")} />
          <Sep />
          <CounterBlock value={time.minutes} pad={2} label={t("minutes")} />
          <Sep />
          <CounterBlock value={time.seconds} pad={2} label={t("seconds")} />
        </motion.div>
      </motion.div>
    </section>
  );
}
