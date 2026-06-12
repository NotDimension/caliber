import { motion } from "framer-motion";
import bgImage from "@/assets/bg-mountain.png";

interface Props { avatarUrl?: string | null }

export default function HeroSection({ avatarUrl }: Props) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, zIndex: -2 }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: "var(--gradient-hero-overlay)",
        zIndex: -1
      }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mb-8 cursor-pointer group"
        >
          <div className="absolute inset-0 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700"
            style={{ backgroundColor: "var(--color-accent)" }} />
          <div className="absolute inset-2 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"
            style={{ backgroundColor: "var(--color-accent-2)" }} />

          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden relative z-10 border-2 transition-all duration-700"
            style={{
              borderColor: "var(--color-accent)",
              boxShadow: "var(--shadow-glow-sm)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow-lg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow-sm)"; }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Caliber" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-black"
                style={{ background: "var(--gradient-avatar-fallback)", color: "var(--color-accent)" }}>
                C
              </div>
            )}
          </div>

          <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[2px]"
            style={{ border: `1.5px solid var(--color-accent)` }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-5 shimmer-text cursor-default inline-block"
        >
          Caliber
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {["Entrepreneur", "Minecraft Staff & Development", "Community Engagement"].map((t) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase cursor-default"
              style={{
                background: "var(--color-surface-glass)",
                border: "1px solid var(--color-border-default)",
                color: "var(--color-text-secondary)",
                backdropFilter: "blur(8px)",
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 4v14M5 11l6 7 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
