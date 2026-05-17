import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, startTransition } from 'react'
import { AuthProvider } from '@/firebase/AuthContext'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import LoadingScreen from '@/components/ui/LoadingScreen'
import FloatingActions from '@/components/common/FloatingActions'

// Public Pages - lazy loaded for code splitting
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Specialities = lazy(() => import('@/pages/Specialities'))
const Doctors = lazy(() => import('@/pages/Doctors'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Admin Pages - lazy loaded for code splitting
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminDoctors = lazy(() => import('@/pages/admin/AdminDoctors'))
const AdminServices = lazy(() => import('@/pages/admin/AdminServices'))
const AdminSpecialities = lazy(() => import('@/pages/admin/AdminSpecialities'))
const AdminCareers = lazy(() => import('@/pages/admin/AdminCareers'))
const AdminContact = lazy(() => import('@/pages/admin/AdminContact'))
const AdminBanners = lazy(() => import('@/pages/admin/AdminBanners'))
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials'))

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/doctors" element={<AdminDoctors />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/specialities" element={<AdminSpecialities />} />
              <Route path="/admin/careers" element={<AdminCareers />} />
              <Route path="/admin/contact" element={<AdminContact />} />
              <Route path="/admin/banners" element={<AdminBanners />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingActions />
      </Suspense>
    </AuthProvider>
  )
}
