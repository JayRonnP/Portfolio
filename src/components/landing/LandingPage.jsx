import React, { useEffect, useState } from 'react'
import RotatingText from '@/components/ui/RotatingText'
import './LandingPage.css'

export default function LandingPage({ onEnter }) {
  const [isHovered, setIsHovered] = useState(false)

  // Web Audio API click sound for subtle tactile feedback
  const playEnterSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    } catch (e) {
      // Audio context fallback
    }
  }

  const handleEnter = () => {
    playEnterSound()
    if (onEnter) onEnter()
  }

  // Keyboard shortcut (Enter or Space) to enter portfolio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleEnter()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter])

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden select-none">

      {/* Pure Minimalist Landing Content - Rotating Text & Enter Button Only */}
      <main className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-12 w-full">

        {/* Modern Staggered Rotating Text Animation */}
        <div className="w-full flex justify-center items-center min-h-[140px] sm:min-h-[180px]">
          <RotatingText
            texts={["WELCOME", "YOUR BRAND", "BUILT", "TO BE NOTICED"]}
            mainClassName="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white justify-center text-center drop-shadow-2xl"
            staggerFrom="first"
            staggerDuration={0.035}
            rotationInterval={2200}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        </div>

        {/* Minimalist Pure White CTA Enter Button Only */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <button
            onClick={handleEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-xl btn-minimal-white font-mono text-xs font-bold tracking-widest uppercase cursor-pointer active:scale-95"
          >
            <span>ENTER PORTFOLIO</span>
          </button>
        </div>
      </main>
    </div>
  )
}
