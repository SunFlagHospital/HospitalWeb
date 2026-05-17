import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Search, AlertTriangle, Eye } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

/**
 * Generic reusable CRUD admin component.
 * Props:
 *  - title: string
 *  - items: array of objects from Firestore
 *  - loading: bool
 *  - fields: [{ name, label, type, required, options, placeholder }]
 *  - onAdd: async (data) => void
 *  - onUpdate: async (id, data) => void
 *  - onDelete: async (id) => void
 *  - renderCard: (item) => JSX
 *  - searchKey: string (field to search by)
 */
export default function AdminCRUD({
  title,
  items = [],
  loading,
  fields = [],
  onAdd,
  onUpdate,
  onDelete,
  renderCard,
  searchKey = 'name',
}) {
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | 'add' | { ...item }
  const [deleting, setDeleting] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm()

  const imageUrl = watch('image')

  const openAdd = () => {
    reset()
    setImagePreview(null)
    setModal('add')
  }

  const openEdit = (item) => {
    reset()
    fields.forEach(f => setValue(f.name, item[f.name] ?? ''))
    setImagePreview(item.image || null)
    setModal(item)
  }

  const closeModal = () => { 
    setModal(null)
    setImagePreview(null)
    reset() 
  }

  const onSubmit = async (data) => {
    try {
      if (modal === 'add') {
        await onAdd(data)
        toast.success(`${title} added successfully!`)
      } else {
        await onUpdate(modal.id, data)
        toast.success(`${title} updated!`)
      }
      closeModal()
    } catch {
      toast.error('Operation failed. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await onDelete(id)
      toast.success('Deleted successfully!')
      setDeleting(null)
    } catch {
      toast.error('Delete failed. Please try again.')
    }
  }

  const filtered = items.filter(item =>
    String(item[searchKey] ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">{title} Management</h1>
          <p className="text-slate-500 text-sm">{items.length} total records</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Add {title}
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-10"
          placeholder={`Search ${title.toLowerCase()}...`}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="admin-card animate-pulse h-40 bg-slate-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-semibold">No {title.toLowerCase()} found</p>
          <p className="text-sm">Try adjusting search or add a new record.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="admin-card relative group">
              {renderCard(item)}
              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors text-sm font-semibold"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleting(item.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-medical-red hover:bg-red-100 transition-colors text-sm font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white">
                <h2 className="font-bold text-slate-800 font-display text-lg">
                  {modal === 'add' ? `Add New ${title}` : `Edit ${title}`}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {/* Image Preview Section */}
                {fields.some(f => f.name === 'image' || f.name.includes('image') || f.name.includes('photo')) && (
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Image Preview</label>
                    <div className="relative">
                      {imagePreview || imageUrl ? (
                        <div className="relative bg-slate-100 rounded-xl overflow-hidden h-48 flex items-center justify-center">
                          <img 
                            src={imageUrl || imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={() => setImagePreview(null)}
                          />
                          <button
                            type="button"
                            onClick={() => setImagePreview(null)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 h-32 flex flex-col items-center justify-center text-center p-4">
                          <Eye className="w-8 h-8 text-slate-300 mb-2 mx-auto" />
                          <p className="text-sm text-slate-500">Image preview will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.map(({ name, label, type = 'text', required, options, placeholder, rows }) => (
                    <div key={name} className={name === 'image' || name.includes('image') || name.includes('photo') ? 'sm:col-span-2' : ''}>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                        {label} {required && <span className="text-medical-red">*</span>}
                      </label>
                      {type === 'textarea' ? (
                        <textarea
                          {...register(name, { required: required && `${label} is required` })}
                          rows={rows || 3}
                          className="input-field resize-none w-full"
                          placeholder={placeholder}
                        />
                      ) : type === 'select' ? (
                        <select
                          {...register(name, { required: required && `${label} is required` })}
                          className="input-field w-full"
                        >
                          <option value="">Select {label}</option>
                          {options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : type === 'checkbox' ? (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" {...register(name)} className="w-4 h-4 rounded text-primary-600" />
                          <span className="text-sm text-slate-600">{placeholder || label}</span>
                        </label>
                      ) : (
                        <input
                          type={type}
                          {...register(name, { required: required && `${label} is required` })}
                          className="input-field w-full"
                          placeholder={placeholder}
                          onChange={(e) => {
                            if ((name === 'image' || name.includes('image') || name.includes('photo')) && type === 'url') {
                              setImagePreview(e.target.value)
                            }
                          }}
                        />
                      )}
                      {errors[name] && (
                        <p className="text-medical-red text-xs mt-1">{errors[name].message}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2 border-t border-slate-200 mt-6">
                  <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
                    <Save className="w-4 h-4" />
                    {isSubmitting ? 'Saving...' : modal === 'add' ? 'Add' : 'Update'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-medical-red" />
              </div>
              <h3 className="font-bold text-slate-800 font-display text-lg mb-2">Confirm Delete</h3>
              <p className="text-slate-500 text-sm mb-6">This action cannot be undone. Are you sure?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)} className="btn-secondary flex-1 justify-center">
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleting)}
                  className="flex-1 py-3 bg-medical-red hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
