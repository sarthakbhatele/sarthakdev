// 'use client'

// import { motion } from 'framer-motion'
// import { useTheme } from '@/hooks/useTheme'
// import { useScrollProgress } from '@/hooks/useScrollProgress'

// const PIECES = ['♟', '♝', '♞', '♛'] as const
// const LABELS = ['Pawn', 'Bishop', 'Knight', 'Queen']

// function getActive(progress: number): number {
//   if (progress < 0.25) return 0
//   if (progress < 0.50) return 1
//   if (progress < 0.75) return 2
//   return 3
// }

// export default function PawnProgress() {
//   const { isChess } = useTheme()
//   const progress   = useScrollProgress()
//   if (!isChess) return null

//   const active     = getActive(progress)
//   const queenActive = active === 3

//   return (
//     <>
//       {/* ── Desktop: right side vertical ── */}
//       <div
//         className="hidden md:flex"
//         style={{
//           position: 'fixed',
//           right: '1.5rem',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 16,
//           zIndex: 100,
//         }}
//       >
//         {PIECES.map((piece, i) => (
//           <motion.div
//             key={i}
//             title={LABELS[i]}
//             animate={{
//               scale:  active === i ? 1.3 : 1.0,
//               color:  active === i ? '#769656' : '#C9C19A',
//             }}
//             transition={{ type: 'spring', stiffness: 300, damping: 22 }}
//             style={{
//               fontSize: 22,
//               lineHeight: 1,
//               cursor: 'default',
//               userSelect: 'none',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             {piece}
//           </motion.div>
//         ))}

//         {/* "Open to work" — only at queen */}
//         <motion.span
//           animate={{ opacity: queenActive ? 1 : 0, y: queenActive ? 0 : 6 }}
//           transition={{ duration: 0.4 }}
//           style={{
//             fontFamily: 'var(--font-space), sans-serif',
//             fontSize: 10,
//             color: '#769656',
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//             writingMode: 'vertical-rl',
//             textOrientation: 'mixed',
//             marginTop: 6,
//             pointerEvents: 'none',
//           }}
//         >
//           Open to work
//         </motion.span>
//       </div>

//       {/* ── Mobile: bottom horizontal row ── */}
//       <div
//         className="flex md:hidden"
//         style={{
//           position: 'fixed',
//           bottom: '1rem',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 20,
//           zIndex: 100,
//           background: 'rgba(245,240,232,0.85)',
//           backdropFilter: 'blur(8px)',
//           borderRadius: 999,
//           padding: '6px 20px',
//           border: '1px solid #C9C19A',
//         }}
//       >
//         {PIECES.map((piece, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               scale: active === i ? 1.3 : 1.0,
//               color: active === i ? '#769656' : '#C9C19A',
//             }}
//             transition={{ type: 'spring', stiffness: 300, damping: 22 }}
//             style={{ fontSize: 20, lineHeight: 1, userSelect: 'none' }}
//           >
//             {piece}
//           </motion.div>
//         ))}

//         <motion.span
//           animate={{ opacity: queenActive ? 1 : 0 }}
//           transition={{ duration: 0.35 }}
//           style={{
//             fontFamily: 'var(--font-space), sans-serif',
//             fontSize: 10,
//             color: '#769656',
//             letterSpacing: '0.08em',
//             textTransform: 'uppercase',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           Open to work
//         </motion.span>
//       </div>
//     </>
//   )
// }





'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

// Chess ranks: pawn starts at rank 2 (index 1 from bottom), promotes at rank 8 (index 7)
// We map scroll 0→1 to ranks 2→8 (6 steps across 7 squares)
const RANKS = 8
// const START_RANK  = 1   // rank 2 (0-indexed from top = rank 7 visually, but we go bottom→top)
const PAWN = '♟'
const QUEEN = '♛'

// scroll progress → rank index (0 = top of board = rank 8, 7 = bottom = rank 1)
// pawn travels from bottom (rank 2, index 6) to top (rank 8, index 0)
function progressToRank(progress: number): number {
  // pawn goes from row index 6 down to row index 0 (top)
  const from = 6   // rank 2 starting square
  const to = 0   // rank 8 promotion square
  return Math.round(from - progress * (from - to))
}

export default function PawnProgress() {
  const { isChess } = useTheme()
  const [rankIndex, setRankIndex] = useState(6)   // starts at rank 2 (row 6 from top)
  const [promoted, setPromoted] = useState(false)
  const [showPromote, setShowPromote] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lockedRef = useRef(false)

  // mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // scroll → rank movement
  useEffect(() => {
    if (!isChess) return
    const onScroll = () => {
      if (lockedRef.current) return
      const max = document.body.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      const rank = progressToRank(Math.min(progress / 0.95, 1))
      setRankIndex(rank)

      // at rank 8 (row index 0) → show promotion prompt
      if (progress >= 0.95 && !lockedRef.current) {
        lockedRef.current = true
        setRankIndex(0)
        setShowPromote(true)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isChess])

  if (!isChess || isMobile) return null

  // Each rank cell = 12.5vh tall. Pawn sits centered in its rank cell.
  const CELL_H = 12.5   // vh per rank
  const pawnTop = rankIndex * CELL_H + CELL_H / 2   // center of current rank cell (vh)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 48,
        height: '100vh',
        zIndex: 100,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Rank tick marks aligned to grid rows */}
      {Array.from({ length: RANKS }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${i * CELL_H + CELL_H / 2}vh`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: i >= rankIndex ? '#769656' : '#C9C19A',
            opacity: i >= rankIndex ? 0.8 : 0.3,
            transition: 'background 0.3s, opacity 0.3s',
          }}
        />
      ))}

      {/* Filled track — from pawn down to rank 2 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          top: `${rankIndex * CELL_H + CELL_H / 2}vh`,
          height: `${(6 - rankIndex) * CELL_H}vh`,
          background: '#769656',
          opacity: 0.5,
          transition: 'top 0.25s ease, height 0.25s ease',
        }}
      />

      {/* Pawn / Queen piece */}
      <AnimatePresence mode="wait">
        {!promoted ? (
          <motion.div
            key="pawn"
            style={{
              position: 'absolute',
              left: '50%',
              top: `${pawnTop}vh`,
              transform: 'translate(-50%, -50%)',
              fontSize: 22,
              color: '#5a5a5a',
              transition: 'top 0.25s ease',
            }}
            exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.2 } }}
          >
            {PAWN}
          </motion.div>
        ) : (
          <motion.div
            key="queen"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: `${CELL_H / 2}vh`,
              transform: 'translate(-50%, -50%)',
              fontSize: 22,
              color: '#769656',
              filter: 'drop-shadow(0 0 8px #76965699)',
            }}
          >
            {QUEEN}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promotion Tooltip - Poora Capsule Clickable */}
      <AnimatePresence>
        {showPromote && !promoted && (
          <motion.button
            onClick={() => { setPromoted(true); setShowPromote(false) }}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }} // Hover par halka sa expand hoga
            whileTap={{ scale: 0.95 }}   // Click par dabega
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: `${6 * CELL_H}vh`,
              right: '55px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'all',
              background: '#769656',
              padding: '4px 6px 4px 12px',
              borderRadius: '999px',
              border: 'none', // Button default border hataya
              cursor: 'pointer', // Ab poore capsule par cursor pointer aayega
              boxShadow: '0 4px 15px rgba(118, 150, 86, 0.4)',
              zIndex: 110,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: '9px',
                fontWeight: 800, // Thoda extra bold
                color: '#1a1a1a',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Promote?
            </span>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {/* Ripple Effect Animation */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1.8],
                  opacity: [0.5, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#ffffff',
                  borderRadius: '50%',
                }}
              />

              {/* Queen Icon Wrapper */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: '#1a1a1a',
                  fontSize: '16px',
                  color: '#769656',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {QUEEN}
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* "Open to work" - Promotion ke baad Queen ke niche dikhega */}
      <AnimatePresence>
        {promoted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              position: 'absolute',
              // Isse Queen (jo Rank 8/Top par hai) ke thoda niche set karenge
              // Ya agar aap ise footer ke paas dikhana chahte hain toh 'bottom: 20px' use karein
              top: `${CELL_H * 1.5}vh`,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              zIndex: 101, // Ensure it's above other layers
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 10, // Thoda bada kiya taaki dikhe
                fontWeight: 700,
                color: '#769656',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl', // Standing text
                background: 'rgba(26, 26, 26, 0.8)', // Chota sa background for visibility
                padding: '8px 2px',
                borderRadius: '4px',
              }}
            >
              Open to work
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}