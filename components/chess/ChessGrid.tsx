'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

const LIGHT       = '#EEEED2'
const DARK        = '#769656'
const STRIP_WIDTH = 48   // matches PawnProgress panel width

export default function ChessGrid() {
  const { isChess } = useTheme()
  const [grid, setGrid] = useState({ cellSize: 0, cols: 8, rows: 0 })

  useEffect(() => {
    const calc = () => {
      const cellSize = Math.floor(window.innerWidth / 8)
      const rows     = Math.ceil(window.innerHeight / cellSize)
      setGrid({ cellSize, cols: 8, rows })
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  if (!isChess || grid.cellSize === 0) return null

  const totalCells = grid.cols * grid.rows

  return (
    <>
      {/* Chessboard */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(8, ${grid.cellSize}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${grid.cellSize}px)`,
          opacity: 0.055,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          const row = Math.floor(i / grid.cols)
          const col = i % grid.cols
          return (
            <div
              key={i}
              style={{ background: (row + col) % 2 === 0 ? LIGHT : DARK }}
            />
          )
        })}
      </div>

      {/* Dark strip — backdrop for PawnProgress */}
      {/* <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: STRIP_WIDTH,
          height: '100vh',
          background: 'rgba(0,0,0,0.06)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      /> */}
    </>
  )
}