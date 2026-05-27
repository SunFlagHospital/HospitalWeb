import { useState } from 'react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import ImageKitUpload from '@/components/admin/ImageKitUpload'
import { useAdminGallery } from '@/hooks/useFirestore'
import { galleryService } from '@/firebase/services'

const fields = [
  { name: 'title', label: 'Title', required: true, placeholder: 'Image title' },
  { name: 'image', label: 'Image URL (or upload below)', required: true, placeholder: 'https://cdn.example.com/img.webp', type: 'url' },
  { name: 'category', label: 'Category', placeholder: 'e.g., Facilities, Doctors', required: false },
]

function GalleryCard({ item }) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
        <p className="text-xs text-slate-500">{item.category}</p>
      </div>
      <div className="rounded-xl overflow-hidden h-40 bg-slate-100">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default function AdminGallery() {
  const { data, loading } = useAdminGallery()
  const [formData, setFormData] = useState({})

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  const handleAdd = async (newItem) => {
    // If formData has an image from upload, use it
    if (formData.image) {
      newItem.image = formData.image
      setFormData({})
    }
    await galleryService.add(newItem)
  }

  const handleUpdate = async (id, updatedItem) => {
    // If formData has an image from upload, use it
    if (formData.image) {
      updatedItem.image = formData.image
      setFormData({})
    }
    await galleryService.update(id, updatedItem)
  }

  return (
    <div className="space-y-6">
      <AdminCRUD
        title="Gallery"
        items={data}
        loading={loading}
        fields={fields}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={galleryService.delete}
        renderCard={(item) => <GalleryCard item={item} />}
        searchKey="title"
        renderExtraFields={() => (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              📸 Or Upload Image with ImageKit
            </label>
            <ImageKitUpload
              onUploadSuccess={handleImageUpload}
              label="Upload Gallery Image"
              maxSize={10 * 1024 * 1024}
            />
            {formData.image && (
              <p className="text-xs text-green-600 mt-2">✅ Image URL auto-filled in form above</p>
            )}
          </div>
        )}
      />
    </div>
  )
}
