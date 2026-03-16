'use client'

import { useEffect, useRef, useState } from 'react'
import * as BABYLON from 'babylonjs'
import styles from './page.module.css'

type V4 = [number, number, number, number]
type SystemMode = 'IDLE' | 'SYSTEMS' | 'FABRICATION' | 'MEMORY' | 'R&D' | 'AI'

export default function NeoProxyClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [systemMode, setSystemMode] = useState<SystemMode>('IDLE')
  const modeRef = useRef<SystemMode>(systemMode)
  const [status, setStatus] = useState('INITIALIZING')
  const [layer, setLayer] = useState('CONSOLE')
  const [glitchActive, setGlitchActive] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiDesign, setAiDesign] = useState({ color: new BABYLON.Color3(1, 0, 0), scale: 1.0, speed: 0.005 })

  const applyAiDesign = () => {
    const prompt = aiPrompt.toLowerCase()
    let color = new BABYLON.Color3(1, 0, 0) // Default rojo
    let scale = 1.0
    let speed = 0.005

    if (prompt.includes('red')) color = new BABYLON.Color3(1, 0, 0)
    if (prompt.includes('blue')) color = new BABYLON.Color3(0, 0, 1)
    if (prompt.includes('green')) color = new BABYLON.Color3(0, 1, 0)
    if (prompt.includes('yellow')) color = new BABYLON.Color3(1, 1, 0)
    if (prompt.includes('purple')) color = new BABYLON.Color3(0.5, 0, 0.5)
    if (prompt.includes('orange')) color = new BABYLON.Color3(1, 0.5, 0)

    if (prompt.includes('big') || prompt.includes('large')) scale = 1.5
    if (prompt.includes('small')) scale = 0.5

    if (prompt.includes('fast')) speed = 0.02
    if (prompt.includes('slow')) speed = 0.002

    setAiDesign({ color, scale, speed })
  }

  // Sync mode to ref for Babylon loop
  useEffect(() => {
    modeRef.current = systemMode
  }, [systemMode])

  useEffect(() => {
    if (!canvasRef.current) return

    // Remove legacy HTML menu labels from prior renders
    document.querySelectorAll(`.${styles.menuLabel}`).forEach(el => el.remove())

    // ENGINE
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    })
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)

    // CAMERA
    const camera = new BABYLON.ArcRotateCamera(
      'cam',
      Math.PI / 4,
      Math.PI / 3,
      10,
      BABYLON.Vector3.Zero(),
      scene
    )
    camera.attachControl(canvasRef.current, true)
    camera.lowerRadiusLimit = 8
    camera.upperRadiusLimit = 12

    new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene
    )

    // =============================
    // HEXACOSICORON (600-cell)
    // =============================
    const φ = (1 + Math.sqrt(5)) / 2
    const invφ = 1 / φ
    const signs = [-1, 1]

    const vertices4D: V4[] = []

    // Hypercube
    for (const x of signs)
      for (const y of signs)
        for (const z of signs)
          for (const w of signs)
            vertices4D.push([x, y, z, w])

    // Axes
    const axes: V4[] = [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ]
    axes.forEach(a => {
      vertices4D.push(a)
      vertices4D.push([-a[0], -a[1], -a[2], -a[3]])
    })

    // Golden permutations
    const base = [0, 1, φ, invφ]

    function permute(arr: number[]): number[][] {
      if (arr.length === 1) return [arr]
      const res: number[][] = []
      for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
        for (const p of permute(rest)) res.push([arr[i], ...p])
      }
      return res
    }

    const perms = permute(base)
    for (const p of perms)
      for (const s1 of signs)
        for (const s2 of signs)
          for (const s3 of signs)
            vertices4D.push([p[0], s1 * p[1], s2 * p[2], s3 * p[3]])

    // Deduplicate
    const uniq = new Map<string, V4>()
    vertices4D.forEach(v =>
      uniq.set(v.map(n => n.toFixed(5)).join(','), v)
    )
    const V = Array.from(uniq.values())

    // Edges
    const edges: [number, number][] = []
    const eps = 0.001

    function dist4(a: V4, b: V4) {
      return Math.hypot(
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
        a[3] - b[3]
      )
    }

    const d0 = dist4(V[0], V[1])
    for (let i = 0; i < V.length; i++) {
      for (let j = i + 1; j < V.length; j++) {
        if (Math.abs(dist4(V[i], V[j]) - d0) < eps) {
          edges.push([i, j])
        }
      }
    }

    // 4D rotation
    let rotXW = 0
    let rotYW = 0

    function rotate4D(v: V4): V4 {
      let [x, y, z, w] = v
      const cx = Math.cos(rotXW)
      const sx = Math.sin(rotXW)
      const cy = Math.cos(rotYW)
      const sy = Math.sin(rotYW)

      const x1 = x * cx - w * sx
      const w1 = x * sx + w * cx
      const y1 = y * cy - w1 * sy
      const w2 = y * sy + w1 * cy

      return [x1, y1, z, w2]
    }

    function project(v: V4) {
      const d = 4
      const s = d / (d - v[3])
      return new BABYLON.Vector3(v[0] * s, v[1] * s, v[2] * s)
    }

    // CORE 4D GEOMETRY - OPTIMIZED
    const coreColor = new BABYLON.Color3(1, 0, 0) // #FF0000 - Rojo
    const accentColor = new BABYLON.Color3(1, 0.2, 0.2) // #CC3333 - Rojo más claro
    
    // 1. Optimized Points (Vertices)
    const sphereBox = BABYLON.MeshBuilder.CreateSphere('p', { diameter: 0.04 }, scene)
    const pMat = new BABYLON.StandardMaterial('pm', scene)
    pMat.emissiveColor = coreColor
    pMat.alpha = 0.8
    sphereBox.material = pMat
    sphereBox.isVisible = false

    const behaviors = {
      IDLE: { speed: 0.005, scale: 1.0, alpha: 0.5, color: new BABYLON.Color3(1, 0, 0) },
      SYSTEMS: { speed: 0.02, scale: 1.3, alpha: 0.8, color: new BABYLON.Color3(0.8, 0, 0) },
      FABRICATION: { speed: 0.01, scale: 0.8, alpha: 0.9, color: new BABYLON.Color3(1, 0.2, 0) },
      MEMORY: { speed: 0.008, scale: 1.6, alpha: 0.3, color: new BABYLON.Color3(0.6, 0, 0) },
      'R&D': { speed: 0.015, scale: 1.1, alpha: 0.7, color: new BABYLON.Color3(1, 0.4, 0.4) },
      AI: { speed: 0.01, scale: 1.2, alpha: 0.9, color: new BABYLON.Color3(0.8, 0.2, 0.2) }
    }

    const pointInstances: BABYLON.InstancedMesh[] = []
    V.forEach((_, i) => {
      const inst = sphereBox.createInstance('v' + i)
      pointInstances.push(inst)
    })

    // 2. Optimized Edges using LineSystem (Single Draw Call)
    let edgeSystem: BABYLON.LinesMesh | null = null

    // =============================
    // INTEGRATED MENU SYSTEM - PART OF 600-CELL
    // =============================
    const menuNodes: { vertexIndex: number, mode: SystemMode, label: string, description: string }[] = [
      { vertexIndex: 0, mode: 'SYSTEMS', label: 'SYSTEMS', description: 'Architecture · Interfaces · Engineering' },
      { vertexIndex: 8, mode: 'FABRICATION', label: 'FABRICATION', description: '3D Print · Resina · Objetos Físicos' },
      { vertexIndex: 16, mode: 'MEMORY', label: 'MEMORY', description: 'Proceso · Diario · Conversaciones IA' },
      { vertexIndex: 24, mode: 'R&D', label: 'R&D', description: 'Generative Lab · Experimentos · STL' },
      { vertexIndex: 32, mode: 'AI', label: 'AI DESIGN', description: 'Agente Inteligente · Diseño Polítopo' },
      { vertexIndex: 40, mode: 'IDLE', label: 'CORE', description: 'NeoProxy OS · Central Hub' }
    ]

    // Menu node meshes (now fully inside the 600-cell geometry)
    const menuSpheres: BABYLON.Mesh[] = []

    menuNodes.forEach((node, index) => {
      // Create larger sphere for menu nodes
      const sphere = BABYLON.MeshBuilder.CreateSphere(`menuNode_${index}`, { diameter: 0.15 }, scene)
      const mat = new BABYLON.StandardMaterial(`menuMat_${index}`, scene)
      mat.emissiveColor = new BABYLON.Color3(1, 0.5, 0) // Orange highlight for menu nodes
      mat.alpha = 0.9
      sphere.material = mat
      sphere.isPickable = true
      sphere.actionManager = new BABYLON.ActionManager(scene)

      // Click / tap interaction
      sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
          setSystemMode(node.mode)
        })
      )

      // Hover highlight
      sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
          mat.emissiveColor = BABYLON.Color3.Lerp(mat.emissiveColor, new BABYLON.Color3(1, 1, 0.4), 0.4)
        })
      )
      sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
          mat.emissiveColor = new BABYLON.Color3(1, 0.5, 0)
        })
      )

      menuSpheres.push(sphere)
    })

    // Interaction state
    let targetRotXW = 0
    let targetRotYW = 0
    let smoothRotXW = 0
    let smoothRotYW = 0
    let autoRot = 0

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      targetRotXW = x * 2
      targetRotYW = y * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Loop
    engine.runRenderLoop(() => {
      const mode = modeRef.current
      const config = mode === 'AI' ? { speed: aiDesign.speed, scale: aiDesign.scale, alpha: 0.9, color: aiDesign.color } : behaviors[mode]

      // Update Visuals based on Mode
      pMat.emissiveColor = BABYLON.Color3.Lerp(pMat.emissiveColor, config.color, 0.05)
      const targetScaling = config.scale
      sphereBox.scaling.x += (targetScaling - sphereBox.scaling.x) * 0.05
      sphereBox.scaling.y += (targetScaling - sphereBox.scaling.y) * 0.05
      sphereBox.scaling.z += (targetScaling - sphereBox.scaling.z) * 0.05

      autoRot += config.speed

      smoothRotXW += (targetRotXW - smoothRotXW) * 0.05
      smoothRotYW += (targetRotYW - smoothRotYW) * 0.05

      // Combine interactive rotation with auto-rotation
      rotXW = smoothRotXW + autoRot
      rotYW = smoothRotYW + (autoRot * 0.5)

      const rotated = V.map(rotate4D)
      const projected = rotated.map(project)

      // Update Points
      projected.forEach((p, i) => {
        pointInstances[i].position.copyFrom(p)
      })

      // Update Menu Nodes - Position them at specific 600-cell vertices
      menuNodes.forEach((node, index) => {
        if (node.vertexIndex < projected.length) {
          const pos = projected[node.vertexIndex]
          const sphere = menuSpheres[index]
          sphere.position.copyFrom(pos)

          // Highlight active mode
          const isActive = mode === node.mode
          const mat = sphere.material as BABYLON.StandardMaterial
          const targetColor = isActive ? new BABYLON.Color3(1, 1, 0) : new BABYLON.Color3(1, 0.5, 0)
          mat.emissiveColor = BABYLON.Color3.Lerp(mat.emissiveColor, targetColor, 0.1)
          sphere.scaling.setAll(isActive ? 1.5 : 1.0)
        }
      })

      // Update Edges (LineSystem)
      const segments = edges.map(([i, j]) => [projected[i], projected[j]])
      
      if (!edgeSystem) {
        edgeSystem = BABYLON.MeshBuilder.CreateLineSystem('edges', { lines: segments, updatable: true }, scene)
        edgeSystem.color = config.color
        edgeSystem.alpha = config.alpha
      } else {
        BABYLON.MeshBuilder.CreateLineSystem('edges', { lines: segments, instance: edgeSystem })
        edgeSystem.color = BABYLON.Color3.Lerp(edgeSystem.color, config.color, 0.05)
        edgeSystem.alpha += (config.alpha - edgeSystem.alpha) * 0.05
      }

      scene.render()
    })

    window.addEventListener('resize', () => engine.resize())
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      engine.dispose()
    }
  }, [])

  // System state reactions
  useEffect(() => {
    setStatus('ONLINE')
    setLayer('INTERFACE_SYSTEM')
    
    // React to mode changes
    if (systemMode !== 'IDLE') {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }
  }, [systemMode])

  const dataStream = '0x7F 0xE2 CORE_SYNC ENTANGLED_TESSERACT NODE_01 NODE_02 NODE_03 PROXY_ACTIVE MEMORY_BUFFER 0x00 0xFF GEOMETRY_4D FABRICATION_QUEUE SYSTEMS_OK '.repeat(4)

  return (
    <>
      <main className={`${styles.container} ${glitchActive ? styles.glitch : ''}`}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.vignette} />
        <div className={styles.noiseOverlay} />
        <div className={styles.scanlines} />

        <section className={styles.ui}>
          <div className={styles.statusBar}>
            <span className={styles.statusBarCursor}>NEOPROXY // CORE: {systemMode}</span>
            <span>STATUS: {status}</span>
          </div>

          <div className={styles.footerStatus}>
            // NPOS v0.2 // DEPLOYED // ENTANGLED_TESSERACT_ACTIVE
            <span className={styles.dataTicker}>
              <span className={styles.dataTickerInner}>{dataStream}{dataStream}</span>
            </span>
          </div>
        </section>
      </main>
    </>
  )
}
