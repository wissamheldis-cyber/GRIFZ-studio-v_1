'use client'

import React from 'react'

interface WireframeSphereProps {
  size?: number
  items?: number
  color?: string
  glow1?: string
  glow2?: string
  duration?: number
  perspective?: number
  className?: string
}

export default function WireframeSphere({
  size = 333,
  items = 32,
  color = 'transparent',
  glow1 = 'rgba(255, 255, 255, 0.1)',
  glow2 = 'rgba(255, 255, 255, 0.2)',
  duration = 16,
  perspective = 800,
  className = ''
}: WireframeSphereProps) {
  const half = Math.floor(items / 2)
  const elements = Array.from({ length: items }, (_, i) => i + 1)

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ perspective: `${perspective}px`, transformStyle: 'preserve-3d' }}
    >
      <style>{`
        @keyframes sphere-rot {
          to { transform: rotateY(360deg) rotateZ(360deg); }
        }
        .wireframe-sphere {
          position: relative;
          border-radius: 50%;
          animation: sphere-rot ${duration}s linear infinite reverse;
          transform-origin: center center;
          transform-style: preserve-3d;
        }
        .wireframe-circle {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          border: 1px solid ${color};
          transform-style: preserve-3d;
          backface-visibility: visible;
          box-shadow: 0 0 ${size/4}px 0 ${glow1}, inset 0 0 ${size/4}px 0 ${glow2};
        }
      `}</style>

      <div 
        className="wireframe-sphere" 
        style={{ width: size, height: size }}
      >
        {elements.map((item) => {
          const rotation = (360 / items) * item
          const transform = item < half 
            ? `rotateY(${rotation}deg)` 
            : `rotateX(${rotation}deg)`

          return (
            <i
              key={item}
              className="wireframe-circle"
              style={{
                width: size,
                height: size,
                transform,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
