import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'

/**
 * Responsive Video Section Component
 * - Ensures w-full wrapper so grid children stack properly on small screens
 */
export default function VideoSection({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  videoType = 'youtube', // 'youtube' or 'local'
  autoplay = false,
  muted = false,
  controls = true,
  showModal = false,
  aspectRatio = '16/9',
  className = '',
}) {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  if (!videoUrl) return null

  // Lazy load video with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '50px' }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  const getYouTubeVideoId = (url) => {
    if (!url) return null
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /youtu\.be\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
      /^([a-zA-Z0-9_-]+)$/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const getYouTubeEmbedUrl = () => {
    const videoId = getYouTubeVideoId(videoUrl)
    if (!videoId) return null

    const params = new URLSearchParams({
      autoplay: autoplay ? 1 : 0,
      muted: muted ? 1 : 0,
      controls: controls ? 1 : 0,
      modestbranding: 1,
      rel: 0,
      fs: 1,
    })

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleVideoError = () => {
    console.error(`Failed to load video: ${videoUrl}`)
    setHasError(true)
    setIsLoading(false)
  }

  // Render loading skeleton
  if (!isVisible) {
    return (
      <div
        ref={videoRef}
        className={`w-full bg-slate-200 animate-pulse rounded-2xl overflow-hidden ${className}`}
        style={{ aspectRatio }}
      />
    )
  }

  // Render error state
  if (hasError) {
    return (
      <div
        className={`w-full bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <div className="text-center px-6">
          <p className="text-slate-600 text-sm font-medium">Video failed to load</p>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block underline"
            >
              Watch on {videoType === 'youtube' ? 'YouTube' : 'original source'}
            </a>
          )}
        </div>
      </div>
    )
  }

  // YouTube Video
  if (videoType === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl()

    if (!embedUrl) {
      return (
        <div className={`w-full bg-slate-100 rounded-2xl overflow-hidden ${className}`} style={{ aspectRatio }}>
          <div className="h-full flex items-center justify-center text-slate-600">Invalid YouTube URL</div>
        </div>
      )
    }

    if (showModal) {
      return (
        <>
          {/* Thumbnail Button */}
          <motion.button
            ref={videoRef}
            onClick={() => setShowVideoModal(true)}
            className={`relative w-full group overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
            style={{ aspectRatio }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
            )}

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-all duration-300 shadow-lg group-hover:scale-110">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </motion.button>

          {/* Modal */}
          {showVideoModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowVideoModal(false)}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowVideoModal(false)} className="absolute -top-10 right-0 text-white hover:text-primary-300 transition-colors" aria-label="Close video">
                  <X className="w-8 h-8" />
                </button>

                <div style={{ aspectRatio: '16/9' }} className="rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={embedUrl}
                    title="Video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    onLoad={handleVideoLoad}
                    onError={handleVideoError}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </>
      )
    }

    // Full width iframe
    return (
      <div ref={videoRef} className={`w-full rounded-2xl overflow-hidden shadow-premium ${className}`} style={{ aspectRatio }}>
        <iframe
          src={embedUrl}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          loading="lazy"
        />
      </div>
    )
  }

  // Local Video
  return (
    <div ref={videoRef} className={`w-full rounded-2xl overflow-hidden shadow-premium bg-black ${className}`} style={{ aspectRatio }}>
      <video className="w-full h-full" autoPlay={autoplay} muted={muted} controls={controls} onLoadedData={handleVideoLoad} onError={handleVideoError} poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        <p className="text-white p-4">Your browser does not support HTML5 video.</p>
      </video>
    </div>
  )
}
