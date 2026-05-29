/**
 * Framer Motion Animation Utilities
 * Optimized animation configurations for performance
 */

import { prefersReducedMotion } from './performance'

/**
 * Standard container animation - staggered children
 * Used for multiple items appearing together
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

/**
 * Standard item animation - fade and slide up
 * Used within staggered containers
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * Hero section heading animation
 */
export const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Page transition animation
 */
export const pageTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
}

/**
 * Optimize animations based on user preferences
 * Returns faster or no animation if user prefers reduced motion
 */
export const getOptimizedTransition = (duration = 0.3) => {
  return prefersReducedMotion() 
    ? { duration: 0.01 } 
    : { duration }
}

/**
 * Get reduced animation variants for accessibility
 */
export const getAccessibleVariants = (fullVariants, reducedVariants = {}) => {
  return prefersReducedMotion() 
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, ...reducedVariants }
    : fullVariants
}

/**
 * Hover animation with reduced motion support
 */
export const hoverVariants = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: getOptimizedTransition(0.2),
}

/**
 * Tap animation with reduced motion support
 */
export const tapVariants = {
  scale: prefersReducedMotion() ? 1 : 0.95,
  transition: getOptimizedTransition(0.15),
}

export default {
  containerVariants,
  itemVariants,
  headingVariants,
  pageTransitionVariants,
  getOptimizedTransition,
  getAccessibleVariants,
  hoverVariants,
  tapVariants,
}
