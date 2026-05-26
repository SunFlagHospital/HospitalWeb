import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from '@/firebase/AuthContext'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AdminRoute from '@/routes/AdminRoute'
import LoadingScreen from '@/components/ui/LoadingScreen'
import FloatingActions from '@/components/common/FloatingActions'
import ScrollToTop from '@/components/common/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Specialities = lazy(() => import('@/pages/Specialities'))
const Doctors = lazy(() => import('@/pages/Doctors'))
const Careers = lazy(() => import('@/pages/Careers'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminDoctors = lazy(() => import('@/pages/admin/AdminDoctors'))
const AdminServices = lazy(() => import('@/pages/admin/AdminServices'))
const AdminSpecialities = lazy(() => import('@/pages/admin/AdminSpecialities'))
const AdminCareers = lazy(() => import('@/pages/admin/AdminCareers'))
const AdminContact = lazy(() => import('@/pages/admin/AdminContact'))
const AdminBanners = lazy(() => import('@/pages/admin/AdminBanners'))
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials'))
const AdminGallery = lazy(() => import('@/pages/admin/AdminGallery'))
const AdminApplications = lazy(() => import('@/pages/admin/AdminApplications'))
const AdminVideos = lazy(() => import('@/pages/admin/AdminVideos'))

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen />}>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<AdminDoctors />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/specialities" element={<AdminSpecialities />} />
            <Route path="/admin/careers" element={<AdminCareers />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/banners" element={<AdminBanners />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/videos" element={<AdminVideos />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingActions />
      </Suspense>
    </AuthProvider>
  )
}
