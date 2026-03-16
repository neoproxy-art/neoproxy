'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './editor.module.css'

export default function WebEditor() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [commandInput, setCommandInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [htmlContent, setHtmlContent] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  // Comandos disponibles
  const commands = {
    help: 'Muestra todos los comandos disponibles',
    clear: 'Limpia la consola',
    edit: 'edit <selector> - Edita elemento CSS',
    text: 'text <selector> <texto> - Cambia texto',
    color: 'color <selector> <color> - Cambia color',
    size: 'size <selector> <tamaño> - Cambia tamaño',
    hide: 'hide <selector> - Oculta elemento',
    show: 'show <selector> - Muestra elemento',
    save: 'save - Guarda cambios',
    reset: 'reset - Restaura original',
    preview: 'preview - Vista previa móvil/tablet'
  }

  useEffect(() => {
    // Capturar contenido inicial de la página
    if (typeof window !== 'undefined') {
      const content = document.documentElement.outerHTML
      setHtmlContent(content)
    }
  }, [])

  // Manejar clic en elementos
  const handleElementClick = (e: React.MouseEvent) => {
    if (!isEditing) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const element = e.target as HTMLElement
    setSelectedElement(element)
    
    // Resaltar elemento seleccionado
    document.querySelectorAll('.editing-selected').forEach(el => {
      el.classList.remove('editing-selected')
    })
    element.classList.add('editing-selected')
  }

  // Ejecutar comando
  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    setCommandHistory(prev => [...prev, `> ${cmd}`])

    try {
      switch (command) {
        case 'help':
          setCommandHistory(prev => [...prev, 'COMANDOS DISPONIBLES:'])
          Object.entries(commands).forEach(([cmd, desc]) => {
            setCommandHistory(prev => [...prev, `  ${cmd}: ${desc}`])
          })
          break

        case 'clear':
          setCommandHistory([])
          break

        case 'edit':
          if (args[0] && selectedElement) {
            const css = prompt('CSS (ej: color: red; font-size: 20px):')
            if (css) {
              selectedElement.style.cssText += css
              setCommandHistory(prev => [...prev, `✅ CSS aplicado a ${args[0]}`])
            }
          }
          break

        case 'text':
          if (args[0] && args[1]) {
            const element = document.querySelector(args[0]) as HTMLElement
            if (element) {
              element.textContent = args.slice(1).join(' ')
              setCommandHistory(prev => [...prev, `✅ Texto cambiado en ${args[0]}`])
            }
          }
          break

        case 'color':
          if (args[0] && args[1]) {
            const element = document.querySelector(args[0]) as HTMLElement
            if (element) {
              element.style.color = args[1]
              setCommandHistory(prev => [...prev, `✅ Color cambiado en ${args[0]}`])
            }
          }
          break

        case 'size':
          if (args[0] && args[1]) {
            const element = document.querySelector(args[0]) as HTMLElement
            if (element) {
              element.style.fontSize = args[1]
              setCommandHistory(prev => [...prev, `✅ Tamaño cambiado en ${args[0]}`])
            }
          }
          break

        case 'hide':
          if (args[0]) {
            const element = document.querySelector(args[0]) as HTMLElement
            if (element) {
              element.style.display = 'none'
              setCommandHistory(prev => [...prev, `✅ Elemento ${args[0]} oculto`])
            }
          }
          break

        case 'show':
          if (args[0]) {
            const element = document.querySelector(args[0]) as HTMLElement
            if (element) {
              element.style.display = ''
              setCommandHistory(prev => [...prev, `✅ Elemento ${args[0]} visible`])
            }
          }
          break

        case 'save':
          const html = document.documentElement.outerHTML
          const blob = new Blob([html], { type: 'text/html' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'neoproxy-editado.html'
          a.click()
          setCommandHistory(prev => [...prev, '✅ Página guardada como neoproxy-editado.html'])
          break

        case 'reset':
          window.location.reload()
          break

        case 'preview':
          setCommandHistory(prev => [...prev, '📱 Vista previa: Ctrl+Shift+M (Chrome) o Ctrl+Shift+M (Firefox)'])
          break

        default:
          setCommandHistory(prev => [...prev, `❌ Comando desconocido: ${command}`])
          setCommandHistory(prev => [...prev, 'Escribe "help" para ver comandos'])
      }
    } catch (error) {
      setCommandHistory(prev => [...prev, `❌ Error: ${(error as Error).message}`])
    }
  }

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commandInput.trim()) {
      executeCommand(commandInput)
      setCommandInput('')
    }
  }

  return (
    <div className={styles.container}>
      {/* Header de control */}
      <div className={styles.header}>
        <h1>🖥️ Editor Web Tiempo Real</h1>
        <div className={styles.controls}>
          <button 
            className={`${styles.editBtn} ${isEditing ? styles.active : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '✏️ Editando' : '👁️ Ver'}
          </button>
          <button 
            className={styles.saveBtn}
            onClick={() => executeCommand('save')}
          >
            💾 Guardar
          </button>
          <button 
            className={styles.resetBtn}
            onClick={() => executeCommand('reset')}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Área de edición */}
      <div className={styles.editorArea}>
        {/* Vista previa editable */}
        <div 
          ref={editorRef}
          className={`${styles.preview} ${isEditing ? styles.editing : ''}`}
          onClick={handleElementClick}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Consola de comandos */}
        <div className={styles.console}>
          <div className={styles.consoleHeader}>
            🖥️ Consola de Comandos
          </div>
          <div className={styles.consoleOutput}>
            {commandHistory.map((cmd, index) => (
              <div key={index} className={styles.consoleLine}>
                {cmd}
              </div>
            ))}
          </div>
          <div className={styles.consoleInput}>
            <span className={styles.prompt}>$ </span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe comando..."
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {/* Panel de información */}
      {isEditing && (
        <div className={styles.infoPanel}>
          <h3>🎯 Elemento Seleccionado:</h3>
          <div className={styles.elementInfo}>
            {selectedElement ? (
              <>
                <p><strong>Tag:</strong> {selectedElement.tagName}</p>
                <p><strong>Clases:</strong> {selectedElement.className}</p>
                <p><strong>ID:</strong> {selectedElement.id}</p>
                <p><strong>Texto:</strong> {selectedElement.textContent?.substring(0, 50)}...</p>
              </>
            ) : (
              <p>Click en cualquier elemento para seleccionarlo</p>
            )}
          </div>
        </div>
      )}

      {/* Atajos de teclado */}
      <div className={styles.shortcuts}>
        <h4>⌨️ Atajos:</h4>
        <ul>
          <li><kbd>Ctrl+E</kbd> - Activar edición</li>
          <li><kbd>Ctrl+S</kbd> - Guardar página</li>
          <li><kbd>Ctrl+R</kbd> - Resetear</li>
          <li><kbd>Esc</kbd> - Deseleccionar elemento</li>
        </ul>
      </div>

      <style jsx>{`
        .editing-selected {
          outline: 2px dashed #ff00ff !important;
          background: rgba(255, 0, 255, 0.1) !important;
        }
      `}</style>
    </div>
  )
}
