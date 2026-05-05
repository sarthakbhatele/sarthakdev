'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

export default function Toggle() {
  const { isPacman, toggle } = useTheme()
  const [hovered, setHovered] = useState(false)
  const [wiping, setWiping] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = useCallback(() => {
    if (wiping) return
    setWiping(true)
  }, [wiping])

  const handleWipeComplete = useCallback(() => {
    toggle()
    setWiping(false)
  }, [toggle])

  return (
    <>
      {/* ── Radial wipe overlay ── */}
      <AnimatePresence>
        {wiping && (
          <motion.div
            key="wipe"
            className="fixed inset-0 pointer-events-none"
            style={{
              background: isPacman ? '#F5F0E8' : '#1a1a1a',
              zIndex: 9998,
              borderRadius: '50%',
              transformOrigin: '50% 100%',
            }}
            initial={{ scale: 0, x: '-50%', y: '50%', left: '50%', bottom: 0, position: 'fixed', width: '200vmax', height: '200vmax' }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleWipeComplete}
          />
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 9999 }}>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-3 py-1 rounded-full pointer-events-none"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color, transparent)',
                fontFamily: 'var(--font-space)',
                letterSpacing: '0.04em',
              }}
            >
              {isPacman ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          ref={buttonRef}
          onClick={handleToggle}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center justify-center cursor-pointer select-none"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: isPacman ? '#FCC92F' : '#EEEED2',
            border: isPacman ? 'none' : '1px solid #C9C19A',
            boxShadow: isPacman
              ? '0 4px 24px rgba(252,201,47,0.35)'
              : '0 4px 24px rgba(0,0,0,0.10)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
          }}
          aria-label={isPacman ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isPacman ? <PacmanIcon /> : <ChessIcon />}
        </motion.button>
      </div>
    </>
  )
}

/* ── Pac-Man SVG with CSS chomping animation ── */
function PacmanIcon() {
  return (
    <>
      <style>{`
        @keyframes chomp {
          0%, 100% { d: path("M 14 2 A 12 12 0 1 1 13.99 2 Z"); }
          50%       { d: path("M 14 14 L 24.5 5.5 A 12 12 0 1 1 24.5 22.5 Z"); }
        }
        .pacman-path { animation: chomp 0.45s ease-in-out infinite; }
      `}</style>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          className="pacman-path"
          d="M 14 2 A 12 12 0 1 1 13.99 2 Z"
          fill="#1a1a1a"
        />
      </svg>
    </>
  )
}

/* ── Chess king unicode ── */
function ChessIcon() {
  return (
    <span
      style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: 28,
        color: '#2c2b29',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      ♚
    </span>
  )
}