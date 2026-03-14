'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const NeoProxyClient = dynamic(() => import('./NeoProxyClient'), { ssr: false })
const TheAwakening = dynamic(() => import('./components/TheAwakening'), { ssr: false })

export default function Page() {
  const [showAwakening, setShowAwakening] = useState(true)
  const [skipIntro, setSkipIntro] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenIntro = localStorage.getItem('neoproxy_intro_seen')
      const skipPreference = localStorage.getItem('neoproxy_skip_intro')
      
      if (skipPreference === 'true' || hasSeenIntro === 'true') {
        setSkipIntro(true)
        setShowAwakening(false)
      }
    }
  }, [])

  const handleAwakeningComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('neoproxy_intro_seen', 'true')
    }
    
    const container = document.querySelector('.awakeningContainer')
    if (container) {
      container.classList.add('fadeOut')
      setTimeout(() => {
        setShowAwakening(false)
      }, 1000)
    } else {
      setShowAwakening(false)
    }
  }

  const handleSkipIntro = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('neoproxy_skip_intro', 'true')
    }
    setSkipIntro(true)
    setShowAwakening(false)
  }

  return (
    <>
      {showAwakening && (
        <TheAwakening 
          onComplete={handleAwakeningComplete}
          skipIntro={skipIntro}
        />
      )}
      <NeoProxyClient />
    </>
  )
}
