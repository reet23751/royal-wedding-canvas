import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function Story() {
  const { t, getMilestones, language } = useLanguage();
  const milestones = getMilestones();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset index to 0 when language switches and milestones list updates
  useEffect(() => {
    setActiveIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [milestones.length]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    if (clientHeight === 0) return;
    
    // Calculate which card is closest to the middle/snapped position
    const index = Math.round(scrollTop / clientHeight);
    if (index >= 0 && index < milestones.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const { clientHeight } = containerRef.current;
    containerRef.current.scrollTo({
      top: index * clientHeight,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="relative px-5 py-12 overflow-hidden rounded-3xl border border-gold/25 bg-card/60 backdrop-blur-md shadow-[0_15px_45px_-10px_rgba(212,175,55,0.18)] my-6 mx-2 sm:mx-0">
      {/* Background Image Watermark */}
      <div 
        className="absolute inset-0 z-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url('/story_background.png')` }}
      />

      <div className="relative z-10">
        <p className="text-center font-bengali text-sm text-vermillion">
          {t("story.sub")}
        </p>
        <h2 className="mt-1 text-center font-display text-3xl">
          {t("story.title")}
        </h2>
        <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

        {/* Vertically Scrollable Frame Container */}
        <div className="relative mx-auto mt-8 max-w-md flex flex-row items-center gap-4">
          
          <div className="relative flex-1">
            {/* Subtle Top & Bottom Fading Gradients for Scroll Zone */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-card/75 via-card/30 to-transparent pointer-events-none z-20 rounded-t-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card/75 via-card/30 to-transparent pointer-events-none z-20 rounded-b-3xl" />

            {/* Vertically Scrollable story container */}
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="h-[360px] sm:h-[390px] overflow-y-auto pr-1 py-1 snap-y snap-mandatory scrollbar-none scroll-smooth"
            >
              {milestones.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={s.year}
                    className="h-full w-full shrink-0 snap-start snap-always flex items-center justify-center py-2"
                  >
                    <div
                      className={`relative overflow-hidden w-full h-[95%] rounded-2xl border border-gold/30 bg-background/95 p-6 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.12),_0_8px_10px_-6px_rgba(212,175,55,0.12)] hover:shadow-[0_20px_35px_-5px_rgba(212,175,55,0.22),_0_12px_15px_-8px_rgba(212,175,55,0.15)] transition-all duration-500 ease-out flex flex-col justify-between ${
                        isActive 
                          ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
                          : "opacity-0 scale-95 pointer-events-none translate-y-4"
                      }`}
                    >
                      {/* Card-specific Background Image Watermark (80% translucent / opacity-80) */}
                      <div 
                        className="absolute inset-0 z-0 opacity-80 bg-cover bg-center pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: `url('${s.bgImage}')` }}
                      />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-baseline justify-between border-b border-gold/15 pb-2 mb-3">
                            <p className="font-display text-xl font-bold text-vermillion">{s.title}</p>
                            <span className="font-display text-sm font-semibold text-gold tracking-wider">{s.year}</span>
                          </div>
                          
                          {/* Inner container to ensure perfect sizing & compatibility across resolutions */}
                          <div className="overflow-y-auto max-h-[200px] sm:max-h-[220px] scrollbar-none pr-1">
                            <p className="text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground font-display font-medium text-justify">
                              {s.text}
                            </p>
                          </div>
                        </div>

                        {/* Subtle Scroll Instruction/Page Indicator at the bottom */}
                        <div className="text-center text-[10px] uppercase tracking-widest text-gold/60 pt-2 flex items-center justify-center gap-1 font-display mt-2 border-t border-gold/10">
                          {i < milestones.length - 1 ? (
                            <span className="animate-bounce">↓ {language === 'bn' ? 'নিচে স্ক্রোল করুন' : 'Scroll Down'}</span>
                          ) : (
                            <span>❤ {language === 'bn' ? 'আমাদের ভালোবাসার গল্প' : 'Our Love Story'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Vertical Pagination Dots */}
          <div className="flex flex-col items-center gap-2.5 z-30 select-none">
            {milestones.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.year}
                  onClick={() => scrollToCard(i)}
                  className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer"
                  aria-label={`Go to story milestone ${s.year}`}
                >
                  {/* Outer active gold ring */}
                  <span 
                    className={`absolute inset-0 rounded-full border border-gold/60 transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-50 opacity-0 group-hover:scale-75 group-hover:opacity-40"
                    }`}
                  />
                  {/* Inner dot */}
                  <span 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-vermillion scale-110" : "bg-gold/50 group-hover:bg-gold"
                    }`}
                  />
                  {/* Hover tooltip with Year */}
                  <span className="absolute right-8 px-2 py-0.5 rounded bg-background border border-gold/30 text-[10px] text-vermillion font-display font-semibold opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
                    {s.year}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

