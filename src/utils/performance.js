/**
 * Performance Optimization Utilities
 * Lazy loading, image optimization, and resource hints
 */

// Lazy load images
export const observeImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img))
  }
}

// Prefetch DNS
export const prefetchDNS = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// Preconnect to origins
export const preconnect = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Resource hints for critical resources
export const setupResourceHints = () => {
  // Preconnect to Firebase and APIs
  preconnect([
    'https://firestore.googleapis.com',
    'https://www.googleapis.com',
    'https://cdn.sunflagglobalhospital.com',
  ])

  // DNS prefetch for external services
  prefetchDNS([
    'https://ik.imagekit.io',
  ])
}

// Monitor Web Vitals
export const reportWebVitals = () => {
  if ('web-vital' in window) {
    const vitals = window['web-vital']
    console.log('Core Web Vitals:', vitals)
  }
}

// Debounce function for scroll/resize events
export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Cache API responses with TTL
export const cacheResponse = (key, data, ttl = 3600000) => {
  const cached = {
    data,
    timestamp: Date.now(),
    ttl
  }
  try {
    sessionStorage.setItem(`cache_${key}`, JSON.stringify(cached))
  } catch (e) {
    // Handle quota exceeded or private mode
    console.warn('Cache storage unavailable:', e)
  }
}

export const getCachedResponse = (key) => {
  try {
    const cached = sessionStorage.getItem(`cache_${key}`)
    if (!cached) return null

    const { data, timestamp, ttl } = JSON.parse(cached)
    if (Date.now() - timestamp > ttl) {
      sessionStorage.removeItem(`cache_${key}`)
      return null
    }

    return data
  } catch (e) {
    console.warn('Cache retrieval error:', e)
    return null
  }
}

// Lazy load Firebase modules on demand
export const lazyLoadFirebase = async () => {
  if (window.__firebaseLoaded) return
  
  return new Promise((resolve) => {
    // Use requestIdleCallback to defer Firebase loading
    const cb = () => {
      window.__firebaseLoaded = true
      resolve(true)
    }
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(cb, { timeout: 5000 })
    } else {
      setTimeout(cb, 1000)
    }
  })
}

// Bundle split suggestions
export const getBundleStats = async () => {
  try {
    const response = await fetch('/dist/stats.json')
    const stats = await response.json()
    console.log('Bundle Stats:', stats)
  } catch (error) {
    console.log('Stats not available in development')
  }
}

// Optimize animations performance
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default {
  observeImages,
  prefetchDNS,
  preconnect,
  setupResourceHints,
  reportWebVitals,
  debounce,
  throttle,
  cacheResponse,
  getCachedResponse,
  lazyLoadFirebase,
  getBundleStats,
  prefersReducedMotion,
}
