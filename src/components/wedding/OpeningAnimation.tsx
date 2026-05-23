import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoardingPass } from "./BoardingPass";
import { Plane } from "lucide-react";

interface Props {
  guestName: string;
  onComplete: () => void;
}

type Phase = "pass" | "takeoff" | "clouds" | "done";

const CLOUDS_CONFIG = [
  // Behind clouds (z-index: 10)
  { id: 1, top: "12%", left: "8%", scale: 1.8, opacity: 0.75, delay: 0.1, depth: "behind" },
  { id: 2, top: "38%", right: "10%", scale: 2.2, opacity: 0.7, delay: 0.3, depth: "behind" },
  { id: 3, top: "70%", left: "6%", scale: 1.6, opacity: 0.8, delay: 0.2, depth: "behind" },
  { id: 4, top: "52%", left: "42%", scale: 1.4, opacity: 0.65, delay: 0.4, depth: "behind" },
  
  // Above/In-front clouds (z-index: 30)
  { id: 5, top: "6%", right: "18%", scale: 2.6, opacity: 0.9, delay: 0.05, depth: "above" },
  { id: 6, top: "65%", right: "12%", scale: 2.0, opacity: 0.85, delay: 0.15, depth: "above" },
  { id: 7, top: "26%", left: "15%", scale: 2.3, opacity: 0.88, delay: 0.25, depth: "above" },
  { id: 8, top: "82%", right: "40%", scale: 1.8, opacity: 0.8, delay: 0.35, depth: "above" },
];

function CloudSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

export function OpeningAnimation({ guestName, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("pass");

  const handleTap = () => {
    setPhase("takeoff");
    setTimeout(() => setPhase("clouds"), 4200);
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 6400);
  };

  const isTakeoff = phase === "takeoff" || phase === "clouds";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="opening"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-hidden bg-gradient-sky"
        >
          {/* Soft clouds bg */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute left-[10%] top-[20%] h-24 w-40 rounded-full bg-white blur-2xl" />
            <div className="absolute right-[5%] top-[35%] h-32 w-56 rounded-full bg-white blur-3xl" />
            <div className="absolute left-[30%] bottom-[15%] h-28 w-48 rounded-full bg-white blur-3xl" />
          </div>

          {/* Behind Clouds (z-index: 10) */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {CLOUDS_CONFIG.filter(c => c.depth === "behind").map(cloud => (
              <motion.div
                key={cloud.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: cloud.scale }}
                animate={{
                  x: isTakeoff ? "-130vw" : 0,
                  y: isTakeoff ? "10vh" : [0, -6, 6, 0], // Gentle vertical bobbing when static
                  opacity: cloud.opacity,
                }}
                transition={{
                  x: {
                    duration: 3.8,
                    ease: [0.42, 0, 1, 1], // Smooth ease-in curve starting slow and accelerating
                    delay: cloud.delay,
                  },
                  y: isTakeoff
                    ? { duration: 3.8, ease: [0.42, 0, 1, 1], delay: cloud.delay }
                    : { duration: 6 + cloud.id * 1.5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8 },
                }}
                className="absolute text-white/70 drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)] filter blur-[1px]"
                style={{
                  top: cloud.top,
                  left: cloud.left,
                  right: cloud.right,
                }}
              >
                <CloudSVG className="h-10 w-16" />
              </motion.div>
            ))}
          </div>

          {/* Boarding pass phase (z-index: 20) */}
          {(phase === "pass" || phase === "takeoff") && (
            <div className="relative z-20 flex h-full items-center justify-center px-4">
              <BoardingPass guestName={guestName} onTap={handleTap} taken={phase === "takeoff"} />
            </div>
          )}

          {/* Above Clouds (layered behind the boarding pass card at z-20 but in front of background clouds at z-10) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 15 }}>
            {CLOUDS_CONFIG.filter(c => c.depth === "above").map(cloud => (
              <motion.div
                key={cloud.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: cloud.scale }}
                animate={{
                  x: isTakeoff ? "-180vw" : 0,
                  y: isTakeoff ? "15vh" : [0, 8, -8, 0], // Parallax vertical drift
                  opacity: cloud.opacity,
                }}
                transition={{
                  x: {
                    duration: 2.8,
                    ease: [0.42, 0, 1, 1], // Faster custom ease-in for closer clouds (parallax)
                    delay: cloud.delay,
                  },
                  y: isTakeoff
                    ? { duration: 2.8, ease: [0.42, 0, 1, 1], delay: cloud.delay }
                    : { duration: 5 + cloud.id * 1.2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8 },
                }}
                className="absolute text-white drop-shadow-[0_12px_28px_rgba(255,255,255,0.35)] filter blur-[2px]"
                style={{
                  top: cloud.top,
                  left: cloud.left,
                  right: cloud.right,
                }}
              >
                <CloudSVG className="h-12 w-20" />
              </motion.div>
            ))}
          </div>

          {/* Takeoff: plane flies across drawing smoke trail */}
          {(phase === "takeoff" || phase === "clouds") && (
            <TakeoffScene guestName={guestName} />
          )}

          {/* Clouds wash */}
          {phase === "clouds" && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-b from-white via-ivory to-ivory"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[15%] top-[30%] h-40 w-72 rounded-full bg-white blur-3xl" />
                <div className="absolute right-[10%] top-[50%] h-48 w-80 rounded-full bg-white blur-3xl" />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useLanguage } from "@/hooks/useLanguage";

function TakeoffScene({ guestName }: { guestName: string }) {
  const { t } = useLanguage();
  const initials = getInitials(guestName);
  return (
    <div className="absolute inset-0">
      {/* Smoke trail forming text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 top-[28%] flex flex-col items-center gap-2 text-center"
      >
        <p className="font-display text-5xl text-vermillion drop-shadow-sm">
          A <span className="text-gold">&</span> R
        </p>
        <motion.p
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.25em", opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="text-xs uppercase text-foreground/70"
        >
          {t("opening.youAreInvited")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="font-display text-2xl text-foreground/80"
        >
          12 · 02 · 2026
        </motion.p>
        {initials && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            className="font-bengali text-sm text-muted-foreground"
          >
            {t("opening.forGuest", { guestName })}
          </motion.p>
        )}
      </motion.div>

      {/* Plane path */}
      <motion.div
        initial={{ x: "-15vw", y: "70vh", rotate: -8 }}
        animate={{ x: "110vw", y: "20vh", rotate: -18 }}
        transition={{ duration: 3.2, ease: [0.5, 0, 0.3, 1] }}
        className="absolute"
      >
        <div className="relative">
          {/* Smoke trail */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.2, ease: "linear" }}
            className="absolute right-full top-1/2 h-3 w-[120vw] origin-right -translate-y-1/2 rounded-full bg-gradient-to-l from-white/90 via-white/50 to-transparent blur-md"
          />
          <div className="w-[109px] drop-shadow-2xl select-none rotate-12">
            <img src="/plane.svg" alt="Flying Airplane" className="w-full h-auto object-contain" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
