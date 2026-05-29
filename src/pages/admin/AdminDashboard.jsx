import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Briefcase, Award, FileText, Star, Image, Phone, TrendingUp, ArrowRight, Activity, Mail, Building2 } from 'lucide-react'
import { doctorsService, servicesService, careersService, testimonialsService, galleryService, insurancePartnersService } from '@/firebase/services'

const statCards = [
  { label: 'Total Doctors', icon: Users, color: 'text-primary-600', bg: 'bg-primary-50', path: '/admin/doctors', service: doctorsService },
  { label: 'Services', icon: Briefcase, color: 'text-accent', bg: 'bg-sky-50', path: '/admin/services', service: servicesService },
  { label: 'Job Openings', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', path: '/admin/careers', service: careersService },
  { label: 'Insurance Partners', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/admin/insurance', service: insurancePartnersService },
]

const quickLinks = [
  { label: 'Manage Queries', path: '/admin/queries', icon: Mail, desc: 'View and manage contact form submissions' },
  { label: 'Manage Doctors', path: '/admin/doctors', icon: Users, desc: 'Add, edit, or remove doctor profiles' },
  { label: 'Manage Services', path: '/admin/services', icon: Briefcase, desc: 'Update hospital services and offerings' },
  { label: 'Manage Specialities', path: '/admin/specialities', icon: Award, desc: 'Edit speciality categories and info' },
  { label: 'Manage Careers', path: '/admin/careers', icon: FileText, desc: 'Post and manage job openings' },
  { label: 'Manage Insurance Partners', path: '/admin/insurance', icon: Building2, desc: 'Manage insurance and TPA partnerships' },
  { label: 'Manage Gallery', path: '/admin/gallery', icon: Image, desc: 'Upload and manage gallery images' },
  { label: 'Manage Banners', path: '/admin/banners', icon: Image, desc: 'Update hero and page banner images' },
  { label: 'Contact Details', path: '/admin/contact', icon: Phone, desc: 'Update hospital contact information' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    statCards.forEach(async ({ label, service }) => {
      try {
        const data = await service.getAll()
        setCounts(prev => ({ ...prev, [label]: data.length }))
      } catch {
        setCounts(prev => ({ ...prev, [label]: '—' }))
      }
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back. Here's what's happening at Sunflag.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-medical-green/10 text-medical-green px-4 py-2 rounded-xl text-sm font-semibold">
          <span className="w-2 h-2 bg-medical-green rounded-full animate-pulse" />
          System Online
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, icon: Icon, color, bg, path }) => (
          <Link
            key={label}
            to={path}
            className="admin-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-slate-800 font-display">
              {counts[label] ?? <span className="skeleton w-8 h-6 inline-block rounded" />}
            </p>
            <p className="text-slate-500 text-sm mt-0.5 group-hover:text-primary-600 transition-colors">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 font-display mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ label, path, icon: Icon, desc }) => (
            <Link
              key={path}
              to={path}
              className="admin-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4 group"
            >
              <div className="w-10 h-10 bg-primary-50 group-hover:bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <Icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-200" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm font-display group-hover:text-primary-600 transition-colors">{label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200 mt-0.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="admin-card bg-gradient-to-r from-primary-50 to-sky-50 border-primary-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900 font-display mb-1">CMS Architecture Ready</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              This admin panel is connected to Firebase Firestore. All doctors, services, specialities, 
              careers, banners, and testimonials can be managed here with real-time updates to the public website. 
              Make sure your Firebase credentials are set in the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> file.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
