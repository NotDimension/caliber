# Caliber Portfolio — Design System

## Single Source of Truth

**`src/styles/variables.css`** is the ONLY file you need to edit to change the entire app's look and feel.

Every color, font, spacing value, border-radius, shadow, and transition in the app references CSS custom properties defined in that file.

---

## Quick Start

### To change a color everywhere:

1. Open `src/styles/variables.css`
2. Find the token you want to change (e.g., `--color-accent-pink`)
3. Change the value
4. **Every component using that token updates automatically**

```css
/* Change the brand accent from pink to blue: */
--color-accent-pink: #3B82F6;
```

### To add a new design token:

1. Add the variable in `src/styles/variables.css` under the appropriate category
2. Use it in any component: `color: var(--your-new-token)`

---

## File Structure

```
src/
  styles/
    variables.css          ← ★ SINGLE SOURCE OF TRUTH (edit only this)
    DESIGN_SYSTEM.md       ← You are here
  styles.css               ← Imports variables.css, maps tokens to Tailwind
  components/
    Button.module.css      ← CSS Module referencing design tokens
    DesignButton.tsx       ← Sample component using CSS Modules
    ServicePill.module.css ← Reusable pill styles with variants
    ServicePill.tsx        ← Service pill component (easy to add/edit pills)
  sections/
    HeroSection.tsx        ← Uses CSS variables via inline styles
    AboutSection.tsx       ← Uses CSS variables via inline styles
    VenturesSection.tsx    ← Uses CSS variables + ServicePill component
    ContactSection.tsx     ← Uses CSS variables via inline styles
```

---

## Token Categories

### Colors
| Token | Purpose |
|-------|---------|
| `--color-accent-pink` | Brand accent (pink) |
| `--color-accent-purple` | Secondary accent (purple) |
| `--color-accent-blue` | Tertiary accent (blue) |
| `--color-accent-green` | Success/online status |
| `--color-surface-bg` | App background |
| `--color-surface-card` | Card background |
| `--color-surface-glass` | Glass morphism surface |
| `--color-text-primary` | Primary text |
| `--color-text-secondary` | Secondary text |
| `--color-text-muted` | Muted/less important text |
| `--color-border-default` | Default border color |
| `--color-border-hover` | Hover border color |

### Typography
| Token | Purpose |
|-------|---------|
| `--font-family-body` | Body text font |
| `--font-family-heading` | Heading font |
| `--font-size-xs` through `--font-size-5xl` | Type scale |

### Spacing
| Token | Pixels |
|-------|--------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |

### Border Radius
| Token | Pixels |
|-------|--------|
| `--radius-sm` | 6px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-2xl` | 24px |
| `--radius-pill` | 9999px |

### Shadows
| Token | Effect |
|-------|--------|
| `--shadow-sm` | Subtle shadow |
| `--shadow-lg` | Card shadow |
| `--shadow-glow-pink` | Pink glow effect |
| `--shadow-glow-purple` | Purple glow effect |

---

## How to Use in Components

### Option 1: CSS Modules (recommended for new components)
```tsx
// MyComponent.tsx
import styles from "./MyComponent.module.css";

export default function MyComponent() {
  return <button className={styles.button}>Click me</button>;
}
```

```css
/* MyComponent.module.css */
.button {
  background: var(--color-accent-pink);
  border-radius: var(--radius-pill);
  padding: var(--space-3) var(--space-6);
}
```

### Option 2: Inline styles with token shortcuts (used in existing sections)
```tsx
const T = {
  pink: "var(--color-accent-pink)",
  textPrimary: "var(--color-text-primary)",
  // ... more shortcuts
} as const;

<h1 style={{ color: T.textPrimary }}>Title</h1>
```

### Option 3: Tailwind utilities (via @theme mapping in styles.css)
```tsx
<div className="bg-primary text-foreground">Works via Tailwind</div>
```

---

## Adding New Service Pills (Rollertie Card)

The Rollertie card in `VenturesSection.tsx` uses the `ServicePill` component.

### To add a new service:
```tsx
<ServicePillContainer>
  <ServicePill label="Minecraft Server Staff" color="green" />
  <ServicePill label="Discord Server Setups" color="blue" />
  <ServicePill label="Your New Service" color="purple" />  {/* Add here */}
</ServicePillContainer>
```

### Available pill colors: `pink` | `purple` | `blue` | `green`

### To add a new color variant:
1. Add a new class in `src/components/ServicePill.module.css`:
```css
.orange {
  background: rgba(255, 165, 0, 0.15);
  border: 1px solid rgba(255, 165, 0, 0.35);
  color: #FFA500;
}
```
2. Add it to the type in `ServicePill.tsx`:
```ts
type PillColor = "pink" | "purple" | "blue" | "green" | "orange";
```

---

## Best Practices

1. **Never hardcode colors** in component files — always use `var(--token-name)`
2. **Edit only `variables.css`** for global design changes
3. **New components** should use CSS Modules with tokens
4. **Keep the `T` shortcut object** at the top of section files for inline styles
5. **Extend Tailwind** via `@theme inline` in `styles.css` for utility classes
6. **The ParticleBackground** uses canvas rendering with an RGB color constant —
   update `const COLOR = "255, 45, 120"` in `ParticleBackground.tsx` to match
   changes to `--color-accent-pink`