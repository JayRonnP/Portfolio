import React from 'react'
import { motion } from 'framer-motion'
import { User, Sparkles, Code2, Heart, GraduationCap, Award, MapPin, CheckCircle, ArrowRight } from 'lucide-react'

export default function AboutMeSection() {
  const pillars = [
    {
      num: '01',
      title: 'Design Sensitivity',
      desc: 'Obsessed with pixel-perfect layouts, modern typography, glassmorphism, and color harmony to create memorable visual experiences.'
    },
    {
      num: '02',
      title: 'Clean Engineering',
      desc: 'Writing modular, reusable React components and performant code that scales cleanly across viewports and devices.'
    },
    {
      num: '03',
      title: 'Curiosity & Problem Solving',
      desc: 'Driven by curiosity—when facing a challenge, I always dive deep into research to find the right answers and love resolving client concerns effectively.'
    }
  ]

  const highlights = [
    { label: 'Specialization', val: 'Full-Stack Web & UI/UX' },
    { label: 'Location', val: 'Philippines (Remote Available)' },
    { label: 'Experience', val: 'Custom Web Apps & Funnels' },
    { label: 'Focus', val: 'High Performance & Design' }
  ]

  return (
    <section id="about" className="w-full bg-black text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              GET TO KNOW ME
            </h2>
          </div>
        </div>

        {/* Main Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Personal Story Card (Spans 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-neutral-950/90 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-purple-500/40 transition-colors shadow-xl"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Jiron</h3>
                  <p className="text-xs font-mono text-purple-400">Aspiring Full-Stack Developer & UI Designer</p>
                </div>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                I'm Jiron, an aspiring web developer and designer who wants to help startups and growing businesses build a strong presence and get noticed in the market.
              </p>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-mono">
                I enjoy digging into research before I build, and I always make it a priority to meet my clients' goals.
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-neutral-800/80 pt-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">{item.label}</span>
                  <span className="text-xs font-bold text-neutral-200 font-mono block truncate">{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3 Core Pillars (Spans 5 Cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">{pillar.num}</span>
                  <CheckCircle className="w-4 h-4 text-purple-400/60 group-hover:text-purple-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed font-mono">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
