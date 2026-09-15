export const easings = {
  brand: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.055, 0.675, 0.19],
  easeInOut: [0.645, 0.045, 0.355, 1],
  sharp: [0.4, 0, 0.2, 1],
};

export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  page: 0.6,
  modal: 0.3,
  toast: 0.4,
};

export const transitions = {
  default: { duration: durations.base, ease: easings.brand },
  fast: { duration: durations.fast, ease: easings.brand },
  slow: { duration: durations.slow, ease: easings.brand },
  spring: { type: 'spring', stiffness: 400, damping: 25 },
  springSoft: { type: 'spring', stiffness: 300, damping: 30 },
  springBounce: { type: 'spring', stiffness: 500, damping: 20 },
  page: { duration: durations.page, ease: easings.brand },
  modal: { duration: durations.modal, ease: easings.brand },
};

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.page,
};

export const pageVariantsSlide = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
  transition: transitions.page,
};

export const fadeSlideVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.base,
};

export const fadeSlideUpVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: transitions.base,
};

export const scaleVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: transitions.fast,
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easings.brand },
};

export const staggerItemFast = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: easings.brand },
};

export const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: easings.brand },
};

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: easings.brand },
};

export const scrollRevealRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: easings.brand },
};

export const scrollRevealScale = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: easings.spring },
};

export const cardHover = {
  whileHover: {
    y: -8,
    boxShadow: 'var(--shadow-float)',
    transition: { duration: 0.3, ease: easings.brand },
  },
  whileTap: { scale: 0.98 },
};

export const cardHoverSubtle = {
  whileHover: {
    y: -4,
    boxShadow: 'var(--shadow-card)',
    transition: { duration: 0.2, ease: easings.brand },
  },
  whileTap: { scale: 0.99 },
};

export const buttonPress = {
  whileTap: { scale: 0.96 },
  transition: { duration: 0.1 },
};

export const buttonPressScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: easings.brand },
};

export const inputFocus = {
  animate: { borderColor: 'var(--color-border-focus)', boxShadow: 'var(--shadow-inner-glow)' },
  transition: transitions.fast,
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: transitions.modal,
};

export const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.fast },
};

export const dropdownVariants = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
  transition: transitions.fast,
};

export const toastVariants = {
  initial: { opacity: 0, x: 400, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 400, scale: 0.9 },
  transition: transitions.toast,
};

export const tabIndicatorVariants = {
  initial: { opacity: 0, scaleX: 0 },
  animate: { opacity: 1, scaleX: 1 },
  exit: { opacity: 0, scaleX: 0 },
  transition: { duration: durations.fast, ease: easings.spring },
};

export const accordionVariants = {
  open: { height: 'auto', opacity: 1 },
  closed: { height: 0, opacity: 0 },
  transition: { duration: durations.base, ease: easings.brand },
};

export const listVariants = {
  open: { transition: { staggerChildren: 0.05 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

export const listItemVariants = {
  open: { opacity: 1, x: 0, height: 'auto', transition: { duration: durations.fast } },
  closed: { opacity: 0, x: -20, height: 0, transition: { duration: durations.fast } },
};

export const imageRevealVariants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 1.2, ease: easings.brand },
};

export const heroTextVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easings.brand },
};

export const heroImageVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, ease: easings.brand, delay: 0.2 },
};

export const navLinkVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: easings.brand },
};

export const mobileMenuVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: durations.base, ease: easings.brand },
};

export const cursorVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { duration: durations.fast, ease: easings.spring },
};

export const stampVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  tap: { scale: 1.2, rotate: 5 },
  transition: { type: 'spring', stiffness: 500, damping: 20 },
};

export const compassVariants = {
  animate: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: 'linear' } },
};

export const waveVariants = {
  animate: { rotate: [0, 15, 0, -15, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
};

export const islandPopVariants = (index) => ({
  initial: { opacity: 0, scale: 0.5, y: 50 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.6, delay: index * 0.15, ease: easings.spring },
});

export const loadingDotsVariants = {
  animate: { scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5], transition: { duration: 0.6, repeat: Infinity } },
};

export const shimmerVariants = {
  animate: { x: ['-100%', '100%'], transition: { duration: 2, repeat: Infinity, ease: 'linear' } },
};

export function createStaggerVariants(stagger = 0.08, delayChildren = 0.1) {
  return {
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

export function createScrollRevealOptions(margin = '-100px', once = true) {
  return {
    viewport: { once, margin },
  };
}

export function createTransition(duration = durations.base, ease = easings.brand) {
  return { duration, ease };
}