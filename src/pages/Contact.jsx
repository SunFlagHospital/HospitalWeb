import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { db } from '@/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import SEO from '@/seo/SEO'
import PageBanner from '@/components/common/PageBanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOSPITAL_INFO } from '@/data/staticData'

const departments = [
  'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics',
  'Gynecology', 'Oncology', 'Pediatrics', 'Gastroenterology',
  'Urology', 'Dermatology', 'Ophthalmology', 'ENT', 'Other'
]

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      // Strong validation
      const validationErrors = []
      
      if (!data.name?.trim()) validationErrors.push('Full name is required')
      if (!data.phone?.trim()) validationErrors.push('Phone number is required')
      if (!data.department) validationErrors.push('Please select a department')
      
      const phoneClean = data.phone?.replace(/\D/g, '') || ''
      if (phoneClean && !/^[6-9]\d{9}$/.test(phoneClean)) {
        validationErrors.push('Enter a valid 10-digit Indian mobile number')
      }
      
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        validationErrors.push('Enter a valid email address')
      }

      if (validationErrors.length > 0) {
        toast.error(validationErrors[0])
        return
      }

      // Save to Firestore - both queries and appointments collections
      const queryData = {
        name: data.name.trim(),
        phone: phoneClean,
        email: data.email?.trim() || '',
        selectedDoctor: data.department,
        date: data.date || '',
        age: data.age ? parseInt(data.age) : null,
        message: data.message?.trim() || '',
        createdAt: serverTimestamp(),
        status: 'pending'
      }

      // Save to queries collection
      const queriesRef = await addDoc(collection(db, 'queries'), queryData)
      console.log('Query saved:', queriesRef.id)

      // Also save to appointments for backward compatibility
      const appointmentsRef = await addDoc(collection(db, 'appointments'), {
        ...queryData,
        department: data.department
      })
      console.log('Appointment saved:', appointmentsRef.id)

      // Show success toast first
      toast.success('✅ Appointment request submitted successfully! Opening WhatsApp...')
      
      // Reset form immediately
      reset()

      // Generate WhatsApp message
      const whatsappMessage = `New Appointment Query

Name: ${data.name}
Phone: ${phoneClean}
Email: ${data.email || 'Not provided'}
Department: ${data.department}
Message: ${data.message || 'No additional message'}

---`
      
      const whatsappPhone = HOSPITAL_INFO.whatsapp?.replace(/\D/g, '')
      if (!whatsappPhone) {
        console.warn('WhatsApp number not configured')
        toast.error('WhatsApp number not configured. Please call us directly.')
        return
      }

      const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`
      
      // Open WhatsApp after a brief delay for better UX
      setTimeout(() => {
        window.open(whatsappLink, '_blank', 'width=800,height=600')
      }, 800)
    } catch (err) {
      console.error('Appointment submission error:', err)
      
      // Check if it's a permission error
      if (err.code === 'permission-denied') {
        toast.error('Permission denied. Please check Firestore security rules.')
      } else if (err.code === 'failed-precondition') {
        toast.error('Database error. Please try again.')
      } else {
        toast.error(err.message || 'Something went wrong. Please call us directly or try again.')
      }
    }
  }

  return (
    <>
      <SEO
        title="Contact Us | Book Appointment"
        description="Contact Sunflag Global Hospital Rohtak. Book appointments, get directions, emergency helpline, WhatsApp support. Open Mon-Sat 8AM-8PM, Emergency 24/7."
        canonical="/contact"
      />
      <PageBanner
        title="Contact Us"
        subtitle="We're here to help 24/7. Reach out for appointments, emergencies, or any queries."
        breadcrumb={[{ label: 'Contact' }]}
        imageUrl="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
        pageSlug="contact"
      />

      <section className="py-12 sm:py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5">
              <SectionHeader
                badge="Get In Touch"
                title="We're Here For You"
                subtitle="Reach us through any channel — we respond fast."
                center={false}
              />

              {[
                {
                  icon: Phone,
                  label: 'Emergency (24/7)',
                  value: HOSPITAL_INFO.emergency,
                  href: `tel:${HOSPITAL_INFO.emergency}`,
                  color: 'text-medical-red',
                  bg: 'bg-red-50',
                  border: 'border-red-100',
                },
                {
                  icon: Phone,
                  label: 'OPD / Appointment',
                  value: HOSPITAL_INFO.phone,
                  href: `tel:${HOSPITAL_INFO.phone}`,
                  color: 'text-primary-600',
                  bg: 'bg-primary-50',
                  border: 'border-primary-100',
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: 'Chat with us now',
                  href: `https://wa.me/${HOSPITAL_INFO.whatsapp.replace('+', '')}?text=Hello, I need an appointment`,
                  color: 'text-medical-green',
                  bg: 'bg-emerald-50',
                  border: 'border-emerald-100',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: HOSPITAL_INFO.email,
                  href: `mailto:${HOSPITAL_INFO.email}`,
                  color: 'text-accent',
                  bg: 'bg-sky-50',
                  border: 'border-sky-100',
                },
                {
                  icon: MapPin,
                  label: 'Address',
                  value: HOSPITAL_INFO.address,
                  href: '#map',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50',
                  border: 'border-purple-100',
                },
              ].map(({ icon: Icon, label, value, href, color, bg, border }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-2xl border ${border} shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group`}
                >
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 ${bg} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                    <p className={`text-xs sm:text-sm font-semibold ${color} truncate`}>{value}</p>
                  </div>
                </a>
              ))}

              {/* Hours */}
              <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-100 shadow-card p-4 sm:p-5">
               <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Clock className="w-4 h-4 text-primary-600" />
                 <h4 className="font-bold text-primary-900 font-display text-xs sm:text-sm">Working Hours</h4>
                </div>
               <div className="space-y-1.5 sm:space-y-2">
                  {Object.entries(HOSPITAL_INFO.hours).map(([key, value]) => (
                   <div key={key} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                      <span className="text-xs text-slate-400 capitalize">{key.replace('_', ' ')}</span>
                      <span className="text-xs font-semibold text-slate-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-card-hover border border-slate-100 p-5 sm:p-6 md:p-8"
              >
                <div className="mb-5 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-900 font-display">Book an Appointment</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">Fill in the form below and we'll confirm your appointment within 2 hours.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Full Name <span className="text-medical-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className="input-field pl-10 text-sm"
                          placeholder="Your full name"
                        />
                      </div>
                      {errors.name && <p className="text-medical-red text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Phone Number <span className="text-medical-red">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register('phone', {
                            required: 'Phone is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit number' }
                          })}
                          className="input-field pl-10 text-sm"
                          placeholder="10-digit mobile number"
                          maxLength="10"
                        />
                      </div>
                      {errors.phone && <p className="text-medical-red text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register('email', {
                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter valid email' }
                          })}
                          type="email"
                          className="input-field pl-10 text-sm"
                          placeholder="you@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-medical-red text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Department <span className="text-medical-red">*</span>
                      </label>
                      <select
                        {...register('department', { required: 'Please select a department' })}
                        className="input-field text-sm"
                      >
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.department && <p className="text-medical-red text-xs mt-1">{errors.department.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Preferred Date
                      </label>
                      <input
                        {...register('date')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block">
                        Patient Age
                      </label>
                      <input
                        {...register('age')}
                        type="number"
                        min="0"
                        max="120"
                        className="input-field text-sm"
                        placeholder="Age in years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Symptoms / Message
                    </label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      className="input-field resize-none text-sm"
                      placeholder="Briefly describe your symptoms or reason for visit..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full sm:flex-1 justify-center py-2.5 sm:py-3 text-sm sm:text-base"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Sending...' : 'Book Appointment'}
                    </button>
                    <p className="text-xs text-slate-400">
                      By submitting, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="h-64 sm:h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.1!2d76.5!3d28.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSunflag+Global+Hospital+Rohtak!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hospital Location Map"
        />
      </section>
    </>
  )
}
