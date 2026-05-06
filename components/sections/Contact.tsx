'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

const EMAIL = 'sarthakbhatele0208@gmail.com'
const GITHUB = 'https://github.com/sarthakbhatele'
const LINKEDIN = 'https://www.linkedin.com/in/sarthak-bhatele-55a67a30a'

export default function Contact() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanContact /> : <ChessContact />
}

/* ──────────────────────── PAC-MAN ──────────────────────── */
function PacmanContact() {
  const [ghostX, setGhostX] = useState<number | null>(null)
  const [active, setActive] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const ghostRaf = useRef<number>(0)
  const ghostXRef = useRef<number | null>(null)

  const resetGhost = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    ghostXRef.current = null
    setGhostX(null)
    idleTimer.current = setTimeout(() => {
      setActive(true)
      ghostXRef.current = window.innerWidth + 60
      setGhostX(window.innerWidth + 60)
    }, 10_000)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) resetGhost()
        else {
          if (idleTimer.current) clearTimeout(idleTimer.current)
          ghostXRef.current = null
          setGhostX(null)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => {
      observer.disconnect()
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  useEffect(() => {
    if (ghostX === null) { cancelAnimationFrame(ghostRaf.current); return }
    const tick = () => {
      ghostXRef.current = (ghostXRef.current ?? window.innerWidth) - 0.6
      setGhostX(ghostXRef.current)
      ghostRaf.current = requestAnimationFrame(tick)
    }
    ghostRaf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ghostRaf.current)
  }, [active])

  return (
    <section
      ref={sectionRef}
      className="page-padding"
      onMouseMove={resetGhost}
      onClick={resetGhost}
      style={{
        background: '#1a1a1a',
        minHeight: '80vh',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {ghostX !== null && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: ghostX,
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: 48,
              opacity: 0.55,
              filter: 'drop-shadow(0 0 8px #FF000088)',
              zIndex: 1,
            }}
          >
            👻
          </div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            color: '#FCC92F',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          Insert Coin
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: '1.05rem',
            color: '#A0A0A0',
            marginBottom: '3rem',
            letterSpacing: '0.04em',
          }}
        >
          Press START to hire Sarthak
        </motion.p>

        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px 4px rgba(252,201,47,0.55)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block',
            background: '#FCC92F',
            color: '#1a1a1a',
            fontFamily: 'var(--font-space), sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '16px 48px',
            borderRadius: 6,
            textDecoration: 'none',
            cursor: 'pointer',
            marginBottom: '2.5rem',
          }}
        >
          PRESS START
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}
        >
          {[
            { label: 'GitHub', href: GITHUB },
            { label: 'LinkedIn', href: LINKEDIN },
          ].map(({ label, href }) => (

            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 13,
                color: '#A0A0A0',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FCC92F')}
              onMouseLeave={e => (e.currentTarget.style.color = '#A0A0A0')}
            >
              {label} ↗
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#2a2a5a',
            border: '1px solid rgba(252,201,47,0.3)',
            borderRadius: 8,
            padding: '10px 18px',
          }}
        >
          <span style={{ fontSize: 13 }}>👾</span>
          <span style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: '#A0A0A0',
            fontStyle: 'italic',
          }}>
            &quot;Press START to hire — or a ghost will take your spot&quot;
          </span>
        </motion.div>
      </div>

      <Footer />
    </section>
  )
}

/* ──────────────────────── CHESS ────────────────────────── */
function ChessContact() {
  return (
    <section
      className="page-padding"
      style={{
        background: '#F5F0E8',
        minHeight: '80vh',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontWeight: 700,
          fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
          color: '#2c2b29',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        Your Move.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-space), sans-serif',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: '#5a5a58',
          marginBottom: '3rem',
          letterSpacing: '0.01em',
        }}
      >
        The board is set. The pieces are moving.
      </motion.p>

      <motion.a
        href={`mailto:${EMAIL}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5 }}
        whileHover={{ backgroundColor: '#769656', color: '#F5F0E8' }}
        style={{
          display: 'inline-block',
          background: 'transparent',
          color: '#769656',
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.05rem',
          letterSpacing: '0.04em',
          padding: '14px 44px',
          border: '1.5px solid #769656',
          borderRadius: 3,
          textDecoration: 'none',
          cursor: 'pointer',
          width: 'fit-content',
          transition: 'background 0.3s ease, color 0.3s ease',
          marginBottom: '2.5rem',
        }}
      >
        Make Contact
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}
      >
        {[
          { label: 'GitHub', href: GITHUB },
          { label: 'LinkedIn', href: LINKEDIN },
        ].map(({ label, href }) => (

          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 14,
              color: '#5a5a58',
              textDecoration: 'underline',
              textUnderlineOffset: 5,
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#769656')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5a5a58')}
          >
            {label} ↗
          </a>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.55 }}
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#C9C19A',
          letterSpacing: '0.01em',
          lineHeight: 1.7,
          maxWidth: '44ch',
        }}
      >
        &quot;Check. My portfolio compiles. Checkmate. It also works.&quot;
      </motion.p>

      <Footer />
    </section>
  )
}

/* ──────────────────────── FOOTER ────────────────────────── */
function Footer() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanFooter /> : <ChessFooter />
}

const GHOST_DOTS = ['#FF0000', '#FFB8FF', '#00CFCF', '#FFB852', '#FCC92F']

function PacmanFooter() {
  return (
    <footer
      className="page-padding"
      style={{
        borderTop: '1px solid #2a2a5a',
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: 'auto',
      }}
    >
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
      `}</style>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-space), sans-serif',
          fontWeight: 700,
          fontSize: 13,
          color: '#FCC92F',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Sarthak Bhatele
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          <SocialIcon href={GITHUB} label="GitHub" icon={<GithubIcon />} isPacman />
          <SocialIcon href={LINKEDIN} label="LinkedIn" icon={<LinkedInIcon />} isPacman />
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-space), sans-serif',
        fontSize: 12,
        color: '#A0A0A0',
        textAlign: 'center',
        marginTop: 16,
        letterSpacing: '0.04em',
      }}>
        © 2026 — Built with Next.js, Three.js, and too much coffee
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        {GHOST_DOTS.map((color, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: color,
              animation: `dot-pulse 1.6s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </footer>
  )
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function ChessFooter() {
  return (
    <footer
      className="page-padding"
      style={{
        borderTop: '1px solid #C9C19A',
        paddingTop: 32,
        paddingBottom: 30,
        marginTop: 'auto',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-playfair), serif',
          fontStyle: 'italic',
          fontSize: 15,
          color: '#2c2b29',
        }}>
          Sarthak Bhatele
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          <SocialIcon href={GITHUB} label="GitHub" icon={<GithubIcon />} isPacman={false} />
          <SocialIcon href={LINKEDIN} label="LinkedIn" icon={<LinkedInIcon />} isPacman={false} />
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-space), sans-serif',
        fontSize: 12,
        color: '#5a5a58',
        textAlign: 'center',
        marginTop: 16,
        letterSpacing: '0.03em',
      }}>
        © 2026 — Crafted in Gwalior, India{' '}
        <span style={{ color: '#769656' }}>♟</span>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
        {FILES.map(f => (
          <span
            key={f}
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 11,
              color: '#C9C19A',
              letterSpacing: '0.04em',
              userSelect: 'none',
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </footer>
  )
}

/* ──────────────────────── SHARED ICONS ────────────────────────── */
interface SocialIconProps {
  href: string
  label: string
  icon: React.ReactNode
  isPacman: boolean
}

function SocialIcon({ href, label, icon, isPacman }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        color: '#A0A0A0',
        transition: 'color 0.2s ease',
        borderRadius: 6,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = isPacman ? '#FCC92F' : '#769656')}
      onMouseLeave={e => (e.currentTarget.style.color = '#A0A0A0')}
    >
      {icon}
    </a>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}