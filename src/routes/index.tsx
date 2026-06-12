import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import VenturesSection from "@/sections/VenturesSection";
import ContactSection from "@/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caliber - Portfolio" },
      { name: "description", content: "Entrepreneur, community manager, and developer. Building and scaling digital spaces and local operations." },
      { property: "og:title", content: "Caliber - Portfolio" },
      { property: "og:description", content: "Entrepreneur, community manager, and developer." },
    ],
  }),
  component: Index,
});

function Index() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const USER_ID = "1293164546005012512";
    fetch(`https://japi.rest/discord/v1/user/${USER_ID}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const url = d?.data?.avatarURL || d?.data?.avatar?.link;
        if (url) { setAvatarUrl(url); return; }
        throw new Error("no japi");
      })
      .catch(() => {
        fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
          .then((r) => r.json())
          .then((d) => {
            const u = d?.data?.discord_user;
            if (u?.avatar) {
              setAvatarUrl(
                `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${u.avatar.startsWith("a_") ? "gif" : "png"}?size=128`,
              );
            }
          })
          .catch(() => {});
      });
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen" style={{ background: "var(--color-surface-bg)" }}>
        <ParticleBackground />
        {!introComplete && (
          <IntroAnimation onComplete={handleIntroComplete} avatarUrl={avatarUrl} />
        )}
        {introComplete && (
          <motion.div
            className="relative"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection avatarUrl={avatarUrl} />
            <AboutSection />
            <VenturesSection avatarUrl={avatarUrl} />
            <ContactSection />
          </motion.div>
        )}
      </div>
    </>
  );
}
