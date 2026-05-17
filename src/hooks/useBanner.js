import { useState, useEffect } from 'react'
import { bannersService } from '@/firebase/services'
import { where } from '@/firebase/services'

/**
 * Custom hook for fetching page-specific banners from Firestore
 * Features:
 * - Real-time updates via Firestore listener
 * - Error handling and loading states
 * - Fallback to default values
 * - Automatic cleanup
 */
export function useBanner(pageSlug) {
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pageSlug) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Subscribe to real-time banner updates for this page
      const unsubscribe = bannersService.subscribe(
        (banners) => {
          if (banners && banners.length > 0) {
            // Use the first banner (usually only one per page)
            const pageBanner = banners[0]
            setBanner(pageBanner)
            setError(null)
          } else {
            // No banner found, set to null (will use fallback in component)
            setBanner(null)
          }
          setLoading(false)
        },
        [where('page', '==', pageSlug)]
      )

      return () => unsubscribe()
    } catch (err) {
      console.error(`Error fetching banner for page ${pageSlug}:`, err)
      setError(err.message)
      setBanner(null)
      setLoading(false)
    }
  }, [pageSlug])

  return { banner, loading, error }
}

/**
 * Hook to fetch all banners (for admin panel)
 * Features:
 * - Fetch all banners organized by page
 * - Real-time updates
 * - Comprehensive error handling
 */
export function useAllBanners() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      const unsubscribe = bannersService.subscribe(
        (fetchedBanners) => {
          // Sort banners by page name for easier admin management
          const sorted = fetchedBanners.sort((a, b) => {
            if (a.page < b.page) return -1
            if (a.page > b.page) return 1
            return 0
          })
          setBanners(sorted)
          setError(null)
          setLoading(false)
        },
        []
      )

      return () => unsubscribe()
    } catch (err) {
      console.error('Error fetching banners:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  return { banners, loading, error }
}

export default useBanner
