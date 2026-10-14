import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        className="relative flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute -right-2 -top-2 z-10 rounded-full border border-zinc-700 bg-zinc-900 p-2 text-white transition-colors hover:bg-purple-900 sm:right-0 sm:top-0"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={image.src}
          alt={image.alt}
          loading="eager"
          decoding="async"
          className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
        />
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-wider text-purple-300 sm:text-sm">
          {image.alt}
        </p>
      </div>
    </div>,
    document.body,
  )
}
