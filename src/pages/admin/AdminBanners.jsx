import { useState, useEffect } from 'react'
import { Image, Loader, AlertCircle, CheckCircle2, Trash2, Edit3 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAdminBanners } from '@/hooks/useFirestore'
import { addBanner, updateBanner, deleteBanner } from '@/firebase/services'
import ResponsiveImage from '@/components/common/ResponsiveImage'

const PAGE_OPTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About Us' },
  { value: 'services', label: 'Services' },
  { value: 'specialities', label: 'Specialities' },
  { value: 'doctors', label: 'Doctors' },
  { value: 'careers', label: 'Careers' },
  { value: 'contact', label: 'Contact' },
]

/**
 * Banner Card Component - Shows preview with edit/delete options
 */
function BannerCard({ banner, onEdit, onDelete, isDeleting }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
      {/* Image Preview */}
      <div className="relative h-32 bg-slate-100 overflow-hidden">
        {banner.imageUrl ? (
          <ResponsiveImage
            src={banner.imageUrl}
            alt={banner.title || banner.page}
            type="heroBanner"
            className="w-full h-full"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-slate-300" />
          </div>
        )}

        {/* Page Badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-600 text-white shadow-md">
            {PAGE_OPTIONS.find((p) => p.value === banner.page)?.label || banner.page}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {banner.title && (
          <h3 className="font-bold text-slate-800 text-sm font-display mb-1 truncate">
            {banner.title}
          </h3>
        )}
        {banner.subtitle && (
          <p className="text-slate-500 text-xs mb-2 line-clamp-2">{banner.subtitle}</p>
        )}

        {/* URL Preview */}
        <div className="text-xs text-slate-400 mb-3 truncate hover:text-slate-600 cursor-help" title={banner.imageUrl}>
          {banner.imageUrl?.substring(0, 40)}...
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(banner)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(banner.id)}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Banner Form Component
 */
function BannerForm({ banner, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(
    banner || {
      page: '',
      imageUrl: '',
      title: '',
      subtitle: '',
    }
  )

  const [preview, setPreview] = useState(banner?.imageUrl || '')

  useEffect(() => {
    if (banner) {
      setFormData(banner)
      setPreview(banner.imageUrl || '')
    }
  }, [banner])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'imageUrl') {
      setPreview(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.page || !formData.imageUrl) {
      toast.error('Page and Image URL are required')
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 font-display">
            {banner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Page Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Page <span className="text-red-500">*</span>
            </label>
            <select
              name="page"
              value={formData.page}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200"
            >
              <option value="">Select a page</option>
              {PAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://domain.com/uploads/banners/..."
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200"
            />
            <p className="text-xs text-slate-500 mt-1">
              Use Hostinger URLs for optimal performance (https://domain.com/uploads/...)
            </p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <ResponsiveImage
                src={preview}
                alt="Banner preview"
                type="heroBanner"
                className="w-full h-48"
                objectFit="cover"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Banner Title (Optional)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., About Our Hospital"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Banner Subtitle (Optional)
            </label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g., Delivering excellence in healthcare"
              rows="2"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {banner ? 'Update Banner' : 'Add Banner'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-slate-700 font-semibold bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Main Admin Banners Page
 */
export default function AdminBanners() {
  const { data: banners, loading, error } = useAdminBanners()
  const [showForm, setShowForm] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [searchPage, setSearchPage] = useState('')

  // Filter banners by selected page
  const filteredBanners = searchPage
    ? banners.filter((b) => b.page === searchPage)
    : banners

  // Check which pages have banners configured
  const configuredPages = new Set(banners.map((b) => b.page))
  const missingPages = PAGE_OPTIONS.filter((p) => !configuredPages.has(p.value))

  const handleAddNew = () => {
    setSelectedBanner(null)
    setShowForm(true)
  }

  const handleEdit = (banner) => {
    setSelectedBanner(banner)
    setShowForm(true)
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (selectedBanner) {
        // Update existing banner
        await updateBanner(selectedBanner.id, formData)
        toast.success('Banner updated successfully!')
      } else {
        // Add new banner
        await addBanner(formData)
        toast.success('Banner added successfully!')
      }
      setShowForm(false)
      setSelectedBanner(null)
    } catch (err) {
      console.error('Error saving banner:', err)
      toast.error('Failed to save banner: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return

    setIsDeletingId(id)
    try {
      await deleteBanner(id)
      toast.success('Banner deleted successfully!')
    } catch (err) {
      console.error('Error deleting banner:', err)
      toast.error('Failed to delete banner: ' + err.message)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Banner Management</h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage page banners displayed across the website
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
        >
          <span className="text-xl">+</span>
          Add Banner
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error Loading Banners</h3>
            <p className="text-red-800 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Configured Banners</p>
          <p className="text-3xl font-bold text-primary-600 font-display mt-1">{banners.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Total Pages</p>
          <p className="text-3xl font-bold text-slate-700 font-display mt-1">{PAGE_OPTIONS.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Missing Banners</p>
          <p className="text-3xl font-bold text-yellow-600 font-display mt-1">{missingPages.length}</p>
        </div>
      </div>

      {/* Missing Pages Alert */}
      {missingPages.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-semibold text-yellow-900 text-sm mb-2">Missing Banners</h3>
          <div className="flex flex-wrap gap-2">
            {missingPages.map((page) => (
              <span
                key={page.value}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
              >
                {page.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && banners.length === 0 && (
        <div className="text-center py-16">
          <Image className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Banners Created</h3>
          <p className="text-slate-600 mb-6">Start by creating banners for your pages</p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            <span className="text-xl">+</span>
            Create First Banner
          </button>
        </div>
      )}

      {/* Filter & List */}
      {!loading && banners.length > 0 && (
        <>
          {/* Filter */}
          <div className="mb-6">
            <select
              value={searchPage}
              onChange={(e) => setSearchPage(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-400 outline-none transition-colors duration-200 text-sm"
            >
              <option value="">All Pages</option>
              {PAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Banner Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeletingId === banner.id}
              />
            ))}
          </div>

          {filteredBanners.length === 0 && (
            <div className="text-center py-12 text-slate-600">
              <p>No banners found for selected page</p>
            </div>
          )}
        </>
      )}

      {/* Banner Form Modal */}
      {showForm && (
        <BannerForm
          banner={selectedBanner}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setSelectedBanner(null)
          }}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

