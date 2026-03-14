'use client'

import { useEffect, useRef, useState } from 'react'
import * as BABYLON from 'babylonjs'
import styles from './TheAwakening.module.css'

interface Particle {
  position: BABYLON.Vector3
  velocity: BABYLON.Vector3
  life: number
  maxLife: number
}

export default function TheAwakening({ onComplete, skipIntro }: { 
  onComplete: () => void
  skipIntro: boolean 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const sceneRef = useRef<{
    scene: BABYLON.Scene | null
    engine: BABYLON.Engine | null
    particles: Particle[]
    networkNodes: BABYLON.Mesh[]
    connections: BABYLON.LinesMesh[]
    logo: BABYLON.Mesh | null
    agentLabels: BABYLON.Mesh[]
  }>({
    scene: null,
    engine: null,
    particles: [],
    networkNodes: [],
    connections: [],
    logo: null,
    agentLabels: []
  })

  const scenes = [
    { name: 'darkness', duration: 1000, text: 'Initializing System...' },
    { name: 'network', duration: 1500, text: 'Establishing Connections...' },
    { name: 'logo', duration: 1500, text: 'NeoProxy' },
    { name: 'agents', duration: 1000, text: 'Agents Online' },
    { name: 'transition', duration: 1000, text: 'System Ready' }
  ]

  useEffect(() => {
    if (skipIntro) {
      onComplete()
      return
    }

    const timer = setTimeout(() => setShowSkip(true), 2000)
    return () => clearTimeout(timer)
  }, [skipIntro, onComplete])

  useEffect(() => {
    if (skipIntro || !canvasRef.current) return

    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    })
    
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)

    // Camera
    const camera = new BABYLON.UniversalCamera(
      'camera',
      new BABYLON.Vector3(0, 0, -10),
      scene
    )
    camera.setTarget(BABYLON.Vector3.Zero())

    // Lighting
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 0, 1),
      scene
    )
    light.intensity = 0.3

    sceneRef.current = { scene, engine, particles: [], networkNodes: [], connections: [], logo: null, agentLabels: [] }

    // Start scene sequence
    startSceneSequence()

    engine.runRenderLoop(() => {
      scene.render()
    })

    return () => {
      engine.dispose()
    }
  }, [skipIntro])

  const startSceneSequence = () => {
    let sceneIndex = 0
    
    const runScene = async () => {
      if (sceneIndex >= scenes.length) {
        onComplete()
        return
      }

      setCurrentScene(sceneIndex)
      const current = scenes[sceneIndex]

      switch (current.name) {
        case 'darkness':
          await sceneDarkness()
          break
        case 'network':
          await sceneNetwork()
          break
        case 'logo':
          await sceneLogo()
          break
        case 'agents':
          await sceneAgents()
          break
        case 'transition':
          await sceneTransition()
          break
      }

      sceneIndex++
      setTimeout(runScene, 100)
    }

    runScene()
  }

  const sceneDarkness = async () => {
    const { scene } = sceneRef.current
    if (!scene) return

    // Create initial pulse
    const pulse = BABYLON.MeshBuilder.CreateSphere('pulse', { diameter: 0.1 }, scene)
    const pulseMaterial = new BABYLON.StandardMaterial('pulseMat', scene)
    pulseMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0.617)
    pulseMaterial.alpha = 0.8
    pulse.material = pulseMaterial

    // Animate pulse
    let scale = 0.1
    let alpha = 0.8
    const pulseAnimation = setInterval(() => {
      scale += 0.02
      alpha -= 0.015
      pulse.scaling = new BABYLON.Vector3(scale, scale, scale)
      if (pulse.material) {
        (pulse.material as BABYLON.StandardMaterial).alpha = alpha
      }
      
      if (alpha <= 0) {
        clearInterval(pulseAnimation)
        pulse.dispose()
      }
    }, 16)
  }

  const sceneNetwork = async () => {
    const { scene, networkNodes, connections } = sceneRef.current
    if (!scene) return

    // Create network nodes
    const nodeCount = 20
    const nodes: BABYLON.Mesh[] = []

    for (let i = 0; i < nodeCount; i++) {
      const node = BABYLON.MeshBuilder.CreateSphere(`node${i}`, { diameter: 0.05 }, scene)
      
      // Position nodes in a sphere pattern
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 2
      
      node.position = new BABYLON.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )

      const nodeMaterial = new BABYLON.StandardMaterial(`nodeMat${i}`, scene)
      nodeMaterial.emissiveColor = new BABYLON.Color3(0, 0.831, 1)
      nodeMaterial.alpha = 0
      node.material = nodeMaterial
      
      nodes.push(node)
      networkNodes.push(node)
    }

    // Animate nodes appearing
    nodes.forEach((node, index) => {
      setTimeout(() => {
        if (node.material) {
          (node.material as BABYLON.StandardMaterial).alpha = 0.8
        }
      }, index * 50)
    })

    // Create connections between nearby nodes
    setTimeout(() => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = BABYLON.Vector3.Distance(nodes[i].position, nodes[j].position)
          if (distance < 2) {
            const line = BABYLON.MeshBuilder.CreateLines(
              `line${i}_${j}`,
              { points: [nodes[i].position, nodes[j].position] },
              scene
            )
            line.color = new BABYLON.Color3(0, 1, 0.617)
            line.alpha = 0.3
            connections.push(line)
          }
        }
      }
    }, 500)
  }

  const sceneLogo = async () => {
    const { scene, networkNodes } = sceneRef.current
    if (!scene) return

    // Create NeoProxy text using planes (simplified)
    const logoGroup = new BABYLON.TransformNode('logoGroup', scene)
    
    // Create central glowing sphere as logo placeholder
    const logo = BABYLON.MeshBuilder.CreateSphere('logo', { diameter: 0.5 }, scene)
    const logoMaterial = new BABYLON.StandardMaterial('logoMat', scene)
    logoMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0) // Red color matching current theme
    logoMaterial.alpha = 0
    logo.material = logoMaterial
    logo.parent = logoGroup

    // Animate logo appearing
    let alpha = 0
    const logoAnimation = setInterval(() => {
      alpha += 0.02
      if (logo.material) {
        (logo.material as BABYLON.StandardMaterial).alpha = alpha
      }
      
      if (alpha >= 1) {
        clearInterval(logoAnimation)
      }
    }, 16)

    // Make network nodes orbit around logo
    networkNodes.forEach((node, index) => {
      const angle = (index / networkNodes.length) * Math.PI * 2
      const radius = 4
      
      const orbitAnimation = setInterval(() => {
        const time = Date.now() * 0.001
        node.position.x = Math.cos(angle + time * 0.5) * radius
        node.position.z = Math.sin(angle + time * 0.5) * radius
      }, 16)
    })

    sceneRef.current.logo = logo
  }

  const sceneAgents = async () => {
    const { scene } = sceneRef.current
    if (!scene) return

    const agents = ['Snake', 'Gennos', 'D', 'Trickzter']
    const agentLabels: BABYLON.Mesh[] = []

    agents.forEach((agent, index) => {
      // Create agent indicator
      const indicator = BABYLON.MeshBuilder.CreateSphere(`agent${index}`, { diameter: 0.1 }, scene)
      const angle = (index / agents.length) * Math.PI * 2
      const radius = 2
      
      indicator.position = new BABYLON.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )

      const agentMaterial = new BABYLON.StandardMaterial(`agentMat${index}`, scene)
      agentMaterial.emissiveColor = new BABYLON.Color3(1, 0.2, 0.2) // Red theme
      agentMaterial.alpha = 0
      indicator.material = agentMaterial

      // Flash agent
      setTimeout(() => {
        if (agentMaterial) {
          agentMaterial.alpha = 1
          setTimeout(() => {
            agentMaterial.alpha = 0.3
          }, 500)
        }
      }, index * 200)

      agentLabels.push(indicator)
    })

    sceneRef.current.agentLabels = agentLabels
  }

  const sceneTransition = async () => {
    const { scene, networkNodes, connections, logo } = sceneRef.current
    if (!scene) return

    // Move everything back and fade out
    const allMeshes = [...networkNodes, ...connections, ...(logo ? [logo] : [])]
    
    allMeshes.forEach((mesh, index) => {
      setTimeout(() => {
        const transitionAnimation = setInterval(() => {
          mesh.position.z += 0.1
          if (mesh.material) {
            const material = mesh.material as BABYLON.StandardMaterial
            const currentAlpha = material.alpha || 1
            material.alpha = Math.max(0, currentAlpha - 0.02)
          }
          
          if (mesh.position.z > 10) {
            clearInterval(transitionAnimation)
            mesh.dispose()
          }
        }, 16)
      }, index * 10)
    })
  }

  const handleSkip = () => {
    onComplete()
  }

  if (skipIntro) {
    return null
  }

  return (
    <div className={styles.awakeningContainer}>
      <canvas 
        ref={canvasRef}
        className={styles.awakeningCanvas}
      />
      
      <div className={styles.textOverlay}>
        <div className={styles.sceneText}>
          {scenes[currentScene]?.text}
        </div>
      </div>

      {showSkip && (
        <button 
          className={styles.skipButton}
          onClick={handleSkip}
        >
          Skip Intro →
        </button>
      )}

      <div className={styles.progressIndicator}>
        {scenes.map((_, index) => (
          <div 
            key={index}
            className={`${styles.progressDot} ${index <= currentScene ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
