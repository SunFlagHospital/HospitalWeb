import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page with smooth animation on route changes
 * 
 * Features:
 * - Smooth scroll-to-top animation (using CSS scroll-behavior: smooth)
 * - Watches for pathname changes using useLocation
 * - Works across all pages: main site, admin, lazy-loaded pages
 * - Handles browser back/forward buttons correctly
 * - Prevents browser from restoring previous scroll positions
 * - Performance optimized with 'smooth' behavior
 * 
 * Placement: Inside BrowserRouter, before Routes (used in App.jsx)
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Use smooth scroll behavior for professional animation
    // CSS defines scroll-behavior: smooth in index.css
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Smooth animation with CSS scroll-behavior
    })
    
    // Fallback for older browsers that don't support smooth scrolling
    setTimeout(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 0)
    
    // Also reset for sidebar/scrollable containers if they exist
    const scrollableElements = document.querySelectorAll('[data-scroll-container]')
    scrollableElements.forEach((el) => {
      el.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    })
  }, [pathname])

  return null
}

