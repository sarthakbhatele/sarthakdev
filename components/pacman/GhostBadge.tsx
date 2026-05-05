// interface Props {
//   type: 'freelance' | 'personal'
// }

// export default function GhostBadge({ type }: Props) {
//   const isFreelance = type === 'freelance'
//   const color = isFreelance ? '#00CFCF' : '#FFB8FF'
//   const label = isFreelance ? 'Client Work' : 'Personal'
//   const ghost = isFreelance ? '👻' : '👾'

//   return (
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 6,
//       background: `${color}18`,
//       border: `1px solid ${color}`,
//       borderRadius: 999,
//       padding: '3px 10px',
//       width: 'fit-content',
//     }}>
//       <span style={{ fontSize: 11 }}>{ghost}</span>
//       <span style={{
//         fontFamily: 'var(--font-space), sans-serif',
//         fontSize: 11,
//         fontWeight: 600,
//         color,
//         letterSpacing: '0.08em',
//         textTransform: 'uppercase',
//       }}>
//         {label}
//       </span>
//     </div>
//   )
// }


// components/pacman/GhostBadge.tsx
'use client'

import Image from "next/image"

const GHOST_ICON_URL =
  'https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-pacman-game-dreamstale-lineal-dreamstale.png'
const PACMAN_ICON_URL = 'https://img.icons8.com/windows/32/pacman.png'

type Props = { type: 'freelance' | 'personal' }

export default function GhostBadge({ type }: Props) {
  const isClient = type === 'freelance'
  const iconUrl = isClient ? GHOST_ICON_URL : PACMAN_ICON_URL
  const label = isClient ? 'Client Work' : 'Personal'
  const color = isClient ? '#00CFCF' : '#FFB8FF'
  const bg = isClient ? 'rgba(0,207,207,0.1)' : 'rgba(255,184,255,0.1)'
  const border = isClient ? 'rgba(0,207,207,0.3)' : 'rgba(255,184,255,0.3)'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: '4px 12px 4px 6px',
        width: 'fit-content',
      }}
    >
      <Image
        src={iconUrl}
        alt={label}
        width={18}
        height={18}
        style={{
          filter: isClient
            ? 'invert(1) sepia(1) saturate(2) hue-rotate(140deg)'
            : 'invert(1) sepia(1) saturate(2) hue-rotate(260deg)',
          opacity: 0.9,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-space), sans-serif',
          fontSize: 11,
          fontWeight: 600,
          color,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}