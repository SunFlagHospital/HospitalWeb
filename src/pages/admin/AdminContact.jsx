import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Save, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { contactService, setContact } from '@/firebase/services'

const CONTACT_DOC_ID = 'main'

export default function AdminContact() {
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  useEffect(() => {
    // Using contactService.getById to fetch single doc
    contactService.getById(CONTACT_DOC_ID).then(data => {
      if (data) reset(data)
      setLoading(false)
    }).catch((err) => {
      console.error('Contact fetch error', err)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data) => {
    try {
      // Basic validation
      if (data.phone && !/^\+?[0-9\- ]{7,20}$/.test(data.phone)) {
        toast.error('Enter a valid phone number')
        return
      }

      // Use setContact to ensure single doc id
      await setContact(CONTACT_DOC_ID, data)
      toast.success('Contact details updated!')
    } catch (err) {
      console.error(err)
      toast.error('Update failed. Please try again.')
    }
  }

  const fields = [
    { name: 'phone', label: 'Main Phone', icon: Phone, placeholder: '+91-1262-255555' },
    { name: 'emergency', label: 'Emergency Number', icon: Phone, placeholder: '+91-1262-100' },
    { name: 'whatsapp', label: 'WhatsApp Number', icon: MessageCircle, placeholder: '+919812345678' },
    { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'info@sunflaghospital.com' },
    { name: 'address', label: 'Full Address', icon: MapPin, placeholder: 'Delhi Bypass Road, Rohtak...' },
    { name: 'opdHours', label: 'OPD Hours', icon: Clock, placeholder: 'Mon–Sat: 8:00 AM – 8:00 PM' },
    { name: 'emergencyHours', label: 'Emergency Hours', icon: Clock, placeholder: '24/7 Emergency Services' },
  ]

  if (loading) return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
    </div>
  )

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">Contact Details</h1>
        <p className="text-slate-500 text-sm">Update hospital contact information displayed on the website.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="admin-card space-y-5">
        {fields.map(({ name, label, icon: Icon, placeholder }) => (
          <div key={name}>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              <Icon className="inline w-3.5 h-3.5 mr-1.5 text-primary-400" />
              {label}
            </label>
            <input {...register(name)} className="input-field" placeholder={placeholder} />
          </div>
        ))}

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
            <MapPin className="inline w-3.5 h-3.5 mr-1.5 text-primary-400" />
            Google Maps Embed URL
          </label>
          <textarea {...register('mapEmbed')} rows={3} className="input-field resize-none" placeholder="https://www.google.com/maps/embed?pb=..." />
          <p className="text-xs text-slate-400 mt-1">Paste the embed URL from Google Maps &gt; Share &gt; Embed a map</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3.5">
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Contact Details'}
        </button>
      </form>
    </div>
  )
}
