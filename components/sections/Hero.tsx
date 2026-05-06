'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'

const NAME = 'Sarthak Bhatele'
const NOTATION = [
  { label: 'e4.', accent: true },
  { label: 'Fullstack Developer.', accent: false },
  { label: 'd5.', accent: true },
  { label: 'AI Engineer.', accent: false },
  { label: 'Gwalior → World.', accent: true },
]

const STATS = [
  { value: '1', label: 'Year Building' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '∞', label: 'Curiosity' },
]

export default function Hero() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanHero /> : <ChessHero />
}

/* ─────────────────────────── CHESS ───────────────────────────── */
function ChessHero() {
  return (
    <>
      <style>{`
        .chess-hero {
          position: relative;
          min-height: 100vh;
          background: #F5F0E8;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .chess-photo-panel {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          z-index: 0;
        }
        .chess-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 58%;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          padding-top: 5.5rem;
          padding-bottom: 2.5rem;
        }
        .chess-name {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 5.5vw, 6rem);
          color: #2c2b29;
          line-height: 0.97;
          letter-spacing: -0.02em;
          margin: 0;
          white-space: nowrap;
        }
        .chess-quote {
          margin: 0;
          padding-left: 1.1rem;
          border-left: 2px solid #C9C19A;
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          color: #8a8778;
          line-height: 1.75;
          white-space: nowrap;
        }
        @media (max-width: 767px) {
          .chess-hero {
            flex-direction: column;
            align-items: stretch;
            min-height: 100svh;
            height: auto;
          }
          .chess-photo-panel {
            position: relative;
            width: 100%;
            height: 45svh;
            flex-shrink: 0;
          }
          .chess-photo-panel .chess-photo-fade-left {
            background: linear-gradient(to bottom, transparent 60%, #F5F0E8 100%) !important;
          }
          .chess-photo-panel .chess-photo-fade-right {
            display: none;
          }
          .chess-content {
            max-width: 100%;
            padding-top: 1.5rem;
            padding-bottom: 6rem;
            gap: 1.1rem;
          }
          .chess-name {
            white-space: normal;
            font-size: clamp(2.2rem, 9vw, 3rem);
          }
          .chess-quote {
            white-space: normal;
          }
        }
      `}</style>
      <section className="chess-hero">
        {/* ── Full-bleed photo — right half ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="chess-photo-panel"
        >
          <Image
            src="/images/photo3.png"
            alt="Sarthak Bhatele"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 0px' }}
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          {/* Left-side / bottom fade — on desktop: left fade; on mobile: bottom fade */}
          <div
            className="chess-photo-fade-right"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, #F5F0E8 0%, #F5F0E8 3%, rgba(245,240,232,0.55) 10%, transparent 50%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="chess-photo-fade-left"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '28%',
              background: 'linear-gradient(to top, #F5F0E8 0%, transparent 90%)',
            }}
          />
        </motion.div>

        {/* ── Left — Text content ── */}
        <div
          className="page-padding chess-content"
        >
          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(118,150,86,0.12)',
              border: '1px solid rgba(118,150,86,0.35)',
              borderRadius: 40,
              padding: '6px 16px',
              width: 'fit-content',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#769656', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#769656',
              }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="chess-name"
          >
            Sarthak{' '}
            <span style={{ color: '#769656' }}>Bhatele</span>
          </motion.h1>

          {/* Chess notation row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', alignItems: 'center' }}
          >
            {NOTATION.map((seg, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.18, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                  color: seg.accent ? '#769656' : '#6b6b68',
                  fontWeight: seg.accent ? 600 : 400,
                  letterSpacing: '0.01em',
                }}
              >
                {seg.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="chess-quote"
          >
            &quot;Chess was born in India and travelled the world.
            <br />
            So will I.&quot;
          </motion.blockquote>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <a
              href="https://drive.google.com/file/d/1PflaggwfA5LozhTxx8_XQVtS_L-sfLYe/view"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#F5F0E8',
                background: '#2c2b29',
                border: '1.5px solid #2c2b29',
                borderRadius: 999,
                padding: '13px 36px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.22s, border-color 0.22s, color 0.22s, transform 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#769656'
                el.style.borderColor = '#769656'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#2c2b29'
                el.style.borderColor = '#2c2b29'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: 14 }}>↗</span> My Resume
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.7 }}
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 4,
              paddingTop: 28,
              borderTop: '1px solid rgba(201,193,154,0.45)',
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: '#2c2b29',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9a9890',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 10,
              color: '#C9C19A',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 20, color: '#C9C19A' }}
          >
            ♟
          </motion.span>
        </motion.div>
      </section>
    </>
  )
}

/* ─────────────────────────── PAC-MAN ─────────────────────────── */
function PacmanHero() {
  return (
    <>
      <style>{`
        .pacman-hero {
          position: relative;
          min-height: 100vh;
          background: #1a1a1a;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .pacman-photo-panel {
          position: absolute;
          right: 0;
          top: -1px;
          bottom: 0;
          width: 50%;
          z-index: 0;
        }
        .pacman-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 58%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding-top: 5.5rem;
          padding-bottom: 2rem;
        }
        .pacman-name-char {
          font-family: var(--font-space), sans-serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 5.5vw, 6rem);
          color: #FCC92F;
          display: inline-block;
          letter-spacing: -0.01em;
        }
        @media (max-width: 767px) {
          .pacman-hero {
            flex-direction: column;
            align-items: stretch;
            min-height: 100svh;
            height: auto;
          }
          .pacman-photo-panel {
            position: relative;
            width: 100%;
            height: 42svh;
            flex-shrink: 0;
            top: 0;
          }
          .pacman-photo-panel .pacman-fade-left {
            background: linear-gradient(to bottom, transparent 55%, #1a1a1a 100%) !important;
          }
          .pacman-photo-panel .pacman-fade-right {
            display: none;
          }
          .pacman-content {
            max-width: 100%;
            padding-top: 1.2rem;
            padding-bottom: 5.5rem;
            gap: 0.9rem;
          }
          .pacman-name-char {
            font-size: clamp(2.4rem, 10vw, 3.2rem);
          }
        }
      `}</style>
      <section className="pacman-hero">
        {/* ── Full-bleed photo — right half ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pacman-photo-panel"
        >
          <Image
            src="/images/photo6.png"
            alt="Sarthak Bhatele"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 0px' }}
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          {/* Left-side fade to match bg */}
          <div
            className="pacman-fade-right"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, #1a1a1a 0%, #1a1a1a 4%, rgba(26,26,26,0.4) 22%, transparent 50%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="pacman-fade-left"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '12%',
              background: 'linear-gradient(to top, #1a1a1a 0%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* ── Left — Text content ── */}
        <div
          className="page-padding pacman-content"
        >
          {/* Arcade status badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#2a2a5a',
              border: '1px solid #FCC92F',
              borderRadius: 6,
              padding: '7px 16px',
              width: 'fit-content',
            }}
          >
            <span style={{ fontSize: 10, color: '#FCC92F', fontFamily: 'monospace', letterSpacing: 2, fontWeight: 700 }}>SYSTEM</span>
            <span style={{ width: 1, height: 12, background: '#FCC92F', opacity: 0.4 }} />
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#F0F0F0', letterSpacing: '0.02em' }}>
              I use dark mode because light attracts bugs 🐛
            </span>
          </motion.div>

          {/* Name — staggered letters */}
          <div aria-label={NAME} style={{ lineHeight: 0.95 }}>
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pacman-name-char"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#c0c0c0',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Fullstack Developer &amp; AI Engineer
          </motion.p>

          {/* Notation tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
          >
            {['React', 'Next.js', 'Python', 'AI/ML', 'TypeScript'].map((tag, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#FCC92F',
                  background: 'rgba(252,201,47,0.1)',
                  border: '1px solid rgba(252,201,47,0.3)',
                  borderRadius: 4,
                  padding: '4px 10px',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <a
              href="https://drive.google.com/file/d/1PflaggwfA5LozhTxx8_XQVtS_L-sfLYe/view"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#1a1a1a',
                background: '#FCC92F',
                border: '1.5px solid #FCC92F',
                borderRadius: 999,
                padding: '13px 36px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.22s, border-color 0.22s, transform 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#ffe066'
                el.style.borderColor = '#ffe066'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#FCC92F'
                el.style.borderColor = '#FCC92F'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: 14 }}>↗</span> My Resume
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.7 }}
            style={{
              display: 'flex',
              gap: 32,
              paddingTop: 28,
              borderTop: '1px solid rgba(252,201,47,0.2)',
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: '#FCC92F',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#6a6a6a',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            zIndex: 2,
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: '2px solid rgba(252,201,47,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 10, color: '#FCC92F' }}>↓</span>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}