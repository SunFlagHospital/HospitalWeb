import { useState, useEffect } from 'react'
import {
  doctorsService, servicesService, specialitiesService, careersService,
  testimonialsService, bannersService, contactService, galleryService, applicationsService, videosService,
  insurancePartnersService,
  orderBy as _orderBy, where as _where, limit as _limit
} from '@/firebase/services'

const orderBy = _orderBy
const where = _where
const limit = _limit

// Enhanced generic real-time hook with full error handling
export function useRealtimeCollection(service, constraints = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    let unsub = null

    const setupSubscription = () => {
      try {
        setLoading(true)
        setError(null)

        unsub = service.subscribe(
          (docs) => {
            if (!isMounted) return
            console.debug('📊 Firestore data received:', {
              collectionSize: docs?.length || 0,
              constraints: constraints.length
            })
            setData(docs || [])
            setLoading(false)
          },
          constraints
        )
      } catch (err) {
        if (!isMounted) return
        console.error('❌ Firestore subscription error:', err)
        setError(err.message || 'Failed to load data')
        setLoading(false)
      }
    }

    setupSubscription()

    return () => {
      isMounted = false
      if (unsub && typeof unsub === 'function') {
        try {
          unsub()
        } catch (err) {
          console.error('Error unsubscribing:', err)
        }
      }
    }
  }, [JSON.stringify(constraints), service])

  return { data, loading, error }
}

// Specific hooks - all use real-time listeners
export const useDoctors = (featured = false) => {
  // Note: We fetch all doctors first, then sort in frontend to handle missing displayOrder fields
  const constraints = featured ? [where('available', '==', true), limit(6)] : []
  return useRealtimeCollection(doctorsService, constraints)
}

export const useAllDoctors = () => useRealtimeCollection(doctorsService, [])

export const useServices = () => useRealtimeCollection(servicesService, [orderBy('order', 'asc')])

export const useAllServices = () => useRealtimeCollection(servicesService)

export const useSpecialities = () => useRealtimeCollection(specialitiesService, [orderBy('order', 'asc')])

export const useCareers = () => useRealtimeCollection(careersService, [where('active', '==', true)])

export const useTestimonials = () => useRealtimeCollection(testimonialsService, [where('featured', '==', true)])

export const useBanners = (page) => {
  const constraints = page ? [where('page', '==', page)] : []
  return useRealtimeCollection(bannersService, constraints)
}

export const useContact = () => useRealtimeCollection(contactService)
export const useGallery = () => useRealtimeCollection(galleryService, [orderBy('createdAt', 'desc')])

// Admin real-time hooks (no filters - show all)
// Note: displayOrder ordering removed to ensure all doctors load, even without displayOrder field
export const useAdminDoctors = () => useRealtimeCollection(doctorsService, [])
export const useAdminServices = () => useRealtimeCollection(servicesService)
export const useAdminCareers = () => useRealtimeCollection(careersService)
export const useAdminTestimonials = () => useRealtimeCollection(testimonialsService)
export const useAdminSpecialities = () => useRealtimeCollection(specialitiesService)
export const useAdminBanners = () => useRealtimeCollection(bannersService)
export const useAdminGallery = () => useRealtimeCollection(galleryService)
export const useAdminApplications = () => useRealtimeCollection(applicationsService)
export const useAdminVideos = () => useRealtimeCollection(videosService)
export const useAdminInsurancePartners = () => useRealtimeCollection(insurancePartnersService, [orderBy('displayOrder', 'asc')])

// Frontend hooks for insurance partners
export const useInsurancePartners = () => useRealtimeCollection(insurancePartnersService, [where('active', '==', true), orderBy('displayOrder', 'asc')])
