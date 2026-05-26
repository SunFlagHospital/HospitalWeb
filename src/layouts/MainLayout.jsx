import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageTransition from '@/components/common/PageTransition'
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

export default function MainLayout() {
  // Enable smooth scrolling to anchor links
  useAnchorScroll()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

