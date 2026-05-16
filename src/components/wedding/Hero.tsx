import { motion } from "framer-motion";

export function Hero({ guestName }: { guestName: string }) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-12">
      {/* Top alpana */}
      <div className="alpana-border mx-auto mb-8 h-1 w-3/4 max-w-md opacity-70" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center font-bengali text-sm text-vermillion"
      >
        শ্রী শ্রী গণেশায় নমঃ
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-2 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        With the blessings of the Almighty
      </motion.p>

      <div className="relative mt-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-6xl leading-[0.9] text-vermillion sm:text-7xl"
        >
          Arnab
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="my-3 font-display text-3xl italic text-gold"
        >
          weds
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-display text-6xl leading-[0.9] text-vermillion sm:text-7xl"
        >
          Rohini
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-6 font-bengali text-2xl text-foreground"
        >
          শুভ বিবাহ
        </motion.p>
      </div>

      {/* Guest greeting card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        className="mx-auto mt-10 max-w-md rounded-2xl bg-gradient-royal p-[1px] shadow-royal"
      >
        <div className="rounded-2xl bg-background/95 px-6 py-6 text-center backdrop-blur">
          <p className="font-bengali text-base text-foreground">
            প্রিয় <span className="text-vermillion">{guestName || "অতিথি"}</span>,
          </p>
          <p className="mt-2 font-bengali text-sm leading-relaxed text-muted-foreground">
            আপনি ও আপনার পরিবারকে সাদর আমন্ত্রণ।
          </p>
          <div className="alpana-border mx-auto my-4 h-px w-2/3 opacity-60" />
          <p className="text-xs italic text-muted-foreground">
            You and your family are cordially invited to bless the celebration.
          </p>
        </div>
      </motion.div>

      {/* Date + venue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 text-center"
      >
        {[
          { l: "Day", v: "Thu" },
          { l: "Date", v: "12 Feb" },
          { l: "Year", v: "2026" },
        ].map((d) => (
          <div key={d.l} className="rounded-xl border border-gold/40 bg-secondary/40 px-2 py-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{d.l}</p>
            <p className="font-display text-xl text-vermillion">{d.v}</p>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="mt-6 text-center text-sm text-foreground"
      >
        <span className="block font-display text-lg">Jorasanko Thakur Bari</span>
        <span className="text-xs text-muted-foreground">Kolkata · West Bengal</span>
      </motion.p>
    </section>
  );
}
