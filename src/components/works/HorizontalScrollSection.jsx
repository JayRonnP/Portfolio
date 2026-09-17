import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import DriftWall from '../ui/DriftWall'
import WarpText from '../ui/WarpText'
import BentoGrid01 from '../bento/bento-grid-01'
import BentoGridDesign from '../bento/bento-grid-design'

gsap.registerPlugin(ScrollTrigger)

const PANEL3_TEXT = "Let's discover, the website I built through out my journey"

export default function HorizontalScrollSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return

      const getScrollAmount = () => -(trackRef.current.scrollWidth - window.innerWidth)

      // Main horizontal pin & scroll tween on the track element
      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${Math.max(window.innerWidth * 3, trackRef.current.scrollWidth - window.innerWidth)}`,
        },
      })

      // Panel 3: Split character entrance animation
      const chars = gsap.utils.toArray('.panel3-char')
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-20, 20),
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'left 30%',
            scrub: 1,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full bg-black text-white">
      {/* Main Pinned Container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-hidden relative bg-neutral-950 border-y border-neutral-900"
      >
        {/* Horizontal Track Wrapper */}
        <div
          ref={trackRef}
          className="flex flex-nowrap h-full w-[500vw] will-change-transform"
        >
          {/* Panel 1: Bold Hero with WarpText */}
          <section className="horizontal-panel w-screen h-full flex-shrink-0 flex items-center justify-center p-4 sm:p-8 md:p-16 border-r border-neutral-900/60 bg-gradient-to-br from-neutral-950 via-purple-950/20 to-neutral-950">
            <div className="max-w-4xl w-full space-y-4 sm:space-y-6 text-center sm:text-left flex flex-col items-center sm:items-start px-2">
              <div className="w-full">
                <WarpText
                  text={"EXPLORE MY\nPERSONAL WORKS"}
                  color="#f8f5ff"
                  warpStrength={0.08}
                  warpScale={1.7}
                  speed={0.55}
                  pointerInfluence={0.42}
                  pointerStrength={0.38}
                  refraction={0.018}
                  ripple
                  fontSize="clamp(2rem, 8vw, 10rem)"
                  fontWeight={800}
                  style={{ height: 'clamp(200px, 40vh, 360px)' }}
                  fontFamily="inherit"
                  letterSpacing={-0.06}
                  lineHeight={0.9}
                />
              </div>
              <div className="inline-flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-purple-300/80 pt-2">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
                <span>Keep scrolling</span>
              </div>
            </div>
          </section>

          {/* Panel 2: Interactive DriftWall Gallery */}
          <section className="horizontal-panel w-screen h-full flex-shrink-0 relative overflow-hidden border-r border-neutral-900/60">
            <div className="w-full h-full">
              <DriftWall />
            </div>
          </section>

          {/* Panel 3: Horizontal Interactive Text Reveal */}
          <section className="horizontal-panel Horizontal w-screen h-full flex-shrink-0 flex items-center overflow-hidden border-r border-neutral-900/60 bg-neutral-950">
            <div className="container mx-auto px-4 sm:px-6">
              <h3 className="Horizontal__text heading-xl text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-bold flex flex-wrap gap-x-[0.3em] gap-y-2 text-white">
                {PANEL3_TEXT.split(' ').map((word, wIdx) => (
                  <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split('').map((char, cIdx) => (
                      <span
                        key={cIdx}
                        className="panel3-char inline-block"
                        style={{ willChange: 'transform' }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h3>
            </div>
          </section>

          {/* Panel 4: Tagpuan Web Application Bento Grid */}
          <section className="horizontal-panel w-screen h-full flex-shrink-0 border-r border-neutral-900/60 bg-zinc-950 overflow-y-auto flex flex-col justify-center items-center py-6">
            <div className="w-full my-auto">
              <BentoGrid01 />
            </div>
          </section>

          {/* Panel 5: Graphic & UI Design Bento Showcase */}
          <section className="horizontal-panel w-screen h-full flex-shrink-0 border-r border-neutral-900/60 bg-zinc-950 overflow-y-auto flex flex-col justify-center items-center py-6">
            <div className="w-full my-auto">
              <BentoGridDesign />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
