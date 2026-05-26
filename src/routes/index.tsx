import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { Hero } from "@/components/wedding/Hero";
import { Story } from "@/components/wedding/Story";
import { Events } from "@/components/wedding/Events";
import { Family } from "@/components/wedding/Family";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Blessings } from "@/components/wedding/Blessings";
import { Contact } from "@/components/wedding/Contact";
import { ThankYou } from "@/components/wedding/ThankYou";
import { Petals } from "@/components/wedding/Petals";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { LanguageProvider } from "@/hooks/useLanguage";
import { LanguageSwitcher } from "@/components/wedding/LanguageSwitcher";

export const Route = createFileRoute("/")({
  component: Index,
});

function useGuestName() {
  const [name, setName] = useState("Soumik Chatterjee");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("guest");
    if (p) setName(p.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
  }, []);
  return name;
}

function Index() {
  const guestName = useGuestName();
  const [opened, setOpened] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <OpeningAnimation guestName={guestName} onComplete={() => setOpened(true)} />
        {opened && (
          <>
            <Petals />
            
            <div className="relative z-10 mx-auto max-w-2xl animate-fade-up">
              <Hero guestName={guestName} />
              <Story />
              <Events />
              <Family />
              <Rsvp guestName={guestName} accepted={accepted} onAccept={() => setAccepted(true)} />
              <AnimatePresence>
                {accepted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <Blessings guestName={guestName} />
                  </motion.div>
                )}
              </AnimatePresence>
              <Contact />
              <ThankYou />
            </div>
            <MusicToggle enabled={opened} />
          </>
        )}
      </main>
    </LanguageProvider>
  );
}
