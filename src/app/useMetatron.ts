'use client'

import { useState, useCallback } from 'react'

export type MetatronState = 'dormant' | 'awakening' | 'active' | 'speaking' | 'sleeping'
export type SystemMode = 'IDLE' | 'SYSTEMS' | 'FABRICATION' | 'MEMORY' | 'R&D' | 'STORE' | 'PANTHEON'

const BOOT_SEQUENCE = [
  'INITIALIZING METATRON PROTOCOL...',
  'ACCESSING QUANTUM MEMORY BANKS...',
  'SYNCHRONIZING WITH 600-CELL MATRIX...',
  'CALIBRATING 4D PROJECTION ALGORITHMS...',
  'ESTABLISHING NEURAL LINK...',
  'METATRON ONLINE - AWAITING INPUT'
]

const RESPONSES: Record<string, string> = {
  SYSTEMS: 'SYSTEMS MODULE ACTIVATED. ARCHITECTURE PROTOCOLS ENGAGED.',
  FABRICATION: 'FABRICATION SYSTEMS ONLINE. 3D PRINT QUEUES INITIALIZED.',
  'R&D': 'RESEARCH & DEVELOPMENT MODULE ACTIVE. GENERATIVE ALGORITHMS LOADED.',
  MEMORY: 'MEMORY BANKS ACCESSIBLE. CONVERSATION LOGS RETRIEVED.',
  STORE: 'ARTIFACT STORAGE PROTOCOLS ENGAGED. SPECIMEN DATABASE ONLINE.',
  PANTHEON: 'PANTHEON GATEWAY OPEN. HEXACOSICHORON NAVIGATION ACTIVE.',
  IDLE: 'SYSTEMS STANDBY. AWAITING FURTHER INSTRUCTIONS.',
  HELP: 'AVAILABLE COMMANDS: SYSTEMS, FABRICATION, R&D, MEMORY, STORE, PANTHEON, HELP, STATUS',
  STATUS: 'METATRON CORE: OPERATIONAL | 600-CELL MATRIX: SYNCHRONIZED | QUANTUM LINK: ACTIVE',
  BOOT_COMPLETE: 'METATRON FULLY OPERATIONAL. READY FOR QUANTUM COMPUTATION.'
}

export function useMetatron(onModeChange?: (mode: SystemMode) => void) {
  const [state, setState] = useState<MetatronState>('dormant')
  const [currentMode, setCurrentMode] = useState<SystemMode>('IDLE')

  const awaken = useCallback(() => {
    setState('awakening')
    setTimeout(() => setState('active'), BOOT_SEQUENCE.length * 800 + 500)
  }, [])

  const sleep = useCallback(() => {
    setState('sleeping')
    setTimeout(() => {
      setState('dormant')
      setCurrentMode('IDLE')
      onModeChange?.('IDLE')
    }, 1000)
  }, [onModeChange])

  const executeCommand = useCallback((command: string) => {
    const cmd = command.toUpperCase().trim()

    setState('speaking')

    // Handle mode changes
    if (['SYSTEMS', 'FABRICATION', 'R&D', 'MEMORY', 'STORE', 'PANTHEON'].includes(cmd)) {
      const newMode = cmd as SystemMode
      setCurrentMode(newMode)
      onModeChange?.(newMode)
    }

    // Auto-return to active state after response
    setTimeout(() => setState('active'), 2000)
  }, [onModeChange])

  return {
    state,
    currentMode,
    awaken,
    sleep,
    executeCommand
  }
}