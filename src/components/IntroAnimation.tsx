import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroProps {
  onComplete: () => void;
  avatarUrl?: string | null;
}

export default function IntroAnimation({ onComplete, avatarUrl }: IntroProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--color-surface-bg-85)", backdropFilter: "blur(1px)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6 border-[3px]"
            style={{
              borderColor: "rgba(232, 230, 240, 0.3)",
              boxShadow: "0 0 30px rgba(232, 230, 240, 0.2)",
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Caliber"
                width={160}
                height={160}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-4xl font-black"
            style={{ background: "var(--gradient-avatar-fallback)", color: "var(--color-accent)" }}
              >
                C
              </div>
            )}
          </motion.div>

          <motion.h1
            className="flex flex-wrap justify-center text-4xl md:text-6xl font-bold gap-1"
            style={{ fontFamily: "var(--font-family-heading)", color: "var(--color-text-primary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {"Caliber".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-4 text-sm md:text-base tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-family-heading)", color: "var(--color-text-muted)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
