import { useState, useRef } from 'react'
import { Upload, X, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ImageKitUpload({ 
  onUploadSuccess, 
  label = 'Upload Image',
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptTypes = 'image/*',
  showPreview = true
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)
  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT

  if (!publicKey || !urlEndpoint) {
    return (
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs">
        ⚠️ ImageKit credentials not configured. Add VITE_IMAGEKIT_PUBLIC_KEY and VITE_IMAGEKIT_URL_ENDPOINT to .env
      </div>
    )
  }

  const handleUpload = async (file) => {
    if (!file) return

    // Validate file
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('publicKey', publicKey)
      formData.append('fileName', file.name)
      formData.append('useUniqueFileName', 'true')

      const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      const imageUrl = data.url || `${urlEndpoint}${data.filePath}`

      // Show preview
      if (showPreview) {
        setPreview(imageUrl)
      }

      // Call success callback
      onUploadSuccess(imageUrl)
      toast.success('Image uploaded successfully!')
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      setDragActive(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleUpload(files[0])
    }
  }

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={(e) => handleUpload(e.target.files?.[0])}
          disabled={uploading}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {uploading ? (
            <>
              <Loader className="w-8 h-8 text-primary-500 animate-spin" />
              <p className="text-sm font-semibold text-slate-600">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-500 mt-1">Drag and drop or click to select</p>
                <p className="text-xs text-slate-400 mt-2">Max {maxSize / 1024 / 1024}MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Preview */}
      {showPreview && preview && (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
