import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      id: '01',
      title: 'STATIC WEBPAGE',
      tagline: 'SCALABLE • PERFORMANT • MODERN',
      description: (
        <>
          Building custom single-page web applications from scratch based on business requirements using{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">React</span>,{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">Vite</span>,{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">Tailwind CSS</span>, and{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">Node.js</span>. Focused on{' '}
          <span className="text-purple-400 font-bold">clean code</span>, modular components, and{' '}
          <span className="text-purple-400 font-bold">ultra-fast load times</span>.
        </>
      ),
      deliverables: [
        'Custom React Application Development',
        'State Management & API Integration',
        'Responsive Viewport Optimization',
        'Production Deployment & Hosting'
      ]
    },
    {
      id: '02',
      title: 'DATA ENTRY',
      tagline: 'ACCURATE • INTEGRITY • FAST',
      description: (
        <>
          Meticulous data processing and management services ensuring{' '}
          <span className="text-purple-400 font-bold">strict confidentiality</span> and{' '}
          <span className="text-purple-400 font-bold">high-speed precision</span>. From complex spreadsheet organization to large-scale{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">database population</span>, streamlining your data workflows efficiently.
        </>
      ),
      deliverables: [
        'Cleaned & Verified Spreadsheets',
        'Structured Database Records',
        'Digitized Document Archives',
        'Detailed Data Migration Reports'
      ]
    },
    {
      id: '03',
      title: 'CUSTOMER SERVICE',
      tagline: 'EMPATHETIC • RESPONSIVE • RELIABLE',
      description: (
        <>
          Delivering <span className="text-purple-400 font-bold">exceptional front-line support</span> that turns everyday user inquiries into positive brand experiences. Managing multi-channel communications with speed,{' '}
          <span className="text-purple-400 font-bold">professional empathy</span>, and clear{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">resolution tracking</span>.
        </>
      ),
      deliverables: [
        'Omnichannel Ticket Resolution',
        'Customer Onboarding Support',
        'FAQ & Knowledge Base Documentation',
        'SLA & Escalation Monitoring'
      ]
    },
    {
      id: '04',
      title: 'FUNNEL & CONVERSIONS',
      tagline: 'HIGH-CONVERTING • OPTIMIZED',
      description: (
        <>
          Engineering <span className="text-purple-400 font-bold">high-converting landing pages</span> and sales funnels designed to{' '}
          <span className="text-purple-400 font-bold">capture leads</span>, showcase products, and{' '}
          <span className="text-purple-300 font-semibold underline decoration-purple-500/50 underline-offset-4">drive maximum user engagement</span>.
        </>
      ),
      deliverables: [
        'Landing Page Optimization',
        'Lead Capture & Form Integration',
        'SEO & Core Web Vitals Audit',
        'Conversion-Focused Layouts'
      ]
    }
  ]

  return (
    <section
      id="services"
      className="w-full min-h-screen flex flex-col justify-center bg-black text-white py-24 sm:py-36 md:py-44 px-6 sm:px-12 lg:px-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-24">

        {/* Section Header */}
        <div className="space-y-3 pb-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
            WHAT I BRING TO THE TABLE
          </h2>
        </div>

        {/* Services List with Generous Spacing and Dividers Above Every Number */}
        <div className="space-y-14 sm:space-y-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="border-t border-neutral-800/80 pt-10 sm:pt-14 pb-2 space-y-6 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-12">

                {/* ID & Title Block */}
                <div className="md:w-1/3 space-y-2">
                  <span className="text-lg sm:text-xl font-mono text-purple-400 font-extrabold tracking-widest block">
                    {service.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase group-hover:text-purple-300 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 tracking-wider block font-semibold pt-1">
                    {service.tagline}
                  </span>
                </div>

                {/* Description & Highlighted Deliverables */}
                <div className="md:w-2/3 space-y-6">
                  <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-200">
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="font-medium text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
