import { db } from './config'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'

export const checkAdminAccess = async (uid) => {
  if (!uid) return false
  
  try {
    const adminRef = doc(db, 'admins', uid)
    const adminSnap = await getDoc(adminRef)
    return adminSnap.exists()
  } catch (error) {
    console.error('Error checking admin access:', error)
    return false
  }
}

export const getAdminData = async (uid) => {
  if (!uid) return null
  
  try {
    const adminRef = doc(db, 'admins', uid)
    const adminSnap = await getDoc(adminRef)
    
    if (adminSnap.exists()) {
      return {
        uid,
        ...adminSnap.data()
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return null
  }
}

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const validateJobApplication = (data) => {
  const errors = {}
  
  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Full name is required'
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone is required'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Phone must be 10 digits'
  }
  
  if (!data.position || data.position.trim() === '') {
    errors.position = 'Position is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateAppointment = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required'
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone is required'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Phone must be 10 digits'
  }
  
  if (!data.preferredDate) {
    errors.preferredDate = 'Preferred date is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
