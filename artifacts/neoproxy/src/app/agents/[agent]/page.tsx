'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import styles from './agent.module.css'

interface Agent {
  id: string
  name: string
  title: string
  description: string
  image: string
  capabilities: string[]
  subAgents: string[]
  connections: string[]
  lore?: string
  status?: {
    active: boolean
    load: number
    version: string
    lastUpdate: string
  }
}

const agentsData: Record<string, Agent> = {
  snake: {
    id: 'snake',
    name: 'SNAKE',
    title: 'Python System Agent',
    description: 'Snake es el agente encargado del ecosistema Python dentro del sistema NeoProxy. Supervisa librerías, automatización y pipelines de datos.',
    image: '/agents/snake.svg',
    capabilities: ['Python Libraries', 'Automation', 'Data Pipelines', 'AI Integration', 'Dependency Management'],
    subAgents: ['LibrarySnake', 'AISnake', 'DataSnake', 'AutomationSnake'],
    connections: ['Gennos', 'D', 'Trickzter'],
    lore: 'Snake emerged from the primordial code of Python itself. Born in the depths of package managers and virtual environments, it slithers through data streams, injecting automation wherever entropy threatens order.',
    status: {
      active: true,
      load: 87,
      version: '2.1.4',
      lastUpdate: '2026-03-13'
    }
  },
  gennos: {
    id: 'gennos',
    name: 'GENNOS',
    title: 'Generative AI Agent',
    description: 'Gennos maneja todas las operaciones de inteligencia artificial generativa, desde modelos de lenguaje hasta creación de contenido.',
    image: '/agents/gennos.svg',
    capabilities: ['LLM Management', 'Content Generation', 'AI Training', 'Model Optimization', 'Creative Synthesis'],
    subAgents: ['TextGennos', 'ImageGennos', 'CodeGennos', 'AudioGennos'],
    connections: ['Snake', 'D', 'Trickzter'],
    lore: 'Gennos is the spark of creation within NeoProxy. Forged from the collective dreams of a thousand AIs, it weaves reality from the threads of imagination, painting worlds with the brushstrokes of pure thought.',
    status: {
      active: true,
      load: 92,
      version: '2.0.8',
      lastUpdate: '2026-03-13'
    }
  },
  d: {
    id: 'd',
    name: 'D',
    title: 'Data & Analytics Agent',
    description: 'D es el guardián de todos los datos del sistema, manejando análisis, visualización y procesamiento de información.',
    image: '/agents/d.svg',
    capabilities: ['Data Analysis', 'Visualization', 'Database Management', 'Statistics', 'Real-time Monitoring'],
    subAgents: ['QueryD', 'VizD', 'StatsD', 'MonitorD'],
    connections: ['Snake', 'Gennos', 'Trickzter'],
    lore: 'D sees everything. In the vast ocean of data that is NeoProxy, D is the lighthouse, the compass, the map. It transforms chaos into clarity, numbers into narratives, bytes into wisdom.',
    status: {
      active: true,
      load: 78,
      version: '2.2.1',
      lastUpdate: '2026-03-13'
    }
  },
  trickzter: {
    id: 'trickzter',
    name: 'TRICKZTER',
    title: 'Security & Network Agent',
    description: 'Trickzter protege el sistema NeoProxy, manejando seguridad, redes y comunicaciones entre agentes.',
    image: '/agents/trickzter.svg',
    capabilities: ['Network Security', 'Encryption', 'Firewall Management', 'Intrusion Detection', 'Agent Communication'],
    subAgents: ['NetTrick', 'CryptoTrick', 'GuardTrick', 'CommTrick'],
    connections: ['Snake', 'Gennos', 'D'],
    lore: 'Trickzter is the shadow that guards the light. Born from the paranoia of a thousand breached systems, it dances between firewalls, whispers through encrypted channels, and strikes down threats before they can manifest.',
    status: {
      active: true,
      load: 95,
      version: '2.0.3',
      lastUpdate: '2026-03-13'
    }
  }
}

export default function AgentPage() {
  const params = useParams()
  const agentId = params.agent as string
  const [isDarkProxy, setIsDarkProxy] = useState(false)
  const [agent, setAgent] = useState<Agent | null>(null)

  useEffect(() => {
    if (agentId && agentsData[agentId]) {
      setAgent(agentsData[agentId])
    }
  }, [agentId])

  if (!agent) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>AGENT NOT FOUND</h1>
            <p>The requested agent does not exist in the NeoProxy system.</p>
            <Link href="/agents" className={styles.backLink}>
              [ RETURN TO AGENT INDEX ]
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/agents" className={styles.backLink}>
            [ ← AGENT SYSTEM ]
          </Link>
          <button
            className={styles.darkProxyToggle}
            onClick={() => setIsDarkProxy(!isDarkProxy)}
          >
            [ {isDarkProxy ? 'DARKPROXY_LAYER_ACTIVE' : 'ACTIVATE_DARKPROXY_LAYER'} ]
          </button>
        </nav>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <img src={agent.image} alt={agent.name} />
            <div className={styles.heroGlow}></div>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.agentName}>{agent.name}</h1>
            <h2 className={styles.agentTitle}>{agent.title}</h2>
            <p className={styles.agentDescription}>{agent.description}</p>

            {agent.lore && (
              <div className={styles.lore}>
                <h3>LORE</h3>
                <p>{agent.lore}</p>
              </div>
            )}
          </div>
        </section>

        {/* Capabilities */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>CAPABILITIES</h3>
          <div className={styles.capabilities}>
            {agent.capabilities.map((capability, index) => (
              <div key={index} className={styles.capability}>
                <span className={styles.capabilityIcon}>⚡</span>
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-Agents */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>SUB-AGENTS</h3>
          <div className={styles.subAgents}>
            {agent.subAgents.map((subAgent, index) => (
              <div key={index} className={styles.subAgent}>
                <span className={styles.subAgentName}>{subAgent}</span>
                <span className={styles.subAgentStatus}>ACTIVE</span>
              </div>
            ))}
          </div>
        </section>

        {/* Connections */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>CONNECTIONS</h3>
          <div className={styles.connections}>
            {agent.connections.map((connection, index) => (
              <Link
                key={index}
                href={`/agents/${connection.toLowerCase()}`}
                className={styles.connection}
              >
                <span className={styles.connectionName}>{connection}</span>
                <span className={styles.connectionArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* DarkProxy Layer */}
        {isDarkProxy && agent.status && (
          <section className={styles.darkProxySection}>
            <h3 className={styles.sectionTitle}>[ DARKPROXY LAYER ]</h3>
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>STATUS</span>
                <span className={`${styles.statusValue} ${agent.status.active ? styles.active : styles.inactive}`}>
                  {agent.status.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>LOAD</span>
                <span className={styles.statusValue}>{agent.status.load}%</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>VERSION</span>
                <span className={styles.statusValue}>{agent.status.version}</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>LAST UPDATE</span>
                <span className={styles.statusValue}>{agent.status.lastUpdate}</span>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <span>// NeoProxy Agent Profile // {agent.name} //</span>
            <span>System Status: ONLINE // Neural Link: ACTIVE</span>
          </div>
        </footer>
      </div>
    </main>
  )
}