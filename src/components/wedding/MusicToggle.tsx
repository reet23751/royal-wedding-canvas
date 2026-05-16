import { useEffect, useRef, useState } from "react";

const SRC = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"; // soft ambient flute

export function MusicToggle({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.25;
    ref.current = a;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => { a.pause(); ref.current = null; };
  }, [enabled]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else a.play().then(() => setPlaying(true)).catch(() => {});
  };

  if (!enabled) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-vermillion text-ivory shadow-royal ring-2 ring-gold/60 transition active:scale-95"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 diya-glow" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3zm14 2l3 3 1.4-1.4L18.4 12l3-3L20 7.6l-3 3-3-3L12.6 9l3 3-3 3 1.4 1.4 3-3z" />
        </svg>
      )}
    </button>
  );
}
