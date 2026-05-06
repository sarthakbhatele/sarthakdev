'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

// ─── Icons ───────────────────────────────────────────────────────────────────
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si'
import { SiNodedotjs, SiExpress, SiPostgresql, SiMysql, SiFirebase } from 'react-icons/si'
import { SiPython, SiLangchain, SiGooglegemini, SiAnthropic } from 'react-icons/si'
import { SiGit, SiGithub, SiPostman, SiClerk } from 'react-icons/si'
import { FaRobot, FaDatabase, FaAws } from 'react-icons/fa'
import { SiCplusplus, SiShadcnui } from 'react-icons/si'
import { BsStack } from 'react-icons/bs'

// ─── Theme palette ────────────────────────────────────────────────────────────
const GHOST_COLORS = ['#00CFCF', '#FF6060', '#FFB8FF', '#FFB852']
const GHOST_ICON_URL =
  'https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-pacman-game-dreamstale-lineal-dreamstale.png'

const OPENINGS = [
  { name: "King's Gambit", subtitle: 'Aggressive by default. Ship first, refactor later.' },
  { name: 'Sicilian Defence', subtitle: 'Rock-solid foundations that scale under pressure.' },
  { name: "Queen's Gambit", subtitle: 'High complexity, higher leverage. Worth the study.' },
  { name: 'London System', subtitle: 'Consistent patterns. Boring setup, deadly output.' },
]

// ─── Quadrant skill data ──────────────────────────────────────────────────────
// Positions are % within the quadrant (0–100), clamped at runtime
const QUADRANTS = [
  {
    id: 'frontend', label: 'Frontend', openingIdx: 0,
    labelPos: { right: '2%', top: '3%' }, labelAlign: 'right' as const,
    items: [
      { name: 'JavaScript', Icon: SiJavascript, px: 62, py: 20 },
      { name: 'TypeScript', Icon: SiTypescript, px: 82, py: 14 },
      { name: 'React.js', Icon: SiReact, px: 70, py: 36 },
      { name: 'Next.js', Icon: SiNextdotjs, px: 88, py: 30 },
      { name: 'TailwindCSS', Icon: SiTailwindcss, px: 60, py: 52 },
      { name: 'Shadcn UI', Icon: SiShadcnui, px: 80, py: 50 },
    ],
  },
  {
    id: 'backend', label: 'Backend', openingIdx: 1,
    labelPos: { left: '2%', top: '3%' }, labelAlign: 'left' as const,
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, px: 12, py: 18 },
      { name: 'Express.js', Icon: SiExpress, px: 32, py: 12 },
      { name: 'PostgreSQL', Icon: SiPostgresql, px: 14, py: 38 },
      { name: 'MySQL', Icon: SiMysql, px: 36, py: 32 },
      { name: 'Firebase', Icon: SiFirebase, px: 20, py: 54 },
      // { name: 'Convex',      Icon: SiConvex,      px: 40, py: 50 },
      { name: 'SQL', Icon: FaDatabase, px: 28, py: 44 },
    ],
  },
  {
    id: 'aiml', label: 'AI / ML', openingIdx: 2,
    labelPos: { left: '2%', bottom: '3%' }, labelAlign: 'left' as const,
    items: [
      { name: 'Python', Icon: SiPython, px: 12, py: 60 },
      { name: 'LangChain', Icon: SiLangchain, px: 34, py: 68 },
      { name: 'Gemini API', Icon: SiGooglegemini, px: 14, py: 78 },
      { name: 'Claude', Icon: SiAnthropic, px: 36, py: 84 },
      { name: 'AI Workflows', Icon: FaRobot, px: 22, py: 90 },
    ],
  },
  {
    id: 'tools', label: 'Tools', openingIdx: 3,
    labelPos: { right: '2%', bottom: '3%' }, labelAlign: 'right' as const,
    items: [
      { name: 'Git', Icon: SiGit, px: 68, py: 60 },
      { name: 'GitHub', Icon: SiGithub, px: 84, py: 66 },
      { name: 'Postman', Icon: SiPostman, px: 62, py: 74 },
      { name: 'AWS S3', Icon: FaAws, px: 80, py: 80 },
      { name: 'Modal', Icon: BsStack, px: 68, py: 86 },
      { name: 'Inngest', Icon: BsStack, px: 84, py: 88 },
      { name: 'Clerk', Icon: SiClerk, px: 74, py: 94 },
      { name: 'C++', Icon: SiCplusplus, px: 60, py: 64 },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

// Given quadrant index, return which half of the board it owns
function quadrantBounds(qi: number): { xMin: number; xMax: number; yMin: number; yMax: number } {
  // Board is 100%×100%; quadrants: 0=TR, 1=TL, 2=BL, 3=BR
  const isRight = qi === 0 || qi === 3
  const isBottom = qi === 2 || qi === 3
  return {
    xMin: isRight ? 50 : 0,
    xMax: isRight ? 100 : 50,
    yMin: isBottom ? 50 : 0,
    yMax: isBottom ? 100 : 50,
  }
}

// ─── Single Pill ──────────────────────────────────────────────────────────────
interface PillProps {
  name: string
  Icon: React.ElementType
  /** Initial position as % of total board (0–100) */
  initPx: number
  initPy: number
  /** Quadrant bounds in board-% so pill never escapes */
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
  pillStyle: React.CSSProperties
  /** Board rect so we can convert mouse px → board-% */
  boardRectRef: React.RefObject<DOMRect | null>
  isQuadHovered: boolean
  onRearrange: (id: string, px: number, py: number) => void
  id: string
}

function Pill({
  name, Icon, initPx, initPy, bounds, pillStyle, boardRectRef,
  isQuadHovered, onRearrange, id,
}: PillProps) {
  // Position in board-% stored as refs for physics
  const posRef = useRef({ x: initPx, y: initPy })

  const mvX = useMotionValue(initPx)   // in board-%
  const mvY = useMotionValue(initPy)

  const sx = useSpring(mvX, { stiffness: 120, damping: 22, mass: 0.5 })
  const sy = useSpring(mvY, { stiffness: 120, damping: 22, mass: 0.5 })

  const isDragging = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  // ── Repulsion ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isDragging.current) return

    const RADIUS = 60   // px — small radius
    const FORCE = 12   // max push in board-%

    const onMove = (e: MouseEvent) => {
      if (isDragging.current) return
      const rect = boardRectRef.current
      if (!rect) return

      // Mouse in board-%
      const mx = ((e.clientX - rect.left) / rect.width) * 100
      const my = ((e.clientY - rect.top) / rect.height) * 100

      // Pill center in board-%
      const px = posRef.current.x
      const py = posRef.current.y

      // Distance in px
      const dxPx = (mx - px) / 100 * rect.width
      const dyPx = (my - py) / 100 * rect.height
      const dist = Math.sqrt(dxPx * dxPx + dyPx * dyPx)

      if (dist < RADIUS && dist > 0.1) {
        const strength = (1 - dist / RADIUS) * FORCE  // 0→FORCE
        // Push AWAY from cursor (opposite direction)
        const ndx = -dxPx / dist
        const ndy = -dyPx / dist
        // Convert push from px → board-%
        const pushX = (ndx * strength / rect.width) * 100
        const pushY = (ndy * strength / rect.height) * 100

        const nx = clamp(posRef.current.x + pushX, bounds.xMin + 2, bounds.xMax - 2)
        const ny = clamp(posRef.current.y + pushY, bounds.yMin + 2, bounds.yMax - 2)
        posRef.current = { x: nx, y: ny }
        mvX.set(nx)
        mvY.set(ny)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [bounds, mvX, mvY, boardRectRef])

  // ── Rearrange on quad-hover-leave ─────────────────────────────────────────
  const prevHovered = useRef(false)
  useEffect(() => {
    if (!isQuadHovered && prevHovered.current) {
      // Pick a new random position inside bounds
      const margin = 4
      const nx = clamp(
        bounds.xMin + margin + Math.random() * (bounds.xMax - bounds.xMin - margin * 2),
        bounds.xMin + margin, bounds.xMax - margin,
      )
      const ny = clamp(
        bounds.yMin + margin + Math.random() * (bounds.yMax - bounds.yMin - margin * 2),
        bounds.yMin + margin, bounds.yMax - margin,
      )
      posRef.current = { x: nx, y: ny }
      mvX.set(nx)
      mvY.set(ny)
      onRearrange(id, nx, ny)
    }
    prevHovered.current = isQuadHovered
  }, [isQuadHovered, bounds, mvX, mvY, id, onRearrange])

  // ── Drag ──────────────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
      ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
    isDragging.current = true
    const rect = boardRectRef.current
    if (!rect) return
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      px: posRef.current.x,
      py: posRef.current.y,
    }
  }, [boardRectRef])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const rect = boardRectRef.current
    if (!rect) return

    const dxPc = ((e.clientX - dragStart.current.mx) / rect.width) * 100
    const dyPc = ((e.clientY - dragStart.current.my) / rect.height) * 100

    const margin = 2
    const nx = clamp(dragStart.current.px + dxPc, bounds.xMin + margin, bounds.xMax - margin)
    const ny = clamp(dragStart.current.py + dyPc, bounds.yMin + margin, bounds.yMax - margin)

    posRef.current = { x: nx, y: ny }
    mvX.set(nx)
    mvY.set(ny)
  }, [bounds, mvX, mvY, boardRectRef])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <motion.span
      className="q-pill"
      style={{
        left: 0, top: 0,
        x: sx.get() + '%',   // will be overridden by motion
        y: sy.get() + '%',
        // Use translateX/Y as %→px via CSS transform trick below
        position: 'absolute',
        cursor: 'grab',
        ...pillStyle,
      }}
      // Motion drives position via custom CSS var trick — simplest: just use left/top via springs
      // We'll use a wrapper approach with style directly
      animate={false as unknown as undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {/* @ts-expect-error react-icons size prop */}
      <Icon size={12} />
      {name}
    </motion.span>
  )
}

// ─── We need a different approach for positioning since we're using board-%
// Let's use a simpler but correct approach with a dedicated PillWrapper
interface PillWrapperProps {
  name: string
  Icon: React.ElementType
  initPx: number
  initPy: number
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
  pillStyle: React.CSSProperties
  boardRectRef: React.RefObject<DOMRect | null>
  isQuadHovered: boolean
}

function PillWrapper({ name, Icon, initPx, initPy, bounds, pillStyle, boardRectRef, isQuadHovered }: PillWrapperProps) {
  const posRef = useRef({ x: initPx, y: initPy })
  const isDragging = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  // Spring-driven left/top in board-%
  const mvX = useMotionValue(initPx)
  const mvY = useMotionValue(initPy)
  const sx = useSpring(mvX, { stiffness: 110, damping: 20, mass: 0.55 })
  const sy = useSpring(mvY, { stiffness: 110, damping: 20, mass: 0.55 })

  // Convert board-% springs to pixel-based left/top using transforms
  // We render as: left: `${sx}%`, top: `${sy}%`, transform: translate(-50%,-50%)
  // But motion doesn't support % in left/top as MotionValue directly.
  // So we use a style transform approach.

  // ── Repulsion ────────────────────────────────────────────────────────────
  useEffect(() => {
    const RADIUS = 55
    const FORCE = 10

    const onMove = (e: MouseEvent) => {
      if (isDragging.current) return
      const rect = boardRectRef.current
      if (!rect) return

      const mx = ((e.clientX - rect.left) / rect.width) * 100
      const my = ((e.clientY - rect.top) / rect.height) * 100

      const px = posRef.current.x
      const py = posRef.current.y

      const dxPx = (mx - px) / 100 * rect.width
      const dyPx = (my - py) / 100 * rect.height
      const dist = Math.sqrt(dxPx * dxPx + dyPx * dyPx)

      if (dist < RADIUS && dist > 0.5) {
        const strength = (1 - dist / RADIUS) * FORCE
        const nx = clamp(posRef.current.x + (-dxPx / dist * strength / rect.width * 100), bounds.xMin + 2, bounds.xMax - 2)
        const ny = clamp(posRef.current.y + (-dyPx / dist * strength / rect.height * 100), bounds.yMin + 2, bounds.yMax - 2)
        posRef.current = { x: nx, y: ny }
        mvX.set(nx)
        mvY.set(ny)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [bounds, mvX, mvY, boardRectRef])

  // ── Hover-leave rearrange ─────────────────────────────────────────────────
  const prevHovered = useRef(false)
  useEffect(() => {
    if (!isQuadHovered && prevHovered.current) {
      const margin = 5
      const nx = bounds.xMin + margin + Math.random() * (bounds.xMax - bounds.xMin - margin * 2)
      const ny = bounds.yMin + margin + Math.random() * (bounds.yMax - bounds.yMin - margin * 2)
      const cx = clamp(nx, bounds.xMin + margin, bounds.xMax - margin)
      const cy = clamp(ny, bounds.yMin + margin, bounds.yMax - margin)
      posRef.current = { x: cx, y: cy }
      mvX.set(cx)
      mvY.set(cy)
    }
    prevHovered.current = isQuadHovered
  }, [isQuadHovered, bounds, mvX, mvY])

  // ── Drag ─────────────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
      ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
    isDragging.current = true
    dragStart.current = { mx: e.clientX, my: e.clientY, px: posRef.current.x, py: posRef.current.y }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const rect = boardRectRef.current
    if (!rect) return
    const dxPc = ((e.clientX - dragStart.current.mx) / rect.width) * 100
    const dyPc = ((e.clientY - dragStart.current.my) / rect.height) * 100
    const margin = 2
    const nx = clamp(dragStart.current.px + dxPc, bounds.xMin + margin, bounds.xMax - margin)
    const ny = clamp(dragStart.current.py + dyPc, bounds.yMin + margin, bounds.yMax - margin)
    posRef.current = { x: nx, y: ny }
    mvX.set(nx)
    mvY.set(ny)
  }

  const onPointerUp = () => { isDragging.current = false }

  return (
    <motion.span
      className="q-pill"
      style={{
        position: 'absolute',
        // We drive left/top via CSS variable updated by rAF
        left: 0,
        top: 0,
        cursor: 'grab',
        ...pillStyle,
        // Use willChange for perf
        willChange: 'transform',
      }}
      // Use custom motion style to drive transform
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      // Drive position via a motion template
      transformTemplate={(_, generated) => {
        return `${generated}`
      }}
      animate={{}}
    >
      <PillInner sx={sx} sy={sy} name={name} Icon={Icon} pillStyle={pillStyle} />
    </motion.span>
  )
}

// Inner component that reads springs each frame
function PillInner({
  sx, sy, name, Icon, pillStyle,
}: {
  sx: ReturnType<typeof useSpring>
  sy: ReturnType<typeof useSpring>
  name: string
  Icon: React.ElementType
  pillStyle: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsub1 = sx.on('change', update)
    const unsub2 = sy.on('change', update)
    update()
    return () => { unsub1(); unsub2() }

    function update() {
      if (ref.current) {
        ref.current.style.transform = `translate(calc(${sx.get()}vw * 0), translate(-50%,-50%)`
        // We need board-based position. Use parent board offsetWidth instead.
        // This won't work cleanly. Let's use a different architecture below.
      }
    }
  }, [sx, sy])

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      {/* @ts-expect-error react-icons size prop */}
      <Icon size={12} />
      {name}
    </span>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CLEAN REWRITE — single self-contained pill using rAF + direct DOM style
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface CleanPillProps {
  name: string
  Icon: React.ElementType
  initPx: number   // 0-100 board %
  initPy: number
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
  pillStyle: React.CSSProperties
  boardRef: React.RefObject<HTMLDivElement | null>
  isQuadHovered: boolean
}

function CleanPill({ name, Icon, initPx, initPy, bounds, pillStyle, boardRef, isQuadHovered }: CleanPillProps) {
  const el = useRef<HTMLSpanElement>(null)

  // Current rendered position (board %)
  const cur = useRef({ x: initPx, y: initPy })
  // Target position (board %)
  const tgt = useRef({ x: initPx, y: initPy })
  // Velocity for spring
  const vel = useRef({ x: 0, y: 0 })

  const isDragging = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })
  const rafId = useRef<number>(0)
  const prevHovered = useRef(false)
  const mounted = useRef(false)

  // ── Spring loop ──────────────────────────────────────────────────────────
  const STIFFNESS = 0.12
  const DAMPING = 0.75

  useEffect(() => {
    mounted.current = true
    let animating = true

    const loop = () => {
      if (!animating) return
      const span = el.current
      if (span) {
        const dx = tgt.current.x - cur.current.x
        const dy = tgt.current.y - cur.current.y
        vel.current.x = vel.current.x * DAMPING + dx * STIFFNESS
        vel.current.y = vel.current.y * DAMPING + dy * STIFFNESS
        cur.current.x += vel.current.x
        cur.current.y += vel.current.y

        const board = boardRef.current
        if (board) {
          const bw = board.offsetWidth
          const bh = board.offsetHeight
          const px = (cur.current.x / 100) * bw
          const py = (cur.current.y / 100) * bh
          span.style.transform = `translate(calc(${px}px - 50%), calc(${py}px - 50%))`
        }
      }
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)
    return () => {
      animating = false
      cancelAnimationFrame(rafId.current)
      mounted.current = false
    }
  }, [boardRef])

  // ── Repulsion ────────────────────────────────────────────────────────────
  useEffect(() => {
    const RADIUS = 55   // px
    const FORCE = 8    // board-% push max

    const onMove = (e: MouseEvent) => {
      if (isDragging.current) return
      const board = boardRef.current
      if (!board) return
      const rect = board.getBoundingClientRect()

      const mx = ((e.clientX - rect.left) / rect.width) * 100
      const my = ((e.clientY - rect.top) / rect.height) * 100

      const px = tgt.current.x
      const py = tgt.current.y

      const dxPx = (mx - px) / 100 * rect.width
      const dyPx = (my - py) / 100 * rect.height
      const dist = Math.sqrt(dxPx * dxPx + dyPx * dyPx)

      if (dist < RADIUS && dist > 0.5) {
        const strength = (1 - dist / RADIUS) * FORCE
        const pushX = (-dxPx / dist) * strength / rect.width * 100
        const pushY = (-dyPx / dist) * strength / rect.height * 100
        const margin = 3
        tgt.current.x = clamp(tgt.current.x + pushX, bounds.xMin + margin, bounds.xMax - margin)
        tgt.current.y = clamp(tgt.current.y + pushY, bounds.yMin + margin, bounds.yMax - margin)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [bounds, boardRef])

  // ── Hover-leave rearrange ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isQuadHovered && prevHovered.current) {
      const margin = 5
      const nx = bounds.xMin + margin + Math.random() * (bounds.xMax - bounds.xMin - margin * 2)
      const ny = bounds.yMin + margin + Math.random() * (bounds.yMax - bounds.yMin - margin * 2)
      tgt.current.x = clamp(nx, bounds.xMin + margin, bounds.xMax - margin)
      tgt.current.y = clamp(ny, bounds.yMin + margin, bounds.yMax - margin)
    }
    prevHovered.current = isQuadHovered
  }, [isQuadHovered, bounds])

  // ── Drag ─────────────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
      ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
    isDragging.current = true
    dragStart.current = { mx: e.clientX, my: e.clientY, px: tgt.current.x, py: tgt.current.y }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const board = boardRef.current
    if (!board) return
    const rect = board.getBoundingClientRect()
    const dxPc = ((e.clientX - dragStart.current.mx) / rect.width) * 100
    const dyPc = ((e.clientY - dragStart.current.my) / rect.height) * 100
    const margin = 2
    tgt.current.x = clamp(dragStart.current.px + dxPc, bounds.xMin + margin, bounds.xMax - margin)
    tgt.current.y = clamp(dragStart.current.py + dyPc, bounds.yMin + margin, bounds.yMax - margin)
  }

  const onPointerUp = () => { isDragging.current = false }

  // ── Fade-in on mount ──────────────────────────────────────────────────────
  return (
    <span
      ref={el}
      className="q-pill"
      style={{
        position: 'absolute',
        left: 0, top: 0,
        cursor: 'grab',
        userSelect: 'none',
        willChange: 'transform',
        transition: 'opacity 0.4s, background-color 0.18s, color 0.18s',
        ...pillStyle,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* @ts-expect-error react-icons size prop */}
      <Icon size={12} />
      {name}
    </span>
  )
}

// ─── Quadrant wrapper ─────────────────────────────────────────────────────────
function QuadrantGroup({
  q, qi, isHovered, boardRef, theme,
}: {
  q: typeof QUADRANTS[0]
  qi: number
  isHovered: boolean
  boardRef: React.RefObject<HTMLDivElement | null>
  theme: 'chess' | 'pacman'
}) {
  const bounds = quadrantBounds(qi)
  const color = GHOST_COLORS[qi]

  const getPillStyle = (): React.CSSProperties =>
    theme === 'chess'
      ? { fontFamily: 'var(--font-space),sans-serif', color: '#2c2b29', background: '#EEEED2', border: '1px solid #C9C19A' }
      : { fontFamily: 'var(--font-space),sans-serif', color, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}55` }

  const labelStyle: React.CSSProperties = theme === 'chess'
    ? {}
    : { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: q.labelAlign === 'right' ? 'flex-end' : 'flex-start' }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Category label */}
      <motion.div
        className="q-cat-label"
        style={{ ...(q.labelPos as React.CSSProperties), ...labelStyle }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: qi * 0.1, duration: 0.5 }}
      >
        {theme === 'pacman' ? (
          <>
            <div style={{
              width: 20, height: 20, backgroundColor: color, flexShrink: 0,
              WebkitMaskImage: `url(${GHOST_ICON_URL})`, maskImage: `url(${GHOST_ICON_URL})`,
              WebkitMaskSize: 'contain', maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
            }} />
            <span style={{ fontFamily: 'var(--font-space),sans-serif', fontWeight: 800, fontSize: '0.92rem', color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {q.label}
            </span>
          </>
        ) : (
          <>
            <span style={{ fontFamily: 'var(--font-playfair),serif', fontWeight: 800, fontSize: '1.05rem', color: '#2c2b29', letterSpacing: '-0.01em' }}>
              {OPENINGS[q.openingIdx].name}
            </span>
            <span style={{ fontFamily: 'var(--font-space),sans-serif', fontStyle: 'italic', fontSize: '0.7rem', color: '#769656', lineHeight: 1.4 }}>
              {q.label} · {OPENINGS[q.openingIdx].subtitle}
            </span>
          </>
        )}
      </motion.div>

      {/* Pills — pointerEvents re-enabled */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
        {q.items.map(({ name, Icon, px, py }) => (
          <CleanPill
            key={name}
            name={name}
            Icon={Icon}
            initPx={px}
            initPy={py}
            bounds={bounds}
            pillStyle={getPillStyle()}
            boardRef={boardRef}
            isQuadHovered={isHovered}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Desktop Board ────────────────────────────────────────────────────────────
function SkillsBoard({ theme }: { theme: 'chess' | 'pacman' }) {
  const [hoveredQuad, setHoveredQuad] = useState<number | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const axisColor = theme === 'chess'
    ? 'rgba(201,193,154,0.6)'
    : 'rgba(252,201,47,0.25)'
  const dotColor = theme === 'chess' ? '#C9C19A' : '#FCC92F'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const isRight = x > rect.width / 2
    const isBottom = y > rect.height / 2
    let qi = -1
    if (!isBottom && isRight) qi = 0
    if (!isBottom && !isRight) qi = 1
    if (isBottom && !isRight) qi = 2
    if (isBottom && isRight) qi = 3
    if (hoveredQuad !== qi) setHoveredQuad(qi)
  }

  return (
    <div
      ref={boardRef}
      className="skills-quadrant"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredQuad(null)}
    >
      {/* Axes */}
      <div className="q-axis-h" style={{ background: `linear-gradient(to right, transparent, ${axisColor} 30%, ${axisColor} 70%, transparent)` }} />
      <div className="q-axis-v" style={{ background: `linear-gradient(to bottom, transparent, ${axisColor} 20%, ${axisColor} 80%, transparent)` }} />
      <div className="q-dot" style={{ background: dotColor }} />

      {QUADRANTS.map((q, qi) => (
        <QuadrantGroup
          key={q.id} q={q} qi={qi}
          isHovered={hoveredQuad === qi}
          boardRef={boardRef as React.RefObject<HTMLDivElement>}
          theme={theme}
        />
      ))}
    </div>
  )
}

// ─── Mobile / Tablet Grid ─────────────────────────────────────────────────────
function MobileGrid({ theme }: { theme: 'chess' | 'pacman' }) {
  return (
    <div
      className="skills-mobile-grid"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2.5rem' }}
    >
      {QUADRANTS.map((q, gi) => {
        const color = GHOST_COLORS[gi]
        return (
          <motion.div key={q.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: gi * 0.12, duration: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {/* Header */}
            <div style={{ paddingBottom: '0.75rem', borderBottom: theme === 'chess' ? '1px solid #C9C19A' : `1px solid ${color}44` }}>
              {theme === 'chess' ? (
                <>
                  <p style={{ fontFamily: 'var(--font-playfair),serif', fontWeight: 700, fontSize: '1.05rem', color: '#2c2b29', marginBottom: 4 }}>
                    {OPENINGS[q.openingIdx].name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-space),sans-serif', fontStyle: 'italic', fontSize: '0.78rem', color: '#769656', lineHeight: 1.5 }}>
                    {OPENINGS[q.openingIdx].subtitle}
                  </p>
                  <span style={{ fontFamily: 'var(--font-space),sans-serif', fontSize: '0.7rem', fontWeight: 600, color: '#5a5a58', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginTop: 6 }}>
                    {q.label}
                  </span>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, backgroundColor: color,
                    WebkitMaskImage: `url(${GHOST_ICON_URL})`, maskImage: `url(${GHOST_ICON_URL})`,
                    WebkitMaskSize: 'contain', maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                  }} />
                  <span style={{ fontFamily: 'var(--font-space),sans-serif', fontWeight: 700, fontSize: '0.85rem', color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {q.label}
                  </span>
                </div>
              )}
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {q.items.map(({ name, Icon }, si) => (
                <motion.span key={name}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: gi * 0.1 + si * 0.07, duration: 0.35 }}
                  style={
                    theme === 'chess'
                      ? { fontFamily: 'var(--font-space),sans-serif', fontSize: 13, fontWeight: 500, color: '#2c2b29', background: '#EEEED2', border: '1px solid #C9C19A', borderRadius: 4, padding: '5px 14px', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 6 }
                      : { fontFamily: 'var(--font-space),sans-serif', fontSize: 13, fontWeight: 500, color, background: 'transparent', border: `1px solid ${color}`, borderRadius: 999, padding: '5px 14px', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 6 }
                  }
                >
                  <Icon size={12} />{name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Skills() {
  const { isPacman } = useTheme()
  const theme: 'chess' | 'pacman' = isPacman ? 'pacman' : 'chess'

  const bg = theme === 'chess' ? '#F5F0E8' : '#1a1a1a'
  const title = theme === 'chess' ? 'Repertoire' : 'Power-Ups'
  const footer = theme === 'chess'
    ? '"Every opening is a philosophy. Mine is shipping."'
    : '// 4 ghosts. 4 skill sets. Same goal: eat everything.'
  const titleStyle: React.CSSProperties = theme === 'chess'
    ? { fontFamily: 'var(--font-playfair),serif', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#2c2b29' }
    : { fontFamily: 'var(--font-space),sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: '#FCC92F', letterSpacing: '-0.01em' }
  const footerStyle: React.CSSProperties = theme === 'chess'
    ? { fontFamily: 'var(--font-playfair),serif', fontStyle: 'italic', fontSize: '1.05rem', color: '#769656', borderTop: '1px solid #C9C19A', letterSpacing: '0.01em', textAlign: 'center' }
    : { fontFamily: 'monospace', fontSize: 13, color: '#A0A0A0', borderTop: '1px solid #2a2a5a', letterSpacing: '0.04em' }

  return (
    <section
      className="page-padding"
      style={{ background: bg, paddingTop: 'clamp(3rem,8vw,5rem)', paddingBottom: 'clamp(3rem,8vw,5rem)' }}
    >
      <style>{`
        .skills-quadrant {
          display: none;
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 460px;
        }
        @media (min-width: 768px) {
          .skills-quadrant { display: block; }
          .skills-mobile-grid { display: none !important; }
        }
        .q-axis-h { position:absolute;left:0;right:0;top:50%;height:1px;transform:translateY(-50%);pointer-events:none;z-index:1; }
        .q-axis-v { position:absolute;top:0;bottom:0;left:50%;width:1px;transform:translateX(-50%);pointer-events:none;z-index:1; }
        .q-dot { position:absolute;top:50%;left:50%;width:7px;height:7px;border-radius:50%;transform:translate(-50%,-50%);z-index:3; }
        .q-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 999px;
          padding: 5px 13px 5px 10px;
          white-space: nowrap;
          z-index: 2;
        }
        .q-pill:hover { filter: brightness(1.15); }
        .q-cat-label {
          position: absolute;
          z-index: 4;
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-width: 220px;
          pointer-events: none;
        }
      `}</style>

      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ ...titleStyle, marginBottom: '2.5rem' }}
      >
        {title}
      </motion.h2>

      <SkillsBoard theme={theme} />
      <MobileGrid theme={theme} />

      <motion.p
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
        style={{ ...footerStyle, marginTop: '3.5rem', paddingTop: '2rem' }}
      >
        {theme === 'chess' ? `"${footer.replace(/"/g, '')}"` : footer}
      </motion.p>
    </section>
  )
}