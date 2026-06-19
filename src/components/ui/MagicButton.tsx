'use client'

import React, { ButtonHTMLAttributes, forwardRef } from 'react'

export interface MagicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const MagicButton = forwardRef<HTMLButtonElement, MagicButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .magic-btn-wrapper {
            --rad: 56px;
            --color-wrapper-border: rgba(255, 255, 255, 0.3);
            --color-btn-bg: rgba(255, 255, 255, 0.05);
            --color-btn-text: #000;
            --color-btn-text-shadow: transparent;
            --color-btn-inset-shadow: rgba(255,255,255,0.2);
            --color-layer-a: transparent;
            --color-layer-b: rgba(255, 255, 255, 0.4);
            --color-overlay-text: #000;
            --color-overlay-glow: transparent;

            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            overflow: clip;
            overflow-clip-margin: 4px;

            border: 1px solid var(--color-wrapper-border);
            border-radius: var(--rad);

            font-family: var(--font-sans, "Inter", sans-serif);
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.10em;
            text-transform: uppercase;
            
            min-height: 56px;
            padding: 0;
            cursor: pointer;
            backdrop-filter: blur(12px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
          }
          
          .magic-btn-wrapper:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          }

          .magic-gradient-btn {
            position: absolute;
            inset: 0;
            z-index: -1;

            border-radius: var(--rad);
            background-color: var(--color-btn-bg);
            background-size: 200% 200%;
            box-shadow: inset 0 0 20px 2px var(--color-btn-inset-shadow);

            mix-blend-mode: normal;
          }

          .magic-gradient-btn::after {
            content: "";
            position: absolute;
            pointer-events: none;

            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            border-radius: var(--rad);
            background-size: 200% 200%;
            mix-blend-mode: overlay;
            z-index: 1;
          }

          .magic-gradient-layer {
            position: absolute;
            pointer-events: none;

            left: -160px;
            width: 500%;
            aspect-ratio: 1;

            background: radial-gradient(
              ellipse at 65% 180%,
              var(--color-layer-a),
              var(--color-layer-b),
              var(--color-layer-a),
              var(--color-layer-b),
              var(--color-layer-a),
              var(--color-layer-b),
              var(--color-layer-a),
              var(--color-layer-b),
              var(--color-layer-a),
              var(--color-layer-b),
              var(--color-layer-a)
            );

            mix-blend-mode: overlay;
            animation: magic-rotate 8s linear infinite;
          }

          .magic-gradient-layer:last-child {
            mix-blend-mode: overlay;
          }

          @keyframes magic-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .magic-text-overlay {
            position: relative;
            pointer-events: none;
            z-index: 2;

            padding: 0 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-radius: var(--rad);

            color: var(--color-overlay-text);
            text-shadow: 0 0 4px var(--color-overlay-glow);
            box-shadow: none;

            mix-blend-mode: normal;
            transition: transform 0.3s ease;
            animation: magic-opacityPulse 5s ease infinite;
          }

          .magic-btn-wrapper:hover .magic-text-overlay {
            transform: scale(1.05);
          }

          .magic-btn-wrapper:active .magic-text-overlay {
            transform: scale(0.95);
          }

          .magic-light {
            position: absolute;
            pointer-events: none;
            z-index: 1;
            border-radius: 50px;
            width: 80%;
            height: 1.9rem;
            aspect-ratio: 1;
            background-color: rgba(255,255,255,0.1);
            filter: blur(5px);
            animation: magic-pulse 3s ease-in-out infinite;
          }

          @keyframes magic-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.1; }
          }

          @keyframes magic-opacityPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        ` }} />
        
        <button
          ref={ref}
          className={`magic-btn-wrapper ${className}`}
          {...props}
        >
          <div className="magic-gradient-btn"></div>
          <div className="magic-gradient-layer"></div>
          <div className="magic-gradient-layer"></div>
          <div className="magic-gradient-layer"></div>
          <span className="magic-text-overlay whitespace-nowrap">{children}</span>
          <div className="magic-light"></div>
        </button>
      </>
    )
  }
)

MagicButton.displayName = 'MagicButton'
