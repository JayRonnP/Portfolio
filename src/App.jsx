import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LandingPage from './components/landing/LandingPage'
import Hero from './components/hero-section/hero'
import ServicesSection from './components/services/ServicesSection'
import HorizontalScrollSection from './components/works/HorizontalScrollSection'
import AboutMeSection from './components/about/AboutMeSection'
import ContactSection from './components/contact/contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  // Lock body & document scroll until the user enters from the Landing Page
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''

      // Refresh ScrollTrigger after layout unlocks and settles
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 100)
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 1200)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [hasEntered])

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white relative">
      {/* 0. Pre-Hero Interactive Landing Page Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="landing-page"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: '-100%',
              scale: 0.97,
              transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] touch-none"
          >
            <LandingPage onEnter={() => setHasEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content (revealed after entering) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={hasEntered ? '' : 'pointer-events-none aria-hidden="true"'}
      >
        {/* Sticky Header */}
        <header className="border-b border-neutral-900 sticky top-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a
              href="#hero"
              className="font-bold text-xs sm:text-sm tracking-wider sm:tracking-widest text-neutral-100 uppercase flex items-center gap-1.5 sm:gap-2 hover:text-purple-400 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
              <span>Jiron.dev</span>
            </a>

            <nav className="flex items-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">
              <a href="#hero" className="hover:text-white transition-colors">Hero</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#horizontal-showcase" className="hover:text-white transition-colors">Showcase</a>
              <a href="#about" className="hover:text-white transition-colors">About Me</a>
              <a href="#contacts" className="hover:text-white transition-colors">Contacts</a>
            </nav>
          </div>
        </header>

        {/* 1. Hero Section Component */}
        <Hero />

        {/* 2. Services I Provide Section */}
        <ServicesSection />

        {/* 3. Showcase Section (Horizontal Container Scroll) */}
        <div id="horizontal-showcase">
          <HorizontalScrollSection />
        </div>

        {/* 4. About Me Section Component */}
        <AboutMeSection />

        {/* 5. Contact Section Component */}
        <ContactSection />

      </motion.div>
    </div>
  )
}
