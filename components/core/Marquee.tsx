'use client'

import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { projects } from '@/lib/projects'

export default function Marquee() {
    const { isPacman } = useTheme()

    const bg = isPacman ? '#ffa4b9' : '#769656'
    const images = [...projects, ...projects]

    return (
        <div
            style={{
                width: '100vw',
                marginLeft: 'calc(-5vw)',
                background: bg,
                padding: '16px 0',
                overflow: 'hidden',
                transition: 'background 0.6s ease',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: 24,
                    width: 'max-content',
                    animation: 'marquee-scroll 35s linear infinite',
                }}
                className="marquee-track"
            >
                {images.map((p, i) => (
                    <div
                        key={`${p.id}-${i}`}
                        style={{ position: 'relative', height: 180, width: 280, flexShrink: 0 }}
                    >
                        <Image
                            src={p.screenshot}
                            alt={p.title}
                            fill
                            loading="lazy"
                            style={{ borderRadius: 12, objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    )
}