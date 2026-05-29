import { Building2, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import ImageKitUpload from '@/components/admin/ImageKitUpload'
import { useAdminInsurancePartners } from '@/hooks/useFirestore'
import { addInsurancePartner, updateInsurancePartner, deleteInsurancePartner } from '@/firebase/services'

const categories = ['Insurance', 'TPA', 'Government Panel', 'Cashless']

const fields = [
  { name: 'name', label: 'Partner Name', required: true, placeholder: 'e.g. ECHS, Apollo Insurance' },
  { name: 'category', label: 'Category', required: true, type: 'select', options: categories },
  { name: 'logo', label: 'Logo URL (optional - upload instead if you want)', type: 'url', placeholder: 'https://...' },
  { name: 'description', label: 'Description / Details', type: 'textarea', placeholder: 'Brief description of the insurance partner...', rows: 3 },
  { name: 'displayOrder', label: 'Display Order (Lower number = Higher priority)', type: 'number', placeholder: '1, 2, 3, etc.', min: 0, help: 'Partners will be sorted by this order' },
  { name: 'active', label: 'Active / Visible on Website', type: 'checkbox' },
]

function InsuranceCard({ item: partner }) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-primary-600" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 font-display text-sm truncate">{partner.name}</h3>
          <p className="text-accent text-xs font-semibold">{partner.category}</p>
          {partner.displayOrder !== undefined && (
            <p className="text-slate-500 text-xs mt-1">Order: #{partner.displayOrder}</p>
          )}
        </div>
        {partner.active
          ? <CheckCircle2 className="w-4 h-4 text-medical-green flex-shrink-0" />
          : <XCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
        }
      </div>
      {partner.description && (
        <p className="text-xs text-slate-600 line-clamp-2 italic">{partner.description}</p>
      )}
    </div>
  )
}

export default function AdminInsurance() {
  const { data: partners, loading } = useAdminInsurancePartners()
  const [formData, setFormData] = useState({})

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, logo: imageUrl }))
  }

  const handleAdd = async (newItem) => {
    if (formData.logo) {
      newItem.logo = formData.logo
      setFormData({})
    }
    // Set default active status if not specified
    if (newItem.active === undefined || newItem.active === '') {
      newItem.active = false
    }
    await addInsurancePartner(newItem)
  }

  const handleUpdate = async (id, updatedItem) => {
    if (formData.logo) {
      updatedItem.logo = formData.logo
      setFormData({})
    }
    await updateInsurancePartner(id, updatedItem)
  }

  return (
    <AdminCRUD
      title="Insurance Partner"
      items={partners}
      loading={loading}
      fields={fields}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={deleteInsurancePartner}
      renderCard={(item) => <InsuranceCard item={item} />}
      searchKey="name"
      renderExtraFields={() => (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            📸 Or Upload Logo with ImageKit
          </label>
          <ImageKitUpload
            onUploadSuccess={handleImageUpload}
            label="Upload Partner Logo"
            maxSize={5 * 1024 * 1024}
          />
          {formData.logo && (
            <p className="text-xs text-green-600 mt-2">✅ Logo URL auto-filled in form above</p>
          )}
        </div>
      )}
    />
  )
}
