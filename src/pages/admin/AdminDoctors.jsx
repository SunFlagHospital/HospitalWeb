import { Stethoscope, Award, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import ImageKitUpload from '@/components/admin/ImageKitUpload'
import { useAdminDoctors } from '@/hooks/useFirestore'
import { addDoctor, updateDoctor, deleteDoctor } from '@/firebase/services'

const fields = [
  { name: 'name', label: 'Full Name', required: true, placeholder: 'Dr. Full Name' },
  { name: 'department', label: 'Department', required: true, type: 'select', options: [
    'Cardiology', 'Neurology', 'Orthopedics', 'Gynecology', 'Oncology',
    'Pediatrics', 'Gastroenterology', 'Urology', 'Dermatology', 'General Medicine','Plastic Surgery','Surgery','Radiology','Anaesthesia'
  ]},
  { name: 'speciality', label: 'Speciality / Sub-specialty', required: true, placeholder: 'e.g. Interventional Cardiology' },
  { name: 'qualification', label: 'Qualifications', required: true, placeholder: 'MBBS, MD, DM (Cardiology)' },
  { name: 'experience', label: 'Experience', required: true, placeholder: 'e.g. 15 Years' },
  { name: 'image', label: 'Photo URL (optional - upload instead if you want)', type: 'url', placeholder: 'https://...' },
  { name: 'bio', label: 'Short Bio', type: 'textarea', placeholder: 'Brief professional biography...', rows: 3 },
  { name: 'available', label: 'Available for Appointments', type: 'checkbox' },
]

function DoctorCard({ item: doc }) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        {doc.image ? (
          <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-bold">{doc.name?.[0] ?? 'D'}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 font-display text-sm truncate">{doc.name}</h3>
          <p className="text-accent text-xs font-semibold">{doc.speciality}</p>
        </div>
        {doc.available
          ? <CheckCircle2 className="w-4 h-4 text-medical-green flex-shrink-0" />
          : <XCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
        }
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Stethoscope className="w-3 h-3" /> {doc.department}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Award className="w-3 h-3" /> {doc.qualification}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3 h-3" /> {doc.experience}
        </div>
      </div>
    </div>
  )
}

export default function AdminDoctors() {
  const { data: doctors, loading } = useAdminDoctors()
  const [formData, setFormData] = useState({})

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  const handleAdd = async (newItem) => {
    if (formData.image) {
      newItem.image = formData.image
      setFormData({})
    }
    await addDoctor(newItem)
  }

  const handleUpdate = async (id, updatedItem) => {
    if (formData.image) {
      updatedItem.image = formData.image
      setFormData({})
    }
    await updateDoctor(id, updatedItem)
  }

  return (
    <AdminCRUD
      title="Doctor"
      items={doctors}
      loading={loading}
      fields={fields}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={deleteDoctor}
      renderCard={(item) => <DoctorCard item={item} />}
      searchKey="name"
      renderExtraFields={() => (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            📸 Or Upload Doctor Photo with ImageKit
          </label>
          <ImageKitUpload
            onUploadSuccess={handleImageUpload}
            label="Upload Doctor Photo"
            maxSize={5 * 1024 * 1024}
          />
          {formData.image && (
            <p className="text-xs text-green-600 mt-2">✅ Image URL auto-filled in form above</p>
          )}
        </div>
      )}
    />
  )
}
