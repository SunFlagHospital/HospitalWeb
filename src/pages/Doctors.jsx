import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import DoctorCard from '@/components/ui/DoctorCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAllDoctors } from '@/hooks/useFirestore'

const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Gynecology', 'Oncology', 'Pediatrics', 'Emergency', 'Gastroenterology']

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
        subtitle="200+ board-certified specialists committed to your health and wellbeing"
        breadcrumb={[{ label: 'Doctors' }]}
        imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80"
        pageSlug="doctors"
      />

      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Team"
            title="Meet Our Specialists"
            subtitle="Experienced, compassionate, and dedicated to delivering exceptional patient care"
          />

          {/* Filters */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors by name, department..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
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

          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse card h-80 bg-slate-100" />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900">Error Loading Doctors</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-slate-400 mt-8">
              <p className="text-lg font-semibold">No doctors found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
