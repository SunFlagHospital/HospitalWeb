import { useState } from 'react'
import { Loader, AlertCircle, Search, FileText, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAdminApplications } from '@/hooks/useFirestore'
import { applicationsService } from '@/firebase/services'

function ApplicationCard({ item, onDelete, isDeleting }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-4 hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{item.fullName}</h3>
          <p className="text-xs text-slate-500">{item.position}</p>
        </div>
        <div className="text-xs text-slate-400 whitespace-nowrap ml-2">
          {new Date(item.createdAt?.seconds ? item.createdAt.seconds * 1000 : item.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">
        <div><strong>Email:</strong> <a href={`mailto:${item.email}`} className="text-primary-600 hover:underline">{item.email}</a></div>
        <div><strong>Phone:</strong> <a href={`tel:${item.phone}`} className="text-primary-600 hover:underline">{item.phone}</a></div>
        {item.resumeLink && (
          <div>
            <a href={item.resumeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium">
              <FileText className="w-4 h-4" />
              View Resume
            </a>
          </div>
        )}
      </div>

      {/* Only Delete Button */}
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this application?')) {
            onDelete(item.id)
          }
        }}
        disabled={isDeleting}
        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
      >
        {isDeleting ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}

export default function AdminApplications() {
  const { data, loading, error } = useAdminApplications()
  const [search, setSearch] = useState('')
  const [isDeletingId, setIsDeletingId] = useState(null)

  const filteredApplications = data.filter(app =>
    String(app.fullName ?? '').toLowerCase().includes(search.toLowerCase()) ||
    String(app.email ?? '').toLowerCase().includes(search.toLowerCase()) ||
    String(app.position ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    setIsDeletingId(id)
    try {
      await applicationsService.delete(id)
      toast.success('Application deleted successfully!')
    } catch (err) {
      console.error('Error deleting application:', err)
      toast.error('Failed to delete application: ' + err.message)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">Applications</h1>
        <p className="text-slate-600 text-sm mt-1">View and manage job applications received from careers page</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error Loading Applications</h3>
            <p className="text-red-800 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
        <p className="text-slate-600 text-sm font-medium">Total Applications</p>
        <p className="text-3xl font-bold text-primary-600 font-display mt-1">{data.length}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or position..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200 text-sm"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && data.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Applications Yet</h3>
          <p className="text-slate-600">Applications will appear here when candidates apply through the careers page</p>
        </div>
      )}

      {/* Grid */}
      {!loading && data.length > 0 && (
        <>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-slate-600">
              <p>No applications match your search</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  item={app}
                  onDelete={handleDelete}
                  isDeleting={isDeletingId === app.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
