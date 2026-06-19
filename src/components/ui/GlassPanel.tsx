import { HTMLAttributes, forwardRef } from 'react'

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean
  children: React.ReactNode
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className = '', strong = false, children, ...props }, ref) => {
    const baseClass = strong ? 'liquid-panel-strong' : 'liquid-panel'
    
    // Fallback inline style pour contrer le bug de cache Turbopack sur les paddings
    let forcedPadding = undefined
    if (className.includes('p-16')) forcedPadding = '64px'
    else if (className.includes('p-14')) forcedPadding = '56px'
    else if (className.includes('p-12')) forcedPadding = '48px'
    else if (className.includes('p-10')) forcedPadding = '40px'
    else if (className.includes('p-8')) forcedPadding = '32px'
    else if (className.includes('p-6')) forcedPadding = '24px'
    else if (className.includes('p-4')) forcedPadding = '16px'

    return (
      <div 
        ref={ref}
        className={`${baseClass} ${className}`} 
        style={{ padding: forcedPadding, ...props.style }}
        {...props}
      >
        <div 
          className="relative z-10 h-full w-full flex flex-col"
          style={{ 
            gap: 'inherit', 
            alignItems: 'inherit', 
            justifyContent: 'inherit', 
            textAlign: 'inherit',
            flexDirection: 'inherit'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'
