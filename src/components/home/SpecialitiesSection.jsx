import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSpecialities } from '@/hooks/useFirestore'
import SectionHeader from '@/components/ui/SectionHeader'
import { getSpecialityEmoji } from '@/components/common/SpecialityEmojis'

export default function SpecialitiesSection() {
  const { data: specialities, loading } = useSpecialities()

  return (
    <section className="py-12 sm:py-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader
          badge="Medical Specialities"
          title="Comprehensive Care Across All Specialities"
          subtitle="World-class treatment in 50+ medical specialities with the finest specialists in Haryana"
        />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse card h-40 sm:h-48 bg-slate-100" />
            ))}
          </div>
        ) : specialities.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12">
              {specialities.map((spec, i) => {
                const emoji = getSpecialityEmoji(spec.name)
                return (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to="/specialities"
                      className="card p-3 sm:p-5 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 h-full shadow-sm hover:shadow-md bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"
                    >
                      {/* Large Emoji Icon */}
                      <div
                        className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300 block"
                        role="img"
                        aria-label={spec.name}
                      >
                        {emoji}
                      </div>

                      {/* Specialty Name */}
                      <h3 className="font-bold text-primary-900 font-display text-xs sm:text-sm mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {spec.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-xs leading-tight line-clamp-2">
                        {spec.description}
                      </p>

                      {/* Colored accent bar at bottom */}
                      <div
                        className="w-8 h-1 rounded-full mt-3 group-hover:w-12 transition-all duration-300"
                        style={{ backgroundColor: spec.color || '#3b82f6' }}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <Link to="/specialities" className="btn-primary text-sm sm:text-base">
                View All Specialities <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 text-slate-400 mt-8">
            <p className="text-base sm:text-lg font-semibold">No specialities available yet</p>
          </div>
        )}
      </div>
    </section>
  )
}
