"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import type { StringKey } from "@/lib/strings";

const LINKS: Array<{ href: string; key: StringKey }> = [
  { href: "#home",     key: "home"     },
  { href: "#story",    key: "story"    },
  { href: "#details",  key: "details"  },
  { href: "#schedule", key: "schedule" },
  { href: "#travel",   key: "travel"   },
  { href: "#registry", key: "registry" },
  { href: "#rsvp",     key: "rsvp"     },
];

export function Nav() {
  const { lang, t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Floating pill ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto flex items-center gap-6 lg:gap-8 px-5 py-2.5 rounded-full border border-subtle/50 bg-bg/85 backdrop-blur-md"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            boxShadow: scrolled
              ? "0 4px 20px rgba(28, 24, 38, 0.07), 0 1px 4px rgba(28, 24, 38, 0.04)"
              : "none",
            transition: "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Monogram */}
          <a
            href="#home"
            className="font-display italic text-ink font-light leading-none shrink-0"
            style={{ fontSize: "1.125rem", letterSpacing: "0.02em" }}
            onClick={close}
          >
            M
            <span className="font-script text-muted" style={{ fontSize: "0.9rem", margin: "0 -0.08em" }}>
              &amp;
            </span>
            A
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
            {LINKS.map(({ href, key }) => (
              <li key={key}>
                <a
                  href={href}
                  className="text-micro font-body uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors duration-fast ease-out-expo"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="text-micro font-body uppercase tracking-[0.2em] border border-subtle rounded-full px-3 py-1.5 hover:border-accent hover:text-accent transition-all duration-fast ease-out-expo shrink-0"
          >
            <span className={lang === "en" ? "text-ink" : "text-muted"}>EN</span>
            <span className="text-subtle mx-1">/</span>
            <span className={lang === "it" ? "text-ink" : "text-muted"}>IT</span>
          </button>

          {/* Hamburger — mobile/tablet only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden relative w-5 h-3.5 flex flex-col justify-between shrink-0"
          >
            <motion.span className="block h-px w-full bg-ink origin-center"
              animate={open ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span className="block h-px w-full bg-ink"
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span className="block h-px w-full bg-ink origin-center"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </motion.div>
      </header>

      {/* Mobile overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-bg/96 backdrop-blur-md flex flex-col items-center justify-center gap-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map(({ href, key }, i) => (
              <motion.a
                key={key}
                href={href}
                onClick={close}
                className="font-display italic text-heading text-ink hover:text-muted transition-colors duration-fast"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {t(key)}
              </motion.a>
            ))}
            <motion.button
              onClick={() => { toggle(); close(); }}
              className="mt-6 text-label font-body uppercase tracking-[0.25em] text-muted hover:text-ink transition-colors duration-fast"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.38 }}
            >
              {lang === "en" ? "Italiano" : "English"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
