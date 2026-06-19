'use client'

import { useTranslations } from 'next-intl'

export default function ConfidentialitePage() {
  const t = useTranslations('Privacy')
  return (
    <section style={{minHeight:'80vh',padding:'100px 28px 80px',maxWidth:720,margin:'0 auto'}}>
      <h1 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(36px,5vw,64px)',fontWeight:400,color:'var(--ink)',marginBottom:32}}>{t('title')}</h1>
      <p style={{fontFamily:'var(--font-sans)',fontSize:14,color:'var(--ink-soft)',lineHeight:1.8}}>{t('text')}</p>
    </section>
  )
}
