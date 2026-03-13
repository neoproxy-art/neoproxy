'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

type MetatronState = 'dormant' | 'awakening' | 'active' | 'speaking' | 'sleeping'
type SystemMode = 'IDLE' | 'SYSTEMS' | 'FABRICATION' | 'MEMORY' | 'R&D' | 'STORE' | 'PANTHEON'

interface MetatronOverlayProps {
  state: MetatronState
  mode: SystemMode
  onCommand: (command: string) => void
  onAwaken: () => void
  onSleep: () => void
}

const BOOT_SEQUENCE = [
  'INITIALIZING METATRON PROTOCOL...',
  'ACCESSING QUANTUM MEMORY BANKS...',
  'SYNCHRONIZING WITH 600-CELL MATRIX...',
  'CALIBRATING 4D PROJECTION ALGORITHMS...',
  'ESTABLISHING NEURAL LINK...',
  'METATRON ONLINE - AWAITING INPUT'
]

const RESPONSES = {
  SYSTEMS: 'SYSTEMS MODULE ACTIVATED. ARCHITECTURE PROTOCOLS ENGAGED.',
  FABRICATION: 'FABRICATION SYSTEMS ONLINE. 3D PRINT QUEUES INITIALIZED.',
  'R&D': 'RESEARCH & DEVELOPMENT MODULE ACTIVE. GENERATIVE ALGORITHMS LOADED.',
  MEMORY: 'MEMORY BANKS ACCESSIBLE. CONVERSATION LOGS RETRIEVED.',
  STORE: 'ARTIFACT STORAGE PROTOCOLS ENGAGED. SPECIMEN DATABASE ONLINE.',
  PANTHEON: 'PANTHEON GATEWAY OPEN. HEXACOSICHORON NAVIGATION ACTIVE.',
  IDLE: 'SYSTEMS STANDBY. AWAITING FURTHER INSTRUCTIONS.'
}

export default function MetatronOverlay({ state, mode, onCommand, onAwaken, onSleep }: MetatronOverlayProps) {
  const [input, setInput] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [bootIndex, setBootIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence animation
  useEffect(() => {
    if (state === 'awakening' && bootIndex < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setDisplayText(BOOT_SEQUENCE[bootIndex])
        setBootIndex(prev => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else if (state === 'awakening' && bootIndex >= BOOT_SEQUENCE.length) {
      setTimeout(() => onCommand('BOOT_COMPLETE'), 500)
    }
  }, [state, bootIndex, onCommand])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Auto-focus input when active
  useEffect(() => {
    if (state === 'active' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state])

  // Response to mode changes
  useEffect(() => {
    if (state === 'speaking') {
      const response = RESPONSES[mode] || RESPONSES.IDLE
      typeText(response)
    }
  }, [mode, state])

  const typeText = (text: string) => {
    setIsTyping(true)
    setDisplayText('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text[i])
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onSleep()
    }
  }

  if (state === 'dormant') {
    return (
      <div className={styles.metatronDormant}>
        <button
          onClick={onAwaken}
          className={styles.metatronAwakenButton}
        >
          [ AWAKEN_METATRON ]
        </button>
      </div>
    )
  }

  return (
    <div className={`${styles.metatronOverlay} ${styles[state]}`}>
      <div className={styles.metatronHeader}>
        <span className={styles.metatronTitle}>METATRON // AI CORE</span>
        <span className={styles.metatronStatus}>{state.toUpperCase()}</span>
      </div>

      <div className={styles.metatronDisplay}>
        <div className={styles.metatronText}>
          {displayText}
          {isTyping && <span className={styles.typingCursor}>▌</span>}
        </div>
      </div>

      {state === 'active' && (
        <form onSubmit={handleSubmit} className={styles.metatronInput}>
          <span className={styles.prompt}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ENTER COMMAND..."
            className={styles.commandInput}
            autoComplete="off"
          />
          {showCursor && <span className={styles.inputCursor}>▌</span>}
        </form>
      )}

      <div className={styles.metatronFooter}>
        <button onClick={onSleep} className={styles.metatronSleepButton}>
          [ SLEEP ]
        </button>
        <div className={styles.metatronMode}>
          MODE: {mode}
        </div>
      </div>
    </div>
  )
}