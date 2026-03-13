'use client'

import { useState, useEffect } from 'react'
import CognitiveObservatory from '@/components/night/CognitiveObservatory'
import AgentEvolution from '@/components/night/AgentEvolution'
import ConceptDiscovery from '@/components/night/ConceptDiscovery'

interface AssemblySession {
  id: string
  date: string
  start_time: string
  status: 'active' | 'paused' | 'completed'
  participants: string[]
  topics_discussed: string[]
  messages_generated: number
  concepts_discovered: number
  consensus_level: number
}

export default function NightAssembly() {
  const [session, setSession] = useState<AssemblySession | null>(null)
  const [showObservatory, setShowObservatory] = useState(false)
  const [showEvolution, setShowEvolution] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [assemblyLog, setAssemblyLog] = useState<string[]>([])

  useEffect(() => {
    // Initialize assembly session
    const currentSession: AssemblySession = {
      id: `assembly_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      start_time: new Date().toISOString(),
      status: 'active',
      participants: ['Trickster', 'Genos', 'Oracle', 'Architect', 'Explorer', 'Synthesizer'],
      topics_discussed: ['Cognitive Architecture', 'Aesthetic Evolution', 'Distributed Systems'],
      messages_generated: 0,
      concepts_discovered: 0,
      consensus_level: 0.0
    }

    setSession(currentSession)

    // Simulate assembly progression
    const interval = setInterval(() => {
      setAssemblyLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${generateRandomLogEntry()}`
      ])

      setSession(prev => {
        if (!prev) return null
        return {
          ...prev,
          messages_generated: prev.messages_generated + Math.floor(Math.random() * 5) + 1,
          concepts_discovered: prev.concepts_discovered + (Math.random() > 0.8 ? 1 : 0),
          consensus_level: Math.min(0.95, prev.consensus_level + Math.random() * 0.05)
        }
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const generateRandomLogEntry = () => {
    const entries = [
      'Trickster: "What if we reframe the entire concept of aesthetic generation?"',
      'Genos: "Distributed consensus algorithms show 87% efficiency improvement"',
      'Oracle: "Pattern detected: emergent behavior in agent interactions"',
      'Architect: "Proposing new cognitive architecture based on current metrics"',
      'Explorer: "Discovered connection between aesthetic genome and neural style transfer"',
      'Synthesizer: "Integrating concepts: Cognitive Observatory + Aesthetic Evolution"',
      'CONSENSUS REACHED: Distributed Agent Council concept approved',
      'NEW CONCEPT: Cognitive Observatory achieving 0.87 confidence',
      'EVOLUTION TRIGGER: Trickster evolving to Level 3',
      'SYSTEM ALERT: Novelty threshold exceeded, breakthrough imminent'
    ]
    return entries[Math.floor(Math.random() * entries.length)]
  }

  const generateMorningReport = () => {
    if (!session) return

    const report = {
      date: session.date,
      total_messages: session.messages_generated,
      concepts_discovered: session.concepts_discovered,
      final_consensus: session.consensus_level,
      top_agents: ['Trickster', 'Genos', 'Oracle'],
      breakthrough_concepts: ['Cognitive Observatory', 'Aesthetic Genome'],
      system_improvements: [
        'Enhanced agent coordination protocols',
        'Improved concept extraction algorithms',
        'Evolved cognitive monitoring systems'
      ]
    }

    // Download report
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neoproxy_night_assembly_${session.date}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020408',
      color: '#00d4ff',
      fontFamily: "'Space Mono', monospace",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Assembly Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'rgba(2, 4, 8, 0.95)',
        borderBottom: '1px solid #00d4ff33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000
      }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ff9d' }}>
            🌙 NEOPROXY NIGHT ASSEMBLY
          </div>
          {session && (
            <div style={{ fontSize: '10px', color: '#4a6080', marginTop: '2px' }}>
              {session.date} • {session.participants.length} agents • {session.status}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowObservatory(!showObservatory)}
            style={{
              background: showObservatory ? '#00ff9d' : 'transparent',
              color: showObservatory ? '#020408' : '#00ff9d',
              border: '1px solid #00ff9d',
              padding: '6px 12px',
              fontSize: '9px',
              cursor: 'pointer',
              borderRadius: '3px'
            }}
          >
            🔬 Observatory
          </button>
          <button
            onClick={() => setShowEvolution(!showEvolution)}
            style={{
              background: showEvolution ? '#00d4ff' : 'transparent',
              color: showEvolution ? '#020408' : '#00d4ff',
              border: '1px solid #00d4ff',
              padding: '6px 12px',
              fontSize: '9px',
              cursor: 'pointer',
              borderRadius: '3px'
            }}
          >
            🧬 Evolution
          </button>
          <button
            onClick={() => setShowDiscovery(!showDiscovery)}
            style={{
              background: showDiscovery ? '#ff6b6b' : 'transparent',
              color: showDiscovery ? '#020408' : '#ff6b6b',
              border: '1px solid #ff6b6b',
              padding: '6px 12px',
              fontSize: '9px',
              cursor: 'pointer',
              borderRadius: '3px'
            }}
          >
            🧠 Discovery
          </button>
          <button
            onClick={generateMorningReport}
            style={{
              background: '#00d4ff',
              color: '#020408',
              border: '1px solid #00d4ff',
              padding: '6px 12px',
              fontSize: '9px',
              cursor: 'pointer',
              borderRadius: '3px'
            }}
          >
            📊 Morning Report
          </button>
        </div>
      </div>

      {/* Main Assembly Area */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Assembly Visualization */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Network Visualization */}
          <div style={{
            width: '600px',
            height: '400px',
            background: 'rgba(0, 212, 255, 0.02)',
            border: '1px solid #00d4ff22',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#4a6080', textAlign: 'center' }}>
              🌐 AGENT NETWORK ACTIVE
              
              <div style={{ marginTop: '20px', fontSize: '10px' }}>
                {session && (
                  <div>
                    <div>💬 Messages: {session.messages_generated}</div>
                    <div>💡 Concepts: {session.concepts_discovered}</div>
                    <div>🤝 Consensus: {(session.consensus_level * 100).toFixed(1)}%</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Assembly Log */}
        <div style={{
          height: '200px',
          background: 'rgba(2, 4, 8, 0.8)',
          borderTop: '1px solid #00d4ff22',
          padding: '15px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '10px', color: '#00d4ff' }}>
            📜 ASSEMBLY LOG
          </div>
          {assemblyLog.slice(-10).map((log, index) => (
            <div key={index} style={{ 
              fontSize: '9px', 
              color: '#4a6080', 
              marginBottom: '5px',
              fontFamily: "'Space Mono', monospace"
            }}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Cognitive Components */}
      {showObservatory && <CognitiveObservatory />}
      {showEvolution && <AgentEvolution />}
      {showDiscovery && <ConceptDiscovery />}
    </div>
  )
}
