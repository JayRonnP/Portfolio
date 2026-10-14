import { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, loading = 'lazy', decoding = 'async', ...props }) {
  const imageRef = useRef(null)
  const [eligibleSrc, setEligibleSrc] = useState(null)
  const isEligible = eligibleSrc === src

  useEffect(() => {
    if (!src) return

    const image = imageRef.current
    if (!image || !('IntersectionObserver' in window)) {
      setEligibleSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setEligibleSrc(src)
        observer.disconnect()
      },
      { rootMargin: '300px' },
    )

    observer.observe(image)
    return () => observer.disconnect()
  }, [src])

  return (
    <img
      {...props}
      ref={imageRef}
      src={isEligible ? src : undefined}
      loading={isEligible ? 'eager' : loading}
      decoding={decoding}
    />
  )
}
