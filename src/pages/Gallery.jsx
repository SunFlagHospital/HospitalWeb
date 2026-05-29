import SEO from '@/seo/SEO'
import SectionHeader from '@/components/ui/SectionHeader'
import ResponsiveImage from '@/components/common/ResponsiveImage'
import { useGallery } from '@/hooks/useFirestore'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const { data: images = [], loading } = useGallery() || {}
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const thumbnailScrollRef = useRef(null)
  const modalRef = useRef(null)

  // Safe navigation with bounds checking
  const handlePrev = () => {
    if (!images?.length) return
    setSelectedIndex(prev => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1
      return Math.max(-1, Math.min(newIndex, images.length - 1))
    })
  }

  const handleNext = () => {
    if (!images?.length) return
    setSelectedIndex(prev => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1
      return Math.max(-1, Math.min(newIndex, images.length - 1))
    })
  }

  const handleThumbnailClick = (index) => {
    if (index >= 0 && index < images.length) {
      setSelectedIndex(index)
    }
  }

  // Handle touch/swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches?.[0]?.clientX || 0)
  }

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches?.[0]?.clientX || 0)
    handleSwipe(touchStart, e.changedTouches?.[0]?.clientX)
  }

  const handleSwipe = (start, end) => {
    if (!start || !end) return
    const distance = start - end
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex < 0) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setSelectedIndex(-1)
      }
    }

    // Focus modal for keyboard events
    if (modalRef.current) {
      modalRef.current.focus()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, images?.length])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedIndex >= 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  // Scroll thumbnail into view when selected
  useEffect(() => {
    if (selectedIndex >= 0 && thumbnailScrollRef.current) {
      const thumbnail = thumbnailScrollRef.current.querySelector('[data-active="true"]')
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [selectedIndex])

  // Keyboard navigation with safe bounds checking
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setSelectedIndex(-1)
    }
  }

  return (
    <>
      <SEO 
        title="Gallery | Sunflag Global Hospital" 
        description="Gallery of hospital facilities and patient care. Explore our state-of-the-art infrastructure and compassionate healthcare environment." 
        canonical="/gallery" 
      />
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader 
            badge="Gallery" 
            title="Our Gallery" 
            subtitle="Explore our hospital through images." 
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-full aspect-square bg-slate-200 animate-pulse rounded-lg sm:rounded-xl" 
                />
              ))}
            </div>
          ) : (images?.length || 0) === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-slate-400 text-sm sm:text-base font-semibold">No gallery items available yet</p>
            </div>
          ) : (
            <>
              {/* Responsive Masonry Grid */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px]">
                  {(images || []).map((img, idx) => (
                    <motion.button
                      key={img?.id || idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className="relative group overflow-hidden rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full h-full transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ResponsiveImage 
                        src={img?.image} 
                        alt={img?.title || 'Gallery image'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white text-xs sm:text-sm font-semibold line-clamp-1">{img?.title || 'Gallery item'}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Lightbox Modal */}
              <AnimatePresence>
                {selectedIndex >= 0 && images?.[selectedIndex] && (
                  <motion.div
                    key="lightbox-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedIndex(-1)}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-auto"
                  >
                    {/* Modal Container */}
                    <motion.div
                      ref={modalRef}
                      key={`lightbox-${selectedIndex}`}
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={handleKeyDown}
                      className="relative w-full max-w-5xl max-h-[90vh] flex flex-col focus:outline-none"
                      tabIndex={0}
                    >
                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedIndex(-1)}
                        className="absolute -top-10 sm:top-4 right-0 sm:right-4 text-white hover:text-primary-300 hover:bg-white/10 transition-all duration-200 z-20 p-2 rounded-lg"
                        aria-label="Close gallery (Esc)"
                      >
                        <X className="w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.button>

                      {/* Image Container with Touch Support */}
                      <div 
                        className="relative w-full flex-1 flex items-center justify-center bg-black/50 rounded-lg overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                      >
                        <motion.div
                          key={`image-${selectedIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <ResponsiveImage
                            src={images[selectedIndex]?.image}
                            alt={images[selectedIndex]?.title || 'Gallery image'}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>

                        {/* Previous Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePrev}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/20 rounded-lg transition-all duration-200 z-10"
                          aria-label="Previous image (←)"
                        >
                          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                        </motion.button>

                        {/* Next Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleNext}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/20 rounded-lg transition-all duration-200 z-10"
                          aria-label="Next image (→)"
                        >
                          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                        </motion.button>
                      </div>

                      {/* Image Info */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="mt-3 sm:mt-4 px-3 sm:px-4 py-3 sm:py-4 bg-black/60 rounded-lg backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm sm:text-base font-semibold truncate">
                              {images[selectedIndex]?.title || 'Gallery item'}
                            </p>
                            {images[selectedIndex]?.category && (
                              <p className="text-white/70 text-xs sm:text-sm">{images[selectedIndex].category}</p>
                            )}
                          </div>

                          {/* Counter */}
                          <div className="text-right flex-shrink-0">
                            <p className="text-white/80 text-xs sm:text-sm font-semibold">
                              {selectedIndex + 1} / {images?.length || 0}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Thumbnail Strip */}
                      {(images?.length || 0) > 1 && (
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          ref={thumbnailScrollRef}
                          className="mt-3 sm:mt-4 flex gap-2 overflow-x-auto pb-2 px-2 scroll-smooth"
                        >
                          {(images || []).map((img, idx) => (
                            <motion.button
                              key={img?.id || idx}
                              data-active={idx === selectedIndex}
                              onClick={() => handleThumbnailClick(idx)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex-shrink-0 h-16 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                                idx === selectedIndex 
                                  ? 'ring-2 ring-primary-400 opacity-100' 
                                  : 'opacity-60 hover:opacity-80'
                              }`}
                              aria-label={`View image ${idx + 1}`}
                            >
                              <ResponsiveImage
                                src={img?.image}
                                alt={img?.title || `Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}

                      {/* Keyboard Hints (Mobile Hidden) */}
                      <div className="hidden sm:block mt-3 text-center text-white/60 text-xs">
                        <p>← Left / Right → | Esc to close | Swipe on touch</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </>
  )
}
