import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  guestName: string;
  onTap: () => void;
  taken: boolean;
}

export function BoardingPass({ guestName, onTap, taken }: Props) {
  const [isFlying, setIsFlying] = useState(false);
  const { t } = useLanguage();

  const handleRunwayClick = () => {
    if (isFlying || taken) return;
    setIsFlying(true);
    setTimeout(() => {
      onTap();
    }, 1200);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={{ opacity: taken ? 0 : 1, y: taken ? -200 : 0, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[88vw] max-w-md select-none"
      style={{ perspective: 1000 }}
    >
      <div 
        className="relative overflow-hidden rounded-2xl bg-ivory ring-1 ring-gold/40"
        style={{
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.35),
            0 12px 30px -10px rgba(0, 0, 0, 0.2),
            0 4px 20px -2px rgba(0, 0, 0, 0.1),
            0 0 50px -5px rgba(197, 160, 89, 0.25)
          `
        }}
      >
        {/* Header */}
        <div className="bg-gradient-royal px-5 py-4 text-ivory">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bengali text-[14.4px] font-bold tracking-widest opacity-90">
                {t("boardingPass.shubhVivah")}
              </p>
              <p className="font-display text-[21.6px] font-bold leading-tight">
                {t("boardingPass.royalBoardingPass")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-70">
                {t("boardingPass.flight")}
              </p>
              <p className="font-display text-[19.2px] font-bold">VV · 2026</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative space-y-4 px-5 py-5">
          {/* Maa Durga Face Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <img src="/durga.png" alt="Maa Durga" className="h-[156px] w-[156px] object-contain mix-blend-multiply opacity-30" />
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("boardingPass.passenger")}
            </p>
            <p className="font-display text-[28.8px] font-bold text-vermillion mb-[3px]">
              {guestName || t("boardingPass.honouredGuest")}
            </p>
            <p className="font-bengali text-[14.4px] font-bold text-muted-foreground">
              {t("boardingPass.guestSub")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t("boardingPass.from")}
              </p>
              <p className="font-display text-[24px] font-bold">CCU</p>
              <p className="text-[12px] font-bold text-muted-foreground">
                {t("boardingPass.yourHeart")}
              </p>
            </div>
            <div className="flex-1 text-center text-gold flex items-center justify-center" />
            <div className="flex-1 text-right">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground mr-[4px]">
                {t("boardingPass.to")}
              </p>
              <p className="font-display text-[24px] font-bold mr-[4px]">SHB</p>
              <p className="text-[12px] font-bold text-muted-foreground">
                {t("boardingPass.shubhoBibaho")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10.8px] font-bold uppercase tracking-widest text-muted-foreground">
                {t("boardingPass.date")}
              </p>
              <p className="font-display text-[16.8px] font-bold">
                {t("boardingPass.dateValue")}
              </p>
            </div>
            <div>
              <p className="text-[10.8px] font-bold uppercase tracking-widest text-muted-foreground">
                {t("boardingPass.gate")}
              </p>
              <p className="font-display text-[16.8px] font-bold">A · 07</p>
            </div>
            <div>
              <p className="text-[10.8px] font-bold uppercase tracking-widest text-muted-foreground">
                {t("boardingPass.seat")}
              </p>
              <p className="font-display text-[16.8px] font-bold">1 · A</p>
            </div>
          </div>
        </div>

        {/* Stub */}
        <div className="relative border-t border-dashed border-gold/50 bg-secondary/60 px-5 py-3">
          <div className="absolute -top-2 left-0 h-4 w-4 rounded-full bg-background" />
          <div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-background" />
          <p className="text-center font-bengali text-[14.4px] font-bold text-muted-foreground">
            {t("boardingPass.stubFooter")}
          </p>
        </div>
      </div>

      {/* Runway + Airplane */}
      <div 
        className="relative mt-[42px] h-20 cursor-pointer overflow-hidden rounded-xl"
        onClick={handleRunwayClick}
      >
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 text-foreground/30">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-px w-3 bg-foreground/30" />
          ))}
        </div>

        <motion.div
          animate={{ 
            left: isFlying ? "115%" : "5%" 
          }}
          transition={{ 
            duration: isFlying ? 1.2 : 0.5, 
            ease: isFlying ? [0.42, 0, 1, 1] : "easeOut"
          }}
          className="absolute top-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ 
              y: isFlying 
                ? [0, -1, 1, -1, 1, 0] // High-frequency engine vibration on takeoff roll
                : [0, -3, 3, 0], // Gentle bobbing when stationary
            }}
            transition={{ 
              duration: isFlying ? 0.15 : 2.0, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-[86px] drop-shadow-lg"
          >
            <img src="/plane.svg" alt="Airplane" className="w-full h-auto object-contain" />
          </motion.div>
        </motion.div>

        <motion.p
          animate={{ opacity: isFlying ? 0 : [0.4, 1, 0.4] }}
          transition={{ duration: isFlying ? 0.3 : 2, repeat: isFlying ? 0 : Infinity }}
          className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[20.2px] font-extrabold text-vermillion pointer-events-none"
        >
          {t("boardingPass.tapToTakeOff")}
        </motion.p>
      </div>
    </motion.div>
  );
}
