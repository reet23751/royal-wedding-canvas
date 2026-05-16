import { useEffect, useState } from "react";

const TARGET = new Date("2026-02-12T18:00:00+05:30").getTime();

export function Countdown() {
  const [t, setT] = useState(() => Math.max(0, TARGET - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(t / 86400000);
  const h = Math.floor((t / 3600000) % 24);
  const m = Math.floor((t / 60000) % 60);
  const s = Math.floor((t / 1000) % 60);

  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">শুভ দিনের প্রতীক্ষায়</p>
      <h2 className="mt-1 text-center font-display text-3xl">Counting the moments</h2>
      <div className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-2">
        {[
          { l: "Days", v: d },
          { l: "Hrs", v: h },
          { l: "Min", v: m },
          { l: "Sec", v: s },
        ].map((x) => (
          <div
            key={x.l}
            className="relative overflow-hidden rounded-xl bg-gradient-royal p-[1px] shadow-soft"
          >
            <div className="rounded-xl bg-background/95 px-2 py-4 text-center">
              <p className="font-display text-3xl text-vermillion tabular-nums">
                {String(x.v).padStart(2, "0")}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{x.l}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
