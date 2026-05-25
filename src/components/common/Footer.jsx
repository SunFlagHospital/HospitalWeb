import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Activity, Facebook, Instagram, Twitter, Youtube, ChevronRight, Heart } from 'lucide-react'
import { HOSPITAL_INFO } from '@/data/staticData'

const quickLinks = [
  { path: '/about', label: 'About Us' },
  { path: '/specialities', label: 'Specialities' },
  { path: '/services', label: 'Services' },
  { path: '/doctors', label: 'Our Doctors' },
  { path: '/careers', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
]

const services = [
  'Emergency Care', 'Cardiology', 'Neurology', 'Orthopedics',
  'Oncology', 'Gynecology', 'Pediatrics', 'Diagnostics'
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Hospital Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-base font-display">Sunflag Global</p>
                <p className="text-xs text-primary-300">Hospital, Rohtak</p>
              </div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-5">
              Providing world-class healthcare with compassion since {HOSPITAL_INFO.established}. 
              Your health is our highest priority.
            </p>
            <div className="space-y-3">
              <a href={`tel:${HOSPITAL_INFO.emergency}`} className="flex items-center gap-2.5 text-sm text-primary-200 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-medical-red/20 rounded-lg flex items-center justify-center group-hover:bg-medical-red/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-medical-red" />
                </div>
                <div>
                  <p className="text-xs text-primary-400">Emergency 24/7</p>
                  <p className="font-semibold text-white">{HOSPITAL_INFO.emergency}</p>
                </div>
              </a>
              <a href={`tel:${HOSPITAL_INFO.phone}`} className="flex items-center gap-2.5 text-sm text-primary-200 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-400">OPD / Appointment</p>
                  <p className="font-semibold">{HOSPITAL_INFO.phone}</p>
                </div>
              </a>
              <a href={`mailto:${HOSPITAL_INFO.email}`} className="flex items-center gap-2.5 text-sm text-primary-200 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>{HOSPITAL_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-primary-200">
                <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{HOSPITAL_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 font-display">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-sm text-primary-200 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 font-display">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-sm text-primary-200 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-bold text-white mb-5 font-display">Working Hours</h4>
            <div className="space-y-3 mb-6">
              {Object.entries(HOSPITAL_INFO.hours).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <p className="text-sm text-primary-200">{value}</p>
                </div>
              ))}
            </div>

            <h4 className="font-bold text-white mb-4 font-display">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { href: HOSPITAL_INFO.social.facebook, Icon: Facebook },
                { href: HOSPITAL_INFO.social.instagram, Icon: Instagram },
                { href: HOSPITAL_INFO.social.youtube, Icon: Youtube },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-primary-700 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-300 flex items-center gap-1.5">
            © {new Date().getFullYear()} Sunflag Global Hospital Rohtak. Made with <Heart className="w-3.5 h-3.5 text-medical-red" /> by <a href='https://www.vercittycreations.xyz'>Vercitty Creations</a>.
          </p>
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-primary-400">Privacy Policy</span>
            <span className="text-sm text-primary-400">Terms of Service</span> */}
            <Link
              to="/admin/login"
              className="text-xs text-primary-600 hover:text-primary-400 transition-colors"
              title="Admin Login"
            >
              Admin ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
