import { useState, useEffect } from 'react'
import { Search, Trash2, Eye, Download, Calendar, Phone, Mail, User, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { db } from '@/firebase/config'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, limit } from 'firebase/firestore'

export default function AdminQueries() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(null)

  // Real-time listener for queries with error handling
  useEffect(() => {
    const q = query(
      collection(db, 'queries'),
      orderBy('createdAt', 'desc'),
      limit(500)
    )
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt)
          }))
          setQueries(data)
          setLoading(false)
          setError(null)
        } catch (err) {
          console.error('Error processing queries:', err)
          setError('Error processing data')
          setLoading(false)
        }
      },
      (error) => {
        console.error('Firestore error:', error)
        
        if (error.code === 'permission-denied') {
          setError('Permission denied. Check Firestore security rules.')
          toast.error('Permission denied. Admin access required.')
        } else if (error.code === 'failed-precondition') {
          setError('Database error. Please try again.')
          toast.error('Database connection error. Please refresh.')
        } else {
          setError('Failed to load queries: ' + error.message)
          toast.error('Failed to load queries')
        }
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Filter queries based on search
  const filteredQueries = queries.filter(q => 
    q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.phone?.includes(searchTerm) ||
    q.selectedDoctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.message?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Delete query
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return
    
    setDeleting(id)
    try {
      await deleteDoc(doc(db, 'queries', id))
      toast.success('Query deleted successfully')
      setShowModal(false)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete query')
    } finally {
      setDeleting(null)
    }
  }

  // View query details
  const handleViewQuery = (query) => {
    setSelectedQuery(query)
    setShowModal(true)
  }

  // Download as CSV
  const downloadCSV = () => {
    if (filteredQueries.length === 0) {
      toast.error('No queries to download')
      return
    }

    const headers = ['Name', 'Email', 'Phone', 'Selected Doctor', 'Message', 'Date']
    const rows = filteredQueries.map(q => [
      q.name || '',
      q.email || '',
      q.phone || '',
      q.selectedDoctor || '',
      `"${q.message?.replace(/"/g, '""') || ''}"`,
      q.createdAt?.toLocaleString() || ''
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `queries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success('CSV downloaded successfully')
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-16 rounded-xl" />
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900 mb-2">Error Loading Queries</h3>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <div className="space-y-2 text-sm text-red-600">
              <p>✓ Check Firestore is enabled</p>
              <p>✓ Verify security rules are updated (see FIRESTORE_RULES.md)</p>
              <p>✓ Ensure "queries" collection exists in Firestore</p>
              <p>✓ Check browser console for detailed errors</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Contact Form Queries</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage all incoming contact form submissions in real-time.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-all duration-200 text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email, phone, doctor, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-11 w-full text-sm"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-card">
          <p className="text-slate-500 text-sm">Total Queries</p>
          <p className="text-2xl font-bold text-primary-600 mt-2">{queries.length}</p>
        </div>
        <div className="admin-card">
          <p className="text-slate-500 text-sm">Unreviewed</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{queries.length}</p>
        </div>
        <div className="admin-card">
          <p className="text-slate-500 text-sm">This Month</p>
          <p className="text-2xl font-bold text-medical-green mt-2">
            {queries.filter(q => {
              const qDate = new Date(q.createdAt)
              const now = new Date()
              return qDate.getMonth() === now.getMonth() && qDate.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filteredQueries.length === 0 ? (
        <div className="text-center py-20 admin-card">
          <Mail className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400">No queries found</h3>
          <p className="text-slate-400 text-sm mt-1">
            {queries.length === 0 ? 'Queries will appear here once submitted.' : 'Try adjusting your search.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.map((query) => (
                  <tr key={query.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-primary-900 text-sm">{query.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-slate-600">{query.email}</p>
                        <p className="text-slate-400">{query.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{query.selectedDoctor || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">
                        {query.createdAt?.toLocaleDateString?.() || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewQuery(query)}
                          className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(query.id)}
                          disabled={deleting === query.id}
                          className="p-1.5 text-slate-400 hover:text-medical-red hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filteredQueries.map((query) => (
              <div key={query.id} className="admin-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-900">{query.name}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                      <Calendar className="w-3 h-3" />
                      {query.createdAt?.toLocaleDateString?.() || 'N/A'}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleViewQuery(query)}
                      className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(query.id)}
                      disabled={deleting === query.id}
                      className="p-1.5 text-slate-400 hover:text-medical-red hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {query.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {query.phone}
                  </div>
                  {query.selectedDoctor && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {query.selectedDoctor}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && selectedQuery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-5 border-b border-primary-100 flex items-center justify-between">
              <h2 className="font-bold text-primary-900 font-display">Query Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-primary-900">{selectedQuery.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Email</p>
                  <a href={`mailto:${selectedQuery.email}`} className="text-sm font-semibold text-primary-600 hover:underline">
                    {selectedQuery.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Phone</p>
                  <a href={`tel:${selectedQuery.phone}`} className="text-sm font-semibold text-primary-600 hover:underline">
                    {selectedQuery.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Selected Doctor</p>
                  <p className="text-sm font-semibold text-primary-900">{selectedQuery.selectedDoctor || '—'}</p>
                </div>
              </div>

              {/* Timestamp */}
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Submitted Date</p>
                <p className="text-sm font-semibold text-primary-900">
                  {selectedQuery.createdAt?.toLocaleString?.() || 'N/A'}
                </p>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Message / Symptoms</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedQuery.message || 'No message provided'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${selectedQuery.email}?subject=Re: Your Query - Sunflag Hospital`}
                  className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all text-center text-sm"
                >
                  Send Email
                </a>
                <a
                  href={`https://wa.me/${selectedQuery.phone.replace(/\D/g, '')}?text=Hello ${encodeURIComponent(selectedQuery.name)}, Thank you for contacting Sunflag Hospital. We received your query.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-medical-green hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all text-center text-sm"
                >
                  WhatsApp Message
                </a>
                <button
                  onClick={() => handleDelete(selectedQuery.id)}
                  disabled={deleting === selectedQuery.id}
                  className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-medical-red font-semibold rounded-lg transition-all text-sm disabled:opacity-50"
                >
                  {deleting === selectedQuery.id ? 'Deleting...' : 'Delete Query'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
