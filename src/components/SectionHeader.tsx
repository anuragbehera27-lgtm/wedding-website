"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/tokens";

interface SectionHeaderProps {
  tag: string;
  title: string;
  light?: boolean; // for dark-background sections (schedule, registry)
}

// Self-contained whileInView — each section header reveals independently.
export function SectionHeader({ tag, title, light = false }: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p
        className={`text-label font-body uppercase tracking-[0.25em] mb-5 ${
          light ? "text-surface/60" : "text-accent"
        }`}
      >
        {tag}
      </p>
      <h2
        className={`font-display italic text-heading ${
          light ? "text-bg" : "text-ink"
        } text-balance`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
