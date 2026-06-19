'use client'

import Image from 'next/image'

/* ─── Types ─────────────────────────────────────────────────
   Composant SmartImage : gestion intelligente du crop et du
   focal point. Ne déforme jamais l'image.
   ─────────────────────────────────────────────────────────── */
export interface SmartImageProps {
  src: string
  alt: string
  /** Ratio CSS ex: "16/9", "1/1", "4/3", "3/4" */
  ratio?: string
  /** object-fit (default: cover) */
  fit?: 'cover' | 'contain' | 'fill'
  /** object-position / focal point (default: center center) */
  focalPoint?: string
  /** Next/Image priority */
  priority?: boolean
  /** Overlay CSS (ex: "rgba(0,0,0,0.3)") */
  overlay?: string
  /** Classe CSS additionnelle sur le wrapper */
  className?: string
  /** Qualité de l'image (default: 85) */
  quality?: number
  /** Remplissage de tout le parent (fill mode) */
  fill?: boolean
  /** Taille pour le calcul srcset */
  sizes?: string
  /** Largeur (si pas en fill mode) */
  width?: number
  /** Hauteur (si pas en fill mode) */
  height?: number
}

export default function SmartImage({
  src,
  alt,
  ratio,
  fit = 'cover',
  focalPoint = 'center center',
  priority = false,
  overlay,
  className = '',
  quality = 85,
  fill: fillMode = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  width,
  height,
}: SmartImageProps) {

  /* Ratio wrapper */
  const ratioStyle = ratio
    ? { aspectRatio: ratio.replace('/', ' / ') }
    : {}

  /* En mode fill ou ratio, le wrapper est relatif */
  const useWrapper = ratio || fillMode

  if (useWrapper) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={ratioStyle}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit: fit,
            objectPosition: focalPoint,
          }}
          priority={priority}
          quality={quality}
          sizes={sizes}
        />
        {/* Overlay optionnel */}
        {overlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: overlay }}
          />
        )}
      </div>
    )
  }

  /* Mode dimensions fixes */
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        style={{
          objectFit: fit,
          objectPosition: focalPoint,
          width: '100%',
          height: 'auto',
        }}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlay }}
        />
      )}
    </div>
  )
}
