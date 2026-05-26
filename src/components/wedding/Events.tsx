import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface Event {
  title: string;
  bn: string;
  date: string;
  venue: string;
  dress: string;
}

interface EventCardProps {
  event: Event;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEAF SVG  —  natural botanical orientation
//   • Pointed tip  at TOP    (y ≈ 2)
//   • Wide belly   at MIDDLE (y ≈ 45–55)
//   • Petiole nub  at BOTTOM (y ≈ 97–100)  ← this end connects to the main vine
//
// Both SproutingLeaf and IntermediateLeaf rotate around transformOrigin "50% 100%"
// (the petiole) so the nub stays pinned to the vine and the blade fans outward.
// ═══════════════════════════════════════════════════════════════════════════════
function LeafSVG({ gradId, size = 48 }: { gradId: string; size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.75)}
      viewBox="0 0 60 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.28)]"
    >
      <defs>
        {/* Main gradient: deep green at petiole base → vivid green at tip */}
        <linearGradient id={gradId} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%"   stopColor="oklch(0.22 0.09 150)" />
          <stop offset="35%"  stopColor="oklch(0.35 0.14 144)" />
          <stop offset="75%"  stopColor="oklch(0.46 0.18 140)" />
          <stop offset="100%" stopColor="oklch(0.56 0.20 136)" />
        </linearGradient>
        {/* Centre-vein shimmer: translucent lighter stripe */}
        <linearGradient id={`${gradId}-sh`} x1="40%" y1="100%" x2="60%" y2="0%">
          <stop offset="0%"   stopColor="oklch(0.60 0.16 140 / 0)"    />
          <stop offset="45%"  stopColor="oklch(0.72 0.18 138 / 0.22)" />
          <stop offset="100%" stopColor="oklch(0.88 0.22 76  / 0.16)" />
        </linearGradient>
      </defs>

      {/*
        ── Blade ────────────────────────────────────────────────────────────────
        Ovate leaf:
          Tip at (30, 2) — sharp point at top
          Belly widest at y ≈ 48  (~±25 px either side of midrib)
          Narrows back to petiole junction at (30, 94)
        ────────────────────────────────────────────────────────────────────── */}
      <path
        d="
          M 30,2
          C 55,15  58,35  56,50
          C 54,66  44,82  30,94
          C 16,82   6,66   4,50
          C  2,35   5,15  30,2
          Z
        "
        fill={`url(#${gradId})`}
      />

      {/* Shimmer overlay — lighter centre stripe */}
      <path
        d="
          M 30,2
          C 55,15  58,35  56,50
          C 54,66  44,82  30,94
          C 16,82   6,66   4,50
          C  2,35   5,15  30,2
          Z
        "
        fill={`url(#${gradId}-sh)`}
        opacity="0.80"
      />

      {/* ── Petiole (stem nub) ── connects blade to the main vine */}
      <line x1="30" y1="94" x2="30" y2="104"
        stroke="oklch(0.20 0.08 150)" strokeWidth="3.2" strokeLinecap="round" />

      {/* ── Central midrib — runs from petiole to tip ── */}
      <path d="M 30,93 C 30,72 30,42 30,4"
        stroke="oklch(0.18 0.07 150)" strokeWidth="1.9"
        strokeLinecap="round" fill="none" opacity="0.55" />

      {/* ── Lateral vein pairs — 4 pairs, thickest at base, finest near tip ── */}
      {/* Pair 1 — low (widest) */}
      <path d="M 30,76 C 20,73 11,68  5,63" stroke="oklch(0.18 0.07 150)" strokeWidth="1.20" strokeLinecap="round" fill="none" opacity="0.42"/>
      <path d="M 30,76 C 40,73 49,68 55,63" stroke="oklch(0.18 0.07 150)" strokeWidth="1.20" strokeLinecap="round" fill="none" opacity="0.42"/>
      {/* Pair 2 */}
      <path d="M 30,60 C 18,57  8,52  4,46" stroke="oklch(0.18 0.07 150)" strokeWidth="1.05" strokeLinecap="round" fill="none" opacity="0.37"/>
      <path d="M 30,60 C 42,57 52,52 56,46" stroke="oklch(0.18 0.07 150)" strokeWidth="1.05" strokeLinecap="round" fill="none" opacity="0.37"/>
      {/* Pair 3 */}
      <path d="M 30,44 C 19,40 10,35  5,30" stroke="oklch(0.18 0.07 150)" strokeWidth="0.88" strokeLinecap="round" fill="none" opacity="0.30"/>
      <path d="M 30,44 C 41,40 50,35 55,30" stroke="oklch(0.18 0.07 150)" strokeWidth="0.88" strokeLinecap="round" fill="none" opacity="0.30"/>
      {/* Pair 4 — near tip (finest) */}
      <path d="M 30,27 C 22,23 15,19 11,14" stroke="oklch(0.18 0.07 150)" strokeWidth="0.70" strokeLinecap="round" fill="none" opacity="0.24"/>
      <path d="M 30,27 C 38,23 45,19 49,14" stroke="oklch(0.18 0.07 150)" strokeWidth="0.70" strokeLinecap="round" fill="none" opacity="0.24"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SproutingLeaf  — attached near each flower where the flower stem meets the vine.
//
// 3-layer structure:
//   Layer 1 (outer motion.div) : positions the petiole connection point on screen
//   Layer 2 (inner motion.div) : shifts the SVG up so its BOTTOM (petiole) sits
//                                 at the Layer-1 origin; rotates the blade outward
//                                 via transformOrigin "50% 100%" (= petiole tip)
// ═══════════════════════════════════════════════════════════════════════════════
const SproutingLeaf = memo(function SproutingLeaf({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  const leafSize = 38;
  const leafH    = Math.round(leafSize * 1.75);

  // Tilt: blade fans AWAY from vine centre.
  // Left-flower → leaf sprouts to the left   → tilt CCW (negative)
  // Right-flower → leaf sprouts to the right → tilt CW  (positive)
  const tiltDeg = isLeft ? -52 : 52;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      // Positioned so its origin is at the vine-side of the flower head
      className={`absolute z-10 ${isLeft ? "left-[58%]" : "right-[58%]"}`}
      style={{ top: 12 }}
    >
      <motion.div
        initial={{ scale: 0.1, rotate: tiltDeg + (isLeft ? 30 : -30) }}
        animate={{ scale: 1,   rotate: tiltDeg }}
        transition={{ duration: 1.1, type: "spring", stiffness: 70, damping: 12 }}
        whileHover={{ scale: 1.1, rotate: tiltDeg + (isLeft ? -6 : 6) }}
        style={{
          transformOrigin: "50% 100%",          // pivot = petiole (bottom of SVG)
          marginLeft: `-${leafSize / 2}px`,     // centre horizontally
          marginTop:  `-${leafH + 4}px`,        // shift up so petiole is at parent origin
          display: "block",
        }}
      >
        <LeafSVG gradId={`sp-${isLeft ? "l" : "r"}`} size={leafSize} />
      </motion.div>
    </motion.div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// IntermediateLeaf  — grows along the vine between flowers.
//
// STRICT ALTERNATION via the `direction` prop:
//   direction="left"  → blade fans upper-LEFT  (tilt ≈ −48°)
//   direction="right" → blade fans upper-RIGHT (tilt ≈ +48°)
//
// 3-layer structure (same petiole-on-vine trick as SproutingLeaf):
//   Layer 1 : position at vine coordinates
//   Layer 2 : shift SVG so petiole (bottom) lands exactly on the vine
//   Layer 3 : rotate blade outward around petiole via transformOrigin "50% 100%"
// ═══════════════════════════════════════════════════════════════════════════════
const IntermediateLeaf = memo(function IntermediateLeaf({
  direction,
  topOffset,
  leftOffset,
  scale = 1,
  extraTilt = 0,
  uid = "0",
}: {
  direction: "left" | "right";
  topOffset: string;
  leftOffset: string;
  scale?: number;
  extraTilt?: number;  // fine-tune tilt in degrees (+ve = more clockwise)
  uid?: string;
}) {
  const isLeft = direction === "left";
  // Base tilt: ~48° either side so leaf looks natural, not too flat
  const baseTilt = isLeft ? -48 : 48;
  const angle    = baseTilt + extraTilt;

  const leafSize = 34;
  const leafH    = Math.round(leafSize * 1.75);

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ top: topOffset, left: leftOffset, zIndex: 1 }}
    >
      {/* Layer 2: shift so petiole (bottom of SVG) lands at vine point */}
      <div style={{ marginLeft: `-${leafSize / 2}px`, marginTop: `-${leafH}px` }}>
        {/* Layer 3: rotate blade outward, pivot = petiole */}
        <div
          style={{
            transformOrigin: "50% 100%",
            transform: `rotate(${angle}deg) scale(${scale})`,
          }}
        >
          <LeafSVG gradId={`il-${uid}`} size={leafSize} />
        </div>
      </div>
    </div>
  );
});


// Highly detailed, realistic SVG Hibiscus flower
const HibiscusFlower = memo(function HibiscusFlower({ isExpanded }: { isExpanded: boolean }) {
  return (
    <motion.div
      animate={{ 
        rotate: isExpanded ? 45 : [0, -2, 2, -2, 0],
        scale: isExpanded ? 1.15 : 1
      }}
      transition={{ 
        rotate: isExpanded 
          ? { duration: 0.5, ease: "easeOut" }
          : { duration: 8, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.4 }
      }}
      className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0 mx-auto select-none"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)]">
        <defs>
          <radialGradient id="hibiscus-grad-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.7 0.22 35)" /> {/* Radiant orange-red core */}
            <stop offset="40%" stopColor="var(--vermillion)" />
            <stop offset="100%" stopColor="oklch(0.42 0.18 20)" /> {/* Luxury deep mahogany edges */}
          </radialGradient>
          <linearGradient id="stamen-grad-gold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--vermillion)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
          
          {/* Symmetrical, highly detailed organic single petal definition with veins */}
          <g id="hibiscus-petal">
            {/* Main Petal Shape */}
            <path 
              d="M 50,50 C 20,10 80,10 50,50" 
              fill="url(#hibiscus-grad-red)" 
              className="opacity-98"
            />
            {/* Realistic Petal Veins */}
            {/* Central vein */}
            <path 
              d="M 50,50 Q 50,30 50,15" 
              fill="none" 
              stroke="oklch(0.75 0.15 45 / 0.3)" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
            />
            {/* Left curved vein */}
            <path 
              d="M 50,50 C 45,35 34,26 34,18" 
              fill="none" 
              stroke="oklch(0.75 0.15 45 / 0.18)" 
              strokeWidth="0.6" 
              strokeLinecap="round" 
            />
            {/* Right curved vein */}
            <path 
              d="M 50,50 C 55,35 66,26 66,18" 
              fill="none" 
              stroke="oklch(0.75 0.15 45 / 0.18)" 
              strokeWidth="0.6" 
              strokeLinecap="round" 
            />
          </g>
        </defs>
        
        {/* 5 Petals instanced with 72-degree symmetrical rotations */}
        <g>
          <use href="#hibiscus-petal" transform="rotate(0 50 50)" />
          <use href="#hibiscus-petal" transform="rotate(72 50 50)" />
          <use href="#hibiscus-petal" transform="rotate(144 50 50)" />
          <use href="#hibiscus-petal" transform="rotate(216 50 50)" />
          <use href="#hibiscus-petal" transform="rotate(288 50 50)" />
        </g>
        
        {/* Golden Central core glow */}
        <circle cx="50" cy="50" r="10" fill="oklch(0.72 0.14 78)" className="opacity-30 blur-[2px]" />
        <circle cx="50" cy="50" r="5" fill="oklch(0.52 0.21 28)" />

        {/* Golden Stamen (Pistil) arching realistically out of center */}
        <path 
          d="M 50,50 Q 66,40 80,26" 
          fill="none" 
          stroke="url(#stamen-grad-gold)" 
          strokeWidth="3.8" 
          strokeLinecap="round" 
        />
        {/* Pollen grains (Anthers) with drop-shadow glow */}
        <circle cx="80" cy="26" r="3" fill="var(--gold)" className="filter drop-shadow-[0_0_2px_var(--gold)]" />
        <circle cx="75" cy="22" r="1.8" fill="var(--gold)" />
        <circle cx="84" cy="30" r="1.8" fill="var(--gold)" />
        <circle cx="72" cy="27" r="1.2" fill="var(--gold)" />
        <circle cx="85" cy="24" r="1.2" fill="var(--gold)" />
        <circle cx="78" cy="33" r="1" fill="var(--gold)" />
      </svg>
    </motion.div>
  );
});

// Vertical Label-Value stacking to ensure absolute perfect layout in narrow staggered columns
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-gold/10 py-1.5 last:border-0 text-left">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{label}</span>
      <span className="text-foreground font-semibold text-[11px] md:text-xs mt-0.5 leading-tight">{value}</span>
    </div>
  );
}

// Event Card alternating symmetrically in both mobile and desktop
const EventFlowerCard = memo(function EventFlowerCard({ event, index, isOpen, onToggle }: EventCardProps) {
  const { t } = useLanguage();
  const isLeft = index % 2 === 0;

  return (
    <div className="relative w-full flex flex-row items-center min-h-[220px] py-4">
      
      {/* 3D Wavy serpentine timeline segment vine background with drop-shadow and highlight effects */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            {/* Deep woody base gradient */}
            <linearGradient id={`vine-base-grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.3 0.08 140)" />
              <stop offset="50%" stopColor="oklch(0.36 0.1 140)" />
              <stop offset="100%" stopColor="oklch(0.26 0.06 140)" />
            </linearGradient>
            {/* Sparkling gold core highlight gradient */}
            <linearGradient id={`vine-highlight-grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.68 0.12 140)" />
              <stop offset="50%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="oklch(0.6 0.1 140)" />
            </linearGradient>
          </defs>
          
          {/* 1. Subtle Blurred Drop Shadow Path */}
          <path
            d={
              isLeft
                ? "M 50,0 C 50,20 25,30 25,50 C 25,70 50,80 50,100"
                : "M 50,0 C 50,20 75,30 75,50 C 75,70 50,80 50,100"
            }
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="4.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="transform translate-y-1.5 translate-x-0.75 filter blur-[1.5px]"
          />
          
          {/* 2. Main Forest Green Woody Stalk Base */}
          <path
            d={
              isLeft
                ? "M 50,0 C 50,20 25,30 25,50 C 25,70 50,80 50,100"
                : "M 50,0 C 50,20 75,30 75,50 C 75,70 50,80 50,100"
            }
            fill="none"
            stroke={`url(#vine-base-grad-${index})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* 3. Golden Core Spine Highlight for 3D rounded depth */}
          <path
            d={
              isLeft
                ? "M 50,0 C 50,20 25,30 25,50 C 25,70 50,80 50,100"
                : "M 50,0 C 50,20 75,30 75,50 C 75,70 50,80 50,100"
            }
            fill="none"
            stroke={`url(#vine-highlight-grad-${index})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-90"
          />
        </svg>
      </div>

      {/* Intermediate Leaves — strictly alternating L/R along the vine */}
      {/* Top leaf: vine curves toward isLeft side, leaf fans the opposite way */}
      <IntermediateLeaf
        direction={isLeft ? "right" : "left"}
        topOffset="16%"
        leftOffset={isLeft ? "46%" : "54%"}
        scale={0.88}
        extraTilt={isLeft ? -12 : 12}
        uid={`${index}-top`}
      />
      {/* Bottom leaf: opposite direction to top for strict alternation */}
      <IntermediateLeaf
        direction={isLeft ? "left" : "right"}
        topOffset="80%"
        leftOffset={isLeft ? "46%" : "54%"}
        scale={0.82}
        extraTilt={isLeft ? 14 : -14}
        uid={`${index}-bot`}
      />

      {/* Symmetrical Left/Right Split Card Wrapper */}
      <div
        className={`w-full flex z-10 ${
          isLeft ? "justify-start pl-[2.5vw] md:pl-[6vw]" : "justify-end pr-[2.5vw] md:pr-[6vw]"
        }`}
      >
        <div className="w-1/2 flex justify-center">
          {/* Staggered Container */}
          <motion.div
            layout
            className="w-[43vw] max-w-[250px] flex flex-col items-center relative"
          >
            {/* Sprouting Leaf attached directly near the flower */}
            <SproutingLeaf direction={isLeft ? "left" : "right"} />

            {/* Clickable Flower Card Header */}
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center focus:outline-none relative group bg-transparent border-0 cursor-pointer text-center"
            >
              {/* SVG Flower Node */}
              <HibiscusFlower isExpanded={isOpen} />

              {/* Event Titles */}
              <div className="text-center mt-2 max-w-[140px] md:max-w-[180px]">
                <h3 className="font-display text-base md:text-xl font-bold text-foreground group-hover:text-vermillion transition-colors duration-300 tracking-wide leading-tight">
                  {event.title}
                </h3>
                <p className="font-bengali text-[10px] md:text-xs text-muted-foreground mt-0.5">
                  {event.bn}
                </p>
                
                {/* Pulsing Tap Helper */}
                <span className="block text-[8px] md:text-[9px] text-vermillion/70 font-bold tracking-wider mt-1 uppercase animate-pulse">
                  {t("events.tapToView")}
                </span>
              </div>
            </motion.button>

            {/* Expanded Parchment Card - Opens DIRECTLY below the flower inside the staggered container! */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, scale: 0.92 }}
                  animate={{ height: "auto", opacity: 1, scale: 1 }}
                  exit={{ height: 0, opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full overflow-hidden mt-3 z-20"
                >
                  <div className="bg-card/94 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] border border-gold/25 p-3.5 md:p-5 shadow-soft space-y-2.5 relative">
                    {/* Background decorative flower watermark outline */}
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 opacity-10 pointer-events-none">
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-gold w-full h-full">
                        <path d="M50,50 C20,10 80,10 50,50 M50,50 C80,15 100,55 50,50 M50,50 C95,70 60,100 50,50 M50,50 C40,100 5,70 50,50 M50,50 C0,55 20,15 50,50" strokeWidth="2.5" />
                      </svg>
                    </div>

                    <InfoRow label={t("events.when")} value={event.date} />
                    <InfoRow label={t("events.where")} value={event.venue} />
                    <InfoRow label={t("events.attire")} value={event.dress} />
                    
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 w-full text-center py-2 px-3 rounded-full border border-vermillion/30 bg-vermillion/5 hover:bg-vermillion hover:text-ivory transition-all duration-300 inline-block text-[10px] font-bold uppercase tracking-wider text-vermillion cursor-pointer shadow-soft hover:scale-[1.01]"
                    >
                      {t("events.openMaps")}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export function Events() {
  const { t, getEvents } = useLanguage();
  const events = getEvents();
  const [open, setOpen] = useState<number | null>(0); // Initialize first event as open

  return (
    <section className="px-5 py-16 relative overflow-hidden max-w-4xl mx-auto">
      {/* Decorative Background Glows */}
      <div className="absolute -left-10 top-1/4 w-36 h-36 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-10 bottom-1/4 w-36 h-36 bg-vermillion/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <p className="text-center font-bengali text-sm text-vermillion tracking-wider">
        {t("events.sub")}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
        {t("events.title")}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/3 opacity-60" />

      {/* Timeline Floral Container */}
      <div className="relative mt-12 w-full flex flex-col items-center">
        
        {/* Timeline Events cards mapper */}
        <div className="flex flex-col w-full relative">
          {events.map((event, i) => (
            <EventFlowerCard
              key={event.title}
              event={event}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
