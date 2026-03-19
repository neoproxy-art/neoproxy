'use client'
import { useEffect, useRef, useState } from 'react'

export default function ForgePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<any>(null)
  const [status, setStatus] = useState('INITIALIZING')
  const [exported, setExported] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    let engine: any

    const init = async () => {
      const BABYLON = await import('babylonjs')
      const canvas = canvasRef.current!
      engine = new BABYLON.Engine(canvas, true)
      const scene = new BABYLON.Scene(engine)
      scene.clearColor = new BABYLON.Color4(0, 0, 0.04, 1)

      const cam = new BABYLON.ArcRotateCamera('c', -Math.PI/2, Math.PI/3, 12, BABYLON.Vector3.Zero(), scene)
      cam.attachControl(canvas, true)
      cam.lowerRadiusLimit = 4
      cam.upperRadiusLimit = 20

      const hemi = new BABYLON.HemisphericLight('h', new BABYLON.Vector3(0,1,0), scene)
      hemi.intensity = 0.3
      hemi.diffuse = new BABYLON.Color3(0, 0.83, 1)

      const point = new BABYLON.PointLight('p', BABYLON.Vector3.Zero(), scene)
      point.diffuse = new BABYLON.Color3(0, 1, 0.5)
      point.intensity = 1.2

      // VESSEL — dodecaedro exterior (jaula)
      // Construido con 12 caras pentagonales como aristas huecas
      const phi = (1 + Math.sqrt(5)) / 2

      // Vértices del dodecaedro
      const verts: any[] = [
        // cubo base ±1
        new BABYLON.Vector3( 1, 1, 1), new BABYLON.Vector3(-1, 1, 1),
        new BABYLON.Vector3( 1,-1, 1), new BABYLON.Vector3(-1,-1, 1),
        new BABYLON.Vector3( 1, 1,-1), new BABYLON.Vector3(-1, 1,-1),
        new BABYLON.Vector3( 1,-1,-1), new BABYLON.Vector3(-1,-1,-1),
        // rectángulos áureos plano XY
        new BABYLON.Vector3(0, phi, 1/phi), new BABYLON.Vector3(0,-phi, 1/phi),
        new BABYLON.Vector3(0, phi,-1/phi), new BABYLON.Vector3(0,-phi,-1/phi),
        // plano XZ
        new BABYLON.Vector3( 1/phi,0, phi), new BABYLON.Vector3(-1/phi,0, phi),
        new BABYLON.Vector3( 1/phi,0,-phi), new BABYLON.Vector3(-1/phi,0,-phi),
        // plano YZ
        new BABYLON.Vector3( phi, 1/phi,0), new BABYLON.Vector3(-phi, 1/phi,0),
        new BABYLON.Vector3( phi,-1/phi,0), new BABYLON.Vector3(-phi,-1/phi,0),
      ]

      // Aristas del dodecaedro — conectar vértices cercanos
      const edgeThreshold = 1.5 * (2 / phi)
      const edges: [number,number][] = []
      for (let i = 0; i < verts.length; i++) {
        for (let j = i+1; j < verts.length; j++) {
          const d = BABYLON.Vector3.Distance(verts[i], verts[j])
          if (d < edgeThreshold) edges.push([i,j])
        }
      }

      // Crear tubos para cada arista — esto forma la jaula
      const cageMeshes: any[] = []
      const cageMat = new BABYLON.PBRMaterial('cage', scene)
      cageMat.albedoColor = new BABYLON.Color3(0, 0.5, 0.2)
      cageMat.emissiveColor = new BABYLON.Color3(0, 0.3, 0.1)
      cageMat.metallic = 0.1
      cageMat.roughness = 0.1
      cageMat.alpha = 0.7

      edges.forEach(([i,j], idx) => {
        const path = [
          verts[i].scale(2),
          verts[j].scale(2),
        ]
        const tube = BABYLON.MeshBuilder.CreateTube('edge'+idx, {
          path,
          radius: 0.08,
          tessellation: 6,
          cap: BABYLON.Mesh.CAP_ALL,
        }, scene)
        tube.material = cageMat
        cageMeshes.push(tube)
      })

      // INTERIOR ORGÁNICO — masa que presiona hacia afuera
      // Esfera deformada con noise simulado via displacement
      const organic = BABYLON.MeshBuilder.CreateSphere('organic', {
        diameter: 2.8,
        segments: 32,
      }, scene)

      // Deformar vértices manualmente para crear forma orgánica
      const positions = organic.getVerticesData(BABYLON.VertexBuffer.PositionKind)!
      const deformed = new Float32Array(positions.length)
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i], y = positions[i+1], z = positions[i+2]
        const len = Math.sqrt(x*x + y*y + z*z)
        // Noise simple basado en posición
        const noise = 0.4 * Math.sin(x*3.7) * Math.cos(y*2.9) * Math.sin(z*4.1)
          + 0.2 * Math.sin(x*7.3 + y*5.1)
          + 0.15 * Math.cos(y*8.7 + z*3.3)
        const newLen = len + noise
        deformed[i]   = x/len * newLen
        deformed[i+1] = y/len * newLen
        deformed[i+2] = z/len * newLen
      }
      organic.updateVerticesData(BABYLON.VertexBuffer.PositionKind, deformed)
      organic.createNormals(true)

      const organicMat = new BABYLON.PBRMaterial('organic', scene)
      organicMat.albedoColor = new BABYLON.Color3(0, 0.8, 0.3)
      organicMat.emissiveColor = new BABYLON.Color3(0, 0.2, 0.05)
      organicMat.metallic = 0
      organicMat.roughness = 0.6
      organicMat.alpha = 0.85
      organic.material = organicMat

      // Vértices de la jaula que están "doblados" por la presión
      // Simular un punto de ruptura — un vértice desplazado
      const breakPoint = BABYLON.MeshBuilder.CreateSphere('break', { diameter: 0.3 }, scene)
      breakPoint.position = new BABYLON.Vector3(2.8, 1.2, 1.8)
      const breakMat = new BABYLON.PBRMaterial('break', scene)
      breakMat.emissiveColor = new BABYLON.Color3(0.2, 1, 0.4)
      breakMat.albedoColor = new BABYLON.Color3(0.1, 0.8, 0.2)
      breakPoint.material = breakMat

      // Merge todo para exportar como un solo mesh
      const allMeshes = [...cageMeshes, organic, breakPoint]

      setStatus('VESSEL // READY')

      let t = 0
      engine.runRenderLoop(() => {
        t += 0.005
        organic.rotation.y = t * 0.3
        organic.rotation.x = Math.sin(t * 0.7) * 0.1
        scene.render()
      })

      window.addEventListener('resize', () => engine.resize())

      // Función de exportar disponible globalmente
      ;(window as any).exportVessel = async () => {
        setStatus('EXPORTANDO...')
        try {
          const { OBJExport } = await import('@babylonjs/serializers/OBJ')
          const merged = BABYLON.Mesh.MergeMeshes(
            allMeshes.filter(m => m && !m.isDisposed()),
            false, true, undefined, false, true
          )
          if (!merged) { setStatus('ERROR: merge falló'); return }
          const obj = OBJExport.OBJ([merged as any])
          const blob = new Blob([obj], { type: 'text/plain' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'NP-001-VESSEL.obj'
          a.click()
          URL.revokeObjectURL(url)
          setStatus('EXPORTADO // NP-001-VESSEL.obj')
          setExported(true)
        } catch(e) {
          console.error(e)
          setStatus('ERROR // ver consola')
        }
      }
    }

    init().catch(console.error)
    return () => { engine?.dispose() }
  }, [])

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh', background:'#00000a', overflow:'hidden' }}>
      <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />

      <div style={{ position:'absolute', top:24, left:28, fontFamily:'"Space Mono",monospace', pointerEvents:'none' }}>
        <div style={{ fontSize:9, color:'rgba(0,212,255,0.4)', letterSpacing:'0.2em', marginBottom:6 }}>// NEOPROXY · FORGE</div>
        <div style={{ fontSize:20, fontWeight:700, color:'#fff', letterSpacing:'0.1em' }}>NP-<span style={{color:'#00ff9d'}}>001</span></div>
        <div style={{ fontSize:9, color:'rgba(0,255,157,0.5)', letterSpacing:'0.15em', marginTop:4 }}>{status}</div>
      </div>

      <div style={{ position:'absolute', top:24, right:28, fontFamily:'"Space Mono",monospace', fontSize:9, color:'rgba(255,255,255,0.2)', pointerEvents:'none' }}>
        <div>DODECAHEDRON CAGE</div>
        <div style={{marginTop:4}}>ORGANIC INTERIOR</div>
        <div style={{marginTop:4}}>RESIN UV GREEN</div>
        <div style={{marginTop:4, color:'rgba(0,212,255,0.3)'}}>~7cm PHYSICAL</div>
      </div>

      <div style={{
        position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
        display:'flex', gap:12, alignItems:'center',
        background:'rgba(0,0,0,0.85)', border:'1px solid rgba(0,212,255,0.2)',
        padding:'12px 24px', fontFamily:'"Space Mono",monospace',
      }}>
        <button
          onClick={() => (window as any).exportVessel?.()}
          style={{
            background: exported ? 'rgba(0,255,157,0.1)' : 'rgba(0,212,255,0.1)',
            border: `1px solid ${exported ? '#00ff9d' : '#00d4ff'}`,
            color: exported ? '#00ff9d' : '#00d4ff',
            fontFamily:'"Space Mono",monospace',
            fontSize:10, letterSpacing:'0.1em',
            padding:'10px 20px', cursor:'pointer',
          }}
        >
          {exported ? '✓ DESCARGADO' : '⬇ EXPORTAR OBJ'}
        </button>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.2)', letterSpacing:'0.08em' }}>
          OBJ → Chitubox → Photon Mono 2
        </div>
      </div>
    </div>
  )
}
