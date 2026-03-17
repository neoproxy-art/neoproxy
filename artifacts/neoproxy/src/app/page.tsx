'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const PROJECTS = [
  { href: '/espada', icon: '⟁', title: 'ESPADA PROXY', desc: 'Interface física · acceso a la red', status: 'ONLINE' },
  { href: '/shop', icon: '◈', title: 'SHOP', desc: 'STL premium · objetos físicos', status: 'SOON' },
  { href: '/npos', icon: '⬡', title: 'NPOS / LAB', desc: 'Creative OS · geometría generativa', status: 'ONLINE' },
  { href: '/concept', icon: '◉', title: 'SINSPISSSS', desc: 'Protocolo neural cuántico', status: 'BETA' },
]

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    let engine: any

    const init = async () => {
      const BABYLON = await import('babylonjs')
      const canvas = canvasRef.current!
      engine = new BABYLON.Engine(canvas, true)
      const scene = new BABYLON.Scene(engine)
      scene.clearColor = new BABYLON.Color4(0, 0, 0.03, 1)

      const camera = new BABYLON.ArcRotateCamera('cam', -Math.PI / 2, Math.PI / 3, 14, BABYLON.Vector3.Zero(), scene)
      camera.lowerRadiusLimit = 6
      camera.upperRadiusLimit = 22
      camera.attachControl(canvas, true)

      const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)
      hemi.intensity = 0.15
      hemi.diffuse = new BABYLON.Color3(0, 0.83, 1)

      const point = new BABYLON.PointLight('point', BABYLON.Vector3.Zero(), scene)
      point.diffuse = new BABYLON.Color3(0.7, 0, 1)
      point.intensity = 0.8

      const phi = (1 + Math.sqrt(5)) / 2
      const invphi = 1 / phi
      const vertices4D: [number, number, number, number][] = []

      for (let i = 0; i < 16; i++) {
        vertices4D.push([
          (i & 1 ? 1 : -1) * 0.5,
          (i & 2 ? 1 : -1) * 0.5,
          (i & 4 ? 1 : -1) * 0.5,
          (i & 8 ? 1 : -1) * 0.5,
        ])
      }

      const perms: [number, number, number, number][] = [
        [0,1,phi,invphi],[0,1,phi,-invphi],[0,1,-phi,invphi],[0,1,-phi,-invphi],
        [0,-1,phi,invphi],[0,-1,phi,-invphi],[0,-1,-phi,invphi],[0,-1,-phi,-invphi],
        [1,phi,invphi,0],[1,phi,-invphi,0],[1,-phi,invphi,0],[1,-phi,-invphi,0],
        [-1,phi,invphi,0],[-1,phi,-invphi,0],[-1,-phi,invphi,0],[-1,-phi,-invphi,0],
        [phi,invphi,0,1],[phi,invphi,0,-1],[phi,-invphi,0,1],[phi,-invphi,0,-1],
        [-phi,invphi,0,1],[-phi,invphi,0,-1],[-phi,-invphi,0,1],[-phi,-invphi,0,-1],
        [invphi,0,1,phi],[invphi,0,1,-phi],[invphi,0,-1,phi],[invphi,0,-1,-phi],
        [-invphi,0,1,phi],[-invphi,0,1,-phi],[-invphi,0,-1,phi],[-invphi,0,-1,-phi],
      ]
      vertices4D.push(...perms)

      const project = (v: [number,number,number,number], angle: number): any => {
        const cos = Math.cos(angle), sin = Math.sin(angle)
        const x = v[0]*cos - v[3]*sin
        const y = v[1]
        const z = v[2]
        const w = v[0]*sin + v[3]*cos
        const scale = 3.5 / (2 - w + 0.001)
        return new BABYLON.Vector3(x*scale, y*scale, z*scale)
      }

      const spheres = vertices4D.map((v, i) => {
        const s = BABYLON.MeshBuilder.CreateSphere('v'+i, { diameter: 0.08 }, scene)
        const mat = new BABYLON.PBRMaterial('m'+i, scene)
        const t = (v[3] + 2) / 4
        mat.albedoColor = new BABYLON.Color3(t*0.2, t*0.6, 1-t*0.3)
        mat.emissiveColor = new BABYLON.Color3(t*0.1, t*0.4, 1-t*0.4)
        mat.metallic = 1
        mat.roughness = 0
        s.material = mat
        return s
      })

      const edgeThreshold = 2.1 / phi
      const edges: [number,number][] = []
      for (let i = 0; i < vertices4D.length; i++) {
        for (let j = i+1; j < vertices4D.length; j++) {
          const v1 = vertices4D[i], v2 = vertices4D[j]
          const d = Math.sqrt((v1[0]-v2[0])**2+(v1[1]-v2[1])**2+(v1[2]-v2[2])**2+(v1[3]-v2[3])**2)
          if (d < edgeThreshold) edges.push([i,j])
        }
      }

      const edgeLines = edges.map(([i,j]) =>
        BABYLON.MeshBuilder.CreateLines('e'+i+'_'+j, {
          points: [spheres[i].position.clone(), spheres[j].position.clone()],
          updatable: true,
        }, scene)
      )
      edgeLines.forEach(l => { l.color = new BABYLON.Color3(0,0.5,0.8); l.alpha = 0.25 })

      let angle = 0
      engine.runRenderLoop(() => {
        angle += 0.004
        vertices4D.forEach((v,i) => { spheres[i].position = project(v, angle) })
        edges.forEach(([i,j],idx) => {
          BABYLON.MeshBuilder.CreateLines('e'+i+'_'+j, {
            points: [spheres[i].position, spheres[j].position],
            instance: edgeLines[idx],
          })
        })
        scene.render()
      })

      window.addEventListener('resize', () => engine.resize())
      setReady(true)
    }

    init().catch(console.error)
    return () => { engine?.dispose() }
  }, [])

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh', overflow:'hidden', background:'#00000a' }}>
      <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />

      {!ready && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Space Mono",monospace', fontSize:11, color:'#00d4ff', letterSpacing:'0.15em', opacity:0.6, pointerEvents:'none' }}>
          NEOPROXY // INITIALIZING_
        </div>
      )}

      {ready && (
        <>
          <div style={{ position:'absolute', top:'50%', left:40, transform:'translateY(-50%)', pointerEvents:'none' }}>
            <div style={{ fontFamily:'"Space Mono",monospace', fontSize:9, color:'rgba(0,212,255,0.4)', letterSpacing:'0.2em', marginBottom:8 }}>
              // NEOPROXY.ART v2.0
            </div>
            <div style={{ fontFamily:'"Space Mono",monospace', fontSize:28, fontWeight:700, color:'#fff', letterSpacing:'0.08em', lineHeight:1.1 }}>
              NEO<span style={{ color:'#00d4ff' }}>PROXY</span>
            </div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'rgba(255,255,255,0.35)', letterSpacing:'0.1em', marginTop:6 }}>
              600-CELL · 4D PROJECTION
            </div>
          </div>

          <div style={{ position:'absolute', right:32, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:8, width:220 }}>
            {PROJECTS.map((p,i) => (
              <Link key={p.title} href={p.href}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ display:'block', padding:'10px 14px', background: hoveredProject===i ? 'rgba(0,212,255,0.08)' : 'rgba(0,0,0,0.7)', border:`1px solid ${hoveredProject===i ? 'rgba(0,212,255,0.4)' : 'rgba(0,212,255,0.1)'}`, textDecoration:'none', transition:'all 0.2s', cursor:'pointer' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                  <span style={{ color:'#00d4ff', fontSize:14 }}>{p.icon}</span>
                  <span style={{ fontFamily:'"Space Mono",monospace', fontSize:10, color:'#fff', fontWeight:700, letterSpacing:'0.1em' }}>{p.title}</span>
                  <span style={{ marginLeft:'auto', fontFamily:'"JetBrains Mono",monospace', fontSize:8, color: p.status==='ONLINE' ? '#00ff9d' : p.status==='BETA' ? '#ff9500' : '#666', letterSpacing:'0.1em' }}>{p.status}</span>
                </div>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.05em' }}>{p.desc}</div>
              </Link>
            ))}
          </div>

          <div style={{ position:'absolute', bottom:20, left:40, fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'rgba(0,212,255,0.25)', letterSpacing:'0.1em', pointerEvents:'none' }}>
            WIRED · {new Date().getFullYear()} · SYSTEM_ONLINE
          </div>
        </>
      )}
    </div>
  )
}
