import { motion } from "framer-motion";
import MinecraftSkinViewer from "@/components/MinecraftSkinViewer";
import { Users, Settings, FileCode, Store, ShieldCheck, Swords, Car } from "lucide-react";

const skills = [
  {
    icon: Users,
    title: "Community Management",
    desc: "Guiding players, maintaining order, and building trust across large communities.",
  },
  {
    icon: Settings,
    title: "Team Leadership",
    desc: "Structuring teams, training moderators, and providing clear oversight without micromanaging.",
  },
  {
    icon: FileCode,
    title: "Configuration & Development",
    desc: "Setting up YAML and JSON configs, writing documentation, and managing plugin ecosystems.",
  },
  {
    icon: Store,
    title: "Business Operations",
    desc: "Handling appointments, maintaining quality standards, and running daily store operations.",
  },
];

const responsibilities = [
  {
    icon: ShieldCheck,
    title: "Senior Moderator at SMP Finder",
    desc: "Handled user reports, enforced rules, and resolved conflicts before they escalated.",
    extra: "Worked with the staff team to keep the community stable through consistent moderation and clear communication.",
  },
  {
    icon: Swords,
    title: "Staff and Admin Roles in Minecraft and Discord",
    desc: "Twelve roles across different servers managing teams, plugins, and daily operations.",
    extra: "Handled setup tweaks, plugin updates, and kept systems running smoothly behind the scenes.",
  },
  {
    icon: Car,
    title: "Owner and Operator at Dylan's Auto Detailing",
    desc: "Run the daily business, handle bookings, and deliver high quality detailing work.",
    extra: "Same structured approach applies: consistent process, no shortcuts, every detail matters.",
  },
];

const stats = [
  { value: "17", label: "Years Old" },
  { value: "65k+", label: "Players Impacted" },
  { value: "12", label: "Staff Roles" },
  { value: "3+", label: "Years Exp." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-6xl md:text-7xl font-black cursor-default"
            style={{ color: "var(--color-text-primary)", letterSpacing: "-0.04em" }}
          >
            About Me
          </motion.h2>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full"
        >
          <div className="glass-card rounded-[2rem] overflow-hidden w-full text-left">
            <div className="flex">
              <div className="w-1.5 shrink-0" style={{ background: "var(--color-accent)" }} />
              <div className="p-8 md:p-10 flex-1">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>
                  At seventeen, building Minecraft servers takes up my time along with handling Discord groups. Over sixty five thousand players have passed through networks I worked on. Dozens of team positions filled: each one teaching something new about coordination. Putting together moderators happens naturally after so much practice. Rules come structured in ways that prevent chaos before it starts. Systems behind the scenes get tuned carefully because stability matters most when thousands are playing at once.
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-5" style={{ color: "var(--color-text-subtle)" }}>
                  Outside of server work, there is another side to my days: Dylan's Auto Detailing. That same drive does not disappear. It shifts. Cleaning cars gets just as much care as setting up networks. Every inch matters. Nothing skipped. Everything finished fully.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center gap-1 border transition-all duration-300 group"
              style={{ borderColor: "var(--color-border-subtle)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-20)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-subtle)"; }}
            >
              <span className="text-3xl font-black transition-transform group-hover:scale-110 duration-300" style={{ color: "var(--color-accent)" }}>
                {s.value}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full h-px" style={{ background: "var(--gradient-divider)", opacity: 0.3 }} />

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-accent)" }}>
            What I Bring
          </span>
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-4xl md:text-5xl font-black cursor-default"
            style={{ color: "var(--color-text-primary)" }}
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="glass-card rounded-2xl p-5 text-left w-full"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 260, damping: 14 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "var(--color-accent-15)",
                        border: "1px solid var(--color-accent-30)",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--color-accent)" }} />
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{skill.title}</h3>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>{skill.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="w-full h-px" style={{ background: "var(--gradient-divider)", opacity: 0.3 }} />

        {/* Responsibilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-accent)" }}>
            Where I Served
          </span>
          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-4xl md:text-5xl font-black cursor-default"
            style={{ color: "var(--color-text-primary)" }}
          >
            Responsibilities
          </motion.h2>
          <div className="flex flex-col gap-4 w-full mt-4">
            {responsibilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card rounded-2xl p-5 text-left w-full"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 260, damping: 14 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "var(--color-accent-15)",
                        border: "1px solid var(--color-accent-30)",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--color-accent)" }} />
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{item.title}</h3>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>{item.desc}</p>
                      {item.extra && (
                        <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--color-text-muted)" }}>{item.extra}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="w-full h-px" style={{ background: "var(--gradient-divider)", opacity: 0.3 }} />

        {/* Minecraft Identity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-accent)" }}>
            Minecraft Identity
          </span>
          <motion.h3
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="text-3xl font-black mb-2 cursor-default"
            style={{ color: "var(--color-text-primary)" }}
          >
            Caliber113
          </motion.h3>
          <div className="glass-card rounded-[2rem] p-8 flex justify-center"
            style={{ border: "1px solid var(--color-border-subtle)", background: "rgba(255,255,255,0.02)" }}>
            <MinecraftSkinViewer />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
