import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInsurancePartners } from "@/hooks/useFirestore";

const cashlessFacilities = [
  'Zero Down Payment',
  'Direct Bill Settlement',
  'Instant Authorization',
  'Pre-Admission Approval',
  'Emergency Coverage',
  '24/7 Customer Support',
  'Online Claim Status',
  'Easy Documentation Process'
]

// Fallback data for initial display (will be replaced by Firestore data)
const defaultInsurancePanels = [
  {
    id: 'default-echs',
    name: 'ECHS',
    category: 'Government Panel',
    description: 'Ex-Servicemen Contributory Health Scheme',
    displayOrder: 1,
    active: true
  },
  {
    id: 'default-esi',
    name: 'ESI',
    category: 'Government Panel',
    description: 'Employees State Insurance',
    displayOrder: 2,
    active: true
  },
  {
    id: 'default-haryana',
    name: 'Haryana Government',
    category: 'Government Panel',
    description: 'State Government Insurance',
    displayOrder: 3,
    active: true
  },
]

function InsuranceCard({ item, type = 'panel' }) {
  if (type === 'panel') {
    return (
      <motion.div
        whileHover={{ translateY: -8 }}
        className="card p-6 sm:p-8 text-center group"
      >
        {item.logo ? (
          <img src={item.logo} alt={item.name} className="h-16 w-16 mx-auto mb-4 object-contain" />
        ) : (
          <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 transition-transform">🛡️</div>
        )}
        <h3 className="font-bold text-primary-900 font-display text-lg sm:text-xl mb-2">{item.name}</h3>
        <p className="text-slate-600 text-sm sm:text-base mb-4 font-medium">{item.description || item.category}</p>
        {item.benefits && (
          <div className="space-y-2">
            {item.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  if (type === 'tpa') {
    return (
      <motion.div
        whileHover={{ translateY: -8 }}
        className="card p-6 sm:p-8 group"
      >
        {item.logo ? (
          <img src={item.logo} alt={item.name} className="h-24 w-24 mx-auto mb-4 object-contain" />
        ) : (
          <div className="text-6xl sm:text-7xl mb-4 text-center transform group-hover:scale-110 transition-transform">🏢</div>
        )}
        <h3 className="font-bold text-primary-900 font-display text-base sm:text-lg text-center mb-3">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-slate-700 text-center">{item.description}</p>
        )}
      </motion.div>
    )
  }
}

export default function Insurance() {
  const { data: partners, loading, error } = useInsurancePartners()

  // Add debug logging
  console.debug('🏥 Insurance page render:', {
    partnersCount: partners.length,
    loading,
    hasError: !!error,
    partners: partners.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      active: p.active
    }))
  })

  // Separate partners by category with proper fallback handling
  const insurancePanels = partners.filter(p => p.category === 'Insurance').sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))
  const governmentPanels = partners.filter(p => p.category === 'Government Panel').sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))
  const tpaPanels = partners.filter(p => p.category === 'TPA').sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))

  // Use default data if no partners found and not loading
  const showDefaults = insurancePanels.length === 0 && governmentPanels.length === 0 && !loading
  const allPanels = showDefaults ? defaultInsurancePanels : [...insurancePanels, ...governmentPanels]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <SEO
        title="Insurance & TPA Partners | Sunflag Global Hospital"
        description="Comprehensive insurance coverage, TPA partners, cashless facilities. We accept ECHS, ESI, Haryana Government, and major insurance plans."
        canonical="/insurance"
      />
      <PageBanner
        title="Insurance & TPA"
        subtitle="Multiple insurance options and TPA partners for hassle-free healthcare"
        breadcrumb={[{ label: 'Insurance & TPA' }]}
        imageUrl="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
        pageSlug="insurance"
      />

      {/* Insurance Panels */}
      <section className="py-12 sm:py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Government Coverage"
            title="Accepted Insurance Panels"
            subtitle="We are proud to serve veterans, employees, and government beneficiaries"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-700 text-sm">⚠️ Error loading insurance partners: {error.message || 'Unknown error'}. Showing default panels.</p>
            </motion.div>
          )}

          {showDefaults && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 text-sm">ℹ️ Showing default insurance panels. Add partners in the admin panel to customize.</p>
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse h-40 bg-slate-100" />
              ))
            ) : allPanels.length > 0 ? (
              allPanels.map((panel) => (
                <motion.div key={panel.id} variants={itemVariants}>
                  <InsuranceCard item={panel} type="panel" />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                <p className="text-lg font-semibold">No insurance panels available</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cashless Facilities */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Convenience"
            title="Cashless Facilities"
            subtitle="Seamless and hassle-free cashless treatment experience"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12"
          >
            {cashlessFacilities.map((facility, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 p-4 sm:p-5 bg-primary-50 rounded-lg sm:rounded-xl border border-primary-100 hover:border-primary-300 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-slate-700">{facility}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TPA Partners */}
      <section className="py-12 sm:py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Partner Network"
            title="TPA Partners"
            subtitle="We work with leading TPA organizations for comprehensive coverage"
          />

          {tpaPanels.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {tpaPanels.map((partner) => (
                <motion.div key={partner.id} variants={itemVariants}>
                  <InsuranceCard item={partner} type="tpa" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-slate-400 mt-8">
              <p className="text-lg font-semibold">No TPA partners added yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Mediclaim Support */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg sm:rounded-2xl p-6 sm:p-10 lg:p-12 text-center text-white"
          >
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">Mediclaim Support</h2>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6">
              Our dedicated team assists with all mediclaim procedures and documentation. We help ensure smooth claim settlement and provide complete support throughout the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 hover:bg-slate-100"
              >
                Call for Support
              </a>
              <a
                href="mailto:info@sunflagglobalhospital.com"
                className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-black hover:bg-white/10"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

