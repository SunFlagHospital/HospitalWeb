import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Quote } from 'lucide-react'
import { useDoctors, useTestimonials } from '@/hooks/useFirestore'
import DoctorCard from '@/components/ui/DoctorCard'
import SectionHeader from '@/components/ui/SectionHeader'

// Skeleton loader for doctor cards
function SkeletonDoctorCard() {
  return (
    <div className="card h-full flex flex-col overflow-hidden animate-pulse">
      <div className="h-56 sm:h-64 lg:h-72 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
      <div className="p-3 sm:p-4 lg:p-6 flex-grow flex flex-col">
        <div className="mb-2 sm:mb-3 lg:mb-4 space-y-2">
          <div className="h-4 sm:h-5 lg:h-6 bg-slate-200 rounded-lg w-3/4" />
          <div className="h-3 sm:h-4 lg:h-5 bg-slate-200 rounded-lg w-1/2" />
        </div>
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 lg:mb-5 flex-grow">
          <div className="h-3 sm:h-3.5 lg:h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-3 sm:h-3.5 lg:h-4 bg-slate-200 rounded-lg w-5/6" />
          <div className="h-3 sm:h-3.5 lg:h-4 bg-slate-200 rounded-lg w-2/3" />
        </div>
        <div className="h-9 sm:h-10 lg:h-11 bg-slate-200 rounded-lg sm:rounded-xl w-full mt-auto" />
      </div>
    </div>
  )
}

export function DoctorsPreview() {
  const { data: doctors, loading } = useDoctors()

  // Safe sorting: displayOrder ascending, then by name, then place doctors without displayOrder at end
  const sorted = [...doctors].sort((a, b) => {
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder
    }
    if (a.displayOrder !== undefined) return -1
    if (b.displayOrder !== undefined) return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Expert Doctors"
          title="Meet Our Specialists"
          subtitle="Board-certified physicians and surgeons with decades of experience in their respective fields"
        />

        {loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-10 sm:mt-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonDoctorCard key={i} />
              ))}
            </div>
          </>
        ) : sorted.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-10 sm:mt-12">
              {sorted.slice(0, 3).map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <DoctorCard doctor={doc} index={i} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <Link to="/doctors" className="btn-primary">
                View All Doctors <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-slate-400 mt-8">
            <p className="text-lg font-semibold">No doctors available yet</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { data: testimonials, loading } = useTestimonials()

  return (
    <section className="py-20 bg-primary-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-800 rounded-full -translate-x-36 -translate-y-36" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-48 translate-y-48" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Patient Stories"
          title="What Our Patients Say"
          subtitle="Real stories of recovery and excellence from patients we've had the privilege to care for"
          light
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-56 bg-white/10 rounded-2xl" />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors"
              >
                <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />
                <p className="text-white/80 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{(t.name || 'P')[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-primary-300 text-xs">{t.department}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-white/50 mt-8">
            <p className="text-lg font-semibold">No testimonials available yet</p>
          </div>
        )}
      </div>
    </section>
  )
}
