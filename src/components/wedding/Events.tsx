import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function Events() {
  const { t, getEvents } = useLanguage();
  const events = getEvents();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">
        {t("events.sub")}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl">
        {t("events.title")}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      <ol className="relative mt-8 space-y-3 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gold/40">
        {events.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.title} className="relative pl-12">
              <span className="absolute left-2 top-4 grid h-5 w-5 place-items-center rounded-full bg-vermillion text-[10px] font-semibold text-ivory ring-4 ring-background">
                {i + 1}
              </span>
              <motion.button
                layout
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full overflow-hidden rounded-xl border border-gold/30 bg-card text-left shadow-soft hover:border-gold/60 transition-colors"
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="font-display text-lg text-vermillion">{e.title}</p>
                    <p className="font-bengali text-xs text-muted-foreground">{e.bn}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{e.date.split(" · ")[0]}</span>
                </div>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="border-t border-gold/20 bg-secondary/40 px-4 py-3 text-sm"
                  >
                    <Row label={t("events.when")} value={e.date} />
                    <Row label={t("events.where")} value={e.venue} />
                    <Row label={t("events.attire")} value={e.dress} />
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(e.venue)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-vermillion underline-offset-4 hover:underline"
                    >
                      {t("events.openMaps")}
                    </a>
                  </motion.div>
                )}
              </motion.button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gold/10 py-1.5 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}
