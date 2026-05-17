import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useBanner } from '@/hooks/useBanner'
import ResponsiveImage from './ResponsiveImage'
import { getDefaultImage } from '@/utils/imageOptimization'

/**
 * Dynamic Page Banner Component
 * Fetches banner data from Firestore
 * Falls back to default image if not configured
 * Supports dynamic title, subtitle, and breadcrumb
 */
export default function PageBanner({
  title,
  subtitle,
  breadcrumb = [],
  imageUrl,
  pageSlug,
}) {
  // Fetch banner from Firestore if pageSlug provided
  const { banner, loading, error } = useBanner(pageSlug)

  // Use Firestore banner data if available, otherwise use props
  const displayBanner = banner || { imageUrl, title, subtitle }
  const finalImageUrl = displayBanner?.imageUrl || imageUrl || getDefaultImage('heroBanner')
  const finalTitle = displayBanner?.title || title
  const finalSubtitle = displayBanner?.subtitle || subtitle

  return (
    <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
      {/* Background Image - Using ResponsiveImage for optimization */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src={finalImageUrl}
          alt={finalTitle || 'Page banner'}
          type="heroBanner"
          className="w-full h-full"
          objectFit="cover"
          priority={true}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link
              to="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5" />
                {item.path ? (
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          {finalTitle && (
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display text-shadow mb-3">
              {finalTitle}
            </h1>
          )}

          {/* Subtitle */}
          {finalSubtitle && (
            <p className="text-lg text-white/80 max-w-2xl">{finalSubtitle}</p>
          )}

          {/* Loading state */}
          {loading && (
            <div className="mt-4 text-sm text-white/60">Loading banner...</div>
          )}

          {/* Error state */}
          {error && (
            <div className="mt-4 text-sm text-yellow-200">
              Using default banner
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

