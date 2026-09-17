import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import LandingPage from './components/landing/LandingPage'
import Hero from './components/hero-section/hero'
import HorizontalScrollSection from './components/works/HorizontalScrollSection'
import ContactSection from './components/contact/contact'

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white relative overflow-x-hidden">
      {/* 0. Pre-Hero Interactive Landing Page Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="landing-page"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100]"
          >
            <LandingPage onEnter={() => setHasEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content (revealed after entering) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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

            <nav className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">
              <a href="#hero" className="hover:text-white transition-colors">Hero</a>
              <a href="#horizontal-showcase" className="hover:text-white transition-colors">Showcase</a>
              <a href="#contacts" className="hover:text-white transition-colors">Contacts</a>
            </nav>
          </div>
        </header>

        {/* 1. Hero Section Component */}
        <Hero />

        {/* 2. Horizontal Container Scroll Section */}
        <div id="horizontal-showcase">
          <HorizontalScrollSection />
        </div>

        {/* 3. Contact Section Component */}
        <ContactSection />

        {/* Footer */}
        <footer className="border-t border-neutral-900 py-8 sm:py-12 px-4 sm:px-6 text-center text-[11px] sm:text-xs font-mono text-neutral-500 space-y-4">
          <p>© {new Date().getFullYear()} Jiron.dev — Built with React, GSAP & Tailwind CSS</p>
        </footer>
      </motion.div>
    </div>
  )
}
