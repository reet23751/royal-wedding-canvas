import { motion, AnimatePresence } from "framer-motion";
import React, { useState, memo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles } from "lucide-react";

interface FamilyMember {
  name: string;
  relation: string;
  desc: string;
  initials: string;
  photo: string;
}

interface MemberCardProps {
  member: FamilyMember;
  index: number;
}

// Optimized memoized card with GPU hardware-acceleration trigger class
const FamilyMemberCard = memo(function FamilyMemberCard({ member, index }: MemberCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }} // Fluid stagger loading
      whileHover={{ y: -4, scale: 1.01, boxShadow: "var(--shadow-royal)" }}
      className="relative flex flex-row items-center gap-4 rounded-2xl border border-gold/20 bg-card/75 backdrop-blur-sm p-4 text-left shadow-soft hover:border-gold/60 transition-all duration-300 group hover:bg-card will-change-[transform,box-shadow]"
    >
      {/* Decorative Sparkle for hover */}
      <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold pointer-events-none">
        <Sparkles className="h-4 w-4 animate-spin-slow" />
      </span>

      {/* Avatar Container with double-ring gold border */}
      <div className="relative flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full border border-gold/45 p-0.5 bg-background shadow-soft group-hover:border-gold group-hover:scale-105 transition-all duration-300">
        <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-royal">
          {!imgError ? (
            <img
              src={member.photo}
              alt={member.name}
              width={80}
              height={80}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
              <span className="font-display text-xl font-bold text-vermillion font-semibold">
                {member.initials}
              </span>
            </div>
          )}
        </div>
        {/* Double ring effect */}
        <div className="absolute inset-0.5 rounded-full border border-gold/15 pointer-events-none group-hover:border-gold/40 transition-all duration-300" />
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        {/* Role Pill */}
        <span className="inline-block rounded-full bg-vermillion/10 border border-vermillion/25 px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-vermillion uppercase mb-1">
          {member.relation}
        </span>
        
        {/* Name */}
        <h3 className="font-display text-lg md:text-xl font-semibold text-foreground tracking-wide truncate mb-1">
          {member.name}
        </h3>

        {/* Description */}
        <p className="font-display text-xs md:text-sm italic leading-relaxed text-muted-foreground line-clamp-2 group-hover:text-foreground/90 transition-colors duration-300">
          "{member.desc}"
        </p>
      </div>
    </motion.div>
  );
});

function ScrollableList({ members }: { members: FamilyMember[] }) {
  return (
    <div className="relative h-[520px] md:h-[580px] w-full mt-6">
      {/* Smooth scroll fading effect + mobile inertia scrolling with hidden scrollbar */}
      <div
        className="h-full overflow-y-auto pr-2 md:pr-3 scrollbar-none flex flex-col gap-4 py-4"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {members.map((member, i) => (
          <FamilyMemberCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}

export function Family() {
  const { getFamily } = useLanguage();
  const familyData = getFamily();
  const [activeTab, setActiveTab] = useState<"bride" | "groom">("bride");

  return (
    <section className="px-5 py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -left-10 top-1/4 w-40 h-40 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-10 bottom-1/4 w-40 h-40 bg-vermillion/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <p className="text-center font-bengali text-sm text-vermillion tracking-wider">
        {familyData.sub}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
        {familyData.title}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/3 opacity-60" />

      {/* Segmented Tab Control - Clean, responsive, and spacious on desktop */}
      <div className="flex justify-center mt-10">
        <div className="relative flex rounded-full bg-secondary/50 p-1.5 border border-gold/20 max-w-sm md:max-w-md w-full shadow-inner">
          <button
            onClick={() => setActiveTab("bride")}
            className={`relative z-10 flex-1 py-2.5 text-center transition-colors duration-300 ${
              activeTab === "bride" ? "text-ivory" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "bride" && (
              <motion.div
                layoutId="active-tab-indicator-unified"
                className="absolute inset-0 rounded-full bg-gradient-royal shadow-soft"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-20 font-display text-base md:text-lg tracking-wide">
              {familyData.bride.title}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("groom")}
            className={`relative z-10 flex-1 py-2.5 text-center transition-colors duration-300 ${
              activeTab === "groom" ? "text-ivory" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "groom" && (
              <motion.div
                layoutId="active-tab-indicator-unified"
                className="absolute inset-0 rounded-full bg-gradient-royal shadow-soft"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-20 font-display text-base md:text-lg tracking-wide">
              {familyData.groom.title}
            </span>
          </button>
        </div>
      </div>

      {/* Showcase area - constrained in width on desktop for visual proportions */}
      <div className="mx-auto mt-8 max-w-xl md:max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "bride" ? -25 : 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "bride" ? 25 : -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <ScrollableList
              members={
                activeTab === "bride"
                  ? familyData.bride.members
                  : familyData.groom.members
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
