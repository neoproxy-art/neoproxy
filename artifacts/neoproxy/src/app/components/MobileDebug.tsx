'use client'

import { useEffect, useState } from 'react'

export default function MobileDebug() {
  const [debug, setDebug] = useState({
    width: 0,
    height: 0,
    userAgent: '',
    orientation: '',
    pixelRatio: 1,
    touchSupport: false
  })

  useEffect(() => {
    const updateDebug = () => {
      setDebug({
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        orientation: screen.orientation?.type || 'unknown',
        pixelRatio: window.devicePixelRatio,
        touchSupport: 'ontouchstart' in window
      })
    }

    updateDebug()
    window.addEventListener('resize', updateDebug)
    window.addEventListener('orientationchange', updateDebug)

    return () => {
      window.removeEventListener('resize', updateDebug)
      window.removeEventListener('orientationchange', updateDebug)
    }
  }, [])

  // Solo mostrar en development o con parámetro debug
  if (typeof window !== 'undefined' && !window.location.search.includes('debug')) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#00ff9d',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '10px',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxWidth: '300px',
      border: '1px solid #00ff9d33'
    }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>🔍 MOBILE DEBUG</div>
      <div>📱 {debug.width}x{debug.height}px</div>
      <div>📐 {debug.pixelRatio}x DPR</div>
      <div>🔄 {debug.orientation}</div>
      <div>👆 Touch: {debug.touchSupport ? 'Yes' : 'No'}</div>
      <div style={{ fontSize: '8px', opacity: 0.7, marginTop: '5px' }}>
        {debug.userAgent.split(' ').slice(-2).join(' ')}
      </div>
    </div>
  )
}
