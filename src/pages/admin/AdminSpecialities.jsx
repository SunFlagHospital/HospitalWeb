import { useState } from 'react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import ImageKitUpload from '@/components/admin/ImageKitUpload'
import { useAdminSpecialities } from '@/hooks/useFirestore'
import { addSpeciality, updateSpeciality, deleteSpeciality } from '@/firebase/services'
import { getSpecialityEmoji } from '@/components/common/SpecialityEmojis'

const fields = [
  { name: 'name', label: 'Speciality Name', required: true, placeholder: 'e.g. Cardiology' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Brief description...' },
  { name: 'icon', label: 'Custom Emoji (optional)', placeholder: '🫀 Leave blank for auto-emoji' },
  { name: 'color', label: 'Accent Color (hex)', placeholder: '#ef4444' },
  { name: 'image', label: 'Image URL (optional)', type: 'url', placeholder: 'https://...' },
  { name: 'order', label: 'Display Order', type: 'number', placeholder: '1' },
]

function SpecCard({ item }) {
  const autoEmoji = getSpecialityEmoji(item.name)
  const displayEmoji = item.icon || autoEmoji
  
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-blue-50"
      >
        {displayEmoji}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 font-display text-sm">{item.name}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">{item.description}</p>
        <p className="text-xs text-slate-300 mt-1">Order: {item.order || '—'}</p>
      </div>
    </div>
  )
}

export default function AdminSpecialities() {
  const { data, loading } = useAdminSpecialities()
  const [formData, setFormData] = useState({})

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  const handleAdd = async (newItem) => {
    if (formData.image) {
      newItem.image = formData.image
      setFormData({})
    }
    await addSpeciality(newItem)
  }

  const handleUpdate = async (id, updatedItem) => {
    if (formData.image) {
      updatedItem.image = formData.image
      setFormData({})
    }
    await updateSpeciality(id, updatedItem)
  }

  return (
    <AdminCRUD
      title="Speciality"
      items={data}
      loading={loading}
      fields={fields}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={deleteSpeciality}
      renderCard={(item) => <SpecCard item={item} />}
      searchKey="name"
      renderExtraFields={() => (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            🖼️ Upload Specialty Image (optional)
          </label>
          <ImageKitUpload
            onUploadSuccess={handleImageUpload}
            label="Upload Specialty Image"
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
