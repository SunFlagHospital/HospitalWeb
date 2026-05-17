// LoadingScreen.jsx
import { Activity } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-100 rounded-full animate-spin border-t-primary-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-6 h-6 text-primary-600" />
        </div>
      </div>
      <p className="text-primary-600 font-semibold font-display text-sm">Sunflag Global Hospital</p>
    </div>
  )
}
