'use client'

import { useEffect, useRef, useState } from 'react'

const DOT_COUNT = 12
const DOT_R = 5
const DOT_GAP = 18
const STEP_MS = 130
const CELL = 40
const COLS = 8

interface Props {
  variant: 'pacman' | 'chess'
  onComplete: () => void
}

function PacmanVariant({ onComplete }: { onComplete: () => void }) {
  const [eaten, setEaten] = useState(0)
  const [mouth, setMouth] = useState(true)
  const [started, setStarted] = useState(false)
  const called = useRef(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setStarted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!started) return
    if (eaten >= DOT_COUNT) {
      if (!called.current) { called.current = true; onComplete() }
      return
    }
    const t = setTimeout(() => {
      setEaten(e => e + 1)
      setMouth(m => !m)
    }, STEP_MS)
    return () => clearTimeout(t)
  }, [eaten, started, onComplete])

  const stride = DOT_R * 2 + DOT_GAP
  const totalW = DOT_COUNT * stride - DOT_GAP
  const pacmanSize = 26
  const pacmanLeft = eaten * stride - pacmanSize / 2

  return (
    <div className="flex flex-col items-center gap-8">
      <div style={{ position: 'relative', width: totalW, height: pacmanSize }}>
        <div
          suppressHydrationWarning
          style={{
            position: 'absolute',
            top: '50%',
            left: pacmanLeft,
            transform: 'translateY(-50%)',
            transition: started ? `left ${STEP_MS}ms linear` : 'none',
            opacity: started ? 1 : 0,
          }}
        >
          <svg width={pacmanSize} height={pacmanSize} viewBox="0 0 24 24">
            {mouth
              ? <path d="M12 12 L22 4 A10 10 0 1 0 22 20 Z" fill="#FCC92F" />
              : <circle cx="12" cy="12" r="10" fill="#FCC92F" />
            }
          </svg>
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', gap: DOT_GAP,
        }}>
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <div key={i} style={{
              width: DOT_R * 2,
              height: DOT_R * 2,
              borderRadius: '50%',
              background: '#2C2B29',
              flexShrink: 0,
              opacity: i < eaten ? 0 : 0.75,
              transition: 'opacity 0.08s ease',
            }} />
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-space), sans-serif',
        fontSize: 12,
        color: '#8a8782',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        Loading…
      </p>
    </div>
  )
}

function ChessVariant({ onComplete }: { onComplete: () => void }) {
  const [col, setCol] = useState(-1)
  const [started, setStarted] = useState(false)
  const called = useRef(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStarted(true)
      setCol(0) // start from 0 after mount
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!started) return
    if (col >= COLS - 1 && col !== -1) {
      if (!called.current) { called.current = true; onComplete() }
      return
    }
    const t = setTimeout(() => setCol(c => c + 1), STEP_MS * 2.5)
    return () => clearTimeout(t)
  }, [col, started, onComplete])

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        suppressHydrationWarning
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `${CELL}px`,
          border: '1px solid #C4BCA8',
          boxShadow: '0 4px 20px rgba(44,43,41,0.08)',
          opacity: started ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        {Array.from({ length: COLS }).map((_, i) => {
          const isLight = i % 2 === 0
          const isActive = i === col
          return (
            <div key={i} style={{
              width: CELL,
              height: CELL,
              background: isLight ? '#EEEED2' : '#769656',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
              suppressHydrationWarning
            >
              {isActive && (
                <span style={{
                  fontSize: 28,
                  lineHeight: 1,
                  userSelect: 'none',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
                }}>
                  ♜
                </span>
              )}
            </div>
          )
        })}
      </div>

      <p style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: 12,
        fontStyle: 'italic',
        color: '#8a8782',
        letterSpacing: '0.02em',
      }}>
        Setting up the board…
      </p>
    </div>
  )
}

export default function UnifiedLoader({ variant, onComplete }: Props) {
  return variant === 'chess'
    ? <ChessVariant onComplete={onComplete} />
    : <PacmanVariant onComplete={onComplete} />
}