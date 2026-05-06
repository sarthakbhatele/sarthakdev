// components/sections/ProjectModal.tsx
'use client'

import Image from 'next/image'
import { useEffect, useCallback, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { Project } from '@/lib/projects'

function isScreenshotRight(index: number) {
    return index % 2 === 0
}

type ModalProps = {
    project: Project
    index: number
    onClose: () => void
}

export default function ProjectModal({
    project,
    index,
    onClose,
}: {
    project: Project | null
    index: number
    onClose: () => void
}) {
    const { isPacman } = useTheme()

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        },
        [onClose]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKey)
        // FIX #2: lock body scroll immediately
        document.body.style.overflow = project ? 'hidden' : ''
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [handleKey, project])

    return (
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: isPacman ? 'rgba(0,0,0,0.88)' : 'rgba(20,18,14,0.72)',
                            backdropFilter: 'blur(4px)',
                        }}
                    />
                    {isPacman ? (
                        <PacmanModal project={project} index={index} onClose={onClose} />
                    ) : (
                        <ChessModal project={project} index={index} onClose={onClose} />
                    )}
                </>
            )}
        </AnimatePresence>
    )
}

/* ── Shared screenshot with zoom + tooltip (FIX #6) ── */
function ScreenshotBlock({
    project,
    tooltipLabel,
    borderColor,
    pacman,
}: {
    project: Project
    tooltipLabel: string
    borderColor: string
    pacman?: boolean
}) {
    const [hovered, setHovered] = useState(false)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 })
    }

    return (
        // FIX #5: clicking image opens live link
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                flex: '1 1 0',
                position: 'sticky',
                top: 0,
                alignSelf: 'flex-start',
                aspectRatio: '16/10',
                borderRadius: pacman ? 12 : 8,
                padding: pacman ? 12 : 10,
                background: pacman ? 'rgba(0,0,0,0.3)' : 'rgba(201,193,154,0.15)',
                border: `1px solid ${borderColor}`,
                display: 'flex',
                cursor: 'pointer',
                outline: 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <div style={{ position: 'relative', flex: 1, borderRadius: pacman ? 8 : 4, overflow: 'hidden' }}>
                <Image
                    src={project.screenshot}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{
                        objectFit: 'cover',
                        // FIX #6: zoom only on image
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.4s ease',
                    }}
                />
            </div>

            {pacman && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 12, // match padding
                        borderRadius: 8,
                        background:
                            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Tooltip */}
            {hovered && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltipPos.x,
                        top: tooltipPos.y,
                        background: pacman ? '#FCC92F' : '#2c2b29',
                        color: pacman ? '#1a1a1a' : '#F5F0E8',
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: pacman ? 6 : 4,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                    }}
                >
                    {tooltipLabel}
                </div>
            )}
        </a>
    )
}

/* ══════════════════ PAC-MAN MODAL ══════════════════ */
function PacmanModal({ project, index, onClose }: ModalProps) {
    const ssRight = isScreenshotRight(index)
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = modalRef.current
        if (!el) return
        el.focus()
        // Non-passive wheel listener: lets the modal scroll, prevents body scroll
        const onWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = el
            const atTop = scrollTop === 0 && e.deltaY < 0
            const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0
            if (!atTop && !atBottom) e.stopPropagation()
            e.preventDefault()
            el.scrollTop += e.deltaY
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    // FIX #4: detect mobile/tablet
    const [isNarrow, setIsNarrow] = useState(false)
    useEffect(() => {
        const check = () => setIsNarrow(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const isClient = project.type === 'freelance'
    const iconUrl = isClient
        ? 'https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-pacman-game-dreamstale-lineal-dreamstale.png'
        : 'https://img.icons8.com/windows/32/pacman.png'

    const Screenshot = (
        <ScreenshotBlock
            project={project}
            tooltipLabel="▶ Insert Coin"
            borderColor="rgba(252,201,47,0.2)"
            pacman
        />
    )

    const Features = (
        <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Image
                    src={iconUrl}
                    alt={project.type}
                    width={20}
                    height={20}
                    style={{
                        filter: isClient
                            ? 'invert(1) sepia(1) saturate(2) hue-rotate(140deg)'
                            : 'invert(1) sepia(1) saturate(2) hue-rotate(260deg)',
                    }}
                />
                <span
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 11,
                        fontWeight: 600,
                        color: isClient ? '#00CFCF' : '#FFB8FF',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    {isClient ? 'Client Work' : 'Personal'} · {project.year}
                </span>
            </div>

            {/* FIX #5 + #7: Title clickable, moved to top */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <h2
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontWeight: 700,
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        color: '#FCC92F',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        margin: 0,
                        cursor: 'pointer',
                    }}
                >
                    {project.title} ↗
                </h2>
            </a>

            {/* FIX #7: CTAs right after title */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        background: '#FCC92F',
                        borderRadius: 6,
                        padding: '8px 20px',
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}
                >
                    ▶ Insert Coin
                </a>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#FCC92F',
                        background: 'transparent',
                        border: '1px solid rgba(252,201,47,0.4)',
                        borderRadius: 6,
                        padding: '8px 20px',
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}
                >
                    GitHub
                </a>
            </div>

            {/* FIX #7: Tech stack after CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.stack.map(s => (
                    <span
                        key={s}
                        style={{
                            fontFamily: 'var(--font-space), sans-serif',
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#FCC92F',
                            background: 'rgba(252,201,47,0.1)',
                            border: '1px solid rgba(252,201,47,0.25)',
                            borderRadius: 999,
                            padding: '2px 10px',
                            letterSpacing: '0.06em',
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p
                style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: '0.875rem',
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                    margin: 0,
                }}
            >
                {project.longDescription}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#FCC92F',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}
                >
                    ▸ Levels Unlocked
                </p>
                {project.features.map((f, i) => (
                    <div
                        key={i}
                        style={{
                            background: 'rgba(252,201,47,0.04)',
                            border: '1px solid rgba(252,201,47,0.12)',
                            borderRadius: 8,
                            padding: '10px 14px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: '#FCC92F',
                                margin: '0 0 4px',
                            }}
                        >
                            {f.title}
                        </p>
                        <p
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontSize: '0.78rem',
                                color: '#808080',
                                lineHeight: 1.6,
                                margin: 0,
                            }}
                        >
                            {/* FIX: support both .detail and .summary field names */}
                            {f.detail}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <motion.div
            key="pacman-modal"
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            // FIX #1: outline none so focus doesn't show ring, but element is focusable
            style={{
                position: 'fixed',
                // FIX #3: smaller inset so it doesn't touch navbar
                inset: '10vh 5vw',
                zIndex: 1001,
                background: '#111118',
                border: '1px solid rgba(252,201,47,0.25)',
                borderRadius: 16,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                // FIX #1: modal itself scrolls, not inner div
                overflowY: 'auto',
                outline: 'none',
            }}
        >
            {/* Close */}
            <button
                onClick={onClose}
                style={{
                    alignSelf: 'flex-end',
                    background: 'transparent',
                    border: '1px solid rgba(252,201,47,0.3)',
                    color: '#FCC92F',
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    borderRadius: 6,
                    padding: '4px 14px',
                    cursor: 'pointer',
                    flexShrink: 0,
                }}
            >
                ✕ CLOSE
            </button>

            {/* FIX #4: on narrow screens stack vertically, screenshot on top */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isNarrow ? 'column' : 'row',
                    gap: 28,
                    flex: 1,
                }}
            >
                {isNarrow ? (
                    <>
                        {Screenshot}
                        {Features}
                    </>
                ) : ssRight ? (
                    <>
                        {Features}
                        {Screenshot}
                    </>
                ) : (
                    <>
                        {Screenshot}
                        {Features}
                    </>
                )}
            </div>
        </motion.div>
    )
}

/* ══════════════════ CHESS MODAL ══════════════════ */
function ChessModal({ project, index, onClose }: ModalProps) {
    const ssRight = isScreenshotRight(index)
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = modalRef.current
        if (!el) return
        el.focus()
        const onWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = el
            const atTop = scrollTop === 0 && e.deltaY < 0
            const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0
            if (!atTop && !atBottom) e.stopPropagation()
            e.preventDefault()
            el.scrollTop += e.deltaY
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    const [isNarrow, setIsNarrow] = useState(false)
    useEffect(() => {
        const check = () => setIsNarrow(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const isClient = project.type === 'freelance'
    const pieceLabel = isClient ? 'Client Work' : 'Personal'
    const iconSrc = isClient
        ? 'https://img.icons8.com/color/48/queen.png'
        : 'https://img.icons8.com/color/48/bishop.png'

    const Screenshot = (
        <ScreenshotBlock
            project={project}
            tooltipLabel="Open Game ↗"
            borderColor="#C9C19A"
        />
    )

    const Features = (
        <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Image src={iconSrc} alt={pieceLabel} width={24} height={24} />
                <span
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 11,
                        color: '#5a5a58',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    {pieceLabel} · {project.year}
                </span>
            </div>

            {/* FIX #5 + #7: clickable title at top */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <h2
                    style={{
                        fontFamily: 'var(--font-playfair), serif',
                        fontWeight: 700,
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        color: '#2c2b29',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        margin: 0,
                        cursor: 'pointer',
                    }}
                >
                    {project.title} ↗
                </h2>
            </a>

            {/* FIX #7: CTAs right after title */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 13,
                        color: '#769656',
                        textDecoration: 'underline',
                        textUnderlineOffset: 4,
                        letterSpacing: '0.02em',
                    }}
                >
                    Open Game ↗
                </a>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 13,
                        color: '#769656',
                        textDecoration: 'underline',
                        textUnderlineOffset: 4,
                        letterSpacing: '0.02em',
                    }}
                >
                    GitHub ↗
                </a>
            </div>

            {/* FIX #7: Stack after CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.stack.map(s => (
                    <span
                        key={s}
                        style={{
                            fontFamily: 'var(--font-space), sans-serif',
                            fontSize: 11,
                            color: '#4e7837',
                            background: '#EEEED2',
                            border: '1px solid #C9C19A',
                            borderRadius: 4,
                            padding: '2px 10px',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p
                style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: '0.875rem',
                    color: '#5a5a58',
                    lineHeight: 1.7,
                    margin: 0,
                }}
            >
                {project.longDescription}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p
                    style={{
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#2c2b29',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}
                >
                    Key Moves
                </p>
                {project.features.map((f, i) => (
                    <div
                        key={i}
                        style={{
                            borderLeft: '2px solid #C9C19A',
                            paddingLeft: 12,
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#2c2b29',
                                margin: '0 0 3px',
                            }}
                        >
                            <span style={{ color: '#769656', marginRight: 6 }}>{i + 1}.</span>
                            {f.title}
                        </p>
                        <p
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontSize: '0.78rem',
                                color: '#7a7a78',
                                lineHeight: 1.6,
                                margin: 0,
                            }}
                        >
                            {f.detail}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <motion.div
            key="chess-modal"
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
                position: 'fixed',
                // FIX #3: smaller inset
                inset: '10vh 5vw',
                zIndex: 1001,
                background: '#F5F0E8',
                border: '1px solid #C9C19A',
                borderRadius: 4,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                // FIX #1: modal itself scrolls
                overflowY: 'auto',
                boxShadow: '0 24px 80px rgba(44,43,41,0.18)',
                outline: 'none',
            }}
        >
            {/* Board pattern top strip */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    backgroundImage:
                        'repeating-linear-gradient(90deg, #C9C19A 0px, #C9C19A 12px, #EEEED2 12px, #EEEED2 24px)',
                    borderRadius: '4px 4px 0 0',
                }}
            />

            {/* Close */}
            <button
                onClick={onClose}
                style={{
                    alignSelf: 'flex-end',
                    background: 'transparent',
                    border: '1px solid #C9C19A',
                    color: '#5a5a58',
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    borderRadius: 4,
                    padding: '4px 14px',
                    cursor: 'pointer',
                    marginTop: 8,
                    flexShrink: 0,
                }}
            >
                ✕ Close
            </button>

            {/* FIX #4: narrow = column, screenshot top */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isNarrow ? 'column' : 'row',
                    gap: 28,
                    flex: 1,
                }}
            >
                {isNarrow ? (
                    <>
                        {Screenshot}
                        {Features}
                    </>
                ) : ssRight ? (
                    <>
                        {Features}
                        {Screenshot}
                    </>
                ) : (
                    <>
                        {Screenshot}
                        {Features}
                    </>
                )}
            </div>
        </motion.div>
    )
}