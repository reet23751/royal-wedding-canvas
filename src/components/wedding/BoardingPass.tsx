import { motion } from "framer-motion";

interface Props {
  guestName: string;
  onTap: () => void;
  taken: boolean;
}

export function BoardingPass({ guestName, onTap, taken }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={{ opacity: taken ? 0 : 1, y: taken ? -200 : 0, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[88vw] max-w-md select-none"
      style={{ perspective: 1000 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-ivory shadow-royal ring-1 ring-gold/40">
        {/* Header */}
        <div className="bg-gradient-royal px-5 py-4 text-ivory">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bengali text-xs tracking-widest opacity-90">শুভ বিবাহ</p>
              <p className="font-display text-lg leading-tight">Royal Boarding Pass</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">Flight</p>
              <p className="font-display text-base">VV · 2026</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Passenger</p>
            <p className="font-display text-2xl text-vermillion">{guestName || "Honoured Guest"}</p>
            <p className="font-bengali text-xs text-muted-foreground">প্রিয় অতিথি</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">From</p>
              <p className="font-display text-xl">CCU</p>
              <p className="text-[10px] text-muted-foreground">Your Heart</p>
            </div>
            <div className="flex-1 text-center text-gold">
              <svg viewBox="0 0 100 20" className="h-5 w-full">
                <path d="M2 10 Q 50 0 98 10" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                <circle cx="50" cy="6" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">To</p>
              <p className="font-display text-xl">SHB</p>
              <p className="text-[10px] text-muted-foreground">Shubho Bibaho</p>
            </div>
          </div>

          <div className="alpana-border h-px" />

          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Date</p>
              <p className="font-display text-sm">12 · Feb</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Gate</p>
              <p className="font-display text-sm">A · 07</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Seat</p>
              <p className="font-display text-sm">1 · A</p>
            </div>
          </div>
        </div>

        {/* Stub */}
        <div className="relative border-t border-dashed border-gold/50 bg-secondary/60 px-5 py-3">
          <div className="absolute -top-2 left-0 h-4 w-4 rounded-full bg-background" />
          <div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-background" />
          <p className="text-center font-bengali text-xs text-muted-foreground">
            আকাশপথে যাত্রা শুরু করুন
          </p>
        </div>
      </div>

      {/* Runway + Airplane */}
      <div className="relative mt-8 h-20">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 text-foreground/30">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-px w-3 bg-foreground/30" />
          ))}
        </div>

        <motion.button
          onClick={onTap}
          aria-label="Tap airplane to take off"
          whileTap={{ scale: 0.94 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-vermillion p-3 text-ivory shadow-royal ring-2 ring-gold/60"
        >
          <PlaneIcon className="h-6 w-6" />
        </motion.button>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-2 top-1/2 -translate-y-1/2 font-display text-sm text-vermillion"
        >
          Tap to take off →
        </motion.p>
      </div>
    </motion.div>
  );
}

export function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}
