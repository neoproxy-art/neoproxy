'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export function HomeClient({ scene, projects }: { scene: any, projects: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    let engine: any

    const init = async () => {
      const BABYLON = await import('babylonjs')
      const canvas = canvasRef.current!
      engine = new BABYLON.Engine(canvas, true)
      const s = new BABYLON.Scene(engine)
      s.clearColor = new BABYLON.Color4(0, 0, 0.04, 1)

      const cam = new BABYLON.ArcRotateCamera('c', -Math.PI/2, Math.PI/3, 14, BABYLON.Vector3.Zero(), s)
      cam.lowerRadiusLimit = 6
      cam.upperRadiusLimit = 22
      cam.attachControl(canvas, true)

      const hemi = new BABYLON.HemisphericLight('h', new BABYLON.Vector3(0,1,0), s)
      hemi.intensity = 0.15
      hemi.diffuse = BABYLON.Color3.FromHexString(scene.ambientColor ?? '#00d4ff')

      const phi = (1 + Math.sqrt(5)) / 2
      const invphi = 1 / phi
      const v4: [number,number,number,number][] = []
      for (let i = 0; i < 16; i++) {
        v4.push([(i&1?1:-1)*.5,(i&2?1:-1)*.5,(i&4?1:-1)*.5,(i&8?1:-1)*.5])
      }
      const perms: [number,number,number,number][] = [
        [0,1,phi,invphi],[0,1,phi,-invphi],[0,1,-phi,invphi],[0,1,-phi,-invphi],
        [0,-1,phi,invphi],[0,-1,phi,-invphi],[0,-1,-phi,invphi],[0,-1,-phi,-invphi],
        [1,phi,invphi,0],[1,phi,-invphi,0],[1,-phi,invphi,0],[1,-phi,-invphi,0],
        [-1,phi,invphi,0],[-1,phi,-invphi,0],[-1,-phi,invphi,0],[-1,-phi,-invphi,0],
        [phi,invphi,0,1],[phi,invphi,0,-1],[phi,-invphi,0,1],[phi,-invphi,0,-1],
        [-phi,invphi,0,1],[-phi,invphi,0,-1],[-phi,-invphi,0,1],[-phi,-invphi,0,-1],
        [invphi,0,1,phi],[invphi,0,1,-phi],[invphi,0,-1,phi],[invphi,0,-1,-phi],
        [-invphi,0,1,phi],[-invphi,0,1,-phi],[-invphi,0,-1,phi],[-invphi,0,-1,-phi],
      ]
      v4.push(...perms)

      const project = (v: [number,number,number,number], a: number) => {
        const x = v[0]*Math.cos(a)-v[3]*Math.sin(a)
        const y = v[1], z = v[2]
        const w = v[0]*Math.sin(a)+v[3]*Math.cos(a)
        const sc = 3.5/(2-w+0.001)
        return new BABYLON.Vector3(x*sc, y*sc, z*sc)
      }

      const nodeHex = scene.nodeColor ?? '#00d4ff'
      const spheres = v4.map((v,i) => {
        const sp = BABYLON.MeshBuilder.CreateSphere('v'+i,{diameter:0.08},s)
        const mat = new BABYLON.PBRMaterial('m'+i,s)
        const t = (v[3]+2)/4
        const base = BABYLON.Color3.FromHexString(nodeHex)
        mat.albedoColor = new BABYLON.Color3(base.r*t, base.g*t, base.b*(1-t*0.3))
        mat.emissiveColor = new BABYLON.Color3(base.r*t*0.5, base.g*t*0.8, base.b*(1-t*0.4))
        mat.metallic = 1
        mat.roughness = 0
        sp.material = mat
        return sp
      })

      const edgeThreshold = 2.1/phi
      const edges: [number,number][] = []
      for (let i = 0; i < v4.length; i++)
        for (let j = i+1; j < v4.length; j++) {
          const d = Math.sqrt(v4[i].reduce((s,_,k)=>(s+(v4[i][k]-v4[j][k])**2),0))
          if (d < edgeThreshold) edges.push([i,j])
        }

      const edgeColor = BABYLON.Color3.FromHexString(scene.edgeColor ?? '#0080cc')
      const lines = edges.map(([i,j]) => {
        const l = BABYLON.MeshBuilder.CreateLines('e'+i+'_'+j,{
          points:[spheres[i].position.clone(),spheres[j].position.clone()],
          updatable:true,
        },s)
        l.color = edgeColor
        l.alpha = scene.edgeOpacity ?? 0.25
        return l
      })

      let angle = 0
      const speed = scene.rotationSpeed ?? 0.004
      engine.runRenderLoop(() => {
        angle += speed
        v4.forEach((v,i) => { spheres[i].position = project(v,angle) })
        edges.forEach(([i,j],idx) => {
          BABYLON.MeshBuilder.CreateLines('e'+i+'_'+j,{
            points:[spheres[i].position,spheres[j].position],
            instance:lines[idx],
          })
        })
        s.render()
      })
      window.addEventListener('resize',()=>engine.resize())
      setReady(true)
    }

    init().catch(console.error)
    return () => { engine?.dispose() }
  }, [scene])

  return (
    <div style={{position:'relative',width:'100vw',height:'100vh',overflow:'hidden',background:scene.bgColor??'#00000a'}}>
      <canvas ref={canvasRef} style={{width:'100%',height:'100%',display:'block'}}/>
      {!ready && (
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'"Space Mono",monospace',fontSize:11,color:'#00d4ff',letterSpacing:'0.15em',opacity:0.6,pointerEvents:'none'}}>
          NEOPROXY // INITIALIZING_
        </div>
      )}
      {ready && (
        <>
          <div style={{position:'absolute',top:'50%',left:40,transform:'translateY(-50%)',pointerEvents:'none'}}>
            <div style={{fontFamily:'"Space Mono",monospace',fontSize:9,color:'rgba(0,212,255,0.4)',letterSpacing:'0.2em',marginBottom:8}}>// NEOPROXY.ART v2.0</div>
            <div style={{fontFamily:'"Space Mono",monospace',fontSize:28,fontWeight:700,color:'#fff',letterSpacing:'0.08em',lineHeight:1.1}}>
              NEO<span style={{color:scene.nodeColor??'#00d4ff'}}>PROXY</span>
            </div>
            <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:10,color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',marginTop:6}}>600-CELL · 4D PROJECTION</div>
          </div>
          <div style={{position:'absolute',right:32,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:8,width:220}}>
            {projects.map((p,i)=>(
              <Link key={p.slug} href={p.href}
                onMouseEnter={()=>setHovered(i)}
                onMouseLeave={()=>setHovered(null)}
                style={{display:'block',padding:'10px 14px',background:hovered===i?'rgba(0,212,255,0.08)':'rgba(0,0,0,0.7)',border:`1px solid ${hovered===i?'rgba(0,212,255,0.4)':'rgba(0,212,255,0.1)'}`,textDecoration:'none',transition:'all 0.2s'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                  <span style={{color:scene.nodeColor??'#00d4ff',fontSize:14}}>{p.icon}</span>
                  <span style={{fontFamily:'"Space Mono",monospace',fontSize:10,color:'#fff',fontWeight:700,letterSpacing:'0.1em'}}>{p.title}</span>
                  <span style={{marginLeft:'auto',fontFamily:'"JetBrains Mono",monospace',fontSize:8,color:p.status==='ONLINE'?'#00ff9d':p.status==='BETA'?'#ff9500':'#666',letterSpacing:'0.1em'}}>{p.status}</span>
                </div>
                <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:9,color:'rgba(255,255,255,0.35)'}}>{p.description}</div>
              </Link>
            ))}
          </div>
          <div style={{position:'absolute',bottom:20,left:40,fontFamily:'"JetBrains Mono",monospace',fontSize:9,color:'rgba(0,212,255,0.25)',letterSpacing:'0.1em',pointerEvents:'none'}}>
            WIRED · {new Date().getFullYear()} · SYSTEM_ONLINE
          </div>
        </>
      )}
    </div>
  )
}
