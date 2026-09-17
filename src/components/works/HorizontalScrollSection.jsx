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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.horizontal-panel')
      if (!sections.length || !containerRef.current) return

      // Main horizontal pin & scroll tween
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.1,
          end: '+=3200',
          invalidateOnRefresh: true,
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
        className="w-full h-screen overflow-hidden flex flex-nowrap relative bg-neutral-950 border-y border-neutral-900"
      >
        {/* Panel 1: Bold Hero with WarpText */}
        <section className="horizontal-panel w-full h-full flex-shrink-0 flex items-center justify-center p-8 sm:p-16 border-r border-neutral-900/60 bg-gradient-to-br from-neutral-950 via-purple-950/20 to-neutral-950">
          <div className="max-w-4xl w-full space-y-6 text-center sm:text-left flex flex-col items-center sm:items-start">
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
                fontSize="clamp(2.5rem, 10vw, 12rem)"
                fontWeight={800}
                style={{ height: '360px' }}
                fontFamily="inherit"
                letterSpacing={-0.06}
                lineHeight={0.9}
              />
            </div>
            <div className="inline-flex items-center gap-3 text-xs font-mono text-purple-300/80 pt-2">
              <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
              <span>Keep scrolling</span>
            </div>
          </div>
        </section>

        {/* Panel 2: Interactive DriftWall Gallery */}
        <section className="horizontal-panel w-full h-full flex-shrink-0 relative overflow-hidden border-r border-neutral-900/60">
          <div className="w-full h-full">
            <DriftWall />
          </div>
        </section>

        {/* Panel 3: Horizontal Interactive Text Reveal */}
        <section className="horizontal-panel Horizontal w-full h-full flex-shrink-0 flex items-center overflow-hidden border-r border-neutral-900/60 bg-neutral-950">
          <div className="container mx-auto px-6">
            <h3 className="Horizontal__text heading-xl text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold flex flex-wrap gap-x-[0.3em] gap-y-2 text-white">
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
        <section className="horizontal-panel w-full h-full flex-shrink-0 flex items-center justify-center border-r border-neutral-900/60 overflow-hidden bg-zinc-950">
          <div className="w-full h-full flex items-center justify-center overflow-y-auto">
            <BentoGrid01 />
          </div>
        </section>

        {/* Panel 5: Graphic & UI Design Bento Showcase */}
        <section className="horizontal-panel w-full h-full flex-shrink-0 flex items-center justify-center border-r border-neutral-900/60 overflow-hidden bg-zinc-950">
          <div className="w-full h-full flex items-center justify-center overflow-y-auto">
            <BentoGridDesign />
          </div>
        </section>
      </div>
    </div>
  )
}
