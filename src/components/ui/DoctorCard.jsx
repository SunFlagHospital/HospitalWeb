import { memo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Stethoscope, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ResponsiveImage from '@/components/common/ResponsiveImage'

function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card group cursor-pointer hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-soft h-56">
        <ResponsiveImage
          src={doctor.image}
          alt={doctor.name}
          type="doctor"
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Available badge */}
        {doctor.available && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-medical-green/90 text-white text-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-slow" />
              Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-primary-900 font-display text-base group-hover:text-primary-600 transition-colors leading-tight">
              {doctor.name}
            </h3>
            <p className="text-accent text-sm font-semibold mt-0.5">{doctor.speciality}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Stethoscope className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
            <span>{doctor.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Award className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
            <span className="truncate">{doctor.qualification}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
            <span>{doctor.experience} Experience</span>
          </div>
        </div>

        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white rounded-xl text-sm font-semibold transition-all duration-200 group/btn"
        >
          Book Appointment
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(DoctorCard)

