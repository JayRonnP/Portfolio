import React from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * ScrollDownIcon Component
 * 
 * A sleek, static visual scroll-down indicator without mouse shape or click navigation.
 */
export default function ScrollDownIcon({
  label = 'SCROLL DOWN',
  className = '',
}) {
  return (
    <div
      className={`inline-flex flex-col items-center gap-1.5 pointer-events-none select-none ${className}`}
    >
      {label && (
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400/90 font-medium">
          {label}
        </span>
      )}

      {/* Smooth Bouncing Down Chevron */}
      <ChevronDown className="w-4 h-4 text-purple-400/90 animate-bounce" />
    </div>
  )
}
