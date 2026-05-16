import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Story } from "@/components/wedding/Story";
import { Events } from "@/components/wedding/Events";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Petals } from "@/components/wedding/Petals";
import { MusicToggle } from "@/components/wedding/MusicToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VivahVerse · Arnab weds Rohini · A Royal Bengali Wedding" },
      { name: "description", content: "A cinematic Bengali wedding invitation. Join us as Arnab & Rohini begin their forever — 12 February 2026, Jorasanko Thakur Bari, Kolkata." },
      { property: "og:title", content: "VivahVerse · Arnab weds Rohini" },
      { property: "og:description", content: "A royal Bengali wedding celebration. You are cordially invited." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=Tiro+Bangla:ital@0;1&display=swap",
      },
    ],
  }),
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

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <OpeningAnimation guestName={guestName} onComplete={() => setOpened(true)} />
      {opened && (
        <>
          <Petals />
          <div className="relative z-10 mx-auto max-w-2xl animate-fade-up">
            <Hero guestName={guestName} />
            <Countdown />
            <Story />
            <Events />
            <Rsvp guestName={guestName} />
          </div>
          <MusicToggle enabled={opened} />
        </>
      )}
    </main>
  );
}
