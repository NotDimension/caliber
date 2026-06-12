import { motion } from "framer-motion";
import { Mail, Globe } from "lucide-react";
import { SiDiscord, SiGithub, SiSpotify, SiSteam } from "react-icons/si";

const LINKS = [
  { label: "Email", sub: "caliberdev50@gmail.com", icon: Mail, href: "mailto:caliberdev50@gmail.com", color: "#EA4335" },
  { label: "Discord", sub: "x_caliber41", icon: SiDiscord, href: "https://discord.com/users/1293164546005012512", color: "#5865F2" },
  { label: "GitHub", sub: "CaliberDev-prog", icon: SiGithub, href: "https://github.com/CaliberDev-prog", color: "#E8E6F0" },
  { label: "Spotify", sub: "Listen along", icon: SiSpotify, href: "https://open.spotify.com/user/b602rr28hbd2abyetm15eug2z", color: "#1DB954" },
  { label: "Steam", sub: "Gaming profile", icon: SiSteam, href: "https://steamcommunity.com/profiles/76561199341550979/", color: "#c7d5e0" },
];

const CONTACT_INFO = [
  { label: "Availability", value: "Available for staff positions", emoji: "💬", color: "#57F287" },
  { label: "Timezone", value: "United States (EST)", Icon: Globe, color: null },
];

export default function ContactSection() {
  return (
    <section id="network" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-accent)" }}>Network</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "var(--color-text-primary)" }}>Get in Touch</h2>
          <p className="text-sm max-w-md" style={{ color: "var(--color-text-muted)" }}>
            The fastest way to reach me is on Discord. I typically respond within a few hours during EST business hours.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 w-full">
          {CONTACT_INFO.map((info, i) => {
            const Icon = info.Icon;
            const iconBg = info.color
              ? `${info.color}18`
              : "var(--color-accent-12)";
            const iconBorder = info.color
              ? `1px solid ${info.color}35`
              : "1px solid var(--color-accent-35)";
            const iconColor = info.color ?? "var(--color-accent)";
            return (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: iconBg, border: iconBorder }}
                >
                  {info.emoji
                    ? <span className="text-xl">{info.emoji}</span>
                    : Icon && <Icon size={22} style={{ color: iconColor }} />}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>{info.label}</p>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{info.value}</p>
                </div>
              </motion.div>
            );
          })}
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                initial={{ opacity: 0, x: (i + CONTACT_INFO.length) % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i + CONTACT_INFO.length) * 0.07 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-5"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${link.color}18`, border: `1px solid ${link.color}35` }}
                >
                  <Icon size={22} style={{ color: link.color }} />
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>{link.label}</p>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{link.sub}</p>
                </div>
                <div className="ml-auto" style={{ color: "var(--color-text-muted)", opacity: 0.4 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
