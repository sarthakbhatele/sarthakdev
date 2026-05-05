'use client'

import { useEffect, useState } from 'react'
import { getLenis } from './useLenis'

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const onScroll = ({ progress }: { progress: number }) => {
      setProgress(progress)
    }

    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [])

  return progress
}