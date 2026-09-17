import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Smartphone, Globe, Maximize2, Minimize2, ArrowUpRight, Sparkles, Code2 } from "lucide-react"
import SpecularButton from '../ui/SpecularButton'

import tagpuanHero from '../../assets/tagpuan-hero.webp'
import tagpuanHero2 from '../../assets/tagpuan-hero2.webp'
import tagpuanHero3 from '../../assets/tagpuan-hero3.webp'
import tagpuanLogo from '../../assets/tagpuan-logo.webp'

function SingleCardImageViewer({ src, alt, fit = 'contain', bg = 'bg-black/60' }) {
  const [currentFit, setCurrentFit] = useState(fit)

  const toggleFit = (e) => {
    e.stopPropagation()
    setCurrentFit((prev) => (prev === 'cover' ? 'contain' : 'cover'))
  }

  return (
    <div className={`relative w-full h-full min-h-[55px] sm:min-h-[70px] rounded-lg overflow-hidden border border-zinc-800 ${bg} flex items-center justify-center group/card`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-300 ${currentFit === 'cover' ? 'object-cover' : 'object-contain p-1'
          }`}
      />
      <button
        onClick={toggleFit}
        title={currentFit === 'cover' ? 'View Full Image' : 'Fill Container'}
        className="absolute bottom-1.5 right-1.5 p-1 rounded bg-zinc-950/80 hover:bg-purple-900/90 text-white/70 hover:text-white border border-zinc-700/50 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover/card:opacity-100 z-10"
      >
        {currentFit === 'cover' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
      </button>
    </div>
  )
}

function HeroImageShuffler() {
  const images = [tagpuanHero, tagpuanHero2, tagpuanHero3]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fit, setFit] = useState('cover')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  const toggleFit = (e) => {
    e.stopPropagation()
    setFit((prev) => (prev === 'cover' ? 'contain' : 'cover'))
  }

  return (
    <div className="relative w-full h-full min-h-[110px] sm:min-h-[140px] md:min-h-[155px] rounded-lg overflow-hidden border border-zinc-800 bg-black/60 flex items-center justify-center group/hero">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Tagpuan Hero ${currentIndex + 1}`}
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-1.5'}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-3 bg-purple-500' : 'w-1 bg-zinc-600/80'
              }`}
          />
        ))}
      </div>

      <button
        onClick={toggleFit}
        title={fit === 'cover' ? 'View Full Image' : 'Fill Container'}
        className="absolute bottom-1.5 right-1.5 p-1 rounded bg-zinc-950/80 hover:bg-purple-900/90 text-white/70 hover:text-white border border-zinc-700/50 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover/hero:opacity-100 z-10"
      >
        {fit === 'cover' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
      </button>
    </div>
  )
}

function BrandingColorPalette() {
  const [copiedColor, setCopiedColor] = useState(null)

  const colors = [
    { name: 'Forest Green', hex: '#1B3B2B' },
    { name: 'Warm Gold', hex: '#D4A359' },
    { name: 'Dark Espresso', hex: '#28170C' }
  ]

  const handleCopy = (hex, e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(hex)
    setCopiedColor(hex)
    setTimeout(() => setCopiedColor(null), 1800)
  }

  return (
    <div className="w-full h-full flex items-center justify-between gap-1.5 p-0.5">
      {colors.map((color) => (
        <div
          key={color.hex}
          onClick={(e) => handleCopy(color.hex, e)}
          className="flex-1 h-full min-h-[34px] sm:min-h-[40px] rounded-md p-1 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 border border-white/10 group relative"
          style={{ backgroundColor: color.hex }}
        >
          <span className="font-mono text-[7px] sm:text-[8px] font-semibold px-0.5 py-0.2 rounded bg-black/40 text-white/90 self-start">
            {copiedColor === color.hex ? 'COPIED!' : color.hex}
          </span>
          <span className="text-[7px] sm:text-[8px] font-medium text-white/90 truncate">
            {color.name}
          </span>
        </div>
      ))}
    </div>
  )
}

function TechStackBadges() {
  const tools = [
    { name: "React", category: "FRAMEWORK", color: "from-cyan-400 to-blue-500" },
    { name: "Vite", category: "BUNDLER", color: "from-purple-400 to-indigo-500" },
    { name: "JavaScript", category: "LANGUAGE", color: "from-yellow-400 to-amber-500" },
    { name: "Netlify", category: "DEPLOYMENT", color: "from-teal-400 to-emerald-500" },
    { name: "GitHub", category: "VCS", color: "from-zinc-400 to-slate-200" },
  ]

  return (
    <div className="flex flex-col gap-1 my-auto">
      {tools.map((t, i) => (
        <span
          key={i}
          className="px-2 py-0.5 sm:py-1 rounded-md bg-zinc-950/80 border border-zinc-800/80 text-zinc-200 text-[10px] sm:text-[11px] font-mono flex items-center justify-between hover:border-purple-500/60 transition-all cursor-default"
        >
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${t.color}`} />
            <span className="font-medium text-[10px] sm:text-[11px] text-white">{t.name}</span>
          </div>
          <span className="text-[7px] sm:text-[8px] text-zinc-500 font-sans tracking-wider">{t.category}</span>
        </span>
      ))}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <div className="max-w-[1240px] w-full mx-auto px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 border-b border-zinc-800/80 pb-1">
        <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase">
          TAGPUAN WEBSITE SHOWCASE
        </h2>
      </div>

      {/* Bento Grid Layout - 6 Columns Perfectly Proportioned */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1.5 sm:gap-2 lg:gap-2.5">

        {/* 1. Hero Image Shuffler - Spans 4 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-4 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xs sm:text-sm text-white flex items-center gap-1.5 font-semibold">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              Hero Interface
            </h3>
            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase">WEBSITE UI</span>
          </div>

          <HeroImageShuffler />

          <p className="text-zinc-400 text-[10px] mt-1 font-mono">
            Interactive hero section showcasing Tagpuan's signature products.
          </p>
        </motion.div>

        {/* 2. Developer Tools & Tech Stack - Spans 2 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group cursor-pointer"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div>
            <h3 className="font-serif text-xs sm:text-sm text-white flex items-center gap-1.5 font-semibold mb-0.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              Developer Stack
            </h3>
            <p className="text-zinc-400 text-[9px] sm:text-[10px] mb-1 font-mono">PRODUCTION TOOLS</p>
          </div>

          <TechStackBadges />

          <p className="text-zinc-500 text-[8px] sm:text-[9px] font-mono mt-1 border-t border-zinc-800/80 pt-0.5">
            Modern tech stack powering the web application.
          </p>
        </motion.div>

        {/* 3. Branding Color - Spans 2 Columns */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="font-serif text-xs text-white font-semibold">Branding Colors</h3>
            <span className="text-[8px] font-mono text-zinc-500">PALETTE</span>
          </div>

          <BrandingColorPalette />
        </motion.div>

        {/* 4. Logo - Spans 2 Columns */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden group h-full"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex-1 w-full min-h-0 flex items-center justify-center bg-white rounded p-1 border border-zinc-200/80 overflow-hidden">
            <img
              src={tagpuanLogo}
              alt="Tagpuan Logo"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-0.5 flex items-center justify-between">
            <h3 className="font-serif text-[10px] sm:text-xs text-white font-medium tracking-wide">Brand Identity</h3>
            <span className="text-[8px] text-zinc-500 font-mono">LOGO</span>
          </div>
        </motion.div>

        {/* 5. Live Website CTA - Clean text and icon with zero borders */}
        <div className="md:col-span-2 flex items-center justify-center w-full h-full py-2">
          <a
            href="https://tagpuantest.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-xs sm:text-sm font-extrabold text-white hover:text-purple-300 uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>VISIT LIVE WEBSITE</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  )
}

export default function BentoGrid01() {
  return <FeaturesSection />
}
