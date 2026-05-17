/**
 * Utility helpers for sanitization and validation
 */

/** Strip dangerous HTML tags from user input */
export function sanitizeText(str = '') {
  return String(str)
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, 2000)
}

/** Sanitize an object's string values */
export function sanitizeObject(obj = {}) {
  const clean = {}
  for (const [k, v] of Object.entries(obj)) {
    clean[k] = typeof v === 'string' ? sanitizeText(v) : v
  }
  return clean
}

/** Validate Indian mobile number */
export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(String(phone).replace(/[\s\-+]/g, ''))
}

/** Validate email */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
}

/** Format date for display */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

/** Truncate text */
export function truncate(str = '', len = 100) {
  return str.length > len ? str.slice(0, len) + '...' : str
}

/** Scroll to top */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
