'use client'

import React, { createContext, useContext, useState } from 'react'

interface HeaderContextType {
  activeOrbImage: string | null
  setActiveOrbImage: (path: string | null) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [activeOrbImage, setActiveOrbImage] = useState<string | null>(null)

  return (
    <HeaderContext.Provider value={{ activeOrbImage, setActiveOrbImage }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeaderContext must be used within a HeaderProvider')
  }
  return context
}
