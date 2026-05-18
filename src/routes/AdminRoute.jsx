import { Navigate } from 'react-router-dom'
import { useAuth } from '@/firebase/AuthContext'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
