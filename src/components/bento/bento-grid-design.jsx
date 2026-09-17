import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layout, Palette, Layers, Sparkles, Eye, Maximize2, Minimize2 } from "lucide-react"

import aboutUs from '../../assets/Aboutus.svg'
import heroSection from '../../assets/Hero-Section.svg'
import sellingCar from '../../assets/Selling-car.svg'
import lodzPoster from '../../assets/lodz-poster.webp'
import ojt1 from '../../assets/ojt-1.webp'
import ojt2 from '../../assets/ojt-2.webp'
import ojt3 from '../../assets/ojt-3.webp'
import ojt4 from '../../assets/ojt4.webp'
import ojt5 from '../../assets/ojt5.webp'
import ojt6 from '../../assets/ojt6.webp'

function SingleCardImageViewer({ src, alt, fit = 'cover', bg = 'bg-black/60' }) {
  const [currentFit, setCurrentFit] = useState(fit)

  const toggleFit = (e) => {
    e.stopPropagation()
    setCurrentFit((prev) => (prev === 'cover' ? 'contain' : 'cover'))
  }

  return (
    <div className={`relative w-full h-full min-h-[120px] rounded-lg overflow-hidden border border-zinc-800 ${bg} flex items-center justify-center group/card`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-300 ${
          currentFit === 'cover' ? 'object-cover' : 'object-contain p-2'
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

function GraphicDesignShuffler() {
  const images = [sellingCar, aboutUs, heroSection, lodzPoster]
  const titles = ["Vehicle Sales Graphic", "About Us Layout", "Hero Section UI", "Lodz Poster Art"]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fit, setFit] = useState('cover')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [images.length])

  const toggleFit = (e) => {
    e.stopPropagation()
    setFit((prev) => (prev === 'cover' ? 'contain' : 'cover'))
  }

  return (
    <div className="relative w-full h-full min-h-[240px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={titles[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-2'}`}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-300 font-medium tracking-wide">
            {titles[currentIndex]}
          </span>
        </div>
        <button
          onClick={toggleFit}
          className="p-1.5 rounded-md bg-zinc-900/90 hover:bg-purple-900 text-white/70 hover:text-white border border-zinc-700/60 backdrop-blur-md transition-all duration-200"
        >
          {fit === 'cover' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-purple-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function OjtProjectShuffler() {
  const ojtImages = [ojt1, ojt2, ojt3, ojt4, ojt5, ojt6]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ojtImages.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [ojtImages.length])

  return (
    <div className="relative w-full h-full min-h-[120px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center group/ojt">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={ojtImages[index]}
          alt={`OJT Project ${index + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-zinc-700/50 text-[10px] font-mono text-purple-300 font-semibold z-10">
        PROJECT {index + 1} / {ojtImages.length}
      </div>
    </div>
  )
}

function DesignToolBadges() {
  const tools = [
    { name: "Figma", color: "from-purple-500 to-pink-500" },
    { name: "Canva", color: "from-blue-500 to-cyan-500" },
    { name: "Meta Business", color: "from-blue-600 to-indigo-600" },
  ]

  return (
    <div className="flex flex-col gap-2.5 my-auto">
      {tools.map((t, i) => (
        <span
          key={i}
          className="px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-200 text-xs font-mono flex items-center justify-between hover:border-purple-500/60 transition-all hover:scale-[1.02] cursor-default"
        >
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${t.color}`} />
            <span className="font-medium text-sm text-white">{t.name}</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-sans">SUITE</span>
        </span>
      ))}
    </div>
  )
}

export default function BentoGridDesign() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-12 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono text-xs font-medium uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>02 // CREATIVE PORTFOLIO</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            GRAPHIC & UI DESIGN
          </h2>
        </div>
        <p className="text-zinc-400 text-xs font-mono max-w-md">
          Visual identities, marketing graphics, vector art, and digital layout designs.
        </p>
      </div>

      {/* Grid Layout (6 Columns Perfectly Proportioned) */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 lg:gap-4">
        
        {/* 1. Main Graphic Showcase - Spans 4 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-4 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold">
              <Layout className="w-4 h-4 text-purple-400" />
              Graphic Showcase
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">ARTWORK</span>
          </div>

          <GraphicDesignShuffler />

          <p className="text-zinc-400 text-xs mt-2 font-mono">
            Creative poster art, brand identity graphics, and custom illustration assets.
          </p>
        </motion.div>

        {/* 2. Design Tools & Stack - Spans 2 Columns & 2 Rows (Top Right Full Height) */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group cursor-pointer"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div>
            <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold mb-0.5">
              <Palette className="w-4 h-4 text-purple-400" />
              Design Tools & Stack
            </h3>
            <p className="text-zinc-400 text-[11px] mb-3 font-mono">PRIMARY CREATIVE SUITE</p>
          </div>

          <DesignToolBadges />

          <p className="text-zinc-500 text-[11px] font-mono mt-3 border-t border-zinc-800/80 pt-2">
            Core workflow tools for layout design, marketing assets, and brand management.
          </p>
        </motion.div>

        {/* 3. Poster & Editorial Design - Spans 2 Columns (Bottom Row Left) */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold">
              <Layers className="w-4 h-4 text-purple-400" />
              Poster & Editorial Art
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">POSTER</span>
          </div>

          <SingleCardImageViewer src={lodzPoster} alt="Lodz Poster Art" fit="cover" />
        </motion.div>

        {/* 4. Real-World UI & OJT Projects - Spans 2 Columns (Bottom Row Center) */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold">
                <Eye className="w-4 h-4 text-purple-400" />
                UI & Internship
              </h3>
              <p className="text-zinc-400 text-[11px] font-mono">OJT INTERFACE DESIGNS</p>
            </div>
          </div>

          <OjtProjectShuffler />
        </motion.div>

        {/* 5. Commercial Graphic Art - Spans 2 Columns (Bottom Row Right) */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-serif text-base text-white flex items-center gap-2 font-semibold">
                <Layout className="w-4 h-4 text-purple-400" />
                Commercial Graphic Art
              </h3>
              <p className="text-zinc-400 text-[11px] font-mono">RETAIL BANNERS</p>
            </div>
          </div>

          <SingleCardImageViewer src={sellingCar} alt="Selling Car Graphic Design" fit="cover" />
        </motion.div>

      </div>
    </div>
  )
}
