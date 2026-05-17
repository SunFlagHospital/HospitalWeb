import { motion } from 'framer-motion'
import { Users, Stethoscope, Award, Calendar } from 'lucide-react'

const stats = [
  { value: '25,000+', label: 'Patients Treated Annually', icon: 'Users' },
  { value: '200+', label: 'Medical Experts', icon: 'Stethoscope' },
  { value: '50+', label: 'Specialities & Services', icon: 'Award' },
  { value: '22+', label: 'Years of Excellence', icon: 'Calendar' },
]

const iconMap = { Users, Stethoscope, Award, Calendar }

export default function StatsSection() {
  return (
    <section className="relative -mt-10 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-primary rounded-3xl shadow-premium p-1">
        <div className="bg-primary-900 rounded-[1.25rem] px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon }, i) => {
            const Icon = iconMap[icon]
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  {Icon && <Icon className="w-5 h-5 text-accent" />}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white font-display">{value}</p>
                <p className="text-primary-300 text-sm mt-1">{label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
