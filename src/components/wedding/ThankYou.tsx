import { motion } from "framer-motion";
import { useLanguage, Language } from "@/hooks/useLanguage";
import { Heart } from "lucide-react";

interface ThankYouDetails {
  sub: string;
  title: string;
  note: string;
  signature: string;
}

export function ThankYou() {
  const { language } = useLanguage();

  const data: Record<Language, ThankYouDetails> = {
    en: {
      sub: "Gratitude & Blessings",
      title: "Thank You",
      note: "Your warm wishes and presence mean the world to us. We look forward to celebrating this auspicious union of two hearts with you. Thank you for being a beautiful part of our journey.",
      signature: "Arnab & Rohini",
    },
    bn: {
      sub: "কৃতজ্ঞতা ও আশীর্বাদ",
      title: "ধন্যবাদান্তে",
      note: "আপনার আন্তরিক শুভেচ্ছা ও উপস্থিতি আমাদের কাছে অমূল্য। দুটি হৃদয়ের এই শুভ মিলনের মহৎ উৎসবে আপনাদের সকলের সান্নিধ্য আমাদের ধন্য করবে। আমাদের জীবনের এই পথচলায় যুক্ত থাকার জন্য ধন্যবাদ।",
      signature: "অর্ণব ও রোহিণী",
    },
    hi: {
      sub: "कृतज्ञता और आशीर्वाद",
      title: "हार्दिक धन्यवाद",
      note: "आपकी गरिमामयी उपस्थिति और स्नेहिल शुभकामनाएं हमारे जीवन की इस नई शुरुआत में अमूल्य हैं। दो दिलों के इस पावन मिलन के उत्सव में आपका हृदय से स्वागत है।",
      signature: "अर्णब और रोहिणी",
    },
    mix: {
      sub: "Gratitude & Blessings",
      title: "Shukriya · Thank You",
      note: "Aapki warm wishes aur blessings humare liye bohot special hain. Let's celebrate the beautiful union of Arnab & Rohini together! Humare is beautiful journey ka hissa banne ke liye bohot shukriya.",
      signature: "Arnab & Rohini",
    },
  };

  const active = data[language] || data.en;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      className="relative px-5 py-12 my-8 mx-2 sm:mx-0 overflow-hidden rounded-3xl border border-gold/25 bg-card/60 backdrop-blur-md shadow-[0_15px_45px_-10px_rgba(212,175,55,0.15)] text-center"
    >
      {/* Decorative Gold Floral/Alpana Arch Watermark */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url('/story_background.png')` }}
      />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* Pulsing Vermillion Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-vermillion/10 text-vermillion mb-4"
        >
          <Heart className="h-6 w-6 fill-current" />
        </motion.div>

        {/* Subtitle */}
        <p className="font-bengali text-sm text-vermillion tracking-wider">
          {active.sub}
        </p>

        {/* Title */}
        <h2 className="mt-1 font-display text-4xl font-semibold tracking-wide">
          {active.title}
        </h2>
        
        {/* Alpana separator */}
        <div className="alpana-border my-4 h-px w-2/3 opacity-60" />

        {/* Note */}
        <p className="text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground font-display font-medium text-center px-4 max-w-sm">
          {active.note}
        </p>

        {/* Signature Box */}
        <div className="mt-6 pt-4 border-t border-gold/15 w-2/3">
          <p className="text-[10px] uppercase tracking-widest text-gold/80 font-display">
            {language === "bn" ? "ইতি" : language === "hi" ? "स्नेहाभिलाषी" : "With Love"}
          </p>
          <p className="font-display text-3xl font-bold text-vermillion italic mt-2 tracking-wide font-bengali">
            {active.signature}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
