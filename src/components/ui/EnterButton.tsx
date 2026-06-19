'use client'

import React from 'react'

interface EnterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function EnterButton({ className = '', onClick, ...props }: EnterButtonProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .enter-button-wrapper {
          position: relative;
          cursor: pointer;
          border: none;
          width: 140px;
          height: 50px;
          background: #050505;
          color: #fff;
          font-family: var(--font-sans, "Inter", sans-serif);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        }

        .enter-button-wrapper:hover {
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
        }

        .enter-button-text {
          position: relative;
          z-index: 1;
        }

        .enter-button-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size:
            3px 3px,
            auto auto;
          transition: 0.3s;
          border-radius: inherit;
        }

        .enter-button-wrapper:hover::before {
          opacity: 0.3;
        }

        .enter-button-wrapper .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: transparent, rgba(255,255,255,0.2) var(--s), rgba(255,255,255,0.6) var(--s), #fff, rgba(255,255,255,0.6) var(--e),
            rgba(255,255,255,0.2) var(--e), transparent;
        }

        .enter-button-wrapper .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .enter-button-wrapper .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .enter-button-wrapper:hover .a::after {
          opacity: 1;
        }

        .enter-button-wrapper .l { left: -2px; }
        .enter-button-wrapper .r { right: -2px; }

        .enter-button-wrapper .l,
        .enter-button-wrapper .r {
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .enter-button-wrapper .t { top: -2px; }
        .enter-button-wrapper .b { bottom: -2px; }

        .enter-button-wrapper .t,
        .enter-button-wrapper .b {
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }
      ` }} />
      
      {/* SVG Filter for the glow effect from original CSS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="unopaq">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -0.1"></feColorMatrix>
        </filter>
      </svg>

      <button className={`enter-button-wrapper ${className}`} onClick={onClick} {...props}>
        <span className="enter-button-text">ENTER</span>
        <div className="a t"></div>
        <div className="a b"></div>
        <div className="a l"></div>
        <div className="a r"></div>
      </button>
    </>
  )
}
