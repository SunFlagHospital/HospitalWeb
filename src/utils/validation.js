// Email validation regex - strict Gmail and common email patterns
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation - Indian 10-digit format (starts with 6-9)
export const isValidPhone = (phone) => {
  const phoneClean = phone?.replace(/\D/g, '') || ''
  return /^[6-9]\d{9}$/.test(phoneClean)
}

// Clean phone - remove all non-digits
export const cleanPhone = (phone) => {
  return phone?.replace(/\D/g, '') || ''
}

// Validate contact form
export const validateContactForm = (data) => {
  const errors = []
  
  if (!data.name?.trim()) {
    errors.push('Full name is required')
  }
  
  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  } else if (!isValidPhone(data.phone)) {
    errors.push('Enter a valid 10-digit Indian mobile number')
  }
  
  if (!data.department) {
    errors.push('Please select a department')
  }
  
  if (data.email?.trim() && !isValidEmail(data.email)) {
    errors.push('Enter a valid email address')
  }
  
  return errors
}

// Validate career application form
export const validateCareerForm = (data) => {
  const errors = []
  
  if (!data.name?.trim()) {
    errors.push('Full name is required')
  }
  
  if (!data.email?.trim()) {
    errors.push('Email address is required')
  } else if (!isValidEmail(data.email)) {
    errors.push('Enter a valid email address')
  }
  
  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  } else if (!isValidPhone(data.phone)) {
    errors.push('Enter a valid 10-digit Indian mobile number')
  }
  
  if (!data.position?.trim()) {
    errors.push('Please select a position')
  }
  
  return errors
}

// Validate gallery form
export const validateGalleryForm = (data) => {
  const errors = []
  
  if (!data.title?.trim()) {
    errors.push('Title is required')
  }
  
  if (!data.image?.trim()) {
    errors.push('Image URL is required')
  } else if (!isValidImageUrl(data.image)) {
    errors.push('Enter a valid image URL')
  }
  
  return errors
}

// Validate video URL
export const isValidVideoUrl = (url) => {
  if (!url?.trim()) return false
  
  // YouTube URL patterns
  const youtubePatterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /^[a-zA-Z0-9_-]{11}$/, // Just video ID
  ]
  
  for (const pattern of youtubePatterns) {
    if (pattern.test(url)) return true
  }
  
  return false
}

// Validate image URL
export const isValidImageUrl = (url) => {
  if (!url?.trim()) return false
  
  try {
    new URL(url)
    // Check if URL ends with image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
    const lowerUrl = url.toLowerCase()
    
    return imageExtensions.some(ext => lowerUrl.includes(ext))
  } catch {
    return false
  }
}

// Validate video form
export const validateVideoForm = (data) => {
  const errors = []
  
  if (!data.title?.trim()) {
    errors.push('Video title is required')
  }
  
  if (!data.videoUrl?.trim()) {
    errors.push('Video URL is required')
  } else if (!isValidVideoUrl(data.videoUrl)) {
    errors.push('Enter a valid YouTube video URL or ID')
  }
  
  return errors
}

// Format phone for display
export const formatPhoneForDisplay = (phone) => {
  const cleaned = cleanPhone(phone)
  if (cleaned.length !== 10) return cleaned
  
  // Format as: +91-XXXXX-XXXXX
  return `+91-${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
}
