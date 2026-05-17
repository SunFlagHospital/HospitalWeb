import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Activity, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/firebase/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password)
      toast.success('Welcome back, Admin!')
      navigate('/admin/dashboard')
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password.'
        : 'Login failed. Please try again.'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full translate-x-48 translate-y-48 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">Admin Panel</h1>
            <p className="text-primary-200 text-sm mt-1">Sunflag Global Hospital CMS</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-amber-700 text-xs font-medium">Restricted access — authorized personnel only</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                    })}
                    type="email"
                    className="input-field pl-10"
                    placeholder="admin@sunflaghospital.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-medical-red text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                    type={showPass ? 'text' : 'password'}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-medical-red text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-3.5 text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In to Admin Panel'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-primary-300 text-xs mt-6">
          <a href="/" className="hover:text-white transition-colors">← Back to Website</a>
        </p>
      </div>
    </div>
  )
}
