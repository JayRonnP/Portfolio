import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Cpu, Sparkles, Zap, ShieldCheck, Terminal, Award } from 'lucide-react'

export default function AboutSection() {
  const capabilities = [
    {
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      title: 'Full-Stack Web Development',
      description: 'Building modern, scalable web applications using React, Vite, Node.js, and clean component architectures.'
    },
    {
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      title: 'UI/UX & Graphic Design',
      description: 'Crafting pixel-perfect visual identities, marketing graphics, brand posters, and intuitive user interfaces in Figma.'
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: 'Motion & WebGL Animations',
      description: 'Engaging users through GSAP, Framer Motion, and WebGL custom shaders for fluid, high-frame-rate interactions.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'SEO & Performance Tuning',
      description: 'Optimizing web apps for maximum speed, accessibility standards, and search engine visibility across viewports.'
    }
  ]

  const stats = [
    { value: '100%', label: 'Responsive Viewports' },
    { value: 'GSAP', label: 'ScrollTrigger Motion' },
    { value: 'Full-Stack', label: 'Web Applications' },
    { value: 'Figma', label: 'UI/UX & Branding' }
  ]

  const techBadges = [
    'React', 'JavaScript', 'Vite', 'Tailwind CSS', 'GSAP',
    'Framer Motion', 'Figma', 'Node.js', 'HTML5/CSS3', 'Git/GitHub'
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
              ABOUT MY WORK
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md">
            Passionate developer & designer dedicated to creating memorable web experiences that seamlessly blend code and art.
          </p>
        </div>

        {/* Main Grid: Bio + Stats + Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* Left Column: Bio Card (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-neutral-950/90 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-purple-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-900/30 border border-purple-700/40 text-purple-400">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Full-Stack Developer</h3>
                  <p className="text-xs font-mono text-purple-300">Jay Ronn // Jiron.dev</p>
                </div>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed">
                Specializing in full-stack web applications, custom marketing funnels, and high-performance user interfaces.
                I bridge the gap between creative visual design and robust engineering, ensuring every site looks extraordinary and executes flawlessly.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 border-t border-neutral-800/80 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {techBadges.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] font-mono hover:border-purple-500/50 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Capabilities & Stats (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col justify-between">

            {/* Capabilities Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-5 hover:border-purple-500/40 transition-all duration-300 space-y-2 group"
                >
                  <div className="p-2 w-fit rounded-lg bg-neutral-900 border border-neutral-800 group-hover:scale-105 transition-transform">
                    {cap.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-4 sm:p-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1 border-r border-neutral-800/60 last:border-r-0 px-2">
                  <div className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
