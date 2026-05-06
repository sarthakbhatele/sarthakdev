
// components/sections/Projects.tsx
// v4
'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { projects, Project } from '@/lib/projects'
import GhostBadge from '@/components/pacman/GhostBadge'
import ProjectModal from '@/components/sections/ProjectModal'

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

function MarqueeRow({ reverse = false, bg }: { reverse?: boolean; bg: string }) {
  const images = [...projects, ...projects, ...projects]
  return (
    <div style={{ overflow: 'hidden', width: '100%', background: bg, padding: '10px 0' }}>
      <div
        style={{
          display: 'flex',
          gap: 16,
          width: 'max-content',
          animation: `${reverse ? 'marquee-rev' : 'marquee-fwd'} 30s linear infinite`,
        }}
      >
        {images.map((p, i) => (
          <div key={`${p.id}-${i}`} style={{ position: 'relative', height: 200, width: 220, flexShrink: 0, borderRadius: 8, overflow: 'hidden' }}>
            <Image src={p.screenshot} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="220px" />
          </div>
        ))}
      </div>
    </div>
  )
}

const marqueeKeyframes = `
  @keyframes marquee-fwd { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
  @keyframes marquee-rev { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
`

function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsDesktop(window.innerWidth >= 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return { isMobile, isDesktop }
}

function DesktopGrid({ children }: { children: React.ReactNode[] }) {
  const top = children.slice(0, 3)
  const bottom = children.slice(3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {top}
      </div>
      {bottom.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          width: 'calc(66.666% + 8px)',
          margin: '0 auto',
        }}>
          {bottom}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanProjects /> : <ChessProjects />
}

/* ─────────────────────── PAC-MAN ─────────────────────── */
function PacmanProjects() {
  const { isMobile, isDesktop } = useResponsive()
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleOpen = (project: Project, index: number) => {
    setActiveProject(project)
    setActiveIndex(index)
  }

  const cards = projects.map((p, i) => (
    <PacmanCard key={p.id} project={p} index={i} onOpen={() => handleOpen(p, i)} />
  ))

  return (
    <section style={{ background: '#1a1a1a', paddingTop: 'clamp(2rem, 8vw, 5rem)', paddingBottom: 'clamp(2rem, 8vw, 5rem)', }}>
      <style>{marqueeKeyframes}</style>

      <div className="page-padding">
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#FCC92F',
            marginBottom: '3rem',
            letterSpacing: '-0.02em',
          }}
        >
          Projects
        </motion.h2>
      </div>

      <div className="page-padding">
        <div style={{ position: 'relative' }}>
          {!isMobile && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0, opacity: 0.09,
              pointerEvents: 'none', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: 'rotate(-2deg) scaleX(1.1)', transformOrigin: 'center',
            }}>
              <MarqueeRow bg="#1a1a1a" />
              <MarqueeRow reverse bg="#1a1a1a" />
              <MarqueeRow bg="#1a1a1a" />
              <MarqueeRow reverse bg="#1a1a1a" />
              {!isDesktop && (
                <>
                  <MarqueeRow bg="#1a1a1a" />
                  <MarqueeRow reverse bg="#1a1a1a" />
                </>
              )}
            </div>
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {isDesktop ? (
              <DesktopGrid>{cards}</DesktopGrid>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 24 }}>
                {cards}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectModal project={activeProject} index={activeIndex} onClose={() => setActiveProject(null)} />
    </section>
  )
}

type CardProps = { project: Project; index: number; onOpen: () => void }

function PacmanCard({ project, index, onOpen }: CardProps) {
  const ghostColor = project.type === 'freelance' ? '#00CFCF' : '#FFB8FF'
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.02, borderColor: ghostColor, y: -4 }}
      onClick={onOpen}
      style={{
        background: 'rgba(26,26,26,0.92)', border: '1px solid #2a2a5a', borderRadius: 12,
        padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 14,
        cursor: 'pointer', transition: 'border-color 0.25s ease, transform 0.25s ease',
        backdropFilter: 'blur(8px)', overflow: 'hidden',
      }}
    >
      {/* Full-bleed screenshot */}
      <div style={{ position: 'relative', height: 240, margin: '-1.5rem -1.5rem 0', flexShrink: 0 }}>
        <Image src={project.screenshot} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      {/* Title + badge in one row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#FCC92F', letterSpacing: '-0.01em', margin: 0 }}>
          {project.title}
        </h3>
        <GhostBadge type={project.type} />
      </div>
      <p style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '0.88rem', color: '#A0A0A0', lineHeight: 1.65 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {project.cardStack.map(s => (
          <span key={s} style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 11, fontWeight: 600, color: '#FCC92F', background: 'rgba(252,201,47,0.1)', border: '1px solid rgba(252,201,47,0.25)', borderRadius: 999, padding: '2px 10px', letterSpacing: '0.06em' }}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 'auto', paddingTop: 8 }}>
        {[{ label: 'GitHub', href: project.github }, { label: 'Live ↗', href: project.link }].filter(({ href }) => href).map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 13, fontWeight: 600, color: '#FCC92F', textDecoration: 'underline', textUnderlineOffset: 4, letterSpacing: '0.02em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e8b520')}
            onMouseLeave={e => (e.currentTarget.style.color = '#FCC92F')}
          >
            {label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────── CHESS ────────────────────────── */
function ChessProjects() {
  const { isMobile, isDesktop } = useResponsive()
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleOpen = (project: Project, index: number) => {
    setActiveProject(project)
    setActiveIndex(index)
  }

  const cards = projects.map((p, i) => (
    <ChessCard key={p.id} project={p} index={i} onOpen={() => handleOpen(p, i)} />
  ))

  return (
    <section style={{ background: '#F5F0E8', paddingTop: 'clamp(2rem, 8vw, 5rem)', paddingBottom: 'clamp(2rem, 8vw, 5rem)', }}>
      <style>{marqueeKeyframes}</style>

      <div className="page-padding">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#2c2b29', marginBottom: '3rem' }}
        >
          Projects
        </motion.h2>
      </div>

      <div className="page-padding">
        <div style={{ position: 'relative' }}>
          {!isMobile && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
              pointerEvents: 'none', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: 'rotate(-2deg) scaleX(1.1)', transformOrigin: 'center',
            }}>
              <MarqueeRow bg="#F5F0E8" />
              <MarqueeRow reverse bg="#F5F0E8" />
              <MarqueeRow bg="#F5F0E8" />
              <MarqueeRow reverse bg="#F5F0E8" />
              {!isDesktop && (
                <>
                  <MarqueeRow bg="#F5F0E8" />
                  <MarqueeRow reverse bg="#F5F0E8" />
                </>
              )}
            </div>
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {isDesktop ? (
              <DesktopGrid>{cards}</DesktopGrid>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
                {cards}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectModal project={activeProject} index={activeIndex} onClose={() => setActiveProject(null)} />
    </section>
  )
}

function ChessCard({ project, index, onOpen }: CardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      style={{
        background: 'rgba(245,240,232,0.92)', border: '1px solid #C9C19A', borderRadius: 12,
        padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 14,
        cursor: 'pointer', transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        boxShadow: '0 1px 4px rgba(44,43,41,0.06)', backdropFilter: 'blur(8px)', overflow: 'hidden',
      }}
      onHoverStart={e => { (e.target as HTMLElement).style.boxShadow = '0 8px 28px rgba(44,43,41,0.12)' }}
      onHoverEnd={e => { (e.target as HTMLElement).style.boxShadow = '0 1px 4px rgba(44,43,41,0.06)' }}
    >
      {/* Full-bleed screenshot */}
      <div style={{ position: 'relative', height: 240, margin: '-1.5rem -1.5rem 0', flexShrink: 0 }}>
        <Image src={project.screenshot} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      {/* Title + badge in one row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '1.2rem', color: '#2c2b29', letterSpacing: '-0.01em', lineHeight: 1.3, margin: 0 }}>
          {project.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <img
            src={project.type === 'freelance' ? 'https://img.icons8.com/color/48/queen.png' : 'https://img.icons8.com/color/48/bishop.png'}
            alt={project.type} width={18} height={18}
          />
          <span style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 11, color: '#5a5a58', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {project.type === 'freelance' ? 'Client Work' : 'Personal'}
          </span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '0.875rem', color: '#5a5a58', lineHeight: 1.7 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {project.cardStack.map(s => (
          <span key={s} style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 11, color: '#4e7837', background: '#EEEED2', border: '1px solid #C9C19A', borderRadius: 4, padding: '2px 10px', letterSpacing: '0.04em' }}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 'auto', paddingTop: 8 }}>
        {[{ label: 'GitHub', href: project.github }, { label: 'Live ↗', href: project.link }].filter(({ href }) => href).map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 13, color: '#769656', textDecoration: 'underline', textUnderlineOffset: 4, letterSpacing: '0.02em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#4e7837')}
            onMouseLeave={e => (e.currentTarget.style.color = '#769656')}
          >
            {label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}