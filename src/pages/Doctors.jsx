import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import DoctorCard from '@/components/ui/DoctorCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAllDoctors } from '@/hooks/useFirestore'

const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Gynecology', 'Oncology', 'Pediatrics', 'Emergency', 'Gastroenterology']

// Loading skeleton card component for premium look
function SkeletonDoctorCard() {
  return (
    <div className="card h-full flex flex-col overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-60 sm:h-72 lg:h-80 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

      {/* Content skeleton */}
      <div className="p-4 sm:p-5 lg:p-6 flex-grow flex flex-col">
        <div className="mb-3 sm:mb-4 space-y-2">
          <div className="h-5 sm:h-6 bg-slate-200 rounded-lg w-3/4" />
          <div className="h-4 sm:h-5 bg-slate-200 rounded-lg w-1/2" />
        </div>

        <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 flex-grow">
          <div className="h-3.5 sm:h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-3.5 sm:h-4 bg-slate-200 rounded-lg w-5/6" />
          <div className="h-3.5 sm:h-4 bg-slate-200 rounded-lg w-2/3" />
        </div>

        <div className="h-10 sm:h-11 bg-slate-200 rounded-xl w-full mt-auto" />
      </div>
    </div>
  )
}

export default function Doctors() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const { data: doctors, loading, error } = useAllDoctors()

  const filtered = doctors.filter(d => {
    const matchDept = dept === 'All' || d.department === dept
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.department && d.department.toLowerCase().includes(search.toLowerCase())) ||
      (d.speciality && d.speciality.toLowerCase().includes(search.toLowerCase()))
    return matchDept && matchSearch
  })

  return (
    <>
      <SEO
        title="Our Doctors | Expert Specialists"
        description="Meet our 200+ specialist doctors at Sunflag Global Hospital Rohtak. Board-certified physicians in cardiology, neurology, orthopedics, and 50+ specialities."
        canonical="/doctors"
      />
      <PageBanner
        title="Our Expert Doctors"
        subtitle="20+ board-certified specialists committed to your health and wellbeing"
        breadcrumb={[{ label: 'Doctors' }]}
        imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80"
        pageSlug="doctors"
      />

      <section className="py-12 sm:py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Our Team"
            title="Meet Our Specialists"
            subtitle="Experienced, compassionate, and dedicated to delivering exceptional patient care"
          />

          {/* Filters */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 max-w-md w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10 text-sm w-full"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-x-auto pb-2">
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    dept === d
                      ? 'bg-primary-600 text-white shadow-premium'
                      : 'bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 border border-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State - Improved skeleton with proper card heights */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonDoctorCard key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-red-50 border border-red-200 rounded-lg sm:rounded-2xl p-4 sm:p-6 flex gap-3 sm:gap-4"
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0 sm:mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 text-sm sm:text-base">Error Loading Doctors</h3>
                <p className="text-red-700 text-xs sm:text-sm mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16 text-slate-400 mt-8"
            >
              <p className="text-base sm:text-lg font-semibold">No doctors found</p>
              <p className="text-xs sm:text-sm mt-1">Try adjusting your search or filter</p>
            </motion.div>
          )}

          {/* Grid - with auto-height cards for equal spacing */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DoctorCard doctor={doc} index={i} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
