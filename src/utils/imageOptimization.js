/**
 * Image Optimization Utilities
 * Handles WebP format support, responsive sizing, and Hostinger integration
 */

/**
 * Image size specifications for different use cases
 * All sizes are optimized for web with max file sizes
 */
export const IMAGE_SPECS = {
  // Hero banners - 250KB max
  heroBanner: {
    desktop: { width: 1920, height: 1080, quality: 85 },
    tablet: { width: 1280, height: 720, quality: 85 },
    mobile: { width: 800, height: 1200, quality: 80 },
  },
  // Doctor profile images - 120KB max
  doctorProfile: {
    default: { width: 500, height: 600, quality: 85 },
    thumbnail: { width: 200, height: 240, quality: 80 },
  },
  // Service images - 150KB max
  service: {
    default: { width: 800, height: 600, quality: 85 },
    thumbnail: { width: 300, height: 225, quality: 80 },
  },
  // Testimonial images - 50KB max
  testimonial: {
    default: { width: 120, height: 120, quality: 85 },
  },
  // Gallery images - 200KB max
  gallery: {
    default: { width: 1200, height: 800, quality: 85 },
    thumbnail: { width: 300, height: 200, quality: 80 },
  },
}

/**
 * Generate responsive image sizes for srcset attribute
 * @param {string} baseUrl - Base image URL
 * @param {string} type - Image type (heroBanner, doctor, service, etc)
 * @returns {object} srcSet and sizes strings for responsive images
 */
export const generateResponsiveImage = (baseUrl, type = 'default') => {
  if (!baseUrl) return { srcSet: '', sizes: '' }

  const isHostinger = baseUrl.includes('domain.com') || !baseUrl.includes('unsplash')
  
  if (type === 'heroBanner') {
    return {
      srcSet: `
        ${addWebP(baseUrl, 800, 1200)} 800w,
        ${addWebP(baseUrl, 1280, 720)} 1280w,
        ${addWebP(baseUrl, 1920, 1080)} 1920w
      `.trim(),
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw',
    }
  }

  if (type === 'doctor') {
    return {
      srcSet: `
        ${addWebP(baseUrl, 200, 240)} 200w,
        ${addWebP(baseUrl, 500, 600)} 500w
      `.trim(),
      sizes: '(max-width: 640px) 80px, (max-width: 1024px) 120px, 200px',
    }
  }

  if (type === 'service') {
    return {
      srcSet: `
        ${addWebP(baseUrl, 300, 225)} 300w,
        ${addWebP(baseUrl, 800, 600)} 800w
      `.trim(),
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    }
  }

  if (type === 'gallery') {
    return {
      srcSet: `
        ${addWebP(baseUrl, 300, 200)} 300w,
        ${addWebP(baseUrl, 800, 533)} 800w,
        ${addWebP(baseUrl, 1200, 800)} 1200w
      `.trim(),
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    }
  }

  return { srcSet: '', sizes: '' }
}

/**
 * Add WebP format variant to image URL
 * Supports Hostinger image URLs with query parameters
 * @param {string} url - Original image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Image URL with WebP conversion
 */
export const addWebP = (url, width, height) => {
  if (!url) return ''

  // For Hostinger URLs, add query parameters
  if (url.includes('domain.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}w=${width}&h=${height}&format=webp 1x`
  }

  // For external URLs (unsplash, etc), add size parameters
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&h=${height} 1x`
}

/**
 * Get optimized image URL with Hostinger integration
 * Converts to WebP, applies responsive sizing
 * @param {string} url - Original image URL
 * @param {object} options - Configuration options
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return ''

  const { width, height, quality = 85, format = 'webp' } = options

  // For Hostinger URLs
  if (url.includes('domain.com')) {
    const separator = url.includes('?') ? '&' : '?'
    let optimized = url

    if (width) optimized += `${separator}w=${width}`
    if (height) optimized += `${width ? '&' : separator}h=${height}`
    optimized += `${width || height ? '&' : separator}quality=${quality}&format=${format}`

    return optimized
  }

  // For external URLs, return with basic sizing
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width || 800}&h=${height || 600}&q=${quality}`
}

/**
 * Get fallback/default image based on type
 * Used when image fails to load or is missing
 * @param {string} type - Image type
 * @returns {string} Default image URL
 */
export const getDefaultImage = (type = 'generic') => {
  const defaults = {
    heroBanner: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    doctor: 'https://images.unsplash.com/photo-1612349317453-3ad32c4a0b5f?w=500&q=80',
    service: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    testimonial: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    gallery: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    generic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  }

  return defaults[type] || defaults.generic
}

/**
 * Build srcSet for picture element with WebP support
 * @param {string} url - Image URL
 * @param {string} type - Image type
 * @returns {object} Source set configuration
 */
export const getPictureSourceSet = (url, type = 'generic') => {
  if (!url) {
    url = getDefaultImage(type)
  }

  const specs = IMAGE_SPECS[type] || IMAGE_SPECS.service.default

  if (type === 'heroBanner') {
    return [
      {
        srcSet: `${getOptimizedImageUrl(url, { ...specs.mobile, format: 'webp' })}, ${getOptimizedImageUrl(url, { ...specs.mobile })}`,
        media: '(max-width: 640px)',
        type: 'image/webp',
      },
      {
        srcSet: `${getOptimizedImageUrl(url, { ...specs.tablet, format: 'webp' })}, ${getOptimizedImageUrl(url, { ...specs.tablet })}`,
        media: '(max-width: 1024px)',
        type: 'image/webp',
      },
      {
        srcSet: `${getOptimizedImageUrl(url, { ...specs.desktop, format: 'webp' })}, ${getOptimizedImageUrl(url, { ...specs.desktop })}`,
        type: 'image/webp',
      },
    ]
  }

  return []
}

/**
 * Check if browser supports WebP
 * Used for fallback image handling
 * @returns {Promise<boolean>} Whether WebP is supported
 */
export const supportsWebP = async () => {
  if (typeof window === 'undefined') return false

  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => resolve(webP.height === 2)
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAAA'
  })
}

/**
 * Generate picture element HTML for server-side rendering
 * @param {string} url - Image URL
 * @param {string} alt - Alt text
 * @param {string} type - Image type
 * @returns {string} HTML picture element
 */
export const generatePictureHTML = (url, alt = 'Image', type = 'generic') => {
  if (!url) {
    url = getDefaultImage(type)
  }

  const sources = getPictureSourceSet(url, type)
  const fallbackSrc = getOptimizedImageUrl(url, { width: 800, quality: 85 })

  let html = '<picture>'

  sources.forEach((source) => {
    html += `<source srcset="${source.srcSet}" media="${source.media}" type="${source.type}">`
  })

  html += `<img src="${fallbackSrc}" alt="${alt}" loading="lazy" decoding="async">`
  html += '</picture>'

  return html
}

/**
 * Preload critical images for performance
 * Should be called for above-the-fold images
 * @param {string} url - Image URL
 * @param {string} type - Image type
 */
export const preloadImage = (url, type = 'generic') => {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = getOptimizedImageUrl(url, { width: 800, format: 'webp' })
  link.imagesrcset = generateResponsiveImage(url, type).srcSet
  link.imagesizes = generateResponsiveImage(url, type).sizes

  document.head.appendChild(link)
}

/**
 * Prefetch images for faster loading on next interaction
 * Should be used for non-critical images
 * @param {string[]} urls - Array of image URLs
 */
export const prefetchImages = (urls = []) => {
  if (typeof document === 'undefined') return

  urls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = url

    document.head.appendChild(link)
  })
}

export default {
  IMAGE_SPECS,
  generateResponsiveImage,
  addWebP,
  getOptimizedImageUrl,
  getDefaultImage,
  getPictureSourceSet,
  supportsWebP,
  generatePictureHTML,
  preloadImage,
  prefetchImages,
}
