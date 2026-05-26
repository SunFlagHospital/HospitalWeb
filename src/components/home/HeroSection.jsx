import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Shield, Award, Users, Clock, ChevronDown } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'

const trustBadges = [
  { icon: Shield, label: 'NABH Accredited', sub: 'Certified Hospital' },
  { icon: Award, label: '10+ Years', sub: 'of Excellence' },
  { icon: Users, label: '20,000+', sub: 'Patients/Year' },
  { icon: Clock, label: '24/7', sub: 'Emergency Care' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 sm:pt-24 flex items-center overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.sunflagglobalhospital.com/uploads/banners/Bg.webp')`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Animated decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-1/4 left-10 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-medical-green rounded-full animate-pulse" />
            <span className="hidden sm:inline">NABH Accredited | 20+ Specialists | Rohtak, Haryana</span>
            <span className="sm:hidden">NABH Accredited | Top Hospital</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight mb-4 sm:mb-6 text-shadow"
          >
            Advanced
            <span className="block text-accent">Healthcare</span>
            with Heart
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-white/85 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
          >
            Sunflag Global Hospital delivers world-class medical care with 20+ specialist doctors, state-of-the-art technology, and a commitment to your complete wellness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center sm:justify-start gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-premium hover:shadow-card-hover hover:-translate-y-0.5 text-sm sm:text-base group w-full sm:w-auto"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className="inline-flex items-center justify-center gap-2 bg-medical-red hover:bg-red-600 text-white font-bold px-5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Emergency: {HOSPITAL_INFO.emergency}</span>
              <span className="sm:hidden">Emergency Call</span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          >
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2 sm:gap-3 bg-white/12 backdrop-blur-sm rounded-lg sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3 border border-white/15 hover:bg-white/20 transition-colors"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-accent/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-xs sm:text-sm leading-tight line-clamp-1">{label}</p>
                  <p className="text-white/60 text-xs line-clamp-1">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  )
}
