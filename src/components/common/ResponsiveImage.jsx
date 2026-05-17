import { useState, useEffect, useRef } from 'react'
import { getOptimizedImageUrl, getDefaultImage, generateResponsiveImage } from '@/utils/imageOptimization'

/**
 * Optimized responsive image component
 * Features:
 * - WebP format with fallback
 * - Lazy loading with intersection observer
 * - Responsive sizing
 * - Error handling with fallback image
 * - Async image decoding for performance
 */
export default function ResponsiveImage({
  src,
  alt = 'Image',
  type = 'generic',
  width,
  height,
  className = '',
  objectFit = 'cover',
  quality = 85,
  onError,
  placeholder = true,
  priority = false,
}) {
  const [imageSrc, setImageSrc] = useState(src || getDefaultImage(type))
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const [isVisible, setIsVisible] = useState(priority)

  // Lazy load with Intersection Observer
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [priority])

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Handle image error with fallback
  const handleError = () => {
    setHasError(true)
    const fallbackUrl = getDefaultImage(type)
    if (imageSrc !== fallbackUrl) {
      setImageSrc(fallbackUrl)
    }
    if (onError) {
      onError()
    }
  }

  // Skip rendering if not visible and not priority
  if (!isVisible && !priority) {
    return (
      <div
        ref={imgRef}
        className={`bg-slate-200 animate-pulse ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          aspectRatio: width && height ? `${width}/${height}` : 'auto',
        }}
        aria-label={`Loading ${alt}`}
      />
    )
  }

  const optimizedSrc = getOptimizedImageUrl(imageSrc, { width, height, quality })
  const { srcSet, sizes } = generateResponsiveImage(imageSrc, type)

  return (
    <div
      className={`relative overflow-hidden ${!isLoaded ? 'bg-slate-200' : ''}`}
      style={{
        width: width || '100%',
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {/* Placeholder skeleton loader */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        srcSet={srcSet || undefined}
        sizes={sizes || undefined}
        className={`w-full h-full ${className}`}
        style={{
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
          Image failed to load
        </div>
      )}
    </div>
  )
}
