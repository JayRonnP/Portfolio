import { useState } from 'react'
import { ArrowUpRight, ClipboardList, Magnet, MessageCircle, PanelsTopLeft } from "lucide-react"
import funnelMockup from '../../assets/GHL-funnel.webp'
import ImageLightbox from '../ui/ImageLightbox'
import LazyImage from '../ui/LazyImage'

const funnelStages = [
  { number: '01', title: 'Attract', description: 'Introduce the solar offer with a clear landing page.', icon: PanelsTopLeft },
  { number: '02', title: 'Build trust', description: 'Showcase the installation process and customer reviews.', icon: MessageCircle },
  { number: '03', title: 'Capture', description: 'Guide interested visitors to a focused enquiry form.', icon: ClipboardList },
]

function FunnelStages() {
  return (
    <div className="flex flex-col justify-center gap-2 sm:gap-3">
      {funnelStages.map(({ number, title, description, icon: Icon }) => (
        <div key={number} className="flex items-start gap-2.5 rounded-lg border border-zinc-800/80 bg-zinc-950/80 p-2 sm:p-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-purple-500/30 bg-purple-500/10">
            <Icon className="h-3.5 w-3.5 text-purple-400" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[8px] text-purple-300">{number}</span>
              <h4 className="text-[10px] font-semibold text-white sm:text-xs">{title}</h4>
            </div>
            <p className="mt-0.5 text-[9px] leading-relaxed text-zinc-400 sm:text-[10px]">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BentoGridFunnel() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
    <div className="mx-auto w-full max-w-310 px-2.5 py-1 sm:px-4 sm:py-2 lg:px-6">
      <div className="mb-1.5 flex items-center justify-between border-b border-zinc-800/80 pb-1 sm:mb-2">
        <h2 className="text-base font-extrabold uppercase tracking-tight text-white sm:text-xl md:text-2xl">
          LEAD GENERATION FUNNEL
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-1.5 sm:gap-2 md:grid-cols-6 lg:gap-2.5">
        <div className="flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/90 p-2 transition-colors hover:border-purple-500/50 md:col-span-4 md:row-span-2 sm:p-2.5">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 font-serif text-xs font-semibold text-white sm:text-sm">
              <PanelsTopLeft className="h-3.5 w-3.5 text-purple-400" />
              Solar Funnel Mockup create by GHL
            </h3>
            <span className="text-[8px] font-mono uppercase text-zinc-500 sm:text-[9px]">LANDING PAGE</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImage({
              src: funnelMockup,
              alt: 'Solar energy lead generation funnel mockup with a landing page, installation steps, reviews, and enquiry form',
            })}
            aria-label="View the solar funnel mockup full size"
            className="flex h-[clamp(180px,34vh,320px)] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80 cursor-zoom-in"
          >
            <LazyImage
              src={funnelMockup}
              alt="Solar energy lead generation funnel mockup with a landing page, installation steps, reviews, and enquiry form"
              className="h-full w-full object-contain"
            />
          </button>

          <div className="mt-2 flex items-start justify-between gap-3">
            <p className="max-w-2xl text-[10px] leading-relaxed text-zinc-400 sm:text-xs">
              I created this funnel design mockup to generate leads, guiding visitors from the solar offer to an enquiry form.
            </p>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900/90 p-2 sm:p-2.5 md:col-span-2 md:row-span-2">
          <div className="mb-2">
            <h3 className="flex items-center gap-1.5 font-serif text-xs font-semibold text-white sm:text-sm">
              <Magnet className="h-3.5 w-3.5 text-purple-400" />
              Funnel Journey
            </h3>
            <p className="mt-0.5 font-mono text-[8px] text-zinc-500 sm:text-[9px]">FROM FIRST VISIT TO ENQUIRY</p>
          </div>
          <FunnelStages />
          <p className="mt-2 border-t border-zinc-800/80 pt-1 font-mono text-[8px] text-zinc-500 sm:text-[9px]">
            A clear path designed to turn interest into leads.
          </p>
        </div>

      </div>
    </div>
    {selectedImage && (
      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    )}
    </>
  )
}
