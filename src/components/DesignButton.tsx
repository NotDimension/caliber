/**
 * DesignButton — Sample component demonstrating the Single-Source-of-Truth design system.
 *
 * All visual tokens (colors, spacing, radius, shadows, fonts, transitions)
 * are pulled from src/styles/variables.css via CSS Modules.
 *
 * Change any value in variables.css → this component updates automatically.
 *
 * ── Usage ──
 *   <DesignButton variant="primary">Get Started</DesignButton>
 *   <DesignButton variant="purple" size="lg">Large Purple</DesignButton>
 *   <DesignButton variant="outline">Outline Style</DesignButton>
 *   <DesignButton variant="glass">Glass (Default)</DesignButton>
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "glass" | "primary" | "purple" | "outline";
type Size = "sm" | "md" | "lg";

interface DesignButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  glass: styles.button,
  primary: `${styles.button} ${styles.primary}`,
  purple: `${styles.button} ${styles.purple}`,
  outline: `${styles.button} ${styles.outline}`,
};

const sizeClass: Record<Size, string | undefined> = {
  sm: styles.sm,
  md: undefined,
  lg: styles.lg,
};

export default function DesignButton({
  variant = "glass",
  size = "md",
  className = "",
  children,
  ...props
}: DesignButtonProps) {
  const classes = [
    variantClass[variant],
    sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
