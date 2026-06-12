import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiDiscord } from "react-icons/si";
import { ChevronDown, Image as ImageIcon, Briefcase } from "lucide-react";
import { useDiscordInvite } from "@/hooks/useDiscordInvite";
import { useImageColor } from "@/hooks/useImageColor";
import dylansLogo from "@/assets/dylans-detailing-logo.jpg";
import ServicePill, { ServicePillContainer } from "@/components/ServicePill";

/* ─── Design token shortcuts (all from variables.css) ─── */
const T = {
  pink:             "var(--color-accent)",
  purple:           "var(--color-accent-2)",
  blue:             "var(--color-accent-blue)",
  green:            "var(--color-status-online)",
  textPrimary:      "var(--color-text-primary)",
  textSecondary:    "var(--color-text-secondary)",
  textMuted:        "var(--color-text-muted)",
  textSubtle:       "var(--color-text-subtle)",
  surfaceBg:        "var(--color-surface-bg)",
  surfaceGlass:     "var(--color-surface-glass)",
  surfaceGlassHover:"var(--color-surface-glass-hover)",
  borderDefault:    "var(--color-border-default)",
  borderHover:      "var(--color-border-hover)",

  /* accent alpha variants */
  pink12:  "var(--color-accent-12)",
  pink15:  "var(--color-accent-15)",
  pink35:  "var(--color-accent-35)",
  pink45:  "var(--color-accent-45)",
  pink50:  "var(--color-accent-50)",
} as const;

/* ─── Reusable inline style helpers ─── */
const gradientFade = "var(--gradient-card-fade)";
const cardBorder   = "2px solid rgba(17,16,32,0.95)";
const cardShadow   = "0 4px 16px rgba(0,0,0,0.5)";

interface DiscordCardProps {
  inviteCode: string;
  role: string;
  index: number;
  subtitle?: string;
  avatarUrl?: string | null;
  status?: "current" | "resigned";
}

function DiscordVentureCard({ inviteCode, role, index, subtitle, avatarUrl, status = "current" }: DiscordCardProps) {
  const inv = useDiscordInvite(inviteCode);
  const iconColor = useImageColor(inv.iconUrl);
  const [hovered, setHovered] = useState(false);
  const resigned = status === "resigned";
  const accent       = resigned ? "rgba(139,127,168,1)"   : T.pink;
  const accentBg     = resigned ? "rgba(139,127,168,0.12)" : T.pink15;
  const accentBorder = resigned ? "rgba(139,127,168,0.32)" : T.pink35;

  if (inv.failed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card rounded-3xl overflow-hidden w-full max-w-[600px] mx-auto"
      style={{ position: "relative", opacity: resigned ? 0.92 : 1 }}
    >
      {inv.bannerUrl ? (
        <div className="w-full h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${inv.bannerUrl})`, filter: resigned ? "grayscale(35%)" : "none" }}>
          <div className="absolute inset-0" style={{ background: gradientFade }} />
        </div>
      ) : (
        <div className="w-full h-32 relative overflow-hidden"
          style={{
            background: iconColor
              ? `linear-gradient(135deg, ${iconColor} 0%, rgba(17,16,32,0.8) 100%)`
              : `linear-gradient(135deg, var(--color-surface-glass) 0%, rgba(17,16,32,0.6) 100%)`,
            filter: resigned ? "grayscale(35%)" : "none",
          }}>
          <div className="absolute inset-0" style={{ background: gradientFade }} />
        </div>
      )}

      <div className="p-6 pt-4 relative">
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
          style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accent }}
        >
          {resigned ? `Resigned - ${role}` : role}
        </div>

        <div className="flex items-center gap-4 mb-4 -mt-10 relative">
          {inv.loading ? (
            <div className="w-16 h-16 rounded-2xl animate-pulse" style={{ background: T.surfaceGlass }} />
          ) : inv.iconUrl ? (
            <motion.img
              src={inv.iconUrl}
              alt={inv.name}
              whileHover={{ scale: 1.18, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="w-16 h-16 rounded-2xl object-cover cursor-pointer"
              style={{ border: cardBorder, boxShadow: cardShadow }}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.18, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer"
              style={{ background: T.surfaceGlassHover, border: cardBorder }}
            >
              <SiDiscord size={26} style={{ color: T.blue }} />
            </motion.div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight truncate" style={{ color: T.textPrimary }}>
              {inv.loading ? "Loading..." : inv.name || "Server"}
            </h3>
            {subtitle && <p className="text-xs mt-1 font-medium" style={{ color: T.textMuted }}>{subtitle}</p>}
          </div>
        </div>

        {inv.description && (
          <p className="text-sm mb-4 leading-relaxed" style={{ color: T.textSubtle }}>{inv.description}</p>
        )}

        <div className="flex items-center gap-6 pt-4 flex-wrap" style={{ borderTop: `1px solid ${T.borderDefault}` }}>
          {inv.loading ? (
            <div className="flex gap-4">
              <div className="w-20 h-4 rounded animate-pulse" style={{ background: T.surfaceGlass }} />
              <div className="w-20 h-4 rounded animate-pulse" style={{ background: T.surfaceGlass }} />
            </div>
          ) : inv.failed ? (
            <span className="text-xs italic" style={{ color: "transparent" }}>Server data unavailable</span>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.green, boxShadow: `0 0 8px ${T.green}` }} />
                <span className="text-sm font-semibold" style={{ color: T.textPrimary }}>{inv.online.toLocaleString()}</span>
                <span className="text-xs" style={{ color: T.textMuted }}>online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.textMuted }} />
                <span className="text-sm font-semibold" style={{ color: T.textPrimary }}>{inv.total.toLocaleString()}</span>
                <span className="text-xs" style={{ color: T.textMuted }}>members</span>
              </div>
            </>
          )}

          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
            className="ml-auto flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: T.surfaceGlassHover, border: `1px solid ${T.borderHover}` }}
          >
            {avatarUrl && <img src={avatarUrl} alt="Caliber" className="w-5 h-5 rounded-full" />}
            <span className="text-xs font-semibold" style={{ color: T.pink }}>Caliber</span>
          </motion.div>

          {!resigned && (
            <a href={`https://discord.gg/${inviteCode}`} target="_blank" rel="noreferrer"
              className="transition-colors" style={{ color: T.textMuted }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = T.blue; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = T.textMuted; }}>
              <SiDiscord size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface CustomCardProps {
  index: number;
  avatarUrl?: string | null;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  badge: string;
  logo?: string;
  logoFallback?: ReactNode;
  bannerColor: string;
  gallery: { label: string; src?: string; color?: string }[];
  footer: string;
}

function CustomVentureCard({
  index, avatarUrl, title, subtitle, description, role, badge,
  logo, logoFallback, bannerColor, gallery, footer,
}: CustomCardProps) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card rounded-3xl overflow-hidden w-full max-w-[600px] mx-auto"
    >
      <div className="w-full h-32 relative overflow-hidden" style={{ background: bannerColor }}>
        <div className="absolute inset-0" style={{ background: gradientFade }} />
      </div>

      <div className="p-6 pt-4 relative">
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
          style={{ background: T.pink15, border: `1px solid ${T.pink35}`, color: T.pink }}>
          {badge}
        </div>

        <div className="flex items-center gap-4 mb-4 -mt-10 relative">
          {logo ? (
            <motion.img
              src={logo}
              alt={title}
              whileHover={{ scale: 1.18, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="w-16 h-16 rounded-2xl object-cover cursor-pointer"
              style={{ border: cardBorder, boxShadow: cardShadow }}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.18, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer"
              style={{ background: "linear-gradient(135deg, #2563eb, #1e40af)", border: cardBorder, boxShadow: cardShadow }}
            >
              {logoFallback ?? <span className="text-2xl font-black text-white">{title[0]}</span>}
            </motion.div>
          )}
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: T.textPrimary }}>{title}</h3>
            <p className="text-xs mt-1" style={{ color: T.textMuted }}>{subtitle}</p>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: T.textSubtle }}>{description}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
          style={{
            background: open ? T.pink12 : T.surfaceGlass,
            border: `1px solid ${open ? T.pink45 : T.borderDefault}`,
            color: open ? T.pink : T.textSecondary,
          }}
        >
          <span className="flex items-center gap-2">
            <ImageIcon size={16} />
            Work Gallery <span className="opacity-60 font-normal">({gallery.length})</span>
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="gallery"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-4 grid grid-cols-2 gap-3">
                {gallery.map((img, i) => (
                  <motion.button
                    key={`${img.label}-${i}`}
                    onClick={() => setActiveImg(i)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ delay: i * 0.04 }}
                    className="aspect-video rounded-xl flex items-end p-3 text-left relative overflow-hidden group"
                    style={{
                      background: img.src ? "var(--color-surface-bg)" : (img.color ?? "linear-gradient(135deg, #1a2a4a 0%, #0d1f3a 100%)"),
                      border: `1px solid ${activeImg === i ? T.pink50 : "var(--color-border-subtle)"}`,
                    }}
                  >
                    {img.src ? (
                      <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                        <ImageIcon size={32} style={{ color: "rgba(255,255,255,0.4)" }} />
                      </div>
                    )}
                    <span className="relative text-xs font-semibold z-10 px-2 py-0.5 rounded"
                      style={{ color: T.textPrimary, background: "var(--color-surface-bg-85)", backdropFilter: "blur(4px)" }}>
                      {img.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 mt-4 flex items-center" style={{ borderTop: `1px solid ${T.borderDefault}` }}>
          <p className="text-xs" style={{ color: T.textMuted }}>{footer}</p>
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
            className="ml-auto flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: T.surfaceGlassHover, border: `1px solid ${T.borderHover}` }}
          >
            {avatarUrl && <img src={avatarUrl} alt="Caliber" className="w-5 h-5 rounded-full" />}
            <span className="text-xs font-semibold" style={{ color: T.pink }}>{role}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const CURRENT = [
  { inviteCode: "WBQUQhhY9D", role: "Founder" },
  { inviteCode: "NfeNSrbq",   role: "Co-Owner" },
  { inviteCode: "tyZz6BdP",   role: "Operations Manager" },
];

const PAST = [
  { inviteCode: "k7D4Ctez",    role: "Manager" },
  { inviteCode: "zx3b24pkmt",  role: "Moderator" },
  { inviteCode: "techbyte",    role: "Support Team" },
  { inviteCode: "5jvjX6vSEP",  role: "Staff" },
  { inviteCode: "pZyKDTpGr2",  role: "Admin" },
  { inviteCode: "HbnKZaxV",    role: "Moderator" },
];

const DYLAN_GALLERY = [
  { label: "Exterior Shine", color: "linear-gradient(135deg, #1a2a4a 0%, #0d1f3a 100%)" },
];

const ROLLERTITE_GALLERY = [
  { label: "Project One", color: "var(--gradient-brand)" },
];

function RollertiteCard({ index, avatarUrl }: { index: number; avatarUrl?: string | null }) {
  const inv = useDiscordInvite("rollerite");
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="glass-card rounded-3xl overflow-hidden w-full max-w-[600px] mx-auto"
    >
      {inv.bannerUrl ? (
        <div className="w-full h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${inv.bannerUrl})` }}>
          <div className="absolute inset-0" style={{ background: gradientFade }} />
        </div>
      ) : (
        <div className="w-full h-32 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #471a1a 0%, #2e0d0d 100%)" }}>
          <div className="absolute inset-0" style={{ background: gradientFade }} />
        </div>
      )}

      <div className="p-6 pt-4 relative">
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
          style={{ background: T.pink15, border: `1px solid ${T.pink35}`, color: T.pink }}>
          Freelancer
        </div>

        <div className="flex items-center gap-4 mb-4 -mt-10 relative">
          {inv.iconUrl ? (
            <img src={inv.iconUrl} alt="Rollertite" className="w-16 h-16 rounded-2xl object-cover"
              style={{ border: cardBorder }} />
          ) : (
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "#471a1a", border: cardBorder }}>
              <Briefcase size={26} className="text-white" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: T.textPrimary }}>{inv.name || "Rollertite"}</h3>
            <p className="text-xs mt-1" style={{ color: T.textMuted }}>Freelancer</p>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: T.textSubtle }}>
          {inv.description || "Using Rollerite to bridge me towards clients and improve my experience."}
        </p>

        <ServicePillContainer>
          <ServicePill label="Minecraft Server Staff" color="green" />
          <ServicePill label="Discord Server Setups" color="blue" />
        </ServicePillContainer>

        <div className="my-4" />

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
          style={{
            background: open ? T.pink12 : T.surfaceGlass,
            border: `1px solid ${open ? T.pink45 : T.borderDefault}`,
            color: open ? T.pink : T.textSecondary,
          }}
        >
          <span className="flex items-center gap-2">
            <ImageIcon size={16} />
            Work Gallery <span className="opacity-60 font-normal">({ROLLERTITE_GALLERY.length})</span>
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pt-4 grid grid-cols-2 gap-3"
            >
              {ROLLERTITE_GALLERY.map((img, i) => (
                <div key={i} className="aspect-video rounded-xl flex items-end p-3 relative overflow-hidden"
                  style={{ background: img.color }}>
                  <span className="relative text-xs font-semibold z-10 px-2 py-0.5 rounded backdrop-blur-sm"
                    style={{ color: T.textPrimary, background: "var(--color-surface-bg-85)" }}>
                    {img.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 mt-4 flex items-center" style={{ borderTop: `1px solid ${T.borderDefault}` }}>
          <p className="text-xs" style={{ color: T.textMuted }}>Role served with distinction</p>
          <div className="ml-auto flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: T.surfaceGlassHover, border: `1px solid ${T.borderHover}` }}>
            {avatarUrl && <img src={avatarUrl} alt="Caliber" className="w-5 h-5 rounded-full" />}
            <span className="text-xs font-semibold" style={{ color: T.pink }}>Freelancer</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VenturesSection({ avatarUrl }: { avatarUrl?: string | null }) {
  return (
    <section id="ventures" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: T.pink }}>
            Active Ventures
          </span>
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-4xl md:text-5xl font-black cursor-default"
            style={{ color: T.textPrimary }}
          >
            Communities & Business
          </motion.h2>
          <p className="text-sm" style={{ color: T.textMuted }}>
            Live stats pulled from Discord in real-time
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 w-full">
          <CustomVentureCard
            index={0}
            avatarUrl={avatarUrl}
            title="Dylan's Auto Detailing"
            subtitle="Local detailing business"
            description="Precision auto detailing services, founded and operated by Dylan."
            role="Caliber"
            badge="Owner / CEO"
            logo={dylansLogo}
            bannerColor="linear-gradient(135deg, #0a3a78 0%, #062553 50%, #020a1f 100%)"
            gallery={DYLAN_GALLERY}
            footer="Founded and operated by Dylan"
          />
          <RollertiteCard index={1} avatarUrl={avatarUrl} />
          {CURRENT.map((v, i) => (
            <DiscordVentureCard
              key={v.inviteCode}
              inviteCode={v.inviteCode}
              role={v.role}
              index={i + 2}
              avatarUrl={avatarUrl}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center mt-16"
        >
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-3xl md:text-4xl font-black cursor-default"
            style={{ color: T.textPrimary }}
          >
            Past Roles
          </motion.h2>
          <p className="text-sm" style={{ color: T.textMuted }}>
            Communities I've helped run, moderate, and grow
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 w-full">
          {PAST.map((v, i) => (
            <DiscordVentureCard
              key={v.inviteCode}
              inviteCode={v.inviteCode}
              role={v.role}
              index={i}
              avatarUrl={avatarUrl}
              status="resigned"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
