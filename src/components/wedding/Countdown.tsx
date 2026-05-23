import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const getTargetTime = () => {
  const now = Date.now();
  const defaultTarget = new Date("2026-02-12T18:00:00+05:30").getTime();
  
  if (now < defaultTarget) {
    return defaultTarget;
  }
  
  // Roll over to the next February 12th
  const currentDate = new Date();
  let targetYear = currentDate.getFullYear();
  let targetDate = new Date(targetYear, 1, 12, 18, 0, 0); // 1 = February
  
  if (currentDate.getTime() > targetDate.getTime()) {
    targetYear += 1;
    targetDate = new Date(targetYear, 1, 12, 18, 0, 0);
  }
  
  return targetDate.getTime();
};

export function Countdown({ compact = false }: { compact?: boolean } = {}) {
  const { t } = useLanguage();
  const [tVal, setT] = useState(() => Math.max(0, getTargetTime() - Date.now()));
  
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, getTargetTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(tVal / 86400000);
  const h = Math.floor((tVal / 3600000) % 24);
  const m = Math.floor((tVal / 60000) % 60);
  const s = Math.floor((tVal / 1000) % 60);

  const grid = (
    <div className="mx-auto mt-4 grid max-w-md grid-cols-4 gap-2">
      {[
        { l: t("countdown.days"), v: d },
        { l: t("countdown.hrs"), v: h },
        { l: t("countdown.min"), v: m },
        { l: t("countdown.sec"), v: s },
      ].map((x) => (
        <div
          key={x.l}
          className="relative overflow-hidden rounded-xl bg-gradient-royal p-[1px] shadow-soft"
        >
          <div className="rounded-xl bg-background/95 px-1 py-3 text-center">
            <p className="font-display text-2xl text-vermillion tabular-nums">
              {String(x.v).padStart(2, "0")}
            </p>
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground">{x.l}</p>
          </div>
        </div>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="w-full mt-2">
        <p className="text-center font-bengali text-xs text-vermillion mb-1">
          {t("countdown.awaiting")}
        </p>
        {grid}
      </div>
    );
  }

  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">{t("countdown.awaiting")}</p>
      <h2 className="mt-1 text-center font-display text-3xl">{t("countdown.title")}</h2>
      {grid}
    </section>
  );
}
