import React, { useEffect } from 'react'
import RotatingText from '@/components/ui/RotatingText'
import './LandingPage.css'

export default function LandingPage({ onEnter }) {
  const landingTexts = ["WELCOME", "YOUR BRAND", "BUILT", "TO BE NOTICED"]

  const handleEnter = () => {
    if (onEnter) onEnter()
  }

  // Handle auto-transition when the final text ("TO BE NOTICED") appears
  const handleNextText = (index) => {
    if (index === landingTexts.length - 1) {
      // Allow "TO BE NOTICED" to show for 2 seconds, then seamlessly transition
      setTimeout(() => {
        handleEnter()
      }, 2000)
    }
  }

  // Optional keyboard shortcut (Enter or Space) for immediate skip
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
    <div
      onTouchMove={(e) => e.preventDefault()}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden select-none touch-none"
    >
      {/* Pure Minimalist Landing Content - Rotating Text Auto-Sequence */}
      <main className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-center items-center min-h-[140px] sm:min-h-[180px]">
          <RotatingText
            texts={landingTexts}
            mainClassName="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white justify-center text-center drop-shadow-2xl"
            staggerFrom="first"
            staggerDuration={0.035}
            rotationInterval={2200}
            loop={false}
            onNext={handleNextText}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        </div>
      </main>
    </div>
  )
}
