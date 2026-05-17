// AdminServices.jsx
import { Tag, CheckCircle2 } from 'lucide-react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import { useAdminServices } from '@/hooks/useFirestore'
import { addService, updateService, deleteService } from '@/firebase/services'

const serviceFields = [
  { name: 'title', label: 'Service Title', required: true, placeholder: 'e.g. Emergency Care' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Service description...' },
  { name: 'category', label: 'Category', required: true, type: 'select', options: ['Emergency', 'Diagnostics', 'Surgery', 'Critical Care', 'Support', 'Digital', 'Other'] },
  { name: 'icon', label: 'Icon Name (Lucide)', placeholder: 'e.g. Zap, Monitor, Scissors' },
  { name: 'order', label: 'Display Order', type: 'number', placeholder: '1' },
  { name: 'featured', label: 'Featured on Home Page', type: 'checkbox' },
]

function ServiceCard({ item }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 font-display text-sm">{item.title}</h3>
        {item.featured && <span className="badge bg-amber-50 text-amber-600 text-xs">Featured</span>}
      </div>
      <span className="badge bg-primary-50 text-primary-600 text-xs mb-2"><Tag className="w-3 h-3" /> {item.category}</span>
      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
    </div>
  )
}

export function AdminServices() {
  const { data, loading } = useAdminServices()
  return (
    <AdminCRUD
      title="Service"
      items={data}
      loading={loading}
      fields={serviceFields}
      onAdd={addService}
      onUpdate={updateService}
      onDelete={deleteService}
      renderCard={(item) => <ServiceCard item={item} />}
      searchKey="title"
    />
  )
}

export default AdminServices
