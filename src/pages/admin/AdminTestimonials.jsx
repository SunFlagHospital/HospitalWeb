import { Star } from 'lucide-react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import { useAdminTestimonials } from '@/hooks/useFirestore'
import { addTestimonial, updateTestimonial, deleteTestimonial } from '@/firebase/services'

const fields = [
  { name: 'name', label: 'Patient Name', required: true, placeholder: 'Full Name' },
  { name: 'department', label: 'Department', required: true, placeholder: 'e.g. Cardiology' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true, placeholder: '5' },
  { name: 'review', label: 'Review / Testimonial', type: 'textarea', required: true, placeholder: 'Patient review text...', rows: 4 },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'featured', label: 'Show on Home Page', type: 'checkbox' },
]

function TestimonialCard({ item }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-xs">{item.name?.[0] ?? '?'}</span>
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm font-display">{item.name}</p>
            <p className="text-xs text-slate-400">{item.department}</p>
          </div>
        </div>
        {item.featured && <span className="badge bg-amber-50 text-amber-600 text-xs">Featured</span>}
      </div>
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic">"{item.review}"</p>
    </div>
  )
}

export default function AdminTestimonials() {
  const { data, loading } = useAdminTestimonials()
  return (
    <AdminCRUD
      title="Testimonial"
      items={data}
      loading={loading}
      fields={fields}
      onAdd={addTestimonial}
      onUpdate={updateTestimonial}
      onDelete={deleteTestimonial}
      renderCard={(item) => <TestimonialCard item={item} />}
      searchKey="name"
    />
  )
}
