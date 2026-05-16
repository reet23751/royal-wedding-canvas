export function Petals({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 0.7) % 8;
        const duration = 14 + (i % 6) * 2;
        const size = 10 + (i % 4) * 4;
        return (
          <span
            key={i}
            className="petal absolute top-0 block"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
            }}
          >
            <svg viewBox="0 0 24 24" className="h-full w-full text-vermillion/60">
              <path
                fill="currentColor"
                d="M12 2c3 4 6 7 6 12a6 6 0 11-12 0c0-5 3-8 6-12z"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
