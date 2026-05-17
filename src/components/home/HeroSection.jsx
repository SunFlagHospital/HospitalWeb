import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Shield, Award, Users, Clock, ChevronDown } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'

const trustBadges = [
  { icon: Shield, label: 'NABH Accredited', sub: 'Certified Hospital' },
  { icon: Award, label: '22+ Years', sub: 'of Excellence' },
  { icon: Users, label: '25,000+', sub: 'Patients/Year' },
  { icon: Clock, label: '24/7', sub: 'Emergency Care' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&q=85')`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Animated decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-medical-green rounded-full animate-pulse" />
            NABH Accredited | 200+ Specialists | Rohtak, Haryana
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight mb-6 text-shadow"
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
            className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed"
          >
            Sunflag Global Hospital delivers world-class medical care with 200+ specialist doctors, 
            state-of-the-art technology, and a commitment to your complete wellness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-card-hover hover:-translate-y-0.5 text-base group"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className="inline-flex items-center gap-2.5 bg-medical-red hover:bg-red-600 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 text-base"
            >
              <Phone className="w-5 h-5" />
              Emergency: {HOSPITAL_INFO.emergency}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {trustBadges.map(({ icon: Icon, label, sub }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/12 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15 hover:bg-white/20 transition-colors"
              >
                <div className="w-9 h-9 bg-accent/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{label}</p>
                  <p className="text-white/60 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  )
}
