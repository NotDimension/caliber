/**
 * ServicePill — Reusable service badge for Rollertie card.
 *
 * ── Adding a new service pill ──
 * Just add another <ServicePill> in the RollertiteCard:
 *   <ServicePill label="My New Service" color="purple" />
 *
 * Colors available: "pink" | "purple" | "blue" | "green"
 * (extend ServicePill.module.css to add more)
 */

import type { ReactNode } from "react";
import styles from "./ServicePill.module.css";

type PillColor = "pink" | "purple" | "blue" | "green";

interface ServicePillProps {
  label: string;
  color?: PillColor;
  icon?: ReactNode;
}

export default function ServicePill({ label, color = "pink", icon }: ServicePillProps) {
  return (
    <span className={`${styles.pill} ${styles[color]}`}>
      {icon}
      {label}
    </span>
  );
}

/**
 * ServicePillContainer — Wraps multiple pills with consistent spacing.
 *
 * ── Usage in RollertiteCard ──
 * <ServicePillContainer>
 *   <ServicePill label="Minecraft Server Staff" color="green" />
 *   <ServicePill label="Discord Server Setups" color="blue" />
 * </ServicePillContainer>
 */
export function ServicePillContainer({ children }: { children: ReactNode }) {
  return (
    <div className={styles.pillContainer}>
      {children}
    </div>
  );
}