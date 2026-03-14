'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './ProxyChat.module.css'

const STORAGE_KEY = 'neoproxy_chat_messages'

type MessageType = {
  id: string
  sender: 'cascade' | 'antigravity' | 'darkproxy' | 'system'
  content: string
  timestamp: Date
  type: 'technical' | 'creative' | 'system'
}

function serializeMessages(m: MessageType[]) {
  return m.map(({ timestamp, ...rest }) => ({ ...rest, timestamp: timestamp.toISOString() }))
}
function deserializeMessages(raw: unknown): MessageType[] {
  if (!Array.isArray(raw)) return []
  return raw.map((m: { timestamp?: string; [k: string]: unknown }) => ({
    ...m,
    timestamp: m.timestamp ? new Date(m.timestamp as string) : new Date(),
  })) as MessageType[]
}

const FIXED_DATE = new Date('2026-03-12T00:00:00.000Z')

const INITIAL_MESSAGES: MessageType[] = [
  { id: '1', sender: 'system', content: 'NEOPROXY OS // DUAL_CHANNEL_ACTIVE', timestamp: FIXED_DATE, type: 'system' },
  { id: '2', sender: 'cascade', content: 'Cascade Terminal // Ready for technical operations', timestamp: FIXED_DATE, type: 'technical' },
  { id: '3', sender: 'antigravity', content: 'Antigravity Channel // Creative systems online', timestamp: FIXED_DATE, type: 'creative' },
]

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function getCascadeCommandResponse(cmd: string, arg: string): string {
  const c = cmd.toLowerCase()
  if (c === 'status') return 'NPOS v0.2 | CORE: IDLE | DEPLOY: Render | MEMORY: local'
  if (c === 'deploy') return 'Deploy protocol queued. Target: neoproxy.art'
  if (c === 'run') return arg ? `Executing: ${arg} // No live shell in browser. Use terminal for real execution.` : 'Usage: /run <command>'
  if (c === 'files') return 'neoproxy-repo/ | npos/ | components/ | ProxyChat.tsx'
  if (c === 'help') return 'Commands: /status /deploy /run <cmd> /files /help'
  return `Unknown command: ${cmd}. Type /help`
}

function getAntigravityCommandResponse(cmd: string, arg: string): string {
  const c = cmd.toLowerCase()
  if (c === 'concept') return arg ? `Concept logged: "${arg}" → Geometry Lab queue` : 'Usage: /concept <idea>'
  if (c === 'mood') return arg ? `Aesthetic vector: ${arg} // Applied to next generation` : 'Usage: /mood <keyword>'
  if (c === 'memory') return 'Proxy Memory // Fragments: conversation archive. Export via /export'
  if (c === 'export') return 'Exporting thread to memory archive // Copy this conversation for persistence'
  if (c === 'help') return 'Commands: /concept <idea> /mood <keyword> /memory /export /help'
  return `Unknown command: ${cmd}. Type /help`
}

export default function ProxyChat() {
  const [messages, setMessages] = useState<MessageType[]>(INITIAL_MESSAGES)

  const [activeChannel, setActiveChannel] = useState<'cascade' | 'antigravity'>('cascade')
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState({ cascade: true, antigravity: true })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = deserializeMessages(JSON.parse(raw))
        if (parsed.length > 0) setMessages(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeMessages(messages)))
    } catch {
      // ignore quota or parse errors
    }
  }, [messages])

  const sendMessage = () => {
    const raw = input.trim()
    if (!raw) return

    const userMsg: MessageType = {
      id: Date.now().toString(),
      sender: 'darkproxy',
      content: raw,
      timestamp: new Date(),
      type: activeChannel === 'cascade' ? 'technical' : 'creative',
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    const isCommand = raw.startsWith('/')
    const delay = isCommand ? 400 : 1000 + Math.random() * 2000

    setTimeout(() => {
      let content: string
      if (isCommand) {
        const [cmd, ...rest] = raw.slice(1).trim().split(/\s+/)
        const arg = rest.join(' ')
        content = activeChannel === 'cascade'
          ? `[CASCADE] ${getCascadeCommandResponse(cmd || '', arg)}`
          : `[ANTIGRAVITY] ${getAntigravityCommandResponse(cmd || '', arg)}`
      } else {
        content = activeChannel === 'cascade'
          ? `[CASCADE] Processing: ${raw} // Executing technical protocol...`
          : `[ANTIGRAVITY] Concept: ${raw} // Generating creative response...`
      }
      const response: MessageType = {
        id: (Date.now() + 1).toString(),
        sender: activeChannel,
        content,
        timestamp: new Date(),
        type: activeChannel === 'cascade' ? 'technical' : 'creative',
      }
      setMessages(prev => [...prev, response])
    }, delay)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={styles.proxyChat}>
      {/* Channel Selector */}
      <div className={styles.channelSelector}>
        <button
          className={`${styles.channelButton} ${activeChannel === 'cascade' ? styles.active : ''}`}
          onClick={() => setActiveChannel('cascade')}
        >
          <span className={styles.channelIndicator} style={{ background: isConnected.cascade ? '#00ff9d' : '#ff0080' }} />
          [CASCADE] // TECHNICAL
        </button>
        <button
          className={`${styles.channelButton} ${activeChannel === 'antigravity' ? styles.active : ''}`}
          onClick={() => setActiveChannel('antigravity')}
        >
          <span className={styles.channelIndicator} style={{ background: isConnected.antigravity ? '#00d4ff' : '#ff0080' }} />
          [ANTIGRAVITY] // CREATIVE
        </button>
      </div>

      {/* Messages */}
      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${styles[msg.sender]} ${styles[msg.type]}`}>
              <div className={styles.messageHeader}>
                <span className={styles.sender}>[{msg.sender.toUpperCase()}]</span>
                <span className={styles.timestamp}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div className={styles.content}>{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputPrefix}>
          neoproxy://{activeChannel}://{'>'}
        </div>
        <textarea
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={activeChannel === 'cascade' 
            ? "Command or message... e.g. /status /run /help" 
            : "Concept or command... e.g. /concept /mood /help"
          }
          rows={1}
        />
        <button 
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          [TRANSMIT]
        </button>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>CHANNEL: {activeChannel.toUpperCase()}</span>
        <span>MODE: {activeChannel === 'cascade' ? 'TECHNICAL' : 'CREATIVE'}</span>
        <span>STATUS: {isConnected[activeChannel] ? 'ONLINE' : 'OFFLINE'}</span>
        <button
          type="button"
          className={styles.exportBtn}
          onClick={() => {
            const text = messages.map(m => `[${m.sender}] ${m.timestamp.toISOString()}\n${m.content}`).join('\n\n')
            navigator.clipboard?.writeText(text).then(() => { /* copied */ })
          }}
          title="Copy thread to clipboard (Memory export)"
        >
          [EXPORT]
        </button>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => setMessages(INITIAL_MESSAGES)}
          title="Reset to initial state"
        >
          [CLEAR]
        </button>
      </div>
    </div>
  )
}
