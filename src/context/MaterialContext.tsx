'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type MaterialContextType = {
  activeMaterial: string
  setActiveMaterial: (material: string) => void
}

const MaterialContext = createContext<MaterialContextType | undefined>(undefined)

export function MaterialProvider({ children }: { children: ReactNode }) {
  const [activeMaterial, setActiveMaterial] = useState('grifz') // par défaut

  return (
    <MaterialContext.Provider value={{ activeMaterial, setActiveMaterial }}>
      {children}
    </MaterialContext.Provider>
  )
}

export function useMaterial() {
  const context = useContext(MaterialContext)
  if (context === undefined) {
    throw new Error('useMaterial must be used within a MaterialProvider')
  }
  return context
}
