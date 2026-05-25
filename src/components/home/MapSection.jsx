import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'
import SectionHeader from '@/components/ui/SectionHeader'

export default function MapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Find Us"
          title="Visit Sunflag Global Hospital"
          subtitle="Conveniently located in Rohtak, Haryana with easy access from all major roads"
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Emergency', value: HOSPITAL_INFO.emergency, color: 'text-medical-red', bg: 'bg-red-50', href: `tel:${HOSPITAL_INFO.emergency}` },
              { icon: Phone, label: 'Appointment', value: HOSPITAL_INFO.phone, color: 'text-primary-600', bg: 'bg-primary-50', href: `tel:${HOSPITAL_INFO.phone}` },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', color: 'text-medical-green', bg: 'bg-emerald-50', href: `https://wa.me/${HOSPITAL_INFO.whatsapp.replace('+', '')}` },
              { icon: Mail, label: 'Email', value: HOSPITAL_INFO.email, color: 'text-accent', bg: 'bg-sky-50', href: `mailto:${HOSPITAL_INFO.email}` },
              { icon: MapPin, label: 'Address', value: HOSPITAL_INFO.address, color: 'text-purple-600', bg: 'bg-purple-50', href: '#' },
              { icon: Clock, label: 'OPD Hours', value: HOSPITAL_INFO.hours.opd, color: 'text-amber-600', bg: 'bg-amber-50', href: '#' },
            ].map(({ icon: Icon, label, value, color, bg, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-slate-100"
              >
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                  <p className="text-slate-700 text-sm font-semibold">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-card-hover h-[450px] lg:h-auto border border-slate-100"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.0895509943152!2d76.60642367521186!3d28.895686872082624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d851a82659c73%3A0x9a3509f5c6a4eb1e!2sSunflag%20Global%20Hospital%20Rohtak!5e0!3m2!1sen!2sin!4v1779749742630!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunflag Global Hospital Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
