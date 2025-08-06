import { useState, useEffect } from 'react'

import { breakpointRanges, Breakpoint } from '../styles/breakpoints'

export function useMediaRange(breakpoint: Breakpoint) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const range = breakpointRanges[breakpoint]
    const queryParts = []

    if (range.min !== undefined) queryParts.push(`(min-width: ${range.min}px)`)
    if (range.max !== undefined) queryParts.push(`(max-width: ${range.max}px)`)

    const media = window.matchMedia(queryParts.join(' and '))

    const listener = () => setMatches(media.matches)
    listener()

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [breakpoint])

  return matches
}