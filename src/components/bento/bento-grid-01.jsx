import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Smartphone, Globe, Maximize2, Minimize2, ArrowUpRight, Sparkles, Code2 } from "lucide-react"

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
    <div className={`relative w-full h-full min-h-[100px] rounded-lg overflow-hidden border border-zinc-800 ${bg} flex items-center justify-center group/card`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-300 ${currentFit === 'cover' ? 'object-cover' : 'object-contain p-2'
          }`}
      />
      <button
        onClick={toggleFit}
        title={currentFit === 'cover' ? 'View Full Image' : 'Fill Container'}
        className="absolute bottom-2 right-2 p-1.5 rounded-md bg-zinc-950/80 hover:bg-purple-900/90 text-white/70 hover:text-white border border-zinc-700/50 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover/card:opacity-100 z-10"
      >
        {currentFit === 'cover' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
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
    <div className="relative w-full h-full min-h-[220px] rounded-lg overflow-hidden border border-zinc-800 bg-black/60 flex items-center justify-center group/hero">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Tagpuan Hero ${currentIndex + 1}`}
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-2'}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-purple-500' : 'w-1.5 bg-zinc-600/80'
              }`}
          />
        ))}
      </div>

      <button
        onClick={toggleFit}
        title={fit === 'cover' ? 'View Full Image' : 'Fill Container'}
        className="absolute bottom-2 right-2 p-1.5 rounded-md bg-zinc-950/80 hover:bg-purple-900/90 text-white/70 hover:text-white border border-zinc-700/50 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover/hero:opacity-100 z-10"
      >
        {fit === 'cover' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
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
    <div className="w-full h-full flex items-center justify-between gap-2 p-1">
      {colors.map((color) => (
        <div
          key={color.hex}
          onClick={(e) => handleCopy(color.hex, e)}
          className="flex-1 h-full min-h-[60px] rounded-lg p-2 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border border-white/10 group relative"
          style={{ backgroundColor: color.hex }}
        >
          <span className="font-mono text-[9px] font-semibold px-1 py-0.5 rounded bg-black/40 text-white/90 self-start backdrop-blur-xs">
            {copiedColor === color.hex ? 'COPIED!' : color.hex}
          </span>
          <span className="text-[9px] font-medium text-white/90 drop-shadow-sm truncate">
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
    <div className="flex flex-col gap-1.5 my-auto">
      {tools.map((t, i) => (
        <span
          key={i}
          className="px-2.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-200 text-xs font-mono flex items-center justify-between hover:border-purple-500/60 transition-all hover:scale-[1.02] cursor-default"
        >
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${t.color}`} />
            <span className="font-medium text-xs text-white">{t.name}</span>
          </div>
          <span className="text-[9px] text-zinc-500 font-sans tracking-wider">{t.category}</span>
        </span>
      ))}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-12 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono text-xs font-medium uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>01 // FEATURED PROJECT</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            TAGPUAN WEBSITE SHOWCASE
          </h2>
        </div>
        <p className="text-zinc-400 text-xs font-mono max-w-md">
          Full-stack web application, interactive menu systems, and brand identity showcase.
        </p>
      </div>

      {/* Bento Grid Layout - 6 Columns Perfectly Proportioned */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 lg:gap-4">

        {/* 1. Hero Image Shuffler - Spans 4 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-4 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold">
              <Code2 className="w-4 h-4 text-purple-400" />
              Hero Interface
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">WEBSITE UI</span>
          </div>

          <HeroImageShuffler />

          <p className="text-zinc-400 text-xs mt-2 font-mono">
            Interactive hero section showcasing Tagpuan's signature products and featured drinks.
          </p>
        </motion.div>

        {/* 2. Developer Tools & Tech Stack - Spans 2 Columns & 2 Rows (Top Right Full Height) */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group cursor-pointer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 0.995 }}
        >
          <div>
            <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold mb-0.5">
              <Globe className="w-4 h-4 text-purple-400" />
              Developer Tools & Stack
            </h3>
            <p className="text-zinc-400 text-[11px] mb-2 font-mono">PRODUCTION WEB STACK</p>
          </div>

          <TechStackBadges />

          <p className="text-zinc-500 text-[10px] font-mono mt-2 border-t border-zinc-800/80 pt-1.5">
            Modern tech stack powering the Tagpuan web application.
          </p>
        </motion.div>

        {/* 3. Branding Color - Spans 2 Columns (Bottom Row Left) */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-base text-white font-semibold">Branding Colors</h3>
            <span className="text-[10px] font-mono text-zinc-500">PALETTE</span>
          </div>

          <BrandingColorPalette />
        </motion.div>

        {/* 4. Logo - Spans 2 Columns (Bottom Row Center) */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors cursor-pointer overflow-hidden group h-full"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex-1 w-full min-h-0 flex items-center justify-center bg-white rounded-lg p-1.5 shadow-sm border border-zinc-200/80 overflow-hidden">
            <img
              src={tagpuanLogo}
              alt="Tagpuan Logo"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <h3 className="font-serif text-xs text-white font-medium tracking-wide">Tagpuan Brand Identity</h3>
            <span className="text-[10px] text-zinc-500 font-mono">LOGO</span>
          </div>
        </motion.div>

        {/* 5. Live Website CTA - Centered & High Visibility (Bottom Row Right) */}
        <motion.div
          onClick={() => window.open('https://tagpuantest.netlify.app/', '_blank', 'noopener,noreferrer')}
          className="md:col-span-2 bg-gradient-to-b from-purple-950/40 via-zinc-900/90 to-zinc-900/90 border border-purple-500/40 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-purple-400 transition-all cursor-pointer overflow-hidden group relative shadow-[0_0_25px_rgba(168,85,247,0.15)]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="mb-2 flex flex-col items-center">
          </div>

          <a
            href="https://tagpuantest.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/50 hover:scale-105 transition-all duration-200 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]"
          >
            <span>VIEW WEBSITE</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </div>
  )
}

export default function BentoGrid01() {
  return <FeaturesSection />
}
