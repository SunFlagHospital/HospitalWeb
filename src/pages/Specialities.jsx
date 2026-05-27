import { motion } from 'framer-motion'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSpecialities } from '@/hooks/useFirestore'
import { getSpecialityIcon } from '@/components/common/MedicalIcons'

export default function Specialities() {
  const { data: specialities, loading, error } = useSpecialities()

  return (
    <>
      <SEO
        title="Medical Specialities | 50+ Departments"
        description="Sunflag Global Hospital offers 50+ medical specialities — Cardiology, Neurology, Orthopedics, Oncology, Gynecology, Pediatrics, and more in Rohtak."
        canonical="/specialities"
      />
      <PageBanner
        title="Medical Specialities"
        subtitle="World-class care across 50+ specialities with India's finest medical specialists"
        breadcrumb={[{ label: 'Specialities' }]}
        imageUrl="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1600&q=80"
        pageSlug="specialities"
      />

      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Specialities"
            title="Comprehensive Medical Care"
            subtitle="From routine consultations to complex surgeries, we have specialists for every medical need"
          />

          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse card h-56 bg-slate-100" />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900">Error Loading Specialities</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && specialities.length === 0 && (
            <div className="text-center py-16 text-slate-400 mt-8">
              <p className="text-lg font-semibold">No specialities found</p>
              <p className="text-sm">Specialities will appear here once added by administrator.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && specialities.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {specialities.map((spec, i) => {
                const IconComponent = getSpecialityIcon(spec.name)
                return (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="card p-6 group hover:-translate-y-1 transition-all duration-300 h-full">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 text-primary-600"
                        style={{ backgroundColor: `${spec.color || '#3b82f6'}15` }}
                      >
                        <IconComponent />
                      </div>
                      <h3 className="font-bold text-primary-900 font-display mb-2 group-hover:text-primary-600 transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">
                        {spec.description}
                      </p>
                      <Link
                        to="/doctors"
                        className="inline-flex items-center gap-1.5 text-primary-600 text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                      >
                        Find Doctors <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
