import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layout, Palette, Layers, Sparkles, Eye, Maximize2, Minimize2, Car } from "lucide-react"

import doubleB from '../../assets/doubleb.png'
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
    <div className={`relative w-full h-[65px] sm:h-[80px] md:h-[95px] rounded-lg overflow-hidden border border-zinc-800 ${bg} flex items-center justify-center group/card`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-300 ${
          currentFit === 'cover' ? 'object-cover' : 'object-contain p-1'
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

function GraphicDesignShuffler() {
  const images = [doubleB, lodzPoster, ojt1, ojt2, ojt3, ojt4, ojt5, ojt6]
  const titles = [
    "Double B AutoShop UI",
    "Lodz Poster Art",
    "OJT Project 1",
    "Car Selling Platform",
    "UI Dashboard Showcase",
    "Commercial Graphic Design",
    "Brand Layout 5",
    "Internship Showcase 6"
  ]
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
    <div className="relative w-full h-[120px] sm:h-[145px] md:h-[165px] lg:h-[190px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950/80 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={titles[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain p-1.5'}`}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-300 font-medium tracking-wide truncate">
            {titles[currentIndex]}
          </span>
        </div>
        <button
          onClick={toggleFit}
          className="p-1 rounded bg-zinc-900/90 hover:bg-purple-900 text-white/70 hover:text-white border border-zinc-700/60 backdrop-blur-md transition-all duration-200"
        >
          {fit === 'cover' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
        </button>
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-4 bg-purple-500" : "w-1 bg-zinc-700 hover:bg-zinc-500"
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
    <div className="relative w-full h-[65px] sm:h-[80px] md:h-[95px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center group/ojt">
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

      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/70 backdrop-blur-md border border-zinc-700/50 text-[8px] sm:text-[9px] font-mono text-purple-300 font-semibold z-10">
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
    <div className="flex flex-col gap-1 sm:gap-1.5 my-auto">
      {tools.map((t, i) => (
        <span
          key={i}
          className="px-2 py-0.5 sm:py-1 rounded-md bg-zinc-950/80 border border-zinc-800/80 text-zinc-200 text-[10px] sm:text-[11px] font-mono flex items-center justify-between hover:border-purple-500/60 transition-all cursor-default"
        >
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${t.color}`} />
            <span className="font-medium text-[10px] sm:text-[11px] text-white">{t.name}</span>
          </div>
          <span className="text-[7px] sm:text-[8px] text-zinc-500 font-sans">SUITE</span>
        </span>
      ))}
    </div>
  )
}

export default function BentoGridDesign() {
  return (
    <div className="max-w-[1240px] w-full mx-auto px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 border-b border-zinc-800/80 pb-1">
        <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase">
          GRAPHIC & UI DESIGN
        </h2>
      </div>

      {/* Grid Layout (6 Columns Perfectly Proportioned - Identical to Panel 4) */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1.5 sm:gap-2 lg:gap-2.5">
        
        {/* 1. Main Graphic Showcase - Spans 4 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-4 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xs sm:text-sm text-white flex items-center gap-1.5 font-semibold">
              <Layout className="w-3.5 h-3.5 text-purple-400" />
              Graphic Showcase
            </h3>
            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase">ARTWORK</span>
          </div>

          <GraphicDesignShuffler />

          <p className="text-zinc-400 text-[10px] mt-1 font-mono">
            Double B AutoShop UI, creative poster art, and brand identity graphics.
          </p>
        </motion.div>

        {/* 2. Design Tools & Stack - Spans 2 Columns & 2 Rows */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group cursor-pointer"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div>
            <h3 className="font-serif text-xs sm:text-sm text-white flex items-center gap-1.5 font-semibold mb-0.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              Design Tools
            </h3>
            <p className="text-zinc-400 text-[9px] sm:text-[10px] mb-1 font-mono">PRIMARY SUITE</p>
          </div>

          <DesignToolBadges />

          <p className="text-zinc-500 text-[8px] sm:text-[9px] font-mono mt-1 border-t border-zinc-800/80 pt-0.5">
            Core workflow tools for layout design and branding.
          </p>
        </motion.div>

        {/* 3. Poster & Editorial Design - Spans 2 Columns */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xs text-white flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Poster Art
            </h3>
            <span className="text-[8px] font-mono text-zinc-500">POSTER</span>
          </div>

          <SingleCardImageViewer src={lodzPoster} alt="Lodz Poster Art" fit="cover" />
        </motion.div>

        {/* 4. Real-World UI & OJT Projects - Spans 2 Columns */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xs text-white flex items-center gap-1.5 font-semibold">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              UI & Internship
            </h3>
          </div>

          <OjtProjectShuffler />
        </motion.div>

        {/* 5. Double B AutoShop Card - Spans 2 Columns */}
        <motion.div
          className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 sm:p-2.5 flex flex-col justify-between hover:border-purple-500/50 transition-colors group overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xs text-white flex items-center gap-1.5 font-semibold">
              <Car className="w-3.5 h-3.5 text-purple-400" />
              Double B AutoShop
            </h3>
            <span className="text-[8px] font-mono text-purple-400 font-semibold">CAR UI</span>
          </div>

          <SingleCardImageViewer src={doubleB} alt="Double B AutoShop UI Design" fit="contain" bg="bg-black/90" />
        </motion.div>

      </div>
    </div>
  )
}
