import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Stethoscope, ArrowRight, Briefcase, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import ResponsiveImage from '@/components/common/ResponsiveImage'

function DoctorCard({ doctor, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card group cursor-pointer hover:-translate-y-2 transition-all duration-300 h-full flex flex-col overflow-hidden"
    >
      {/* Image Container with responsive heights and proper aspect ratio */}
      <div className="relative overflow-hidden bg-gradient-soft flex-shrink-0
  w-full h-[320px] sm:h-[360px] lg:h-[400px]
  flex items-center justify-center bg-white">
        {/* Skeleton loader before image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
        )}

        <ResponsiveImage
          src={doctor.image}
          alt={`Dr. ${doctor.name} - ${doctor.speciality}`}
          type="doctor"
          width={500}
          height={600}
          className="w-full h-full"
          objectFit="contain"
          objectPosition="center"
          onLoad={handleImageLoad}
          placeholder={false}
        />

        {/* Gradient overlay on image bottom - always visible for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Bottom gradient overlay on hover - for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Available badge - premium styling */}
        {doctor.available && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4"
          >
            <span className="badge bg-medical-green/95 text-white text-xs font-bold shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-slow" />
              Available
            </span>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 lg:p-6 flex-grow flex flex-col">
        {/* Doctor Name & Speciality */}
       <div className="mb-2 sm:mb-3 lg:mb-4">
         <h3 className="font-bold text-primary-900 font-display text-sm sm:text-base lg:text-lg 
            group-hover:text-primary-600 transition-colors duration-200 
            leading-snug line-clamp-2">
            Dr. {doctor.name}
          </h3>
         <p className="text-accent font-semibold text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1 
            group-hover:text-accent-dark transition-colors duration-200">
            {doctor.speciality}
          </p>
        </div>

        {/* Experience & Professional Details */}
       <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 lg:mb-5 flex-grow">
          {/* Department */}
         <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-700 transition-colors" aria-label={`Department: ${doctor.department}`}>
           <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{doctor.department}</span>
          </div>

          {/* Experience */}
         <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-700 transition-colors" aria-label={`Experience: ${doctor.experience || 'Not specified'}`}>
           <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{doctor.experience || 'Experience info not available'}</span>
          </div>

          {/* Qualification */}
         <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-700 transition-colors" aria-label={`Qualification: ${doctor.qualification}`}>
           <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{doctor.qualification}</span>
          </div>

          {/* Previous Hospital/Experience - new field */}
          {doctor.previousHospital && (
           <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-700 transition-colors" aria-label={`Previously: ${doctor.previousHospital}`}>
             <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">Ex. {doctor.previousHospital}</span>
            </div>
          )}

          {/* Expertise - new field */}
          {doctor.expertise && (
           <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-700 transition-colors" aria-label={`Expertise: ${doctor.expertise}`}>
             <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{doctor.expertise}</span>
            </div>
          )}

          {/* Short description - new field */}
          {doctor.bio && (
           <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 line-clamp-2 italic">
              {doctor.bio}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to="/contact"
         className="flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 lg:py-3 
            bg-primary-50 hover:bg-primary-600 
            text-primary-600 hover:text-white 
           rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold 
            transition-all duration-200 group/btn
            mt-auto shadow-sm hover:shadow-md"
          aria-label={`Book appointment with Dr. ${doctor.name}`}
        >
          Book Appointment
         <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}

export default memo(DoctorCard)
