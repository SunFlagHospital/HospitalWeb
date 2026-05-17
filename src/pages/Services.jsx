import { motion } from 'framer-motion'
import { Zap, Monitor, Scissors, Activity, Droplet, Package, Truck, FlaskConical, Baby, Brain, AlertCircle } from 'lucide-react'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { useAllServices } from '@/hooks/useFirestore'

const iconMap = { Zap, Monitor, Scissors, Activity, Droplet, Package, Truck, FlaskConical, Baby, Brain }

export default function Services() {
  const { data: services, loading, error } = useAllServices()

  const featured = services.filter(s => s.featured)
  const all = services.sort((a, b) => (a.order || 999) - (b.order || 999))

  return (
    <>
      <SEO
        title="Our Services | Advanced Medical Facilities"
        description="Sunflag Global Hospital offers comprehensive medical services — emergency care, advanced surgery, diagnostics, ICU, blood bank, pharmacy, and more in Rohtak."
        canonical="/services"
      />
      <PageBanner
        title="Our Services"
        subtitle="State-of-the-art medical services with cutting-edge technology and expert care"
        breadcrumb={[{ label: 'Services' }]}
        imageUrl="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=80"
        pageSlug="services"
      />

      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Services"
            title="Everything Under One Roof"
            subtitle="Comprehensive healthcare services powered by world-class infrastructure and expert medical teams"
          />

          {/* Loading State */}
          {loading && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 mb-16">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-40 bg-slate-200 rounded-2xl" />
                ))}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-32 bg-slate-100 rounded-2xl" />
                ))}
              </div>
            </>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900">Error Loading Services</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Featured Services */}
              {featured.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 mb-16">
                    {featured.map((service, i) => {
                      const Icon = iconMap[service.icon] || Zap
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="relative bg-gradient-primary rounded-2xl p-6 text-white overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8" />
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-white font-display mb-2">{service.title}</h3>
                          <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                          <span className="absolute bottom-4 right-4 badge bg-white/20 text-white text-xs">{service.category}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </>
              )}

              {/* All Services Grid */}
              {all.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-primary-900 font-display mb-6">All Services</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {all.map((service, i) => {
                      const Icon = iconMap[service.icon] || Zap
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="card p-5 flex gap-4 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-primary-900 font-display text-sm">{service.title}</h3>
                              <span className="badge bg-slate-100 text-slate-500 text-xs">{service.category}</span>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Empty State */}
              {all.length === 0 && (
                <div className="text-center py-16 text-slate-400 mt-8">
                  <p className="text-lg font-semibold">No services found</p>
                  <p className="text-sm">Services will appear here once added by administrator.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
