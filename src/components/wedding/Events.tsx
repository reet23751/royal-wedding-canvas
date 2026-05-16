import { motion } from "framer-motion";
import { useState } from "react";

const EVENTS = [
  { title: "Aiburo Bhaat", bn: "আইবুড়ো ভাত", date: "10 Feb · 1:00 PM", venue: "Bride's Home", dress: "Yellow Traditional" },
  { title: "Gaye Holud", bn: "গায়ে হলুদ", date: "11 Feb · 10:00 AM", venue: "Family Courtyard", dress: "Yellow & White" },
  { title: "Sangeet", bn: "সঙ্গীত সন্ধ্যা", date: "11 Feb · 7:00 PM", venue: "The Glasshouse", dress: "Festive Wear" },
  { title: "Biye", bn: "বিয়ে", date: "12 Feb · 6:00 PM", venue: "Jorasanko Thakur Bari", dress: "Bengali Traditional" },
  { title: "Bou Bhaat", bn: "বৌভাত", date: "14 Feb · 12:30 PM", venue: "Groom's Residence", dress: "Formal Indian" },
  { title: "Reception", bn: "প্রীতিভোজ", date: "14 Feb · 7:30 PM", venue: "ITC Royal Bengal", dress: "Black Tie · Indian" },
];

export function Events() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">উৎসবের অনুষ্ঠানসমূহ</p>
      <h2 className="mt-1 text-center font-display text-3xl">Wedding Rituals</h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      <ol className="relative mt-8 space-y-3 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gold/40">
        {EVENTS.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.title} className="relative pl-12">
              <span className="absolute left-2 top-4 grid h-5 w-5 place-items-center rounded-full bg-vermillion text-[10px] font-semibold text-ivory ring-4 ring-background">
                {i + 1}
              </span>
              <motion.button
                layout
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full overflow-hidden rounded-xl border border-gold/30 bg-card text-left shadow-soft"
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
                    <Row label="When" value={e.date} />
                    <Row label="Where" value={e.venue} />
                    <Row label="Attire" value={e.dress} />
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(e.venue)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-vermillion underline-offset-4 hover:underline"
                    >
                      Open in Maps →
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
