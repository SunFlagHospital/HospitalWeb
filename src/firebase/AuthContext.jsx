import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from './config'
import { checkAdminAccess } from './adminHelpers'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      
      if (u) {
        const adminAccess = await checkAdminAccess(u.uid)
        setIsAdmin(adminAccess)
      } else {
        setIsAdmin(false)
      }
      
      setLoading(false)
    })
    return unsub
  }, [])

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const adminAccess = await checkAdminAccess(result.user.uid)
    setIsAdmin(adminAccess)
    return result
  }

  const logout = async () => {
    setIsAdmin(false)
    return signOut(auth)
  }

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
