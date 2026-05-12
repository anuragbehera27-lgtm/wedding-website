/**
 * Motion tokens for Framer Motion.
 * Mirrors tailwind.config.ts — keep in sync.
 */

export const duration = {
  fast:  0.15, // button hover, toggles
  base:  0.28, // nav, focus states
  enter: 0.6,  // scroll-triggered reveals
  page:  0.9,  // hero entrance
} as const;

export const ease = {
  out:    [0.16, 1, 0.3, 1]   as [number, number, number, number], // exits, reveals
  inOut:  [0.83, 0, 0.17, 1]  as [number, number, number, number], // definite end states
  spring: [0.34, 1.3, 0.64, 1] as [number, number, number, number], // press feedback only
} as const;

// Scroll-triggered reveal — single element
export const reveal = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: duration.enter, ease: ease.out } },
} as const;

// Stagger container + child — general sections
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
} as const;

export const staggerChild = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: duration.enter, ease: ease.out } },
} as const;

// Hero entrance — 120ms stagger, longer duration, slight extra travel
export const heroContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

export const heroChild = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: duration.page, ease: ease.out } },
} as const;

// Hover lift — cards, photo strip items
export const hoverLift = {
  rest:  { y: 0,  boxShadow: "0 1px 4px rgba(28, 24, 38, 0.06)" },
  hover: { y: -4, boxShadow: "0 16px 48px rgba(28, 24, 38, 0.10), 0 4px 12px rgba(28, 24, 38, 0.05)" },
  transition: { duration: duration.base, ease: ease.out },
} as const;

// Button press
export const buttonPress = {
  rest:    { scale: 1 },
  hover:   { scale: 1.01 },
  pressed: { scale: 0.98 },
  transition: { duration: duration.fast, ease: ease.spring },
} as const;
