'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const RINGS = [
  { radius: 3,  label: 'KICK',  color: '#ff3366', note: 'C1',  synth: 'membrane' },
  { radius: 5,  label: 'BASS',  color: '#ff9500', note: 'C2',  synth: 'mono'     },
  { radius: 7,  label: 'SYNTH', color: '#00d4ff', note: 'C4',  synth: 'poly'     },
  { radius: 9,  label: 'HI',    color: '#00ff9d', note: 'C6',  synth: 'metal'    },
]

const SCALES = {
  minor: ['C3','D3','Eb3','F3','G3','Ab3','Bb3','C4','D4','Eb4','F4','G4'],
  penta: ['C3','Eb3','F3','G3','Bb3','C4','Eb4','F4','G4','Bb4'],
  cyber: ['C3','Db3','E3','F3','Ab3','Bb3','C4','Db4','E4','F4'],
}

const SHAPES = ['sphere','box','cylinder','torus'] as const
type ShapeType = typeof SHAPES[number]

interface Particle {
  id: number; mesh: any; velocity: number
  shape: ShapeType; angle: number; active: boolean
  hitRings: Set<number>; noteIdx: number
}

export default function DJPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<any>(null)
  const engineRef = useRef<any>(null)
  const synthsRef = useRef<any>({})
  const particlesRef = useRef<Particle[]>([])
  const ringMeshesRef = useRef<any[]>([])
  const toneStartedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [selectedShape, setSelectedShape] = useState<ShapeType>('sphere')
  const [scale, setScale] = useState<keyof typeof SCALES>('cyber')
  const [activeRings, setActiveRings] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const particleIdRef = useRef(0)
  const noteIdxRef = useRef(0)

  const initTone = useCallback(async () => {
    if (toneStartedRef.current) return
    const Tone = await import('tone')
    await Tone.start()
    toneStartedRef.current = true

    const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination()
    const delay = new Tone.FeedbackDelay('8n', 0.3).connect(reverb)

    synthsRef.current.kick = new Tone.MembraneSynth({
      pitchDecay: 0.08, octaves: 6,
      envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }
    }).connect(reverb)

    synthsRef.current.bass = new Tone.MonoSynth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.3 },
      filterEnvelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3, baseFrequency: 200, octaves: 3 }
    }).connect(reverb)

    synthsRef.current.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.3, release: 0.5 }
    }).connect(delay)

    synthsRef.current.metal = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
      harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5
    }).connect(reverb)
  }, [])

  const playSound = useCallback(async (ringIdx: number, noteIdx: number, currentScale: keyof typeof SCALES) => {
    await initTone()
    const notes = SCALES[currentScale]
    const note = notes[noteIdx % notes.length]
    const ring = RINGS[ringIdx]

    setActiveRings(prev => {
      const next = [...prev, ring.label]
      setTimeout(() => setActiveRings(p => p.filter(r => r !== ring.label)), 200)
      return next
    })

    try {
      switch(ringIdx) {
        case 0: synthsRef.current.kick?.triggerAttackRelease('C1', '8n'); break
        case 1: synthsRef.current.bass?.triggerAttackRelease(note, '8n'); break
        case 2: synthsRef.current.synth?.triggerAttackRelease([note, notes[(noteIdx+4)%notes.length]], '8n'); break
        case 3: synthsRef.current.metal?.triggerAttackRelease('16n'); break
      }
    } catch(e) {}
  }, [initTone])

  const spawnParticle = useCallback((shape: ShapeType) => {
    if (!sceneRef.current) return
    const BABYLON = (window as any).__BABYLON__
    if (!BABYLON) return
    const scene = sceneRef.current
    const angle = Math.random() * Math.PI * 2
    let mesh: any
    const id = particleIdRef.current++
    switch(shape) {
      case 'box':      mesh = BABYLON.MeshBuilder.CreateBox('p'+id,{size:0.3},scene); break
      case 'cylinder': mesh = BABYLON.MeshBuilder.CreateCylinder('p'+id,{height:0.4,diameter:0.25},scene); break
      case 'torus':    mesh = BABYLON.MeshBuilder.CreateTorus('p'+id,{diameter:0.4,thickness:0.1},scene); break
      default:         mesh = BABYLON.MeshBuilder.CreateSphere('p'+id,{diameter:0.3},scene)
    }
    const mat = new BABYLON.PBRMaterial('pm'+id,scene)
    mat.emissiveColor = new BABYLON.Color3(0.8,0.9,1)
    mat.albedoColor = new BABYLON.Color3(0.5,0.8,1)
    mat.metallic = 1; mat.roughness = 0
    mesh.material = mat
    mesh.position = new BABYLON.Vector3(0,0,0)
    particlesRef.current.push({
      id, mesh, velocity: 2+Math.random()*1.5,
      shape, angle, active: true,
      hitRings: new Set(), noteIdx: noteIdxRef.current++
    })
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    let engine: any
    const init = async () => {
      const BABYLON = await import('babylonjs')
      ;(window as any).__BABYLON__ = BABYLON
      const canvas = canvasRef.current!
      engine = new BABYLON.Engine(canvas,true)
      engineRef.current = engine
      const scene = new BABYLON.Scene(engine)
      sceneRef.current = scene
      scene.clearColor = new BABYLON.Color4(0,0,0.05,1)
      const cam = new BABYLON.ArcRotateCamera('c',-Math.PI/2,Math.PI/2.5,18,BABYLON.Vector3.Zero(),scene)
      cam.lowerRadiusLimit=8; cam.upperRadiusLimit=30
      cam.attachControl(canvas,true)
      const hemi = new BABYLON.HemisphericLight('h',new BABYLON.Vector3(0,1,0),scene)
      hemi.intensity=0.2

      const rings = RINGS.map((r,i)=>{
        const torus = BABYLON.MeshBuilder.CreateTorus('ring'+i,{diameter:r.radius*2,thickness:0.06,tessellation:64},scene)
        const mat = new BABYLON.PBRMaterial('rm'+i,scene)
        mat.albedoColor=BABYLON.Color3.FromHexString(r.color)
        mat.emissiveColor=BABYLON.Color3.FromHexString(r.color).scale(0.3)
        mat.metallic=0.9; mat.roughness=0.1
        torus.material=mat; torus.rotation.x=Math.PI/2
        ringMeshesRef.current.push({torus,mat,config:r})
        return torus
      })

      const core = BABYLON.MeshBuilder.CreateSphere('core',{diameter:0.8},scene)
      const coreMat = new BABYLON.PBRMaterial('coreMat',scene)
      coreMat.albedoColor=new BABYLON.Color3(0.5,0,1)
      coreMat.emissiveColor=new BABYLON.Color3(0.3,0,0.6)
      coreMat.metallic=1; coreMat.roughness=0
      core.material=coreMat

      let t=0
      engine.runRenderLoop(()=>{
        t+=0.02
        const pulse=1+Math.sin(t*3)*0.15
        core.scaling=new BABYLON.Vector3(pulse,pulse,pulse)
        coreMat.emissiveColor=new BABYLON.Color3(0.3+Math.sin(t)*0.1,0,0.6+Math.cos(t)*0.1)
        rings.forEach((r,i)=>{ r.rotation.y+=0.002*(i%2===0?1:-1) })

        particlesRef.current.forEach(p=>{
          if(!p.active) return
          const speed=p.velocity*0.016
          p.mesh.position.x+=Math.cos(p.angle)*speed
          p.mesh.position.z+=Math.sin(p.angle)*speed
          p.mesh.rotation.y+=0.05; p.mesh.rotation.x+=0.03
          const dist=Math.sqrt(p.mesh.position.x**2+p.mesh.position.z**2)
          RINGS.forEach((ring,ri)=>{
            if(p.hitRings.has(ri)) return
            if(Math.abs(dist-ring.radius)<0.3){
              p.hitRings.add(ri)
              playSound(ri, p.noteIdx, scale as keyof typeof SCALES)
              const rm=ringMeshesRef.current[ri]
              if(rm){ rm.mat.emissiveColor=BABYLON.Color3.FromHexString(ring.color).scale(2); setTimeout(()=>{ rm.mat.emissiveColor=BABYLON.Color3.FromHexString(ring.color).scale(0.3) },150) }
              p.mesh.material.emissiveColor=BABYLON.Color3.FromHexString(ring.color)
              setTimeout(()=>{ if(p.mesh.material) p.mesh.material.emissiveColor=new BABYLON.Color3(0.8,0.9,1) },100)
            }
          })
          if(dist>12){ p.mesh.dispose(); p.active=false }
        })
        particlesRef.current=particlesRef.current.filter(p=>p.active)
        scene.render()
      })
      window.addEventListener('resize',()=>engine.resize())
    }
    init().catch(console.error)
    return ()=>{ engine?.dispose(); if(intervalRef.current) clearInterval(intervalRef.current) }
  }, [playSound, scale])

  const togglePlay = async () => {
    await initTone()
    if(playing){
      if(intervalRef.current) clearInterval(intervalRef.current)
      setPlaying(false)
    } else {
      const interval=(60/bpm)*1000/2
      intervalRef.current=setInterval(()=>spawnParticle(selectedShape),interval)
      setPlaying(true)
    }
  }

  return (
    <div style={{position:'relative',width:'100vw',height:'100vh',background:'#00000d',overflow:'hidden'}}>
      <canvas ref={canvasRef} style={{width:'100%',height:'100%',display:'block'}} onClick={async()=>{ await initTone(); spawnParticle(selectedShape) }}/>
      <div style={{position:'absolute',top:20,left:28,pointerEvents:'none'}}>
        <div style={{fontFamily:'"Space Mono",monospace',fontSize:9,color:'rgba(0,212,255,0.4)',letterSpacing:'0.2em',marginBottom:4}}>// NEOPROXY · DJ MODULE</div>
        <div style={{fontFamily:'"Space Mono",monospace',fontSize:22,fontWeight:700,color:'#fff',letterSpacing:'0.1em'}}>GEO<span style={{color:'#b400ff'}}>SYNC</span></div>
      </div>
      <div style={{position:'absolute',top:20,right:28,display:'flex',flexDirection:'column',gap:6}}>
        {RINGS.map(r=>(
          <div key={r.label} style={{display:'flex',alignItems:'center',gap:8,fontFamily:'"JetBrains Mono",monospace',fontSize:10}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:activeRings.includes(r.label)?r.color:'transparent',border:`1px solid ${r.color}`,boxShadow:activeRings.includes(r.label)?`0 0 8px ${r.color}`:'none',transition:'all 0.1s'}}/>
            <span style={{color:activeRings.includes(r.label)?r.color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em'}}>{r.label}</span>
          </div>
        ))}
      </div>
      <div style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',gap:12,background:'rgba(0,0,0,0.85)',border:'1px solid rgba(0,212,255,0.2)',padding:'12px 20px',fontFamily:'"Space Mono",monospace',flexWrap:'wrap',justifyContent:'center'}}>
        <button onClick={togglePlay} style={{background:playing?'rgba(180,0,255,0.2)':'rgba(0,212,255,0.1)',border:`1px solid ${playing?'#b400ff':'#00d4ff'}`,color:playing?'#b400ff':'#00d4ff',fontFamily:'"Space Mono",monospace',fontSize:10,letterSpacing:'0.1em',padding:'8px 16px',cursor:'pointer'}}>
          {playing?'■ STOP':'▶ PLAY'}
        </button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:9,color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em'}}>BPM</span>
          <input type="range" min={60} max={200} value={bpm} onChange={e=>{setBpm(Number(e.target.value));if(playing&&intervalRef.current){clearInterval(intervalRef.current);intervalRef.current=setInterval(()=>spawnParticle(selectedShape),(60/Number(e.target.value))*1000/2)}}} style={{width:80,accentColor:'#00d4ff'}}/>
          <span style={{fontSize:10,color:'#00d4ff',minWidth:28}}>{bpm}</span>
        </div>
        <div style={{display:'flex',gap:4}}>
          {(Object.keys(SCALES) as (keyof typeof SCALES)[]).map(s=>(
            <button key={s} onClick={()=>setScale(s)} style={{background:scale===s?'rgba(180,0,255,0.15)':'transparent',border:`1px solid ${scale===s?'#b400ff':'rgba(255,255,255,0.15)'}`,color:scale===s?'#b400ff':'rgba(255,255,255,0.3)',fontFamily:'"Space Mono",monospace',fontSize:8,padding:'6px 8px',cursor:'pointer',letterSpacing:'0.05em'}}>
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:4}}>
          {SHAPES.map(sh=>(
            <button key={sh} onClick={()=>setSelectedShape(sh)} style={{background:selectedShape===sh?'rgba(0,212,255,0.15)':'transparent',border:`1px solid ${selectedShape===sh?'#00d4ff':'rgba(0,212,255,0.2)'}`,color:selectedShape===sh?'#00d4ff':'rgba(255,255,255,0.3)',fontFamily:'"Space Mono",monospace',fontSize:8,padding:'6px 8px',cursor:'pointer'}}>
              {sh.toUpperCase()}
            </button>
          ))}
        </div>
        <span style={{fontSize:8,color:'rgba(255,255,255,0.2)',letterSpacing:'0.08em'}}>CLICK TO SPAWN</span>
      </div>
    </div>
  )
}
