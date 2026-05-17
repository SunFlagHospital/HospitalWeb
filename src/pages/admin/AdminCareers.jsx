import { Briefcase, MapPin, Clock } from 'lucide-react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import { useAdminCareers } from '@/hooks/useFirestore'
import { addCareer, updateCareer, deleteCareer } from '@/firebase/services'

const fields = [
  { name: 'title', label: 'Job Title', required: true, placeholder: 'e.g. Senior Cardiologist' },
  { name: 'department', label: 'Department', required: true, placeholder: 'e.g. Cardiology' },
  { name: 'type', label: 'Employment Type', type: 'select', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Visiting'] },
  { name: 'location', label: 'Location', placeholder: 'e.g. Rohtak, Haryana' },
  { name: 'description', label: 'Job Description', type: 'textarea', required: true, placeholder: 'Describe the role...', rows: 3 },
  { name: 'requirements', label: 'Requirements (comma-separated)', type: 'textarea', placeholder: 'MBBS, MD, 5+ years experience', rows: 2 },
  { name: 'active', label: 'Currently Active / Accepting Applications', type: 'checkbox' },
]

function CareerCard({ item }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-slate-800 font-display text-sm">{item.title}</h3>
        <span className={`badge text-xs ${item.active ? 'bg-emerald-50 text-medical-green' : 'bg-slate-100 text-slate-400'}`}>
          {item.active ? 'Active' : 'Closed'}
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Briefcase className="w-3 h-3" /> {item.department}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3 h-3" /> {item.type}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3 h-3" /> {item.location || 'Rohtak, Haryana'}
        </div>
      </div>
    </div>
  )
}

export default function AdminCareers() {
  const { data, loading } = useAdminCareers()
  return (
    <AdminCRUD
      title="Career"
      items={data}
      loading={loading}
      fields={fields}
      onAdd={addCareer}
      onUpdate={updateCareer}
      onDelete={deleteCareer}
      renderCard={(item) => <CareerCard item={item} />}
      searchKey="title"
    />
  )
}
