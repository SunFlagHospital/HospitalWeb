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
  ])

  // DNS prefetch for external services
  prefetchDNS([
    'https://images.unsplash.com',
    'https://wa.me',
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

// Cache API responses
export const cacheResponse = (key, data, ttl = 3600000) => {
  const cached = {
    data,
    timestamp: Date.now(),
    ttl
  }
  sessionStorage.setItem(`cache_${key}`, JSON.stringify(cached))
}

export const getCachedResponse = (key) => {
  const cached = sessionStorage.getItem(`cache_${key}`)
  if (!cached) return null

  const { data, timestamp, ttl } = JSON.parse(cached)
  if (Date.now() - timestamp > ttl) {
    sessionStorage.removeItem(`cache_${key}`)
    return null
  }

  return data
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
  getBundleStats,
}
