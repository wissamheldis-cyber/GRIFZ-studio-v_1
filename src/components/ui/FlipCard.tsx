'use client'

import React, { HTMLAttributes, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export interface FlipCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  footer?: React.ReactNode
  frontImage?: string
  frontContent?: React.ReactNode
  backContent?: React.ReactNode
  width?: string | number
  height?: string | number
  isFlippable?: boolean
  onFlipChange?: (isFlipped: boolean) => void
}

export function FlipCard({
  title,
  description,
  badge,
  footer,
  frontImage,
  frontContent,
  backContent,
  width = '100%',
  height = '100%',
  className = '',
  isFlippable = true,
  onFlipChange,
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlippable) {
      const newState = !isFlipped
      setIsFlipped(newState)
      if (onFlipChange) {
        onFlipChange(newState)
      }
    }
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .flip-card {
          overflow: visible;
          width: ${typeof width === 'number' ? width + 'px' : width};
          height: ${typeof height === 'number' ? height + 'px' : height};
          perspective: 1200px;
        }

        .flip-card-content {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0px 4px 20px 2px rgba(0,0,0,0.6);
          border-radius: 12px;
          position: relative;
        }

        .flip-card-front, .flip-card-back {
          background-color: rgba(10, 10, 10, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .flip-card-back {
          justify-content: center;
          display: flex;
          align-items: center;
          transform: rotateY(180deg);
        }

        .flip-card-back::before {
          position: absolute;
          content: ' ';
          display: block;
          width: 160px;
          height: 160%;
          background: linear-gradient(90deg, transparent, #b66b3d, #ffffff, #b66b3d, transparent);
          animation: rotation_481 5000ms infinite linear;
          opacity: 0.3;
        }

        .flip-card-front-content {
          position: absolute;
          inset: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
          transform: translateZ(30px);
        }

        .flip-card-back-content {
          position: relative;
          z-index: 2;
          transform: translateZ(30px);
        }

        .is-flipped .flip-card-content {
          transform: rotateY(180deg);
        }

        @keyframes rotation_481 {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        .flip-card-front {
          transform: rotateY(0deg);
        }

        .flip-card-front .badge {
          background-color: rgba(0,0,0,0.4);
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
          width: fit-content;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff;
        }

        .flip-card-front .description-box {
          box-shadow: 0px 4px 15px rgba(0,0,0,0.5);
          width: 100%;
          padding: 15px;
          background-color: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .flip-card-front .title {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          font-family: var(--font-serif, serif);
        }

        .flip-card-front .card-footer {
          color: rgba(255,255,255,0.6);
          margin-top: 5px;
          font-size: 10px;
        }

        .flip-card-front .img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 1;
        }

        .flip-card-back .circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: #b66b3d;
          position: absolute;
          filter: blur(25px);
          animation: floating 3s infinite ease-in-out;
          opacity: 0.6;
        }

        .flip-card-back #bottom {
          background-color: #555;
          left: 10%;
          bottom: 10%;
          width: 150px;
          height: 150px;
          animation-delay: -800ms;
        }

        .flip-card-back #right {
          background-color: #fff;
          right: 10%;
          top: 10%;
          width: 60px;
          height: 60px;
          animation-delay: -1800ms;
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(0px); }
        }
      ` }} />

      <motion.div 
        ref={ref}
        style={{ y: springY }}
        className={`flip-card ${isFlipped && isFlippable ? 'is-flipped' : ''} ${className}`} 
        onClick={handleClick}
        {...(props as any)}
      >
        <div className="flip-card-content">
          
          {/* FACE AVANT */}
          <div className="flip-card-front">
            {frontImage && (
              <Image src={frontImage} alt="Card Cover" fill className="img" unoptimized />
            )}
            
            <div className="flip-card-front-content">
              {badge ? <div className="badge">{badge}</div> : <div></div>}
              
              {(title || description || footer) && (
                <div className="description-box">
                  {title && <div className="title">{title}</div>}
                  {description && <p className="text-xs text-white/80 mt-2 text-left">{description}</p>}
                  {footer && <div className="card-footer text-left">{footer}</div>}
                </div>
              )}
              {frontContent}
            </div>
          </div>

          {/* FACE ARRIÈRE */}
          <div className="flip-card-back">
            <div className="circle" id="bottom"></div>
            <div className="circle" id="right"></div>
            <div className="flip-card-back-content">
              {backContent}
            </div>
          </div>

        </div>
      </motion.div>
    </>
  )
}
