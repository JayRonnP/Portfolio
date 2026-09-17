import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';

import aboutUs from '../../assets/Aboutus.svg';
import heroSection from '../../assets/Hero-Section.svg';
import sellingCar from '../../assets/Selling-car.svg';
import ojt1 from '../../assets/ojt-1.webp';
import ojt2 from '../../assets/ojt-2.webp';
import ojt3 from '../../assets/ojt-3.webp';
import ojt4 from '../../assets/ojt4.webp';
import ojt5 from '../../assets/ojt5.webp';
import ojt6 from '../../assets/ojt6.webp';
import lodzPoster from '../../assets/lodz-poster.webp';
import tagpuanHero from '../../assets/tagpuan-hero.webp';
import tagpuanHero2 from '../../assets/tagpuan-hero2.webp';
import tagpuanHero3 from '../../assets/tagpuan-hero3.webp';
import tagpuanLogo from '../../assets/tagpuan-logo.webp';

const DEFAULT_ITEMS = [
  { image: tagpuanHero, title: 'Tagpuan Coffee Website' },
  { image: tagpuanHero2, title: 'Tagpuan Showcase 2' },
  { image: tagpuanHero3, title: 'Tagpuan Showcase 3' },
  { image: tagpuanLogo, title: 'Tagpuan Logo & Brand' },
  { image: aboutUs, title: 'About Us Design' },
  { image: heroSection, title: 'Hero Section Showcase' },
  { image: sellingCar, title: 'Selling Car Design' },
  { image: lodzPoster, title: 'Lodz Poster Design' },
  { image: ojt1, title: 'OJT Project 1' },
  { image: ojt2, title: 'OJT Project 2' },
  { image: ojt3, title: 'OJT Project 3' },
  { image: ojt4, title: 'OJT Project 4' },
  { image: ojt5, title: 'OJT Project 5' },
  { image: ojt6, title: 'OJT Project 6' }
];

const cx = (...parts) => parts.filter(Boolean).join(' ');

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 240,
  tileHeight = 160,
  gap = 18,
  radius = 14,
  tilt = 10,
  turn = -8,
  roll = 0,
  perspective = 1200,
  depth = 60,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.1,
  dim = 0.9,
  grayscale = false,
  overlayColor = 'transparent',
  className = '',
  style
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = e => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map(col => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map(col => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 2.2) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight || window.innerHeight || 800);
      }
    };
    measure();
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || window.innerHeight || 800);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = ts => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id, index) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);
  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const maskStyle = 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)';

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-lift': `${lift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
      perspective: `${perspective}px`,
      perspectiveOrigin: '50% 50%',
      WebkitMaskImage: maskStyle,
      maskImage: maskStyle,
      ...style
    }),
    [tileWidth, tileHeight, gap, radius, lift, dim, grayscale, overlayColor, fade, perspective, maskStyle, style]
  );

  const tileClass = cx(
    'group/tile relative block flex-none cursor-pointer outline-none',
    'w-full h-[calc(var(--dw-tile-h)+var(--dw-gap))] [transform-style:preserve-3d]'
  );
  const innerClass = cx(
    'pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] block overflow-hidden bg-[#0b0b12]',
    'rounded-[var(--dw-radius)] opacity-[var(--dw-dim)] [transform:translateZ(0)]',
    'transition-[transform,opacity,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-[.is-active]/tile:opacity-100 group-[.is-active]/tile:[transform:translateZ(var(--dw-lift))]',
    'group-[.is-active]/tile:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7)]',
    'group-focus-visible/tile:opacity-100 group-focus-visible/tile:[transform:translateZ(var(--dw-lift))]',
    'group-focus-visible/tile:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7),0_0_0_2px_rgba(255,255,255,0.9)]'
  );
  const imgClass = cx(
    'block h-full w-full select-none object-cover',
    '[filter:grayscale(var(--dw-gray))_saturate(0.92)]',
    'transition-[filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-[.is-active]/tile:[filter:grayscale(0)_saturate(1.05)] group-focus-visible/tile:[filter:grayscale(0)_saturate(1.05)]'
  );
  const overlayClass = cx(
    'pointer-events-none absolute inset-0 bg-[var(--dw-overlay)] opacity-[0.42]',
    'transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-[.is-active]/tile:opacity-0 group-focus-visible/tile:opacity-0'
  );

  const renderTile = (item, id, colIndex) => {
    const isLogo = item.image === tagpuanLogo;
    const inner = (
      <span className={cx(innerClass, isLogo && '!bg-white p-3')}>
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cx(imgClass, isLogo && 'object-contain')}
        />
        <span className={overlayClass} aria-hidden="true" />
      </span>
    );
    const commonProps = {
      className: cx(tileClass, activeId === id && 'is-active'),
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
      onClick: () => setSelectedImage(item)
    };
    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cx('relative h-full w-full overflow-hidden bg-black', className)}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div
        ref={planeRef}
        className="absolute left-1/2 top-1/2 flex cursor-pointer flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
      >
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div
              className="relative w-[calc(var(--dw-tile-w)+var(--dw-gap))] [transform-style:preserve-3d]"
              key={`col-${c}`}
            >
              <div
                className="flex flex-col [transform-style:preserve-3d] will-change-transform"
                ref={el => (trackRefs.current[c] = el)}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-4 flex flex-col items-center gap-4 shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-zinc-800/80 hover:bg-purple-900 text-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/50">
              <img
                src={selectedImage.image}
                alt={selectedImage.title || 'Work'}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            {selectedImage.title && (
              <p className="font-mono text-sm text-purple-300 tracking-wider uppercase font-semibold">
                {selectedImage.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DriftWall;
