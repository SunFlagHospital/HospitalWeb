import { useEffect } from 'react'

/**
 * useAnchorScroll Hook
 * Enables smooth scrolling to anchor links/sections
 * Handles hash-based navigation with smooth scroll animation
 * 
 * Features:
 * - Smooth scroll to elements by ID
 * - Works with hash-based URLs
 * - Compatible with Framer Motion animations
 * - Performance optimized
 * 
 * Usage:
 * 1. Add useAnchorScroll() to your component
 * 2. Create links: <Link to="#section-id">Link</Link>
 * 3. Add elements: <section id="section-id">Content</section>
 */
export function useAnchorScroll() {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      // Prevent default scroll behavior
      e.preventDefault()

      // Find target element
      const targetId = hash.slice(1) // Remove #
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Smooth scroll to element with offset for fixed header
        const headerHeight = 100 // Approximate navbar height
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerHeight

        window.scrollTo({
          top: offsetPosition,
          left: 0,
          behavior: 'smooth',
        })

        // Update URL hash
        window.history.pushState(null, null, hash)
      }
    }

    // Add event listener to document
    document.addEventListener('click', handleAnchorClick, true)

    // Handle direct hash navigation on page load
    const hash = window.location.hash
    if (hash) {
      const targetId = hash.slice(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        setTimeout(() => {
          const headerHeight = 100
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerHeight
          
          window.scrollTo({
            top: offsetPosition,
            left: 0,
            behavior: 'smooth',
          })
        }, 100) // Delay to ensure page is fully loaded
      }
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick, true)
    }
  }, [])
}
