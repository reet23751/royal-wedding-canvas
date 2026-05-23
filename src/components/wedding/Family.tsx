import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles } from "lucide-react";

export function Family() {
  const { getFamily } = useLanguage();
  const familyData = getFamily();
  const [activeTab, setActiveTab] = useState<"bride" | "groom">("bride");

  const currentSide = activeTab === "bride" ? familyData.bride : familyData.groom;

  return (
    <section className="px-5 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -left-10 top-1/4 w-32 h-32 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-10 bottom-1/4 w-32 h-32 bg-vermillion/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <p className="text-center font-bengali text-sm text-vermillion">
        {familyData.sub}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl">
        {familyData.title}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      {/* Interactive Tabs */}
      <div className="flex justify-center mt-8">
        <div className="relative flex rounded-full bg-secondary/50 p-1 border border-gold/20 max-w-xs w-full shadow-inner">
          <button
            onClick={() => setActiveTab("bride")}
            className={`relative z-10 flex-1 py-2 text-center text-sm font-semibold transition-colors duration-300 ${
              activeTab === "bride" ? "text-ivory" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "bride" && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 rounded-full bg-gradient-royal shadow-soft"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-20 font-display text-base tracking-wide">
              {familyData.bride.title}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("groom")}
            className={`relative z-10 flex-1 py-2 text-center text-sm font-semibold transition-colors duration-300 ${
              activeTab === "groom" ? "text-ivory" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "groom" && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 rounded-full bg-gradient-royal shadow-soft"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-20 font-display text-base tracking-wide">
              {familyData.groom.title}
            </span>
          </button>
        </div>
      </div>

      {/* Members Showcase */}
      <div className="mx-auto mt-10 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {currentSide.members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative flex flex-col items-center rounded-2xl border border-gold/30 bg-card p-6 text-center shadow-soft hover:border-gold/60 transition-all duration-300 group"
              >
                {/* Decorative Sparkle for hover */}
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold">
                  <Sparkles className="h-4 w-4 animate-spin-slow" />
                </span>

                {/* Avatar Initial Circle */}
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/70 bg-gradient-royal p-1 shadow-soft group-hover:border-gold group-hover:scale-105 transition-all duration-300">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                    <span className="font-display text-xl font-bold text-vermillion">
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Role Pill */}
                <span className="rounded-full bg-vermillion/10 border border-vermillion/20 px-3 py-0.5 text-[10px] font-bold tracking-widest text-vermillion uppercase mb-2">
                  {member.relation}
                </span>

                {/* Name */}
                <h3 className="font-display text-xl font-semibold text-foreground tracking-wide mb-2">
                  {member.name}
                </h3>

                {/* Description */}
                <p className="font-display text-sm italic leading-relaxed text-muted-foreground">
                  "{member.desc}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
