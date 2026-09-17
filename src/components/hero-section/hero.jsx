import React from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Ballpit from '../ui/Ballpit'
import FoldText from '../ui/FoldText'
import ScrollDownIcon from '../ui/ScrollDownIcon'
import './hero.css'

export default function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#120F17]">
            {/* 3D Ballpit Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <Ballpit
                    count={100}
                    gravity={0.01}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={false}
                />
            </div>

            {/* Hero Content Overlay */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 max-w-6xl mx-auto space-y-8 w-full py-6">
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-lg">
                        <FoldText
                            text="JIRON PANDAY"
                            splitBy="char"
                            hinge="top"
                            trigger="scroll"
                            duration={0.35}
                            stagger={0.02}
                            delay={0.25}
                            ease="power3.out"
                            perspective={700}
                            creaseShading={0.55}
                            fontSize="inherit"
                            fontWeight="inherit"
                            color="#ffffff"
                        />
                        <br />
                        <span className="text-purple-300/80">
                            <FoldText
                                text="ASPIRING DESIGNER & DEVELOPER"
                                splitBy="char"
                                hinge="top"
                                trigger="scroll"
                                duration={0.40}
                                stagger={0.02}
                                delay={0.45}
                                ease="power3.out"
                                perspective={700}
                                creaseShading={0.55}
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            />
                        </span>
                    </h1>

                    <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow">
                        Specializing in high-performance web applications, Funnel design, and modern UI engineering.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="#works"
                            className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-xl hover:scale-105"
                        >
                            <span>Explore Works</span>
                            <ArrowDown className="w-4 h-4" />
                        </a>

                        <a
                            href="#contacts"
                            className="px-6 py-3 bg-purple-950/80 backdrop-blur-md text-white font-semibold text-sm rounded-xl border border-purple-800/60 hover:bg-purple-900/80 transition-all flex items-center gap-2 shadow-xl hover:scale-105"
                        >
                            <span>Get In Touch</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Static Non-Clickable Scroll Down Indicator */}
            <div className="relative z-10 pb-6 flex justify-center">
                <ScrollDownIcon label="SCROLL DOWN" />
            </div>
        </section>
    )
}