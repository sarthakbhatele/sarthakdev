// 'use client'

// import { useRef, useEffect, useState } from 'react'
// import { useTheme } from '@/hooks/useTheme'

// const YELLOW = '#FCC92F'
// const GHOST_CLR = '#FF0000'
// const WIDTH = 40
// const GHOST_LAG = 0.18

// export default function PacmanCanvas() {
//   const { isPacman } = useTheme()
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const rafRef = useRef<number>(0)
//   const mouthRef = useRef(0)
//   const mouthDirRef = useRef(1)
//   const progressRef = useRef(0)
//   const dirRef = useRef<1 | -1>(1)
//   const prevProgRef = useRef(0)

//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640)
//     check()
//     window.addEventListener('resize', check)
//     return () => window.removeEventListener('resize', check)
//   }, [])

//   useEffect(() => {
//     if (!isPacman) return
//     const onScroll = () => {
//       const max = document.body.scrollHeight - window.innerHeight
//       const p = max > 0 ? window.scrollY / max : 0
//       if (p > prevProgRef.current) dirRef.current = 1
//       else if (p < prevProgRef.current) dirRef.current = -1
//       prevProgRef.current = p
//       progressRef.current = p
//     }
//     onScroll()
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [isPacman])

//   // isMobile in deps — re-runs when switching between mobile ↔ desktop
//   useEffect(() => {
//     if (!isPacman || isMobile) return
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     const PAC_R = 13
//     const DOT_R = 3.5
//     const DOT_GAP = 22

//     const resize = () => {
//       canvas.width = WIDTH
//       canvas.height = window.innerHeight
//     }
//     resize()

//     const ro = new ResizeObserver(resize)
//     ro.observe(document.body)

//     const draw = () => {
//       const H = canvas.height
//       const cx = WIDTH / 2

//       ctx.clearRect(0, 0, WIDTH, H)

//       const progress = progressRef.current
//       const dir = dirRef.current
//       const pacY = PAC_R + progress * (H - PAC_R * 2)
//       const ghostY = pacY - dir * GHOST_LAG * H

//       // ── Dots ──
//       const count = Math.floor(H / DOT_GAP)
//       for (let i = 0; i < count; i++) {
//         const y = (i + 0.5) * DOT_GAP
//         if (dir === 1 && y < pacY - PAC_R) continue
//         if (dir === -1 && y > pacY + PAC_R) continue
//         ctx.beginPath()
//         ctx.arc(cx, y, DOT_R / 2, 0, Math.PI * 2)
//         ctx.fillStyle = YELLOW
//         ctx.globalAlpha = 0.9
//         ctx.fill()
//       }
//       ctx.globalAlpha = 1

//       // ── Mouth oscillation ──
//       mouthRef.current += 0.07 * mouthDirRef.current
//       if (mouthRef.current >= 1) mouthDirRef.current = -1
//       if (mouthRef.current <= 0) mouthDirRef.current = 1
//       const mouthAngle = mouthRef.current * 0.28

//       // ── Pac-Man ──
//       ctx.save()
//       ctx.translate(cx, pacY)
//       ctx.rotate(dir === 1 ? Math.PI / 2 : -Math.PI / 2)
//       ctx.beginPath()
//       ctx.moveTo(0, 0)
//       ctx.arc(0, 0, PAC_R, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI)
//       ctx.closePath()
//       ctx.fillStyle = YELLOW
//       ctx.fill()
//       ctx.restore()

//       // ── Ghost ──
//       const ghostVisible = progress > 0 && ghostY > PAC_R && ghostY < H - PAC_R
//       if (ghostVisible) {
//         drawGhost(ctx, cx, ghostY, PAC_R, GHOST_CLR, dir)
//       }

//       rafRef.current = requestAnimationFrame(draw)
//     }

//     rafRef.current = requestAnimationFrame(draw)

//     return () => {
//       cancelAnimationFrame(rafRef.current)
//       ro.disconnect()
//     }
//   }, [isPacman, isMobile])  // ← isMobile here is the key fix

//   if (!isPacman || isMobile) return null

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         right: 0,
//         width: WIDTH,
//         zIndex: 50,
//         pointerEvents: 'none',
//         display: 'block',
//       }}
//     />
//   )
// }

// function drawGhost(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   r: number,
//   color: string,
//   dir: 1 | -1,
// ) {
//   ctx.save()
//   ctx.translate(x, y)
//   ctx.rotate(dir === 1 ? Math.PI : 0)

//   const w = r * 1.4
//   const h = r * 1.8
//   const top = -h * 0.6

//   ctx.beginPath()
//   ctx.arc(0, top + w * 0.5, w * 0.5, Math.PI, 0)
//   ctx.lineTo(w * 0.5, top + h)
//   const waves = 3
//   const waveW = w / waves
//   for (let i = waves - 1; i >= 0; i--) {
//     const wx = -w * 0.5 + i * waveW
//     ctx.quadraticCurveTo(wx + waveW * 0.75, top + h + r * 0.35, wx + waveW * 0.5, top + h)
//     ctx.quadraticCurveTo(wx + waveW * 0.25, top + h - r * 0.3, wx, top + h)
//   }
//   ctx.closePath()
//   ctx.fillStyle = color
//   ctx.globalAlpha = 0.85
//   ctx.fill()
//   ctx.globalAlpha = 1

//   const eyeY = top + w * 0.45
//     ;[-0.18, 0.18].forEach(offset => {
//       ctx.beginPath()
//       ctx.arc(offset * w * 2, eyeY, r * 0.18, 0, Math.PI * 2)
//       ctx.fillStyle = '#fff'
//       ctx.fill()
//       ctx.beginPath()
//       ctx.arc(offset * w * 2 + r * 0.07, eyeY + r * 0.06, r * 0.09, 0, Math.PI * 2)
//       ctx.fillStyle = '#1a1a1a'
//       ctx.fill()
//     })

//   ctx.restore()
// }

'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

const YELLOW = '#FCC92F'
const GHOST_CLR = '#FF0000'
const WIDTH = 40
const SPEED = 0.4 // px per frame

export default function PacmanCanvas() {
  const { isPacman } = useTheme()
  const rightRef = useRef<HTMLCanvasElement>(null)
  const leftRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouthRef = useRef(0)
  const mouthDirRef = useRef(1)
  const rightPosRef = useRef(0)       // right: 0 = top
  const leftPosRef = useRef(0)        // left: 0 = bottom (inverted)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isPacman || isMobile) return

    const rightCanvas = rightRef.current
    const leftCanvas = leftRef.current
    if (!rightCanvas || !leftCanvas) return

    const rightCtx = rightCanvas.getContext('2d')
    const leftCtx = leftCanvas.getContext('2d')
    if (!rightCtx || !leftCtx) return

    const PAC_R = 13
    const DOT_R = 3.5
    const DOT_GAP = 22

    const resize = () => {
      rightCanvas.width = WIDTH
      rightCanvas.height = window.innerHeight
      leftCanvas.width = WIDTH
      leftCanvas.height = window.innerHeight
      // reset positions on resize
      rightPosRef.current = 0
      leftPosRef.current = 0
    }
    resize()
    window.addEventListener('resize', resize)

    const drawGhost = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      color: string,
      dir: 1 | -1
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(dir === 1 ? Math.PI : 0)

      const w = r * 1.4
      const h = r * 1.8
      const top = -h * 0.6

      ctx.beginPath()
      ctx.arc(0, top + w * 0.5, w * 0.5, Math.PI, 0)
      ctx.lineTo(w * 0.5, top + h)
      const waves = 3
      const waveW = w / waves
      for (let i = waves - 1; i >= 0; i--) {
        const wx = -w * 0.5 + i * waveW
        ctx.quadraticCurveTo(wx + waveW * 0.75, top + h + r * 0.35, wx + waveW * 0.5, top + h)
        ctx.quadraticCurveTo(wx + waveW * 0.25, top + h - r * 0.3, wx, top + h)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = 0.85
      ctx.fill()
      ctx.globalAlpha = 1

      const eyeY = top + w * 0.45
        ;[-0.18, 0.18].forEach(offset => {
          ctx.beginPath()
          ctx.arc(offset * w * 2, eyeY, r * 0.18, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          ctx.fill()
          ctx.beginPath()
          ctx.arc(offset * w * 2 + r * 0.07, eyeY + r * 0.06, r * 0.09, 0, Math.PI * 2)
          ctx.fillStyle = '#1a1a1a'
          ctx.fill()
        })

      ctx.restore()
    }

    const drawPacman = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      mouthAngle: number,
      dir: 1 | -1
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(dir === 1 ? Math.PI / 2 : -Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI)
      ctx.closePath()
      ctx.fillStyle = YELLOW
      ctx.fill()
      ctx.restore()
    }

    const drawDots = (
      ctx: CanvasRenderingContext2D,
      H: number,
      cx: number,
      pacY: number,
      dir: 1 | -1,
      PAC_R: number
    ) => {
      const count = Math.floor(H / DOT_GAP)
      for (let i = 0; i < count; i++) {
        const y = (i + 0.5) * DOT_GAP
        if (dir === 1 && y < pacY - PAC_R) continue
        if (dir === -1 && y > pacY + PAC_R) continue
        ctx.beginPath()
        ctx.arc(cx, y, DOT_R / 2, 0, Math.PI * 2)
        ctx.fillStyle = YELLOW
        ctx.globalAlpha = 0.9
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const draw = () => {
      const H = window.innerHeight
      const cx = WIDTH / 2

      // ── Mouth oscillation (shared) ──
      mouthRef.current += 0.07 * mouthDirRef.current
      if (mouthRef.current >= 1) mouthDirRef.current = -1
      if (mouthRef.current <= 0) mouthDirRef.current = 1
      const mouthAngle = mouthRef.current * 0.28

      // ── RIGHT: top → bottom (dir = 1) ──
      rightPosRef.current += SPEED
      if (rightPosRef.current > H + PAC_R) rightPosRef.current = -PAC_R

      const rightPacY = rightPosRef.current
      const rightGhostY = rightPacY - 0.15 * H  // 15% lag behind

      rightCtx.clearRect(0, 0, WIDTH, H)
      drawDots(rightCtx, H, cx, rightPacY, 1, PAC_R)
      drawPacman(rightCtx, cx, rightPacY, PAC_R, mouthAngle, 1)
      if (rightGhostY > -PAC_R && rightGhostY < H + PAC_R) {
        drawGhost(rightCtx, cx, rightGhostY, PAC_R, GHOST_CLR, 1)
      }

      // ── LEFT: bottom → top (dir = -1) ──
      leftPosRef.current += SPEED
      if (leftPosRef.current > H + PAC_R) leftPosRef.current = -PAC_R

      const leftPacY = H - leftPosRef.current  // invert: starts at bottom
      const leftGhostY = leftPacY + 0.12 * H   // 12% lag behind (below pac-man since moving up)

      leftCtx.clearRect(0, 0, WIDTH, H)
      drawDots(leftCtx, H, cx, leftPacY, -1, PAC_R)
      drawPacman(leftCtx, cx, leftPacY, PAC_R, mouthAngle, -1)
      if (leftGhostY > -PAC_R && leftGhostY < H + PAC_R) {
        drawGhost(leftCtx, cx, leftGhostY, PAC_R, GHOST_CLR, -1)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isPacman, isMobile])

  if (!isPacman || isMobile) return null

  return (
    <>
      {/* Right canvas — top to bottom */}
      <canvas
        ref={rightRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: WIDTH,
          zIndex: 50,
          pointerEvents: 'none',
          display: 'block',
        }}
      />
      {/* Left canvas — bottom to top */}
      <canvas
        ref={leftRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: WIDTH,
          zIndex: 50,
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </>
  )
}