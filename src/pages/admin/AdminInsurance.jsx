import { Building2, CheckCircle2, XCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import AdminCRUD from '@/components/admin/AdminCRUD'
import ImageKitUpload from '@/components/admin/ImageKitUpload'
import { useAdminInsurancePartners } from '@/hooks/useFirestore'
import { addInsurancePartner, updateInsurancePartner, deleteInsurancePartner } from '@/firebase/services'

const categories = ['TPA', 'Government Panel', 'Private Insurance']

const fields = [
  { name: 'name', label: 'Partner Name', required: true, placeholder: 'e.g. ECHS, Apollo Insurance' },
  { name: 'category', label: 'Category', required: true, type: 'select', options: categories },
  { name: 'description', label: 'Description / Details', type: 'textarea', placeholder: 'Brief description of the insurance partner...', rows: 3 },
  { name: 'displayOrder', label: 'Display Order (Lower number = Higher priority)', type: 'number', placeholder: '1, 2, 3, etc.', min: 0, help: 'Partners will be sorted by this order' },
  { name: 'active', label: 'Active / Visible on Website', type: 'checkbox' },
]

function InsuranceCard({ item: partner }) {
  const logoUrl = partner.logo || partner.logoUrl || partner.image || partner.imageUrl

  return (
    <div>
      {/* Logo Preview */}
      {logoUrl && (
        <div className="mb-4 p-3 bg-gradient-soft rounded-lg border border-primary-100 flex items-center justify-center h-20">
          <img 
            src={logoUrl} 
            alt={partner.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            className="max-h-16 max-w-full object-contain"
          />
        </div>
      )}

      {/* Details */}
      <div className="flex items-start gap-3 mb-3">
        {!logoUrl && (
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
  const [uploadingId, setUploadingId] = useState(null)

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, logo: imageUrl }))
    setUploadingId(null)
  }

  const handleAdd = async (newItem) => {
    if (formData.logo) {
      newItem.logo = formData.logo
      setFormData({})
    }
    // Set default active status if not specified
    if (newItem.active === undefined || newItem.active === '') {
      newItem.active = true
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
        <div className="mt-6 space-y-4 p-5 bg-gradient-to-br from-primary-50 to-cyan-50 rounded-lg border border-primary-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-lg">🖼️</span>
              Upload Partner Logo / Image
            </label>
            <p className="text-xs text-slate-500 mb-3">
              Upload a clear logo or image. Recommended size: 400×400px
            </p>
            <ImageKitUpload
              onUploadSuccess={handleImageUpload}
              label="Choose Logo Image"
              maxSize={5 * 1024 * 1024}
            />
          </div>

          {formData.logo && (
            <div className="p-3 bg-medical-green/10 border border-medical-green/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-medical-green" />
                <p className="text-sm font-semibold text-medical-green">Logo uploaded successfully</p>
              </div>
              <p className="text-xs text-slate-600">Will be saved when you create/update the partner.</p>
            </div>
          )}
        </div>
      )}
    />
  )
}
