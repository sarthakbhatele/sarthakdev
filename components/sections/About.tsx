'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import ArcadeQuote from '@/components/pacman/ArcadeQuote'
import dynamic from 'next/dynamic'

const KingScene = dynamic(() => import('@/components/chess/KingScene'), { ssr: false })

const BIO = `Sarthak is a fullstack developer and AI engineer who builds things that are fast, thoughtful, and occasionally over-engineered in the best way. He works across the full stack — from database schema to deployed UI — with a focus on AI-integrated products.`

const BIO_2 = `Currently based in Gwalior, India. Open to remote work, freelance contracts, and ideas worth building.`

const TERMINAL_LINES = [
  { key: 'name', value: '"Sarthak Bhatele"' },
  { key: 'role', value: '"Fullstack Dev + AI Engineer"' },
  { key: 'location', value: '"Gwalior, India"' },
  { key: 'status', value: '"Open to work"' },
  { key: 'coffee', value: 'true' },
]

const CHESS_MOVES = [
  { move: '1. e4', desc: 'Born in Gwalior, India', piece: '♟' },
  { move: '2. d4', desc: 'Fell in love with code', piece: '♝' },
  { move: '3. Nf3', desc: 'Fullstack + AI engineering', piece: '♞' },
  { move: '4. O-O', desc: 'Freelancing globally', piece: '♛' },
  { move: '5. ...', desc: 'Next move loading', piece: '?' },
]

export default function About() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanAbout /> : <ChessAbout />
}

/* ───────────────────────── PAC-MAN ───────────────────────── */
function PacmanAbout() {
  return (
    <section
      className="page-padding"
      style={{
        background: '#1a1a1a', paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)',
      }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-space), sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          color: '#FCC92F',
          marginBottom: '3rem',
          letterSpacing: '-0.01em',
        }}
      >
        {"// about.exe"}
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: '3rem',
        alignItems: 'start',
      }}>
        {/* Left — Bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[BIO, BIO_2].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.55 }}
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: '1rem',
                color: '#F0F0F0',
                lineHeight: 1.8,
              }}
            >
              {para}
            </motion.p>
          ))}

          <ArcadeQuote quote="My code has more ghosts than this maze" />
        </div>

        {/* Right — Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: '#0d0d0d',
            border: '1px solid #FCC92F',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {/* Terminal titlebar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '10px 14px',
            borderBottom: '1px solid rgba(252,201,47,0.15)',
            background: '#111',
          }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
            <span style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: '#555',
              marginLeft: 8,
              letterSpacing: '0.05em',
            }}>
              sarthak@portfolio ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '1.25rem 1.5rem', overflowX: 'auto' }}>
            {TERMINAL_LINES.map((line, i) => (
              <motion.div
                key={line.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
                style={{
                  display: 'flex',
                  gap: 8,
                  marginBottom: 10,
                  fontFamily: 'monospace',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#555' }}>&gt;</span>
                <span style={{ color: '#FCC92F' }}>{line.key}</span>
                <span style={{ color: '#555' }}>:</span>
                <span style={{ color: '#A0A0A0' }}>{line.value}</span>
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              style={{
                display: 'inline-block',
                width: 8,
                height: 14,
                background: '#FCC92F',
                marginTop: 4,
                verticalAlign: 'middle',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── CHESS ──────────────────────────── */
function ChessAbout() {
  return (
    <section
      className="page-padding"
      style={{
        background: '#F5F0E8', paddingTop: 'clamp(3rem, 8vw, 6rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* ── King model — desktop only, behind everything ── */}
      <style>{`
        .king-canvas-wrap {
          display: none;
        }
        @media (min-width: 768px) {
          .king-canvas-wrap {
            display: block;
            position: absolute;
            top: 50%;
            left: 15%;
            transform: translate(-50%, -50%);
            width: min(36vw, 380px);
            height: min(36vw, 380px);
            pointer-events: none;
            z-index: 0;
            opacity: 0.65;
            filter: drop-shadow(0 12px 32px rgba(44, 43, 41, 0.4));
          }
        }
      `}</style>
      <div className="king-canvas-wrap">
        <KingScene />
      </div>

      {/* ── All text content — above the model ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#2c2b29',
            marginBottom: '2.5rem',
          }}
        >
          About
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left — Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {[BIO, BIO_2].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: '0.95rem',
                  color: '#2c2b29',
                  lineHeight: 1.75,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right — Chess notation timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {CHESS_MOVES.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4.5rem 1fr 1.5rem',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0',
                  borderBottom: i < CHESS_MOVES.length - 1
                    ? '1px solid rgba(201,193,154,0.6)'
                    : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: '#2c2b29',
                  letterSpacing: '0.05em',
                }}>
                  {row.move}
                </span>
                <span style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: '0.82rem',
                  color: '#769656',
                  lineHeight: 1.4,
                }}>
                  {row.desc}
                </span>
                <span style={{
                  fontSize: 15,
                  color: '#2c2b29',
                  textAlign: 'right',
                  opacity: row.piece === '?' ? 0.3 : 0.85,
                }}>
                  {row.piece}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}