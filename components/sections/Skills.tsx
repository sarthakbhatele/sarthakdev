'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss } from 'react-icons/si'
import { SiNodedotjs, SiExpress, SiPostgresql, SiMongodb } from 'react-icons/si'
import { SiPython, SiLangchain, SiOpenai, SiHuggingface } from 'react-icons/si'
import { SiGit, SiDocker, SiVercel, SiFigma } from 'react-icons/si'

const GHOST_COLORS = ['#00CFCF', '#FF6060', '#FFB8FF', '#FFB852']
const GHOST_ICON_URL =
  'https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-pacman-game-dreamstale-lineal-dreamstale.png'

const OPENINGS = [
  { name: "King's Gambit",    subtitle: 'Aggressive by default. Ship first, refactor later.' },
  { name: 'Sicilian Defence', subtitle: 'Rock-solid foundations that scale under pressure.' },
  { name: "Queen's Gambit",   subtitle: 'High complexity, higher leverage. Worth the study.' },
  { name: 'London System',    subtitle: 'Consistent patterns. Boring setup, deadly output.' },
]

// Each skill: name, Icon, and its scattered center-position within the quadrant (0–100% of quadrant)
const QUADRANTS = [
  {
    id: 'frontend', label: 'Frontend', openingIdx: 0,
    // Top-Right → label anchored to top-right outer corner; pills stay away from it
    labelPos: { right: '1%', top: '2%' }, labelAlign: 'right' as const,
    items: [
      { name: 'Next.js',     Icon: SiNextdotjs,   pos: { left: '58%', top: '28%' } },
      { name: 'React',       Icon: SiReact,       pos: { left: '74%', top: '18%' } },
      { name: 'TypeScript',  Icon: SiTypescript,  pos: { left: '66%', top: '40%' } },
      { name: 'Tailwind CSS',Icon: SiTailwindcss, pos: { left: '84%', top: '38%' } },
    ],
  },
  {
    id: 'backend', label: 'Backend', openingIdx: 1,
    // Top-Left → label anchored to top-left outer corner
    labelPos: { left: '1%', top: '2%' }, labelAlign: 'left' as const,
    items: [
      { name: 'Node.js',    Icon: SiNodedotjs,  pos: { left: '16%', top: '26%' } },
      { name: 'Express',    Icon: SiExpress,    pos: { left: '36%', top: '16%' } },
      { name: 'PostgreSQL', Icon: SiPostgresql, pos: { left: '14%', top: '40%' } },
      { name: 'MongoDB',    Icon: SiMongodb,    pos: { left: '38%', top: '32%' } },
    ],
  },
  {
    id: 'aiml', label: 'AI / ML', openingIdx: 2,
    // Bottom-Left → label anchored to bottom-left outer corner
    labelPos: { left: '1%', bottom: '2%' }, labelAlign: 'left' as const,
    items: [
      { name: 'Python',      Icon: SiPython,     pos: { left: '14%', top: '56%' } },
      { name: 'LangChain',   Icon: SiLangchain,  pos: { left: '36%', top: '64%' } },
      { name: 'OpenAI API',  Icon: SiOpenai,     pos: { left: '10%', top: '76%' } },
      { name: 'HuggingFace', Icon: SiHuggingface,pos: { left: '32%', top: '84%' } },
    ],
  },
  {
    id: 'tools', label: 'Tools', openingIdx: 3,
    // Bottom-Right → label anchored to bottom-right outer corner
    labelPos: { right: '1%', bottom: '2%' }, labelAlign: 'right' as const,
    items: [
      { name: 'Git',    Icon: SiGit,    pos: { left: '72%', top: '58%' } },
      { name: 'Docker', Icon: SiDocker, pos: { left: '58%', top: '68%' } },
      { name: 'Vercel', Icon: SiVercel, pos: { left: '82%', top: '72%' } },
      { name: 'Figma',  Icon: SiFigma,  pos: { left: '66%', top: '84%' } },
    ],
  },
]

export default function Skills() {
  const { isPacman } = useTheme()
  return isPacman ? <PacmanSkills /> : <ChessSkills />
}

/* ════════════════════ CHESS ════════════════════ */
function ChessSkills() {
  return (
    <section
      className="page-padding"
      style={{ background: '#F5F0E8', paddingTop: 'clamp(3rem,8vw,5rem)', paddingBottom: 'clamp(3rem,8vw,5rem)' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ fontFamily: 'var(--font-playfair),serif', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#2c2b29', marginBottom: '2.5rem' }}
      >
        Repertoire
      </motion.h2>

      {/* ── DESKTOP quadrant ── */}
      <style>{`
        .skills-quadrant { display:none; position:relative; width:100%; height:70vh; min-height:460px; }
        @media(min-width:768px){ .skills-quadrant{display:block;} .skills-mobile-grid{display:none!important;} }
        .q-axis-h { position:absolute;left:0;right:0;top:50%;height:1px;transform:translateY(-50%);pointer-events:none;z-index:1; }
        .q-axis-v { position:absolute;top:0;bottom:0;left:50%;width:1px;transform:translateX(-50%);pointer-events:none;z-index:1; }
        .q-dot { position:absolute;top:50%;left:50%;width:7px;height:7px;border-radius:50%;transform:translate(-50%,-50%);z-index:3; }
        .q-pill { position:absolute; transform:translate(-50%,-50%); display:inline-flex; align-items:center; gap:5px;
          font-size:12px; font-weight:500; border-radius:999px; padding:5px 13px 5px 10px;
          white-space:nowrap; cursor:default; z-index:2; transition:transform .18s,box-shadow .18s; }
        .q-pill:hover { transform:translate(-50%,-50%) scale(1.1); }
        .q-cat-label { position:absolute; z-index:4; display:flex; flex-direction:column; gap:2px; max-width:200px; }
      `}</style>

      <div className="skills-quadrant">
        {/* Axes */}
        <div className="q-axis-h" style={{ background: 'linear-gradient(to right, transparent 0%, #C9C19A 30%, #C9C19A 70%, transparent 100%)' }} />
        <div className="q-axis-v" style={{ background: 'linear-gradient(to bottom, transparent 0%, #C9C19A 20%, #C9C19A 80%, transparent 100%)' }} />
        <div className="q-dot" style={{ background: '#C9C19A' }} />

        {QUADRANTS.map((q, qi) => (
          <div key={q.id}>
            {/* Category label with opening name */}
            <motion.div
              className="q-cat-label"
              style={{ ...(q.labelPos as React.CSSProperties), textAlign: q.labelAlign, alignItems: q.labelAlign === 'right' ? 'flex-end' : 'flex-start' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: qi * 0.1, duration: 0.5 }}
            >
              <span style={{
                fontFamily: 'var(--font-playfair),serif', fontWeight: 800,
                fontSize: '1.05rem', color: '#2c2b29', letterSpacing: '-0.01em',
              }}>
                {OPENINGS[q.openingIdx].name}
              </span>
              <span style={{
                fontFamily: 'var(--font-space),sans-serif', fontStyle: 'italic',
                fontSize: '0.7rem', color: '#769656', lineHeight: 1.4,
              }}>
                {q.label} · {OPENINGS[q.openingIdx].subtitle}
              </span>
            </motion.div>

            {/* Skills */}
            {q.items.map(({ name, Icon, pos }, si) => (
              <motion.span
                key={name}
                className="q-pill"
                style={{
                  ...pos as React.CSSProperties,
                  fontFamily: 'var(--font-space),sans-serif',
                  color: '#2c2b29', background: '#EEEED2', border: '1px solid #C9C19A',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: qi * 0.08 + si * 0.07, duration: 0.38, ease: [0.22,1,0.36,1] }}
                whileHover={{ backgroundColor: '#769656', color: '#F5F0E8' } as never}
              >
                <Icon size={12} />
                {name}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      {/* ── MOBILE grid ── */}
      <div className="skills-mobile-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap:'2.5rem' }}>
        {QUADRANTS.map((q, gi) => (
          <motion.div key={q.id}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true }} transition={{ delay: gi*0.12, duration:0.55 }}
            style={{ display:'flex', flexDirection:'column', gap:14 }}
          >
            <div style={{ paddingBottom:'0.75rem', borderBottom:'1px solid #C9C19A' }}>
              <p style={{ fontFamily:'var(--font-playfair),serif', fontWeight:700, fontSize:'1.05rem', color:'#2c2b29', marginBottom:4 }}>
                {OPENINGS[q.openingIdx].name}
              </p>
              <p style={{ fontFamily:'var(--font-space),sans-serif', fontStyle:'italic', fontSize:'0.78rem', color:'#769656', lineHeight:1.5 }}>
                {OPENINGS[q.openingIdx].subtitle}
              </p>
            </div>
            <span style={{ fontFamily:'var(--font-space),sans-serif', fontSize:'0.7rem', fontWeight:600, color:'#5a5a58', letterSpacing:'0.12em', textTransform:'uppercase' }}>
              {q.label}
            </span>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {q.items.map(({ name, Icon }, si) => (
                <motion.span key={name}
                  initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }} transition={{ delay:gi*0.1+si*0.07, duration:0.35 }}
                  style={{ fontFamily:'var(--font-space),sans-serif', fontSize:13, fontWeight:500, color:'#2c2b29',
                    background:'#EEEED2', border:'1px solid #C9C19A', borderRadius:4, padding:'5px 14px',
                    cursor:'default', display:'inline-flex', alignItems:'center', gap:6 }}
                >
                  <Icon size={12}/>{name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.6, delay:0.4 }}
        style={{ fontFamily:'var(--font-playfair),serif', fontStyle:'italic', fontSize:'1.05rem', color:'#769656',
          marginTop:'3.5rem', paddingTop:'2rem', borderTop:'1px solid #C9C19A', textAlign:'center', letterSpacing:'0.01em' }}
      >
        &quot;Every opening is a philosophy. Mine is shipping.&quot;
      </motion.p>
    </section>
  )
}

/* ════════════════════ PAC-MAN ════════════════════ */
function PacmanSkills() {
  return (
    <section
      className="page-padding"
      style={{ background:'#1a1a1a', paddingTop:'clamp(3rem,8vw,5rem)', paddingBottom:'clamp(3rem,8vw,5rem)' }}
    >
      <motion.h2
        initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }}
        style={{ fontFamily:'var(--font-space),sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'#FCC92F', marginBottom:'2.5rem', letterSpacing:'-0.01em' }}
      >
        Power-Ups
      </motion.h2>

      {/* ── DESKTOP quadrant ── */}
      <style>{`
        .skills-quadrant { display:none; position:relative; width:100%; height:70vh; min-height:460px; }
        @media(min-width:768px){ .skills-quadrant{display:block;} .skills-mobile-grid{display:none!important;} }
        .q-axis-h { position:absolute;left:0;right:0;top:50%;height:1px;transform:translateY(-50%);pointer-events:none;z-index:1; }
        .q-axis-v { position:absolute;top:0;bottom:0;left:50%;width:1px;transform:translateX(-50%);pointer-events:none;z-index:1; }
        .q-dot { position:absolute;top:50%;left:50%;width:7px;height:7px;border-radius:50%;transform:translate(-50%,-50%);z-index:3; }
        .q-pill { position:absolute; transform:translate(-50%,-50%); display:inline-flex; align-items:center; gap:5px;
          font-size:12px; font-weight:500; border-radius:999px; padding:5px 13px 5px 10px;
          white-space:nowrap; cursor:default; z-index:2; transition:transform .18s,box-shadow .18s; }
        .q-pill:hover { transform:translate(-50%,-50%) scale(1.1); }
        .q-cat-label { position:absolute; z-index:4; display:flex; flex-direction:column; gap:2px; max-width:200px; }
      `}</style>
      <div className="skills-quadrant">
        <div className="q-axis-h" style={{ background:'linear-gradient(to right, transparent 0%, rgba(252,201,47,0.3) 25%, rgba(252,201,47,0.3) 75%, transparent 100%)' }} />
        <div className="q-axis-v" style={{ background:'linear-gradient(to bottom, transparent 0%, rgba(252,201,47,0.3) 20%, rgba(252,201,47,0.3) 80%, transparent 100%)' }} />
        <div className="q-dot" style={{ background:'#FCC92F' }} />

        {QUADRANTS.map((q, qi) => {
          const color = GHOST_COLORS[qi]
          return (
            <div key={q.id}>
              {/* Ghost icon + category label */}
              <motion.div
                className="q-cat-label"
                style={{ ...(q.labelPos as React.CSSProperties), flexDirection:'row', alignItems:'center', gap:8,
                  justifyContent: q.labelAlign === 'right' ? 'flex-end' : 'flex-start' }}
                initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                viewport={{ once:true }} transition={{ delay:qi*0.1, duration:0.5 }}
              >
                <div style={{
                  width:22, height:22, backgroundColor:color, flexShrink:0,
                  WebkitMaskImage:`url(${GHOST_ICON_URL})`, maskImage:`url(${GHOST_ICON_URL})`,
                  WebkitMaskSize:'contain', maskSize:'contain',
                  WebkitMaskRepeat:'no-repeat', maskRepeat:'no-repeat',
                }} />
                <span style={{ fontFamily:'var(--font-space),sans-serif', fontWeight:800, fontSize:'0.92rem', color, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  {q.label}
                </span>
              </motion.div>

              {/* Skills */}
              {q.items.map(({ name, Icon, pos }, si) => (
                <motion.span
                  key={name}
                  className="q-pill"
                  style={{
                    ...pos as React.CSSProperties,
                    fontFamily:'var(--font-space),sans-serif',
                    color, background:'rgba(255,255,255,0.04)', border:`1px solid ${color}55`,
                  }}
                  initial={{ opacity:0, scale:0.8 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay:qi*0.08+si*0.07, duration:0.38, ease:[0.22,1,0.36,1] }}
                  whileHover={{ backgroundColor:color, color:'#1a1a1a' } as never}
                >
                  <Icon size={12}/>{name}
                </motion.span>
              ))}
            </div>
          )
        })}
      </div>

      {/* ── MOBILE grid ── */}
      <div className="skills-mobile-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap:'2.5rem' }}>
        {QUADRANTS.map((q, gi) => {
          const color = GHOST_COLORS[gi]
          return (
            <motion.div key={q.id}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:gi*0.1, duration:0.5 }}
              style={{ display:'flex', flexDirection:'column', gap:14 }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{
                  width:20, height:20, backgroundColor:color,
                  WebkitMaskImage:`url(${GHOST_ICON_URL})`, maskImage:`url(${GHOST_ICON_URL})`,
                  WebkitMaskSize:'contain', maskSize:'contain',
                  WebkitMaskRepeat:'no-repeat', maskRepeat:'no-repeat',
                }} />
                <span style={{ fontFamily:'var(--font-space),sans-serif', fontWeight:700, fontSize:'0.8rem', color, letterSpacing:'0.12em', textTransform:'uppercase' }}>
                  {q.label}
                </span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {q.items.map(({ name, Icon }, si) => (
                  <motion.span key={name}
                    initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }} transition={{ delay:gi*0.1+si*0.06, duration:0.35 }}
                    style={{ fontFamily:'var(--font-space),sans-serif', fontSize:13, fontWeight:500,
                      color, background:'transparent', border:`1px solid ${color}`,
                      borderRadius:999, padding:'5px 14px', cursor:'default',
                      display:'inline-flex', alignItems:'center', gap:6 }}
                  >
                    <Icon size={12}/>{name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.6, delay:0.4 }}
        style={{ fontFamily:'monospace', fontSize:13, color:'#A0A0A0', marginTop:'3.5rem',
          paddingTop:'2rem', borderTop:'1px solid #2a2a5a', letterSpacing:'0.04em' }}
      >
        {"// 4 ghosts. 4 skill sets. Same goal: eat everything."}
      </motion.p>
    </section>
  )
}