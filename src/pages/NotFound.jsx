import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-primary-100 font-display mb-4 select-none">404</div>
        <h1 className="text-3xl font-bold text-primary-900 font-display mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          The page you're looking for doesn't exist or may have been moved. 
          Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/contact" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
