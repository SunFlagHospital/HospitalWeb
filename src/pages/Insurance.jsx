import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
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

// Image with fallback and error handling
function InsuranceImage({ src, alt, className = "" }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleError = () => {
    console.warn(`⚠️ Failed to load image: ${src} (${alt})`)
    setImageError(true)
    setImageLoading(false)
  }

  const handleLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  if (imageError || !src) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-soft border border-primary-100 rounded-lg`}>
        <ImageIcon className="w-8 h-8 text-slate-300" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      className={`${className} ${imageLoading ? 'animate-pulse bg-slate-100' : ''}`}
    />
  )
}

// Premium panel card with professional hospital styling
function InsuranceCard({ item, type = 'panel' }) {
  if (type === 'panel') {
    // Get logo from multiple possible field names
    const logoUrl = item.logo || item.logoUrl || item.image || item.imageUrl
    
    return (
      <motion.div
        whileHover={{ translateY: -8, boxShadow: '0 20px 50px -8px rgba(29, 78, 216, 0.2)' }}
        className="card h-full overflow-hidden flex flex-col"
      >
        {/* Logo Container */}
        <div className="h-32 sm:h-40 bg-gradient-to-br from-primary-50 to-cyan-50 border-b border-primary-100 flex items-center justify-center p-4">
          <InsuranceImage
            src={logoUrl}
            alt={item.name}
            className="h-24 w-24 sm:h-32 sm:w-32 object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-primary-900 font-display text-lg sm:text-xl flex-1">
              {item.name}
            </h3>
            {item.active && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-medical-green/10 text-medical-green whitespace-nowrap flex-shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Active
              </span>
            )}
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
              {item.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed flex-1">
            {item.description || 'Premium insurance partner providing comprehensive healthcare coverage'}
          </p>

          {/* Benefits if available */}
          {item.benefits && item.benefits.length > 0 && (
            <div className="mt-5 space-y-2 pt-5 border-t border-slate-100">
              {item.benefits.slice(0, 2).map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-medical-green flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  if (type === 'tpa') {
    // Get logo from multiple possible field names
    const logoUrl = item.logo || item.logoUrl || item.image || item.imageUrl
    
    return (
      <motion.div
        whileHover={{ translateY: -8, boxShadow: '0 20px 50px -8px rgba(29, 78, 216, 0.2)' }}
        className="card h-full overflow-hidden flex flex-col"
      >
        {/* Logo Container */}
        <div className="h-40 sm:h-48 bg-gradient-to-br from-primary-50 to-cyan-50 border-b border-primary-100 flex items-center justify-center p-6">
          <InsuranceImage
            src={logoUrl}
            alt={item.name}
            className="h-28 w-28 sm:h-40 sm:w-40 object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col items-center text-center">
          <h3 className="font-bold text-primary-900 font-display text-base sm:text-lg mb-3">
            {item.name}
          </h3>

          {/* Badge if needed */}
          <div className="mb-4">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
              TPA Partner
            </span>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {item.description}
            </p>
          )}
        </div>
      </motion.div>
    )
  }
}

export default function Insurance() {
  const {
  data: partners = [],
  loading,
  error
} = useInsurancePartners() || {};

  // Debug logging
  console.debug('🏥 Insurance page render:', {
    partnersCount: partners?.length || 0,
    loading,
    hasError: !!error,
    partners: partners.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      active: p.active,
      hasLogo: !!(p.logo || p.logoUrl || p.image || p.imageUrl)
    }))
  })

  // Separate partners by category with proper fallback handling
  const insurancePanels = partners
    .filter(p => p.category === 'Insurance')
    .sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))

  const governmentPanels = partners
    .filter(p => p.category === 'Government Panel')
    .sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))

  const tpaPanels = partners
    .filter(p => p.category === 'TPA')
    .sort((a, b) => (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity))

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
              <div>
                <p className="text-yellow-700 text-sm font-semibold">Error loading insurance partners</p>
                <p className="text-yellow-600 text-xs mt-1">{error.message || 'Unknown error. Showing default panels.'}</p>
              </div>
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
                <div key={i} className="card p-6 animate-pulse h-80 bg-slate-100" />
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
                className="flex items-center gap-3 p-4 sm:p-5 bg-primary-50 rounded-lg sm:rounded-xl border border-primary-100 hover:border-primary-300 transition-colors hover:shadow-md"
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
                className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white/10"
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

