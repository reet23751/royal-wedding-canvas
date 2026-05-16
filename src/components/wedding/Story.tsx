import { motion } from "framer-motion";

const STORY = [
  { year: "2019", title: "First Meeting", text: "A monsoon afternoon at College Street, between bookshops and bhaar-er-cha." },
  { year: "2021", title: "Friendship", text: "Long Howrah bridge walks turned into longer phone calls." },
  { year: "2023", title: "The Proposal", text: "Under the chandeliers of Victoria Memorial, a ring and a whispered yes." },
  { year: "2025", title: "Engagement", text: "Blessed by both families, sealed with shankha and sindoor." },
];

export function Story() {
  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">আমাদের গল্প</p>
      <h2 className="mt-1 text-center font-display text-3xl">Our Love Story</h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      <div className="mx-auto mt-8 max-w-md space-y-6">
        {STORY.map((s, i) => (
          <motion.div
            key={s.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-gold/30 bg-card p-5 shadow-soft"
          >
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl text-vermillion">{s.title}</p>
              <span className="font-display text-sm text-gold">{s.year}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
