import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll position to top whenever the route changes,
// so navigating between pages doesn't preserve old scroll offset.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return null
}
