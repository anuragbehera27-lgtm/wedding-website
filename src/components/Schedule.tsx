"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { SectionHeader } from "./SectionHeader";
import { reveal, staggerContainer } from "@/lib/tokens";

export function Schedule() {
  const { t } = useLang();

  const events = [
    { time: "3:30 PM",  title: t("guestArrival"),  note: t("welcomeDrinks")  },
    { time: "4:00 PM",  title: t("exchangeVows"),  note: ""                  },
    { time: "5:00 PM",  title: t("cocktailHour"),  note: t("cocktailNote")   },
    { time: "7:30 PM",  title: t("dinner"),         note: t("dinnerSpeeches") },
    { time: "10:00 PM", title: t("firstDance"),     note: t("partyBegins")    },
    { time: "1:00 AM",  title: t("lastCall"),        note: t("sendOff")        },
  ];

  return (
    <section id="schedule" className="py-24 px-4 bg-ink">
      <div className="max-w-site mx-auto">
        <SectionHeader tag={t("scheduleTag")} title={t("scheduleTitle")} light />

        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {events.map((ev, i) => (
            <motion.div
              key={i}
              variants={reveal}
              className={`flex items-baseline gap-8 sm:gap-12 py-6 ${
                i < events.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span className="font-body text-label uppercase tracking-[0.12em] text-white/35 shrink-0 w-20 text-right">
                {ev.time}
              </span>
              <div>
                <p className="font-display italic text-title text-bg leading-tight">
                  {ev.title}
                </p>
                {ev.note && (
                  <p className="text-body text-white/45 mt-1">{ev.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
