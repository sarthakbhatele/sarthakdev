'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

import Loader from '@/components/core/Loader'
import Toggle from '@/components/core/Toggle'
import ChessGrid from '@/components/chess/ChessGrid'
import PacmanCanvas from '@/components/pacman/PacmanCanvas'
import PawnProgress from '@/components/chess/PawnProgress'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Page() {
  const theme = useThemeStore(s => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Loader />
      <Toggle />
      
      {/* Fixed ambient layers — self-managed visibility */}
      <ChessGrid />
      <PacmanCanvas />
      <PawnProgress />

      <main>
        <section id="hero">     <Hero />     </section>
        <section id="about">    <About />    </section>
        <section id="projects"> <Projects /> </section>
        <section id="skills">   <Skills />   </section>
        <section id="contact">  <Contact />  </section>
      </main>
    </>
  )
}