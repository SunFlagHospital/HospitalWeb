import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc,
  query, where, orderBy, limit, serverTimestamp, onSnapshot
} from 'firebase/firestore'
import { db } from './config'

// Generic CRUD helpers
const createService = (collectionName) => ({
  getAll: async (constraints = []) => {
    const q = query(collection(db, collectionName), ...constraints)
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  },
  getById: async (id) => {
    const snap = await getDoc(doc(db, collectionName, id))
    return snap.exists() ? { id: snap.id, ...snap.data() } : null
  },
  add: async (data) => {
    const ref = await addDoc(collection(db, collectionName), {
      ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    })
    return ref.id
  },
  update: async (id, data) => {
    await updateDoc(doc(db, collectionName, id), {
      ...data, updatedAt: serverTimestamp()
    })
  },
  delete: async (id) => {
    await deleteDoc(doc(db, collectionName, id))
  },
  subscribe: (callback, constraints = []) => {
    try {
      const q = query(collection(db, collectionName), ...constraints)
      console.debug(`📡 Setting up real-time listener for collection: ${collectionName}`, {
        constraintsCount: constraints.length,
        timestamp: new Date().toISOString()
      })
      
      return onSnapshot(
        q,
        snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          console.debug(`✅ Snapshot received for ${collectionName}:`, {
            docCount: docs.length,
            timestamp: new Date().toISOString()
          })
          callback(docs || [])
        },
        error => {
          console.error(`❌ Error listening to ${collectionName}:`, error)
          // Still call callback with empty array to handle UI gracefully
          callback([])
        }
      )
    } catch (error) {
      console.error(`❌ Error setting up listener for ${collectionName}:`, error)
      return () => {} // Return no-op unsubscribe
    }
  }
})

// Collection services
export const doctorsService = createService('doctors')
export const servicesService = createService('services')
export const specialitiesService = createService('specialities')
export const careersService = createService('careers')
export const testimonialsService = createService('testimonials')
export const bannersService = createService('banners')
// Single document contact info collection
export const contactService = createService('contactInfo')
export const appointmentsService = createService('appointments')
// Applications collection for career/job applications
export const applicationsService = createService('jobApplications')
// Gallery collection
export const galleryService = createService('gallery')
// Videos collection
export const videosService = createService('videos')
// Insurance Partners collection
export const insurancePartnersService = createService('insurancePartners')

// Small helper to set a single contact document with a fixed ID
export const setContact = async (id, data) => {
  await setDoc(doc(db, 'contactInfo', id), { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() })
}

// Named exports for convenience
export const fetchDoctors = (constraints) => doctorsService.getAll(constraints)
export const addDoctor = (data) => doctorsService.add(data)
export const updateDoctor = (id, data) => doctorsService.update(id, data)
export const deleteDoctor = (id) => doctorsService.delete(id)

export const fetchServices = (constraints) => servicesService.getAll(constraints)
export const addService = (data) => servicesService.add(data)
export const updateService = (id, data) => servicesService.update(id, data)
export const deleteService = (id) => servicesService.delete(id)

export const fetchSpecialities = (constraints) => specialitiesService.getAll(constraints)
export const addSpeciality = (data) => specialitiesService.add(data)
export const updateSpeciality = (id, data) => specialitiesService.update(id, data)
export const deleteSpeciality = (id) => specialitiesService.delete(id)

export const fetchCareers = (constraints) => careersService.getAll(constraints)
export const addCareer = (data) => careersService.add(data)
export const updateCareer = (id, data) => careersService.update(id, data)
export const deleteCareer = (id) => careersService.delete(id)

export const fetchTestimonials = (constraints) => testimonialsService.getAll(constraints)
export const addTestimonial = (data) => testimonialsService.add(data)
export const updateTestimonial = (id, data) => testimonialsService.update(id, data)
export const deleteTestimonial = (id) => testimonialsService.delete(id)

export const fetchBanners = (page) => bannersService.getAll(page ? [where('page', '==', page)] : [])
export const addBanner = (data) => bannersService.add(data)
export const updateBanner = (id, data) => bannersService.update(id, data)
export const deleteBanner = (id) => bannersService.delete(id)

export const fetchVideos = (constraints) => videosService.getAll(constraints)
export const addVideo = (data) => videosService.add(data)
export const updateVideo = (id, data) => videosService.update(id, data)
export const deleteVideo = (id) => videosService.delete(id)

export const fetchInsurancePartners = (constraints) => insurancePartnersService.getAll(constraints)
export const addInsurancePartner = (data) => insurancePartnersService.add(data)
export const updateInsurancePartner = (id, data) => insurancePartnersService.update(id, data)
export const deleteInsurancePartner = (id) => insurancePartnersService.delete(id)

export { orderBy, where, limit }
