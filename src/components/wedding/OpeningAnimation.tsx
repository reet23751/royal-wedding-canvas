import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoardingPass, PlaneIcon } from "./BoardingPass";

interface Props {
  guestName: string;
  onComplete: () => void;
}

type Phase = "pass" | "takeoff" | "clouds" | "done";

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

          {/* Boarding pass phase */}
          {phase === "pass" && (
            <div className="flex h-full items-center justify-center px-4">
              <BoardingPass guestName={guestName} onTap={handleTap} taken={false} />
            </div>
          )}

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

function TakeoffScene({ guestName }: { guestName: string }) {
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
          You Are Invited
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
            for {guestName}
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
          <div className="rounded-full bg-vermillion p-3 text-ivory shadow-royal ring-2 ring-gold">
            <PlaneIcon className="h-7 w-7 rotate-12" />
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
