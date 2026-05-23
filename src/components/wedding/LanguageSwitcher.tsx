import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage, Language } from "@/hooks/useLanguage";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Array<{ value: Language; label: string; sub: string }> = [
    { value: "en", label: "English", sub: "English" },
    { value: "bn", label: "Bengali", sub: "বাংলা" },
    { value: "hi", label: "Hindi", sub: "हिंदी" },
    { value: "mix", label: "Mix", sub: "हिन्दी + Eng" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options.find((opt) => opt.value === language) || options[0];

  return (
    <div ref={dropdownRef} className="fixed left-4 top-4 z-[100]">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-gold/40 bg-background/80 px-3.5 py-1.5 font-display text-sm font-semibold text-vermillion shadow-soft backdrop-blur-md transition-all hover:bg-secondary/80 focus:outline-none focus:ring-1 focus:ring-gold/50"
      >
        <Globe className="h-4.5 w-4.5 text-gold animate-pulse" />
        <span className="tracking-wide">{currentOption.sub}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 mt-1.5 w-44 origin-top-left rounded-2xl border border-gold/30 bg-background/95 p-1.5 shadow-royal backdrop-blur-md"
          >
            <div className="space-y-1">
              {options.map((opt) => {
                const isActive = opt.value === language;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setLanguage(opt.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all ${
                      isActive
                        ? "bg-gradient-royal text-ivory"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-display text-sm font-bold tracking-wide">
                        {opt.sub}
                      </span>
                      <span className={`text-[10px] ${isActive ? "text-gold/90" : "text-muted-foreground"}`}>
                        {opt.label}
                      </span>
                    </div>
                    {isActive && <Check className="h-4 w-4 text-gold" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
