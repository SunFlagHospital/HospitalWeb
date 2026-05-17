import AdminCRUD from '@/components/admin/AdminCRUD'
import { useAdminSpecialities } from '@/hooks/useFirestore'
import { addSpeciality, updateSpeciality, deleteSpeciality } from '@/firebase/services'

const fields = [
  { name: 'name', label: 'Speciality Name', required: true, placeholder: 'e.g. Cardiology' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Brief description...' },
  { name: 'icon', label: 'Emoji Icon', placeholder: '🫀' },
  { name: 'color', label: 'Accent Color (hex)', placeholder: '#ef4444' },
  { name: 'image', label: 'Image URL', type: 'url', placeholder: 'https://...' },
  { name: 'order', label: 'Display Order', type: 'number', placeholder: '1' },
]

function SpecCard({ item }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${item.color || '#3b82f6'}18` }}
      >
        {item.icon || '🏥'}
      </div>
      <div>
        <h3 className="font-bold text-slate-800 font-display text-sm">{item.name}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">{item.description}</p>
        <p className="text-xs text-slate-300 mt-1">Order: {item.order || '—'}</p>
      </div>
    </div>
  )
}

export default function AdminSpecialities() {
  const { data, loading } = useAdminSpecialities()
  return (
    <AdminCRUD
      title="Speciality"
      items={data}
      loading={loading}
      fields={fields}
      onAdd={addSpeciality}
      onUpdate={updateSpeciality}
      onDelete={deleteSpeciality}
      renderCard={(item) => <SpecCard item={item} />}
      searchKey="name"
    />
  )
}
