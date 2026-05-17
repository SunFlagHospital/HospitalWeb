import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Calendar, ChevronDown } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'
import SectionHeader from '@/components/ui/SectionHeader'

export function AppointmentCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-primary rounded-3xl p-10 md:p-16 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -translate-x-20 translate-y-20" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge bg-white/20 text-white text-xs uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-medical-green rounded-full animate-pulse" />
                Accepting New Patients
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
                Book Your Appointment Today
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Get expert medical consultation with our specialist doctors. Same-day appointments available 
                for most specialities. Emergency services available 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-card">
                  <Calendar className="w-4 h-4" />
                  Book Now
                </Link>
                <a href={`tel:${HOSPITAL_INFO.phone}`} className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-white/20">
                  <Phone className="w-4 h-4" />
                  {HOSPITAL_INFO.phone}
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15">
              <h3 className="text-white font-bold text-lg font-display mb-4">Quick Contact</h3>
              <div className="space-y-4">
                {[
                  { label: 'OPD Hours', value: HOSPITAL_INFO.hours.opd },
                  { label: 'Emergency', value: HOSPITAL_INFO.hours.emergency },
                  { label: 'Phone', value: HOSPITAL_INFO.phone },
                  { label: 'Email', value: HOSPITAL_INFO.email },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-sm">{label}</span>
                    <span className="text-white font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  { q: 'What are the OPD timings?', a: 'Our OPD is open Monday to Saturday, 8:00 AM to 8:00 PM. Emergency services are available 24 hours a day, 7 days a week.' },
  { q: 'Do you have insurance tie-ups?', a: 'Yes, we are empanelled with all major insurance companies including Star Health, HDFC Ergo, New India Assurance, CGHS, ECHS, and more. Please contact our billing desk for the complete list.' },
  { q: 'Is ambulance service available?', a: 'Yes, we have a fleet of fully equipped Advanced Life Support (ALS) ambulances available 24/7. Call our emergency number for immediate dispatch.' },
  { q: 'Can I book an appointment online?', a: 'Yes! You can book appointments online through our website contact form, WhatsApp, or by calling our helpline. We also offer telemedicine consultations.' },
  { q: 'What speciality doctors are available?', a: 'We have 200+ specialists across 50+ departments including Cardiology, Neurology, Orthopedics, Oncology, Gynecology, Pediatrics, Gastroenterology, and many more.' },
  { q: 'Do you have a cafeteria and accommodation for attendants?', a: 'Yes, we have a well-equipped cafeteria, patient canteen, and comfortable accommodation facilities for patient attendants within the hospital premises.' },
]

export function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, facilities, and patient care"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-primary-50 transition-colors"
              >
                <span className="font-semibold text-primary-900 font-display text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
