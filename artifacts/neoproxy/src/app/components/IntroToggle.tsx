'use client'

import { useState } from 'react'
import styles from './IntroToggle.module.css'

export default function IntroToggle() {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('neoproxy_skip_intro') !== 'true'
    }
    return true
  })

  const toggleIntro = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    
    if (typeof window !== 'undefined') {
      if (newState) {
        localStorage.removeItem('neoproxy_skip_intro')
        localStorage.removeItem('neoproxy_intro_seen')
      } else {
        localStorage.setItem('neoproxy_skip_intro', 'true')
      }
    }
  }

  return (
    <div className={styles.introToggle}>
      <label className={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={toggleIntro}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
        <span className={styles.toggleText}>
          {isEnabled ? '🎬 Intro Enabled' : '⏭️ Intro Disabled'}
        </span>
      </label>
    </div>
  )
}
