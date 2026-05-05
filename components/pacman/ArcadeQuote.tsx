interface Props { quote: string }

export default function ArcadeQuote({ quote }: Props) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      background: '#0d0d0d',
      border: '1px solid rgba(252,201,47,0.3)',
      borderRadius: 8,
      padding: '12px 20px',
      marginTop: '1.5rem',
    }}>
      <span style={{ color: '#FCC92F', fontFamily: 'monospace', fontSize: 14 }}>👾</span>
      <span style={{
        fontFamily: 'monospace',
        fontSize: 13,
        color: '#A0A0A0',
        letterSpacing: '0.03em',
        fontStyle: 'italic',
      }}>
        &quot;{quote}&quot;
      </span>
    </div>
  )
}