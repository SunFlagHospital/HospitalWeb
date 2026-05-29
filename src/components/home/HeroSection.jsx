import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Shield, Award, Users, Clock, ChevronDown } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'
import { useEffect } from 'react'
import { preloadImage } from '@/utils/imageOptimization'

const trustBadges = [
  { icon: Shield, label: 'NABH Accredited', sub: 'Certified Hospital' },
  { icon: Award, label: '10+ Years', sub: 'of Excellence' },
  { icon: Users, label: '20,000+', sub: 'Patients/Year' },
  { icon: Clock, label: '24/7', sub: 'Emergency Care' },
]

export default function HeroSection() {
  useEffect(() => {
    preloadImage('https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp', 'heroBanner')
  }, [])

  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen pt-20 sm:pt-24 flex items-center overflow-x-hidden">
      {/* Background Image - Responsive with WebP */}
      <picture className="absolute inset-0 w-full h-full">
       <source
  media="(max-width: 640px)"
  srcSet="https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp?tr=w-800,h-1200,f-webp,q-70 1x"
  type="image/webp"
/>

<source
  media="(max-width: 1024px)"
  srcSet="https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp?tr=w-1280,h-720,f-webp,q-75 1x"
  type="image/webp"
/>

<source
  media="(min-width: 1025px)"
  srcSet="https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp?tr=w-1920,h-1080,f-webp,q-80 1x"
  type="image/webp"
/>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp')`
          }}
          role="img"
          aria-label="Hospital hero background"
        />
      </picture>

      {/* Enhanced Gradient Overlay - Stronger for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/85 to-accent/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />

      {/* Animated decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-1/4 left-10 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main Content - Centered Layout */}
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-12">
          {/* Content Section - Centered */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-3xl"
          >

            {/* Hospital Name - Premium Typography - Centered */}
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2 text-center">
              <h1
                className="font-display font-black leading-tight text-white"
                style={{
                  fontSize: 'clamp(1.75rem, 7vw, 4rem)',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
              >
                SUNFLAG GLOBAL
              </h1>
              <h1
                className="font-display font-black leading-tight bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent"
                style={{
                  fontSize: 'clamp(1.75rem, 7vw, 4rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                HOSPITAL
              </h1>
            </motion.div>

            {/* Tagline - Centered */}
            <motion.p
              variants={itemVariants}
              className="text-center text-base sm:text-lg md:text-xl font-light text-white/90 tracking-wide"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
              }}
            >
              Care With Commitment
            </motion.p>

            {/* Description - Centered */}
            <motion.p
              variants={itemVariants}
              className="text-center text-xs sm:text-sm md:text-base text-white/80 max-w-lg leading-relaxed"
            >
              Delivering world-class medical care with 50+ specialities, 20+ expert specialists, state-of-the-art technology, and a commitment to your complete wellness. NABH Accredited. Available 24/7.
            </motion.p>

            {/* CTA Buttons - Centered */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center w-full"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-premium hover:shadow-card-hover hover:-translate-y-1 text-sm sm:text-base group w-full sm:w-auto"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${HOSPITAL_INFO.emergency}`}
                className="inline-flex items-center justify-center gap-2 bg-medical-red hover:bg-red-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-premium hover:shadow-card-hover text-sm sm:text-base w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Emergency: {HOSPITAL_INFO.emergency}</span>
                <span className="sm:hidden">Emergency Call</span>
              </a>
            </motion.div>

            {/* Trust Badges - Horizontal and Centered */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl"
            >
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 sm:py-3 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent/40 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <p className="text-white font-bold text-xs sm:text-sm leading-tight line-clamp-1 text-center">{label}</p>
                  <p className="text-white/60 text-xs line-clamp-1 text-center">{sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  )
}
