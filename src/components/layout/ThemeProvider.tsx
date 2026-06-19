'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function ThemeProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/compte')) {
      document.body.classList.add('page-compte')
    } else {
      document.body.classList.remove('page-compte')
    }
  }, [pathname])

  if (pathname.startsWith('/compte')) {
    return <div className="fixed inset-0 pointer-events-none z-[0] account-grid" />
  }

  return null
}
