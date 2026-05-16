import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Rsvp({ guestName }: { guestName: string }) {
  const [done, setDone] = useState(false);

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-md rounded-3xl bg-gradient-royal p-[1px] shadow-royal">
        <div className="rounded-3xl bg-background/95 px-6 py-8 text-center">
          <p className="font-bengali text-sm text-vermillion">আপনার উপস্থিতি</p>
          <h2 className="mt-1 font-display text-3xl">Will you join us?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            One tap is all it takes to bless our union.
          </p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.button
                key="cta"
                exit={{ opacity: 0, y: -10 }}
                onClick={() => setDone(true)}
                className="relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-vermillion px-8 py-4 font-display text-lg text-ivory shadow-royal transition active:scale-[0.98]"
              >
                <span className="shimmer absolute inset-0" />
                <span className="relative">Accept Invitation</span>
              </motion.button>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-6 rounded-2xl border border-gold/40 bg-secondary/40 p-5"
              >
                <p className="font-bengali text-base text-vermillion">
                  ধন্যবাদ {guestName || "অতিথি"}!
                </p>
                <p className="mt-2 font-bengali text-sm text-muted-foreground">
                  আপনার উপস্থিতি আমাদের জন্য সৌভাগ্যের।
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="alpana-border mx-auto my-6 h-px w-2/3 opacity-60" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <a
              href="https://wa.me/?text=Join%20us%20at%20Arnab%20weds%20Rohini"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gold/40 px-3 py-2 font-medium text-foreground hover:bg-secondary"
            >
              Share on WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Jorasanko+Thakur+Bari+Kolkata"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gold/40 px-3 py-2 font-medium text-foreground hover:bg-secondary"
            >
              Open Venue
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-bengali text-xs text-muted-foreground">
        ইতি, আরনব ও রোহিনী পরিবার
      </p>
    </section>
  );
}
