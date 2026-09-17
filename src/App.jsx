import React from 'react'
import { Terminal } from 'lucide-react'
import Hero from './components/hero-section/hero'
import HorizontalScrollSection from './components/works/HorizontalScrollSection'
import ContactSection from './components/contact/contact'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white relative overflow-x-hidden">
      {/* Sticky Header */}
      <header className="border-b border-neutral-900 sticky top-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-sm tracking-widest text-neutral-100 uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neutral-400" />
            <span>Jiron.dev</span>
          </a>

          <nav className="flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-400">
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
      <footer className="border-t border-neutral-900 py-12 px-6 text-center text-xs font-mono text-neutral-500 space-y-4">
        <p>© {new Date().getFullYear()} Jiron.dev — Built with React, GSAP & Tailwind CSS</p>
      </footer>
    </div>
  )
}
