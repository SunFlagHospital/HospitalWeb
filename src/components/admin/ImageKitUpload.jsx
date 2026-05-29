  import { useState, useRef } from 'react'
  import { Upload, X, Loader } from 'lucide-react'
  import toast from 'react-hot-toast'

  /**
   * Safe JSON parsing helper
   * Returns parsed JSON or empty object if parsing fails
   */
  const safeParseJSON = async (response) => {
    try {
      const text = await response.text()
      console.debug('📝 Response body:', {
        length: text?.length || 0,
        isEmpty: !text || text.trim() === '',
        preview: text?.substring(0, 100) || '(empty)'
      })
      
      if (!text || text.trim() === '') {
        console.warn('⚠️ Empty response body')
        return {}
      }
      
      const parsed = JSON.parse(text)
      console.debug('✅ JSON parsed successfully')
      return parsed
    } catch (error) {
      console.error('❌ JSON parse error:', {
        error: error.message,
        responseLength: response?.headers?.get('content-length')
      })
      return {}
    }
  }

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
        // Step 1: Get authentication token from backend
        console.log('📡 Requesting ImageKit authentication token...')
        const authResponse = await fetch('/api/imagekit-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })

        console.debug('🔐 Auth response status:', authResponse.status, {
          statusText: authResponse.statusText,
          contentType: authResponse.headers.get('content-type')
        })

        if (!authResponse.ok) {
          console.error('❌ Auth endpoint returned:', authResponse.status)
          const authError = await safeParseJSON(authResponse)
          throw new Error(`Authentication failed: ${authError.error || authResponse.statusText}`)
        }

        const authData = await safeParseJSON(authResponse)
        
        // Validate required fields
        if (!authData.token || !authData.signature || !authData.expire) {
          console.error('❌ Missing required auth fields:', {
            token: !!authData.token,
            signature: !!authData.signature,
            expire: !!authData.expire,
            fullResponse: authData
          })
          throw new Error('Invalid authentication response: missing required fields')
        }

        console.log('✅ Auth token received', {
          expire: authData.expire,
          signatureLength: authData.signature.length,
          token: authData.token?.substring(0, 20) + '...'
        })

        // Step 2: Prepare FormData with authentication
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', file.name)
        formData.append('useUniqueFileName', 'true')
        
        // Add authentication parameters
        formData.append('publicKey', publicKey)
        formData.append('token', authData.token)
        formData.append('signature', authData.signature)
        formData.append('expire', authData.expire)

        console.log('📦 Uploading file to ImageKit...', {
          fileName: file.name,
          fileSize: file.size,
          publicKey: publicKey.substring(0, 10) + '...'
        })

        // Step 3: Upload to ImageKit
        const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: formData,
        })

        console.debug('📤 ImageKit upload response status:', uploadResponse.status, {
          statusText: uploadResponse.statusText,
          contentType: uploadResponse.headers.get('content-type'),
          contentLength: uploadResponse.headers.get('content-length')
        })

        const uploadData = await safeParseJSON(uploadResponse)

        if (!uploadResponse.ok) {
          console.error('❌ ImageKit upload error response:', {
            status: uploadResponse.status,
            data: uploadData
          })
          throw new Error(`ImageKit error (${uploadResponse.status}): ${uploadData.message || uploadData.error || uploadResponse.statusText}`)
        }

        if (!uploadData.url && !uploadData.filePath) {
          console.error('❌ Invalid ImageKit response:', uploadData)
          throw new Error('Invalid upload response: missing URL or file path')
        }

        console.log('✅ Upload successful', {
          url: uploadData.url,
          filePath: uploadData.filePath,
          fileId: uploadData.fileId
        })

        const imageUrl = uploadData.url || `${urlEndpoint}${uploadData.filePath}`

        // Show preview
        if (showPreview) {
          setPreview(imageUrl)
        }

        // Call success callback
        onUploadSuccess(imageUrl)
        toast.success('✅ Image uploaded successfully!')
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (error) {
        console.error('❌ Complete upload error:', {
          message: error.message,
          stack: error.stack
        })
        toast.error(`Upload failed: ${error.message || 'Please try again.'}`)
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
