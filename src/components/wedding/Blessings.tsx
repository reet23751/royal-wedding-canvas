import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage, Language } from "@/hooks/useLanguage";
import { Heart, Send, Sparkles } from "lucide-react";

interface Blessing {
  id: string;
  name: string;
  relation: string;
  text: string;
  hearts: number;
  date: string;
  isUserAdded?: boolean;
}

interface BlessingsProps {
  guestName: string;
}

export function Blessings({ guestName }: BlessingsProps) {
  const { t, language } = useLanguage();
  const [name, setName] = useState(guestName || "");
  const [text, setText] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Pre-populated data based on selected language
  const getInitialBlessings = (lang: Language): Blessing[] => {
    const data: Record<Language, Blessing[]> = {
      en: [
        {
          id: "1",
          name: "Amit Sen",
          relation: "Cousin",
          text: "So happy for you two! Wishing you a lifetime of love, laughter, and endless bhaar-er-cha in College Street!",
          hearts: 14,
          date: "10 Feb · 3:45 PM"
        },
        {
          id: "2",
          name: "Ritu Roy",
          relation: "Aunt",
          text: "May the Almighty bless this beautiful union with eternal happiness and prosperity. Shubho Bibaho!",
          hearts: 9,
          date: "11 Feb · 11:20 AM"
        },
        {
          id: "3",
          name: "Dev & Tina",
          relation: "Friends",
          text: "To the absolute perfect couple! Can't wait to dance at the Sangeet and see Arnab in a traditional dhoti!",
          hearts: 22,
          date: "11 Feb · 8:15 PM"
        }
      ],
      bn: [
        {
          id: "1",
          name: "অমিত সেন",
          relation: "ভাই",
          text: "তোমাদের দুজনকে অনেক অভিনন্দন! সারা জীবন এভাবেই ভালোবাসা, আনন্দ আর কলেজ স্ট্রিটের ভাঁড়ের চায়ে মেতে থেকো!",
          hearts: 14,
          date: "১০ ফেব্রুয়ারি · দুপুর ৩:৪৫"
        },
        {
          id: "2",
          name: "ঋতু রায়",
          relation: "কাকিমা",
          text: "ঈশ্বর এই সুন্দর বন্ধনটিকে অনন্ত সুখ ও সমৃদ্ধি দিয়ে আশীর্বাদ করুন। শুভ বিবাহ!",
          hearts: 9,
          date: "১১ ফেব্রুয়ারি · সকাল ১১:২০"
        },
        {
          id: "3",
          name: "দেব ও টিনা",
          relation: "বন্ধু",
          text: "এক্কেবারে পারফেক্ট জুটি! সঙ্গীত সন্ধ্যায় ফাটিয়ে নাচ হবে আর বরের সাজে অর্ণবকে দেখার অপেক্ষা রইল!",
          hearts: 22,
          date: "১১ ফেব্রুয়ারি · রাত ৮:১৫"
        }
      ],
      hi: [
        {
          id: "1",
          name: "अमित सेन",
          relation: "भाई",
          text: "आप दोनों के लिए बहुत खुश हूँ! आपको जीवन भर प्यार, हँसी और कॉलेज स्ट्रीट की कुल्हड़ चाय की शुभकामनाएं!",
          hearts: 14,
          date: "10 फ़र · दोपहर 3:45 बजे"
        },
        {
          id: "2",
          name: "ऋतु रॉय",
          relation: "चाची",
          text: "ईश्वर इस सुंदर गठबंधन को शाश्वत सुख और समृद्धि का आशीर्वाद दें। शुभ विवाह!",
          hearts: 9,
          date: "11 फ़र · सुबह 11:20 बजे"
        },
        {
          id: "3",
          name: "देव और टीना",
          relation: "दोस्त",
          text: "सबसे बेहतरीन जोड़ी! संगीत संध्या में नाचने और पारंपरिक धोती में अर्णब को देखने का अब और इंतज़ार नहीं!",
          hearts: 22,
          date: "11 फ़र · रात 8:15 बजे"
        }
      ],
      mix: [
        {
          id: "1",
          name: "Amit Sen",
          relation: "Cousin",
          text: "Super happy for you both! Wishing you a lifetime of love, fun and endless bhaar-er-cha walks!",
          hearts: 14,
          date: "10 Feb · 3:45 PM"
        },
        {
          id: "2",
          name: "Ritu Roy",
          relation: "Aunt",
          text: "May God bless this beautiful couple with loads of happiness & togetherness. Shubho Bibaho!",
          hearts: 9,
          date: "11 Feb · 11:20 AM"
        },
        {
          id: "3",
          name: "Dev & Tina",
          relation: "Friends",
          text: "Perfect couple ever! Sangeet par full on dhamaal hoga, can't wait to see you guys shine!",
          hearts: 22,
          date: "11 Feb · 8:15 PM"
        }
      ]
    };
    return data[lang] || data.en;
  };

  // Pre-fill name and load pre-populated blessings when language changes
  useEffect(() => {
    if (guestName) setName(guestName);
    
    // Load local storage blessings if they exist, else load initial ones
    const saved = localStorage.getItem(`vivah_blessings_${language}`);
    if (saved) {
      setBlessings(JSON.parse(saved));
    } else {
      setBlessings(getInitialBlessings(language));
    }
  }, [language, guestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const authorName = name.trim() || guestName || t("boardingPass.honouredGuest");

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: authorName,
      relation: t("boardingPass.honouredGuest"),
      text: text.trim(),
      hearts: 1,
      date: language === "bn" ? "এখনই" : language === "hi" ? "अभी" : "Just now",
      isUserAdded: true
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem(`vivah_blessings_${language}`, JSON.stringify(updated));

    setText("");
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;

    const updated = blessings.map(b => {
      if (b.id === id) {
        return { ...b, hearts: b.hearts + 1 };
      }
      return b;
    });

    setBlessings(updated);
    setLikedIds([...likedIds, id]);
    localStorage.setItem(`vivah_blessings_${language}`, JSON.stringify(updated));
  };

  return (
    <section className="px-5 py-12 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute -left-10 top-1/3 w-36 h-36 bg-vermillion/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-10 bottom-1/3 w-36 h-36 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Title */}
      <p className="text-center font-bengali text-sm text-vermillion">
        {t("blessing.sub")}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl">
        {t("blessing.title")}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      {/* Main Container */}
      <div className="mx-auto mt-8 max-w-xl space-y-8">
        
        {/* Leaving Blessing Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-gold/35 bg-card p-6 shadow-[0_15px_35px_-5px_rgba(212,175,55,0.18),_0_8px_15px_-6px_rgba(212,175,55,0.12)] hover:border-gold/60 transition-colors relative"
        >
          <div className="absolute top-4 right-4 text-gold/40 animate-pulse">
            <Sparkles className="h-5 w-5" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">


            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-1">
                {t("blessing.sub")}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("blessing.placeholder")}
                rows={3}
                className="w-full rounded-xl border border-gold/30 bg-secondary/20 px-4 py-3 font-display text-base text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-vermillion py-3.5 font-display text-base font-semibold text-ivory shadow-[0_8px_20px_-4px_rgba(182,46,27,0.3)] transition active:scale-[0.98] hover:shadow-[0_12px_28px_-4px_rgba(182,46,27,0.45)] cursor-pointer group"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>{t("blessing.send")}</span>
            </button>
          </form>

          {/* Success message banner */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 fill-emerald-500 text-emerald-500 animate-bounce" />
                <span>{t("blessing.success")}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Blessings Wall Display */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-gold tracking-wide border-b border-gold/20 pb-1 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <Heart className="h-4 w-4 fill-gold text-gold" />
            <span>{t("blessing.viewAll")}</span>
          </h3>

          {/* Scrollable Container with elegant fade masks */}
          <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

            <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* Render twice for seamless looping */}
              {[...blessings, ...blessings].map((b, index) => {
                const isLiked = likedIds.includes(b.id);
                return (
                  <div
                    key={`${b.id}-${index}`}
                    className={`relative w-[280px] sm:w-[320px] shrink-0 whitespace-normal overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-[220px] ${
                      b.isUserAdded
                        ? "border-vermillion/40 bg-gradient-to-br from-card to-vermillion/5 shadow-[0_12px_30px_-5px_rgba(182,46,27,0.15),_0_6px_15px_-5px_rgba(182,46,27,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(182,46,27,0.25),_0_10px_20px_-5px_rgba(182,46,27,0.15)]"
                        : "border-gold/30 hover:border-gold/60 shadow-[0_12px_30px_-5px_rgba(212,175,55,0.15),_0_6px_15px_-5px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(212,175,55,0.35),_0_10px_20px_-5px_rgba(212,175,55,0.2)]"
                    }`}
                  >
                    {/* Top Content (Meta, Date, Text) */}
                    <div>
                      {/* Floating Heart Icon or Sparkle on User Card */}
                      {b.isUserAdded && (
                        <span className="absolute -right-2 -top-2 w-8 h-8 bg-vermillion/10 rounded-full flex items-center justify-center text-vermillion">
                          <Sparkles className="h-3 w-3 animate-pulse" />
                        </span>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-display text-base font-bold text-foreground truncate pr-2">
                          {b.name}
                        </h4>
                        <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-0.5 text-[9px] font-semibold text-gold uppercase tracking-wider">
                          {b.relation}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="text-[10px] text-muted-foreground/60 mb-2 font-display">
                        {b.date}
                      </p>

                      {/* Description Message */}
                      <p className="font-display text-sm italic leading-relaxed text-muted-foreground relative line-clamp-3">
                        "{b.text}"
                      </p>
                    </div>

                    {/* Interactive Bless Heart Button */}
                    <div className="flex items-center justify-between border-t border-gold/10 pt-3 mt-auto">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                        {t("blessing.heartCount", { count: b.hearts.toString() })}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 1.35 }}
                        onClick={() => handleLike(b.id)}
                        disabled={isLiked}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer ${
                          isLiked
                            ? "bg-vermillion/10 text-vermillion cursor-default"
                            : "bg-secondary/40 text-muted-foreground hover:bg-vermillion/10 hover:text-vermillion"
                        }`}
                        title={isLiked ? "Showered blessings" : "Bless this wish"}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-vermillion" : ""}`} />
                      </motion.button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
