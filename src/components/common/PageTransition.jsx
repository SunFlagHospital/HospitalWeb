import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

/**
 * PageTransition Component
 * Wraps page content to provide smooth fade-in and slight upward motion on page load
 * 
 * Features:
 * - Smooth fade-in animation (0.3s)
 * - Subtle upward motion (20px)
 * - GPU-optimized using transform and opacity only
 * - Reduces animations on mobile for better performance
 * - Professional, elegant transitions (not flashy)
 * - Works with lazy-loaded pages
 * 
 * Usage: Wrap page content or use at layout level
 * Example: <PageTransition><YourPage /></PageTransition>
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reduce animation complexity on mobile for better performance
  const variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 0 : 20, // No upward motion on mobile for performance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.3, // Faster on mobile
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: isMobile ? 0.15 : 0.2,
      },
    },
  }

  // Use location key to force re-animation on route change
  return (
    <motion.div
      key={location.key}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
