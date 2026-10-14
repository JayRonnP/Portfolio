import { useCallback, useEffect } from 'react'
import './LandingPage.css'

export default function LandingPage({ onEnter }) {
  const handleEnter = useCallback(() => onEnter?.(), [onEnter])

  useEffect(() => {
    const timer = setTimeout(handleEnter, 1400)
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleEnter()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleEnter])

  return (
    <div
      onTouchMove={(e) => e.preventDefault()}
      className="landing-screen fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black p-6 text-white select-none touch-none"
    >
      <main className="landing-loader" role="status" aria-label="Loading portfolio">
        <span className="landing-loader__spinner" aria-hidden="true" />
        <span className="landing-loader__label">Loading</span>
      </main>
    </div>
  )
}
