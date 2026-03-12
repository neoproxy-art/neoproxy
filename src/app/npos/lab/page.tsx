"use client";

import { useEffect, useRef } from 'react'
import * as BABYLON from 'babylonjs'
import Link from 'next/link'

// PRNG Mulberry32
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const attractors: Record<string, {
  name: string
  equations: string
  params: Record<string, number> | null
  init: (rand: () => number) => Record<string, number>
  step: (p: Record<string, number>, rand: () => number, state: Record<string, number>) => { x: number; y: number; z: number }
}> = {
  lorenz: {
    name: 'Lorenz',
    equations: 'dx/dt = σ(y−x)\ndy/dt = x(ρ−z)−y\ndz/dt = xy−βz',
    params: { sigma: 10, rho: 28, beta: 8 / 3, dt: 0.005 },
    init: () => ({ x: 0.1, y: 0, z: 0 }),
    step: (p, _, s) => {
      const dx = p.sigma * (s.y - s.x)
      const dy = s.x * (p.rho - s.z) - s.y
      const dz = s.x * s.y - p.beta * s.z
      return { x: s.x + dx * p.dt, y: s.y + dy * p.dt, z: s.z + dz * p.dt }
    },
  },
  thomas: {
    name: 'Thomas',
    equations: 'dx/dt = sin(y)−bx\ndy/dt = sin(z)−by\ndz/dt = sin(x)−bz',
    params: { b: 0.208, dt: 0.05 },
    init: () => ({ x: 0.1, y: 0, z: 0 }),
    step: (p, _, s) => ({
      x: s.x + (Math.sin(s.y) - p.b * s.x) * p.dt,
      y: s.y + (Math.sin(s.z) - p.b * s.y) * p.dt,
      z: s.z + (Math.sin(s.x) - p.b * s.z) * p.dt,
    }),
  },
  rossler: {
    name: 'Rössler',
    equations: 'dx/dt = −y−z\ndy/dt = x+ay\ndz/dt = b+z(x−c)',
    params: { a: 0.2, b: 0.2, c: 5.7, dt: 0.01 },
    init: () => ({ x: 0.1, y: 0, z: 0 }),
    step: (p, _, s) => ({
      x: s.x + (-s.y - s.z) * p.dt,
      y: s.y + (s.x + p.a * s.y) * p.dt,
      z: s.z + (p.b + s.z * (s.x - p.c)) * p.dt,
    }),
  },
}

export default function GenerativeLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<BABYLON.Engine | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new BABYLON.Engine(canvasRef.current, true)
    engineRef.current = engine
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0.03, 0.04, 0.055, 1)

    const camera = new BABYLON.ArcRotateCamera('cam', Math.PI / 4, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvasRef.current, true)
    camera.wheelPrecision = 50
    camera.minZ = 0.1

    const hemi = new BABYLON.HemisphericLight('h', new BABYLON.Vector3(0, 1, 0), scene)
    hemi.intensity = 0.4
    const d1 = new BABYLON.DirectionalLight('d1', new BABYLON.Vector3(-1, -2, -1), scene)
    d1.diffuse = BABYLON.Color3.FromHexString('#c8f5a0')
    d1.intensity = 0.8
    const d2 = new BABYLON.DirectionalLight('d2', new BABYLON.Vector3(1, 0, 1), scene)
    d2.diffuse = BABYLON.Color3.FromHexString('#5ef0c0')
    d2.intensity = 0.6
    const gl = new BABYLON.GlowLayer('glow', scene)
    gl.intensity = 0.6

    // Generate Lorenz attractor on load
    const rand = mulberry32(42)
    const algo = attractors.lorenz
    let state = algo.init(rand)
    const p = algo.params!
    for (let i = 0; i < 500; i++) { state = algo.step(p, rand, state) as typeof state }
    const raw: {x:number,y:number,z:number}[] = []
    for (let i = 0; i < 50000; i++) {
      state = algo.step(p, rand, state) as typeof state
      if (i % 3 === 0) raw.push({ x: state.x, y: state.y, z: state.z })
    }
    let cx = 0, cy = 0, cz = 0
    for (const pt of raw) { cx += pt.x; cy += pt.y; cz += pt.z }
    cx /= raw.length; cy /= raw.length; cz /= raw.length
    const pts = raw.map(pt => new BABYLON.Vector3((pt.x - cx) * 0.1, (pt.y - cy) * 0.1, (pt.z - cz) * 0.1))

    const mat = new BABYLON.StandardMaterial('m', scene)
    mat.diffuseColor = BABYLON.Color3.FromHexString('#222222')
    mat.emissiveColor = BABYLON.Color3.FromHexString('#061208')
    mat.specularColor = BABYLON.Color3.FromHexString('#c8f5a0')
    mat.specularPower = 32

    for (let i = 0; i < pts.length; i += 150) {
      const chunk = pts.slice(i, Math.min(i + 152, pts.length))
      if (chunk.length < 2) continue
      const tube = BABYLON.MeshBuilder.CreateTube('t' + i, { path: chunk, radius: 0.06, tessellation: 5, cap: BABYLON.Mesh.CAP_ALL }, scene)
      tube.material = mat
    }

    engine.runRenderLoop(() => scene.render())
    const resize = () => engine.resize()
    window.addEventListener('resize', resize)

    return () => { engine.dispose(); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1 }}>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 10, fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#cccccc' }}>
        <span>NeoProxy Specimen Lab <span style={{ color: '#4a6080' }}>//</span> Generative Sculpture Engine</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/npos" style={{ color: '#4a6080', textDecoration: 'none', fontSize: '10px' }}>← OS</Link>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8f5a0', boxShadow: '0 0 8px rgba(200,245,160,0.8)', animation: 'pulse 2s infinite' }} />
        </div>
      </div>

      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', outline: 'none', touchAction: 'none' }} />

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 10, fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#cccccc' }}>
        <span>Status: <span style={{ color: '#c8f5a0' }}>Resonant</span></span>
        <span>Lorenz | Seed: 42</span>
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(200,245,160,0.7); }
          70% { box-shadow: 0 0 0 6px rgba(200,245,160,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,245,160,0); }
        }
      `}</style>
    </div>
  )
}
