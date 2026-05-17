import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, MessageCircle, Calendar, X, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { HOSPITAL_INFO } from '@/data/staticData'

export default function FloatingActions() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) return null

  const actions = [
    {
      label: 'Book Appointment',
      href: '/contact',
      icon: Calendar,
      bg: 'bg-primary-600',
      isLink: true,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${HOSPITAL_INFO.whatsapp.replace('+', '')}?text=Hello, I need medical assistance`,
      icon: MessageCircle,
      bg: 'bg-green-500',
      isLink: false,
    },
    {
      label: 'Call Now',
      href: `tel:${HOSPITAL_INFO.phone}`,
      icon: Phone,
      bg: 'bg-accent',
      isLink: false,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            {actions.map(({ label, href, icon: Icon, bg, isLink }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-card whitespace-nowrap">
                  {label}
                </span>
                {isLink ? (
                  <Link
                    to={href}
                    onClick={() => setOpen(false)}
                    className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center shadow-premium hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Link>
                ) : (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center shadow-premium hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                )}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-premium transition-all duration-300 ${
          open ? 'bg-slate-700 rotate-45' : 'bg-primary-600'
        }`}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
      </motion.button>
    </div>
  )
}
