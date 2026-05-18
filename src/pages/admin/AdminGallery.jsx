import AdminCRUD from '@/components/admin/AdminCRUD'
import { useAdminGallery } from '@/hooks/useFirestore'
import { galleryService } from '@/firebase/services'

const fields = [
  { name: 'title', label: 'Title', required: true, placeholder: 'Image title' },
  { name: 'image', label: 'Image URL (WEBP ideally)', required: true, placeholder: 'https://cdn.example.com/img.webp', type: 'url' },
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

  return (
    <AdminCRUD
      title="Gallery"
      items={data}
      loading={loading}
      fields={fields}
      onAdd={galleryService.add}
      onUpdate={galleryService.update}
      onDelete={galleryService.delete}
      renderCard={(item) => <GalleryCard item={item} />}
      searchKey="title"
    />
  )
}
