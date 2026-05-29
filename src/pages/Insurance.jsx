import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertCircle, Image as ImageIcon, Building2, Stethoscope } from 'lucide-react'
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

// Safe image component with fallback and error handling
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
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-primary-50 to-cyan-50 border border-primary-100 rounded-lg`}>
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

// Premium partner card with modern glassmorphism design
function PartnerCard({ partner, variant = 'default' }) {
  // Safe logo extraction with multiple field support
  const logoUrl = partner?.logo || partner?.logoUrl || partner?.image || partner?.imageUrl

  if (variant === 'tpa') {
    return (
      <motion.div
        whileHover={{ translateY: -6, boxShadow: '0 20px 40px rgba(29, 78, 216, 0.15)' }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          {/* Logo Container */}
          <div className="mb-6 h-32 w-32 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-cyan-50 border border-primary-100/50 group-hover:border-primary-300 transition-colors duration-300 flex-shrink-0">
            <InsuranceImage
              src={logoUrl}
              alt={partner?.name || 'Partner Logo'}
              className="h-28 w-28 object-contain"
            />
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-3 line-clamp-2">
            {partner?.name || 'Partner Name'}
          </h3>

          {/* Description */}
          {partner?.description && (
            <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
              {partner.description}
            </p>
          )}

          {/* Active Badge */}
          {partner?.active && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-medical-green/10 text-medical-green border border-medical-green/20">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          )}
        </div>
      </motion.div>
    )
  }

  // Default card variant for Government Panel and Private Insurance
  return (
    <motion.div
      whileHover={{ translateY: -6, boxShadow: '0 20px 40px rgba(29, 78, 216, 0.15)' }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Logo Container */}
      <div className="relative h-40 bg-gradient-to-br from-primary-50 to-cyan-50 border-b border-primary-100/50 flex items-center justify-center p-6">
        <InsuranceImage
          src={logoUrl}
          alt={partner?.name || 'Partner Logo'}
          className="h-32 w-32 object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative p-6 sm:p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 flex-1 line-clamp-2">
            {partner?.name || 'Partner Name'}
          </h3>
          {partner?.active && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-medical-green/10 text-medical-green whitespace-nowrap flex-shrink-0 border border-medical-green/20">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          )}
        </div>

        {/* Description */}
        {partner?.description && (
          <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">
            {partner.description}
          </p>
        )}

        {/* Benefits if available */}
        {(partner?.benefits?.length || 0) > 0 && (
          <div className="space-y-2 pt-4 border-t border-slate-100/50">
            {(partner?.benefits || []).slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-medical-green flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Insurance() {
  const {
    data: partners = [],
    loading,
    error
  } = useInsurancePartners() || {}

  // Safe category normalization
  const normalizeCategory = (category) => {
    return category?.trim?.()?.toLowerCase?.() || ''
  }

  // Debug logging
  console.debug('🏥 Insurance page render:', {
    partnersCount: partners?.length || 0,
    loading,
    hasError: !!error,
    partnersList: (partners || []).map(p => ({
      id: p?.id,
      name: p?.name,
      category: p?.category,
      normalizedCategory: normalizeCategory(p?.category),
      active: p?.active,
      displayOrder: p?.displayOrder
    }))
  })

  // Separate partners by new categories with safe filtering
  const governmentPanels = (partners || [])
    .filter(p => normalizeCategory(p?.category) === 'government panel')
    .sort((a, b) => (a?.displayOrder ?? Infinity) - (b?.displayOrder ?? Infinity))

  const tpaPartners = (partners || [])
    .filter(p => normalizeCategory(p?.category) === 'tpa')
    .sort((a, b) => (a?.displayOrder ?? Infinity) - (b?.displayOrder ?? Infinity))

  const privateInsurance = (partners || [])
    .filter(p => normalizeCategory(p?.category) === 'private insurance')
    .sort((a, b) => (a?.displayOrder ?? Infinity) - (b?.displayOrder ?? Infinity))

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
        description="Comprehensive insurance coverage with Government Panels, TPA Partners, and Private Insurance. Cashless treatment facility available."
        canonical="/insurance"
      />

      {/* Hero Banner */}
      <PageBanner
        title="Insurance & TPA Partners"
        subtitle="Trusted healthcare coverage with direct bill settlement and cashless facilities"
        breadcrumb={[{ label: 'Insurance & TPA' }]}
        imageUrl="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
        pageSlug="insurance"
      />

      {/* Error State */}
      {error && (
        <div className="bg-yellow-50 border-t-4 border-yellow-400 px-4 py-4 sm:px-6 sm:py-5">
          <div className="max-w-7xl mx-auto flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-700 text-sm font-semibold">Error loading insurance partners</h3>
              <p className="text-yellow-600 text-xs mt-1">{error.message || 'Failed to fetch data from server'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Government Panels Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Government Coverage"
            title="Government Panels"
            subtitle="Comprehensive coverage for veterans, employees, and government beneficiaries"
          />

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </motion.div>
          ) : governmentPanels?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {governmentPanels.map((partner) => (
                <motion.div key={partner?.id} variants={itemVariants}>
                  <PartnerCard partner={partner} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-16 mt-8"
            >
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No government panels added yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* TPA Partners Section */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Partner Network"
            title="TPA Partners"
            subtitle="Seamless coordination with leading Third Party Administrators"
          />

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </motion.div>
          ) : tpaPartners?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {tpaPartners.map((partner) => (
                <motion.div key={partner?.id} variants={itemVariants}>
                  <PartnerCard partner={partner} variant="tpa" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-16 mt-8"
            >
              <Stethoscope className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No TPA partners added yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Private Insurance Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            badge="Premium Coverage"
            title="Private Insurance"
            subtitle="Major private insurance companies for comprehensive medical coverage"
          />

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </motion.div>
          ) : privateInsurance?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {privateInsurance.map((partner) => (
                <motion.div key={partner?.id} variants={itemVariants}>
                  <PartnerCard partner={partner} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-16 mt-8"
            >
              <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No private insurance added yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cashless Facilities */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
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
                className="relative overflow-hidden rounded-lg sm:rounded-xl border border-primary-100/50 bg-gradient-to-br from-primary-50/50 to-cyan-50/50 backdrop-blur-sm p-4 sm:p-5 hover:border-primary-300 hover:shadow-md hover:from-primary-50 transition-all duration-300 group"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/0 to-accent/0 group-hover:from-primary-100/10 group-hover:to-accent/5 transition-all duration-300" />

                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-slate-700">{facility}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg sm:rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-6 sm:p-10 lg:p-12 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-500/20 rounded-full -ml-20 -mb-20" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                Need Insurance Assistance?
              </h2>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Our dedicated team is ready to assist with all insurance and mediclaim procedures. We ensure smooth claim settlement and complete support throughout the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 hover:bg-slate-100 font-semibold"
                >
                  Call for Support
                </a>
                <a
                  href="mailto:info@sunflagglobalhospital.com"
                  className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 hover:bg-slate-100 font-semibold"
                >
                  Email Insurance Team
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

