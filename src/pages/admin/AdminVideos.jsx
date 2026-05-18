import { useState } from 'react'
import { Play, Loader, AlertCircle, CheckCircle2, Trash2, Edit3, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAdminVideos } from '@/hooks/useFirestore'
import { addVideo, updateVideo, deleteVideo } from '@/firebase/services'

const VIDEO_SECTIONS = [
  { value: 'home', label: 'Home Page Videos' },
  { value: 'hospital-tour', label: 'Hospital Tour Section' },
]

/**
 * Video Card Component - Shows video preview with edit/delete options
 */
function VideoCard({ video, onEdit, onDelete, isDeleting }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
      {/* Video Preview */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex items-center justify-center">
        {video.videoUrl ? (
          <div className="w-full h-full relative group">
            <iframe
              width="100%"
              height="100%"
              src={extractYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Play className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs text-slate-500">No video URL</p>
          </div>
        )}

        {/* Section Badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-600 text-white shadow-md">
            {VIDEO_SECTIONS.find((p) => p.value === video.section)?.label || video.section}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {video.title && (
          <h3 className="font-bold text-slate-800 text-sm font-display mb-1 truncate">
            {video.title}
          </h3>
        )}
        {video.description && (
          <p className="text-slate-500 text-xs mb-2 line-clamp-2">{video.description}</p>
        )}

        {/* URL Preview */}
        <div className="text-xs text-slate-400 mb-3 truncate hover:text-slate-600 cursor-help" title={video.videoUrl}>
          {video.videoUrl?.substring(0, 40)}...
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(video)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(video.id)}
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
 * Video Form Component
 */
function VideoForm({ video, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(
    video || {
      section: '',
      videoUrl: '',
      title: '',
      description: '',
    }
  )

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.section || formData.section.trim() === '') {
      newErrors.section = 'Section is required'
    }

    if (!formData.videoUrl || formData.videoUrl.trim() === '') {
      newErrors.videoUrl = 'YouTube URL is required'
    } else if (!isValidYouTubeUrl(formData.videoUrl)) {
      newErrors.videoUrl = 'Please enter a valid YouTube URL (youtube.com or youtu.be)'
    }

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Video title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
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
            {video ? 'Edit Video' : 'Add New Video'}
          </h2>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Section Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${
                errors.section
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
              }`}
            >
              <option value="">Select a section</option>
              {VIDEO_SECTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.section && <p className="text-red-500 text-xs mt-1 font-medium">{errors.section}</p>}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              YouTube URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${
                errors.videoUrl
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
              }`}
            />
            {errors.videoUrl && <p className="text-red-500 text-xs mt-1 font-medium">{errors.videoUrl}</p>}
            {!errors.videoUrl && (
              <p className="text-xs text-slate-500 mt-1">
                Use full YouTube URL or short youtu.be links
              </p>
            )}
          </div>

          {/* Video Preview */}
          {formData.videoUrl && isValidYouTubeUrl(formData.videoUrl) && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <iframe
                width="100%"
                height="300"
                src={extractYouTubeEmbedUrl(formData.videoUrl)}
                title="Video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Hospital Overview"
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${
                errors.title
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the video"
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
                  {video ? 'Update Video' : 'Add Video'}
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

// Helper function to validate YouTube URLs
function isValidYouTubeUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//
  return youtubeRegex.test(url)
}

// Helper function to extract YouTube embed URL
function extractYouTubeEmbedUrl(url) {
  let videoId = ''
  
  // Handle youtube.com/watch?v=ID format
  const match1 = url.match(/[?&]v=([^&]+)/)
  if (match1) {
    videoId = match1[1]
  }
  
  // Handle youtu.be/ID format
  const match2 = url.match(/youtu\.be\/([^?&]+)/)
  if (match2) {
    videoId = match2[1]
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

/**
 * Main Admin Videos Page
 */
export default function AdminVideos() {
  const { data: videos, loading, error } = useAdminVideos()
  const [showForm, setShowForm] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [searchSection, setSearchSection] = useState('')

  // Filter videos by selected section
  const filteredVideos = searchSection
    ? videos.filter((v) => v.section === searchSection)
    : videos

  // Check which sections have videos configured
  const configuredSections = new Set(videos.map((v) => v.section))
  const missingSections = VIDEO_SECTIONS.filter((s) => !configuredSections.has(s.value))

  const handleAddNew = () => {
    setSelectedVideo(null)
    setShowForm(true)
  }

  const handleEdit = (video) => {
    setSelectedVideo(video)
    setShowForm(true)
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (selectedVideo) {
        await updateVideo(selectedVideo.id, formData)
        toast.success('Video updated successfully!')
      } else {
        await addVideo(formData)
        toast.success('Video added successfully!')
      }
      setShowForm(false)
      setSelectedVideo(null)
    } catch (err) {
      console.error('Error saving video:', err)
      toast.error('Failed to save video: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return

    setIsDeletingId(id)
    try {
      await deleteVideo(id)
      toast.success('Video deleted successfully!')
    } catch (err) {
      console.error('Error deleting video:', err)
      toast.error('Failed to delete video: ' + err.message)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Video Management</h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage videos displayed on home page and hospital tour sections
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Video
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error Loading Videos</h3>
            <p className="text-red-800 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Total Videos</p>
          <p className="text-3xl font-bold text-primary-600 font-display mt-1">{videos.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Total Sections</p>
          <p className="text-3xl font-bold text-slate-700 font-display mt-1">{VIDEO_SECTIONS.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4 border border-slate-100">
          <p className="text-slate-600 text-sm font-medium">Missing Videos</p>
          <p className="text-3xl font-bold text-yellow-600 font-display mt-1">{missingSections.length}</p>
        </div>
      </div>

      {/* Missing Sections Alert */}
      {missingSections.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-semibold text-yellow-900 text-sm mb-2">Missing Videos</h3>
          <div className="flex flex-wrap gap-2">
            {missingSections.map((section) => (
              <span
                key={section.value}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
              >
                {section.label}
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
      {!loading && videos.length === 0 && (
        <div className="text-center py-16">
          <Play className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Videos Created</h3>
          <p className="text-slate-600 mb-6">Start by adding videos to your sections</p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create First Video
          </button>
        </div>
      )}

      {/* Filter & List */}
      {!loading && videos.length > 0 && (
        <>
          {/* Filter */}
          <div className="mb-6">
            <select
              value={searchSection}
              onChange={(e) => setSearchSection(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-400 outline-none transition-colors duration-200 text-sm"
            >
              <option value="">All Sections</option>
              {VIDEO_SECTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeletingId === video.id}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-slate-600">
              <p>No videos found for selected section</p>
            </div>
          )}
        </>
      )}

      {/* Video Form Modal */}
      {showForm && (
        <VideoForm
          video={selectedVideo}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setSelectedVideo(null)
          }}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
