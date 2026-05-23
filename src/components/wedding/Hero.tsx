import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function Hero({ guestName }: { guestName: string }) {
  const { t } = useLanguage();
  const [processedImg, setProcessedImg] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/couple.png";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Loop through all pixels and make white/near-white pixels fully transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Threshold: if pixel is close to white, make it transparent
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedImg(canvas.toDataURL());
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-12">
      {/* Top alpana */}
      <div className="alpana-border mx-auto mb-8 h-1 w-3/4 max-w-md opacity-70" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center font-bengali text-sm text-vermillion"
      >
        {t("hero.ganeshayNamah")}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-2 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-pulse"
      >
        {t("hero.blessings")}
      </motion.p>

      <div className="relative mt-10 flex flex-col items-center justify-center text-center py-6 min-h-[460px]">
        {/* Background couple illustration watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2 }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src={processedImg || "/couple.png"}
            alt="Bride and Groom Illustration"
            className="h-full w-auto max-h-[550px] object-contain"
          />
        </motion.div>

        {/* Text overlay */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-6xl leading-[0.9] text-vermillion sm:text-7xl drop-shadow-sm"
          >
            Arnab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="my-3 font-display text-3xl italic text-gold"
          >
            {t("hero.weds")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="font-display text-6xl leading-[0.9] text-vermillion sm:text-7xl drop-shadow-sm"
          >
            Rohini
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="relative z-10 mt-6 font-bengali text-2xl text-foreground"
        >
          {t("hero.shubhVivah")}
        </motion.p>
      </div>

      {/* Guest greeting card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        className="mx-auto mt-10 max-w-md rounded-2xl bg-gradient-royal p-[1px] shadow-royal"
      >
        <div className="rounded-2xl bg-background/95 px-6 py-6 text-center backdrop-blur">
          <p className="font-bengali text-base text-foreground">
            {t("hero.dear")} <span className="text-vermillion">{guestName || t("boardingPass.honouredGuest")}</span>,
          </p>
          <p className="mt-2 font-bengali text-sm leading-relaxed text-muted-foreground">
            {t("hero.invitationMessage")}
          </p>
          <div className="alpana-border mx-auto my-4 h-px w-2/3 opacity-60" />
          <p className="text-xs italic text-muted-foreground">
            {t("hero.invitationSub")}
          </p>
        </div>
      </motion.div>

      {/* Venue address */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="mt-8 text-center text-sm text-foreground"
      >
        <span className="block font-display text-lg">Jorasanko Thakur Bari</span>
        <span className="text-xs text-muted-foreground">{t("hero.venueCity")}</span>
      </motion.p>
    </section>
  );
}
