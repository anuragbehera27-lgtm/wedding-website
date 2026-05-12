"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";
import { reveal } from "@/lib/tokens";
type Attending = "yes" | "no" | null;
type Status    = "idle" | "submitting" | "success" | "error";

export function Rsvp() {
  const { t } = useLang();
  const [attending, setAttending] = useState<Attending>(null);
  const [status, setStatus]       = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://formspree.io/f/xkopjvan", {
        method:  "POST",
        body:    data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setAttending(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-bg">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("rsvpTag")} title={t("rsvpTitle")} />

        <div className="max-w-lg mx-auto">
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-body text-muted text-center mb-12"
          >
            {t("rsvpDeadline")}
          </motion.p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-20"
              >
                <p className="font-display italic text-title text-ink mb-3">
                  Thank you
                </p>
                <p className="text-body text-muted">
                  We can&rsquo;t wait to celebrate with you.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="space-y-8"
              >
                {/* Full name */}
                <div className="border-b border-subtle pb-2">
                  <label className="block text-label font-body uppercase tracking-[0.2em] text-muted mb-2">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent text-body text-ink outline-none placeholder:text-subtle caret-accent"
                    placeholder="—"
                  />
                </div>

                {/* Attending — radio pills */}
                <div>
                  <p className="text-label font-body uppercase tracking-[0.2em] text-muted mb-4">
                    {t("attending")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {(["yes", "no"] as const).map((val) => (
                      <label
                        key={val}
                        className={`flex-1 text-center cursor-pointer px-6 py-3 rounded-full border text-label font-body uppercase tracking-[0.18em] transition-all duration-fast ease-out-expo ${
                          attending === val
                            ? "border-accent bg-accent text-bg"
                            : "border-subtle text-muted hover:border-accent hover:text-ink"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value={val}
                          className="sr-only"
                          onChange={() => setAttending(val)}
                          required
                        />
                        {val === "yes" ? t("joyfullyAccepts") : t("regretfullyDeclines")}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Number of guests — visible only when attending */}
                <AnimatePresence>
                  {attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-b border-subtle pb-2 pt-0">
                        <label className="block text-label font-body uppercase tracking-[0.2em] text-muted mb-2">
                          {t("numberOfGuests")}
                        </label>
                        <input
                          type="number"
                          name="guests"
                          min="1"
                          max="10"
                          defaultValue="1"
                          className="w-full bg-transparent text-body text-ink outline-none caret-accent"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dietary requirements */}
                <div className="border-b border-subtle pb-2">
                  <label className="block text-label font-body uppercase tracking-[0.2em] text-muted mb-2">
                    {t("dietary")}
                  </label>
                  <input
                    type="text"
                    name="dietary"
                    className="w-full bg-transparent text-body text-ink outline-none placeholder:text-subtle caret-accent"
                    placeholder="—"
                  />
                </div>

                {/* Song request */}
                <div className="border-b border-subtle pb-2">
                  <label className="block text-label font-body uppercase tracking-[0.2em] text-muted mb-2">
                    {t("songRequest")}
                  </label>
                  <input
                    type="text"
                    name="song"
                    className="w-full bg-transparent text-body text-ink outline-none placeholder:text-subtle caret-accent"
                    placeholder="—"
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-label font-body text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <div className="flex justify-center pt-4">
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-4 bg-accent text-bg text-label font-body uppercase tracking-[0.25em] rounded-full hover:bg-accent/90 transition-all duration-fast ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "···" : t("sendRsvp")}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
