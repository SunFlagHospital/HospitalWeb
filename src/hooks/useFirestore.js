import { useState, useEffect } from 'react'
import { doctorsService, servicesService, specialitiesService, careersService, testimonialsService, bannersService, contactService } from '@/firebase/services'
import { orderBy, where, limit } from '@/firebase/services'

// Enhanced generic real-time hook with full error handling
export function useRealtimeCollection(service, constraints = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      const unsub = service.subscribe(
        (docs) => {
          setData(docs)
          setLoading(false)
        },
        constraints
      )
      return unsub
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }, [JSON.stringify(constraints)])

  return { data, loading, error }
}

// Specific hooks - all use real-time listeners
export const useDoctors = (featured = false) => {
  const constraints = featured ? [where('available', '==', true), limit(6)] : []
  return useRealtimeCollection(doctorsService, constraints)
}

export const useAllDoctors = () => useRealtimeCollection(doctorsService)

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

// Admin real-time hooks (no filters - show all)
export const useAdminDoctors = () => useRealtimeCollection(doctorsService)
export const useAdminServices = () => useRealtimeCollection(servicesService)
export const useAdminCareers = () => useRealtimeCollection(careersService)
export const useAdminTestimonials = () => useRealtimeCollection(testimonialsService)
export const useAdminSpecialities = () => useRealtimeCollection(specialitiesService)
export const useAdminBanners = () => useRealtimeCollection(bannersService)
