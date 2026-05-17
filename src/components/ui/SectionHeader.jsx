import { motion } from 'framer-motion'

export default function SectionHeader({ badge, title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={center ? 'text-center' : ''}
    >
      {badge && (
        <span className={`badge mb-4 text-xs uppercase tracking-widest ${
          light
            ? 'bg-white/20 text-white'
            : 'bg-primary-50 text-primary-600'
        }`}>
          <span className="w-1.5 h-1.5 bg-current rounded-full" />
          {badge}
        </span>
      )}
      <h2 className={`section-title ${light ? 'text-white' : ''} ${center ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${light ? 'text-white/70' : ''} ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
