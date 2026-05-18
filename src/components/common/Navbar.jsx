import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { HOSPITAL_INFO } from '@/data/staticData'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/specialities', label: 'Specialities' },
  { path: '/services', label: 'Services' },
  { path: '/doctors', label: 'Doctors' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/careers', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { scrolled } = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => setMobileOpen(false), [location])

  const navBg = scrolled
    ? 'bg-white/90 backdrop-blur-xl shadow-card border-b border-slate-100'
    : isHome
    ? 'bg-transparent'
    : 'bg-white shadow-card'

  const logoColor = !scrolled && isHome ? 'text-white' : 'text-primary-900'
  const linkColor = !scrolled && isHome ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-primary-600'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 py-2 sm:py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${!scrolled && isHome ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary-600'}`}>
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <p className={`font-bold text-sm sm:text-base leading-tight font-display transition-colors duration-300 ${logoColor}`}>
                Sunflag
              </p>
              <p className={`text-xs transition-colors duration-300 ${!scrolled && isHome ? 'text-white/70' : 'text-slate-400'}`}>
                Hospital
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-2.5 lg:px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? (!scrolled && isHome ? 'text-white bg-white/15' : 'text-primary-600 bg-primary-50')
                      : linkColor
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
                !scrolled && isHome
                  ? 'text-white border border-white/30 hover:bg-white/10'
                  : 'text-medical-red border border-red-200 hover:bg-red-50'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Emergency
            </a>
            <Link
              to="/contact"
              className="btn-primary text-sm px-4 py-2"
            >
              Appointment
            </Link>
          </div>

          {/* Mobile CTA - Show on smaller screens */}
          <div className="flex md:hidden items-center gap-1.5">
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                !scrolled && isHome
                  ? 'text-white border border-white/30 hover:bg-white/10'
                  : 'text-medical-red border border-red-200 hover:bg-red-50'
              }`}
              title="Emergency"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${!scrolled && isHome ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl z-40 overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 space-y-1">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${HOSPITAL_INFO.emergency}`}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border-2 border-red-200 text-medical-red text-xs sm:text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Emergency</span>
                </a>
                <Link
                  to="/contact"
                  className="btn-primary text-xs sm:text-sm justify-center py-2 px-3"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
