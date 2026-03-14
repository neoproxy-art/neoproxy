'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

interface Agent {
  id: string
  name: string
  title: string
  description: string
  image: string
  capabilities: string[]
  subAgents: string[]
  connections: string[]
}

const agents: Agent[] = [
  {
    id: 'snake',
    name: 'SNAKE',
    title: 'Python System Agent',
    description: 'Snake es el agente encargado del ecosistema Python dentro del sistema NeoProxy. Supervisa librerías, automatización y pipelines de datos.',
    image: '/agents/snake.svg',
    capabilities: ['Python Libraries', 'Automation', 'Data Pipelines', 'AI Integration', 'Dependency Management'],
    subAgents: ['LibrarySnake', 'AISnake', 'DataSnake', 'AutomationSnake'],
    connections: ['Gennos', 'D', 'Trickzter']
  },
  {
    id: 'gennos',
    name: 'GENNOS',
    title: 'Generative AI Agent',
    description: 'Gennos maneja todas las operaciones de inteligencia artificial generativa, desde modelos de lenguaje hasta creación de contenido.',
    image: '/agents/gennos.svg',
    capabilities: ['LLM Management', 'Content Generation', 'AI Training', 'Model Optimization', 'Creative Synthesis'],
    subAgents: ['TextGennos', 'ImageGennos', 'CodeGennos', 'AudioGennos'],
    connections: ['Snake', 'D', 'Trickzter']
  },
  {
    id: 'd',
    name: 'D',
    title: 'Data & Analytics Agent',
    description: 'D es el guardián de todos los datos del sistema, manejando análisis, visualización y procesamiento de información.',
    image: '/agents/d.svg',
    capabilities: ['Data Analysis', 'Visualization', 'Database Management', 'Statistics', 'Real-time Monitoring'],
    subAgents: ['QueryD', 'VizD', 'StatsD', 'MonitorD'],
    connections: ['Snake', 'Gennos', 'Trickzter']
  },
  {
    id: 'trickzter',
    name: 'TRICKZTER',
    title: 'Security & Network Agent',
    description: 'Trickzter protege el sistema NeoProxy, manejando seguridad, redes y comunicaciones entre agentes.',
    image: '/agents/trickzter.svg',
    capabilities: ['Network Security', 'Encryption', 'Firewall Management', 'Intrusion Detection', 'Agent Communication'],
    subAgents: ['NetTrick', 'CryptoTrick', 'GuardTrick', 'CommTrick'],
    connections: ['Snake', 'Gennos', 'D']
  }
]

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isDarkProxy, setIsDarkProxy] = useState(false) // Simulación de modo DarkProxy

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.header}>
          <h1 className={styles.title}>NeoProxy Agent System</h1>
          <p className={styles.subtitle}>Core Intelligence Network</p>

          {/* DarkProxy Toggle (simulado) */}
          <button
            className={styles.darkProxyToggle}
            onClick={() => setIsDarkProxy(!isDarkProxy)}
          >
            [ {isDarkProxy ? 'DARKPROXY_LAYER_ACTIVE' : 'ACTIVATE_DARKPROXY_LAYER'} ]
          </button>
        </section>

        {/* Agent Grid */}
        <section className={styles.agentGrid}>
          <h2 className={styles.sectionTitle}>Core Agents</h2>

          <div className={styles.grid}>
            {agents.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className={`${styles.agentCard} ${selectedAgent === agent.id ? styles.selected : ''}`}
                onMouseEnter={() => setSelectedAgent(agent.id)}
                onMouseLeave={() => setSelectedAgent(null)}
              >
                <div className={styles.agentImage}>
                  <img src={agent.image} alt={agent.name} />
                  <div className={styles.agentGlow}></div>
                </div>

                <div className={styles.agentInfo}>
                  <h3 className={styles.agentName}>{agent.name}</h3>
                  <p className={styles.agentTitle}>{agent.title}</p>
                  <p className={styles.agentDesc}>{agent.description}</p>

                  <div className={styles.agentStats}>
                    <span>{agent.capabilities.length} Capabilities</span>
                    <span>{agent.subAgents.length} Sub-Agents</span>
                    <span>{agent.connections.length} Connections</span>
                  </div>
                </div>

                {/* DarkProxy Layer */}
                {isDarkProxy && (
                  <div className={styles.darkProxyOverlay}>
                    <div className={styles.darkProxyData}>
                      <div>STATUS: ACTIVE</div>
                      <div>LOAD: 87%</div>
                      <div>VERSION: 2.1.4</div>
                      <div>LAST_UPDATE: 2026-03-13</div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Agent Network Visualization */}
        <section className={styles.networkSection}>
          <h2 className={styles.sectionTitle}>Agent Network</h2>
          <div className={styles.networkContainer}>
            <div className={styles.networkPlaceholder}>
              <div className={styles.networkNode} style={{ top: '20%', left: '20%' }}>
                <span>SNAKE</span>
              </div>
              <div className={styles.networkNode} style={{ top: '20%', left: '70%' }}>
                <span>GENNOS</span>
              </div>
              <div className={styles.networkNode} style={{ top: '70%', left: '20%' }}>
                <span>D</span>
              </div>
              <div className={styles.networkNode} style={{ top: '70%', left: '70%' }}>
                <span>TRICKZTER</span>
              </div>

              {/* Connection Lines */}
              <svg className={styles.networkLines}>
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#00ff9d" strokeWidth="2" />
                <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="#00d4ff" strokeWidth="2" />
                <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="#ff9d00" strokeWidth="2" />
                <line x1="75%" y1="25%" x2="25%" y2="75%" stroke="#ff0080" strokeWidth="2" />
                <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#8000ff" strokeWidth="2" />
                <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#00ff80" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <span>// NeoProxy Agent System v2.0 //</span>
            <span>Neural Network Active // {agents.length} Core Agents Online</span>
          </div>
        </footer>
      </div>
    </main>
  )
}