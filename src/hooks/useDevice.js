import { useState, useEffect } from 'react'

/**
 * useMobileDevice Hook
 * Detects if the user is on a mobile/tablet device
 * Used to reduce animations and optimize performance on low-end devices
 * 
 * Returns: true if device width < 768px (mobile/tablet)
 */
export function useMobileDevice() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check initial size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    
    // Add resize listener with debouncing for performance
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return isMobile
}

/**
 * useReducedMotion Hook
 * Checks if user prefers reduced motion (accessibility setting)
 * Disables animations for users with motion sensitivity
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check media query for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
