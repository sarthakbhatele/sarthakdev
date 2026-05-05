'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UnifiedLoader from '@/components/core/UnifiedLoader'

type Theme = 'pacman' | 'chess'

function readTheme(): Theme {
  try {
    const s = localStorage.getItem('sarthak-portfolio-theme')
    const r = s ? JSON.parse(s) : null
    return r?.state?.theme === 'chess' ? 'chess' : 'pacman'
  } catch {
    return 'pacman'
  }
}

export default function Loader() {
  const [theme]   = useState<Theme>(() => readTheme())
  const [done, setDone]       = useState(false)
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 99999, background: 'var(--bg-primary)' }}
          initial={{ opacity: 1 }}
          animate={done ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={() => { if (done) setVisible(false) }}
          suppressHydrationWarning
        >
          <UnifiedLoader variant={theme} onComplete={() => setDone(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}