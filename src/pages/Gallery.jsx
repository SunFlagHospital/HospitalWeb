import SEO from '@/seo/SEO'
import SectionHeader from '@/components/ui/SectionHeader'
import ResponsiveImage from '@/components/common/ResponsiveImage'
import { useGallery } from '@/hooks/useFirestore'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const { data: images, loading } = useGallery()
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') setSelectedIndex(-1)
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
          ) : images.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-slate-400 text-sm sm:text-base font-semibold">No gallery items available yet</p>
            </div>
          ) : (
            <>
              {/* Responsive Masonry Grid */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px]">
                  {images.map((img, idx) => (
                    <motion.button
                      key={img.id}
                      onClick={() => setSelectedIndex(idx)}
                      className="relative group overflow-hidden rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ResponsiveImage 
                        src={img.image} 
                        alt={img.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white text-xs sm:text-sm font-semibold line-clamp-1">{img.title}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Lightbox Modal */}
              <AnimatePresence>
                {selectedIndex >= 0 && (
                  <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedIndex(-1)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 focus:outline-none"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedIndex(-1)}
                        className="absolute -top-10 sm:top-2 right-0 sm:right-2 text-white hover:text-primary-300 transition-colors z-10 p-2"
                        aria-label="Close lightbox"
                      >
                        <X className="w-6 h-6 sm:w-8 sm:h-8" />
                      </button>

                      {/* Image Container */}
                      <div className="relative w-full flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
                        <ResponsiveImage
                          src={images[selectedIndex].image}
                          alt={images[selectedIndex].title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Navigation & Info */}
                      <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 bg-black/50 rounded-lg">
                        <button
                          onClick={handlePrev}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <div className="flex-1 text-center min-w-0">
                          <p className="text-white text-xs sm:text-sm font-semibold truncate">
                            {images[selectedIndex].title}
                          </p>
                          {images[selectedIndex].category && (
                            <p className="text-white/70 text-xs">{images[selectedIndex].category}</p>
                          )}
                          <p className="text-white/60 text-xs">{selectedIndex + 1} of {images.length}</p>
                        </div>

                        <button
                          onClick={handleNext}
                          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
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
