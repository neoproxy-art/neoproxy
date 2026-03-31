"use client";

import { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';

interface RingParams {
  diam: number;
  width: number;
  thick: number;
  spikes: boolean;
  sc: number;
  sh: number;
  waves: boolean;
  wf: number;
  wa: number;
  voro: boolean;
  vi: number;
  cuts: boolean;
  cn: number;
  seed: number;
}

export default function RingGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState<RingParams>({
    diam: 18.2,
    width: 8.0,
    thick: 2.0,
    spikes: true,
    sc: 12,
    sh: 1.5,
    waves: true,
    wf: 3,
    wa: 0.6,
    voro: true,
    vi: 0.4,
    cuts: true,
    cn: 5,
    seed: 12345
  });

  const mkRand = (seed: number) => {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  };

  const buildRingGeometry = (params: RingParams) => {
    const SEG = 96;
    const RINGS = 48;
    const rand = mkRand(params.seed);
    const R = params.diam / 2;
    const T = params.thick;
    const W = params.width;
    const SC = 0.1;

    const vpts = [];
    for (let i = 0; i < 16; i++) {
      vpts.push([rand() * Math.PI * 2, (rand() - 0.5) * W]);
    }

    const cuts = [];
    for (let i = 0; i < params.cn; i++) {
      cuts.push({
        a: rand() * Math.PI * 2,
        y: (rand() - 0.5) * W,
        aw: 0.08 + rand() * 0.25,
        yh: 0.4 + rand() * W * 0.35,
        d: (0.4 + rand() * 1.2) * T
      });
    }

    const pos: number[] = [];
    const idx: number[] = [];
    const stride = SEG + 1;

    for (let outer = 1; outer >= 0; outer--) {
      const off = (outer ? 0 : 1) * (RINGS + 1) * stride;
      for (let j = 0; j <= RINGS; j++) {
        const yv = ((j / RINGS) - 0.5) * W * SC;
        for (let i = 0; i <= SEG; i++) {
          const angle = (i / SEG) * Math.PI * 2;
          let r = outer ? (R + T) * SC : R * SC;

          if (outer) {
            if (params.spikes) {
              const sp = Math.max(0, Math.sin(angle * params.sc));
              const ye = Math.pow(Math.cos((j / RINGS - 0.5) * Math.PI), 2);
              r += Math.pow(sp, 3) * params.sh * SC * ye * (0.7 + rand() * 0.3);
            }
            if (params.waves) {
              r += Math.sin(angle * params.wf) * params.wa * SC;
              r += Math.sin((j / RINGS) * Math.PI * 4 + angle * 1.5) * params.wa * 0.3 * SC;
            }
            if (params.voro) {
              let mn = 1e9;
              for (const p of vpts) {
                const da = angle - p[0];
                const dy = yv - p[1];
                mn = Math.min(mn, Math.sqrt(da * da + dy * dy));
              }
              const vn = Math.min(mn / 1.5, 1);
              r += (0.5 - vn) * params.vi * SC;
            }
            if (params.cuts) {
              for (const c of cuts) {
                const ad = Math.abs(((angle - c.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
                const yd = Math.abs(yv / SC - c.y);
                if (ad < c.aw && yd < c.yh) {
                  r += c.d * SC * (1 - ad / c.aw) * (1 - yd / c.yh) * 0.5;
                }
              }
            }
          }

          pos.push(Math.cos(angle) * r, yv, Math.sin(angle) * r);
        }
      }
    }

    // Build indices
    const innerOff = (RINGS + 1) * stride;

    // Outer faces
    for (let j = 0; j < RINGS; j++) {
      for (let i = 0; i < SEG; i++) {
        const a = j * stride + i;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        idx.push(a, b, d, a, d, c);
      }
    }

    // Inner faces reversed
    for (let j = 0; j < RINGS; j++) {
      for (let i = 0; i < SEG; i++) {
        const a = innerOff + j * stride + i;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        idx.push(a, d, b, a, c, d);
      }
    }

    // Top cap
    for (let i = 0; i < SEG; i++) {
      idx.push(i, innerOff + i, i + 1, i + 1, innerOff + i, innerOff + i + 1);
    }

    // Bottom cap
    const bot = RINGS * stride;
    for (let i = 0; i < SEG; i++) {
      const o = bot + i;
      const o2 = bot + i + 1;
      const inn = innerOff + bot + i;
      const inn2 = innerOff + bot + i + 1;
      idx.push(o, o2, inn, o2, inn2, inn);
    }

    return { positions: new Float32Array(pos), indices: new Uint32Array(idx) };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromHexString("#030308FF");

    // Camera
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 3,
      15,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // Lighting
    new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    const d1 = new BABYLON.DirectionalLight("d1", new BABYLON.Vector3(-2, 3, 2), scene);
    d1.diffuse = BABYLON.Color3.FromHexString("#b400ff");
    d1.intensity = 2.5;
    const d2 = new BABYLON.DirectionalLight("d2", new BABYLON.Vector3(2, -1, -2), scene);
    d2.diffuse = BABYLON.Color3.FromHexString("#00ff9d");
    d2.intensity = 1;
    const d3 = new BABYLON.PointLight("d3", new BABYLON.Vector3(0, 4, 0), scene);
    d3.diffuse = BABYLON.Color3.FromHexString("#00d4ff");
    d3.intensity = 1.5;

    // Material
    const mat = new BABYLON.StandardMaterial("ringMat", scene);
    mat.diffuseColor = BABYLON.Color3.FromHexString("#0a0015");
    mat.emissiveColor = BABYLON.Color3.FromHexString("#1a0040");
    mat.emissiveIntensity = 0.5;
    mat.metalness = 0.05;
    mat.roughness = 0.2;
    mat.backFaceCulling = false;

    let mesh: BABYLON.Mesh | null = null;

    const updateMesh = () => {
      if (mesh) {
        scene.removeMesh(mesh);
        mesh.dispose();
      }

      const geo = buildRingGeometry(params);
      const geometry = new BABYLON.Mesh("ring", scene);
      
      const vertexData = new BABYLON.VertexData();
      vertexData.positions = Array.from(geo.positions);
      vertexData.indices = Array.from(geo.indices);
      vertexData.applyToMesh(geometry);

      geometry.material = mat;
      mesh = geometry;
    };

    updateMesh();

    engine.runRenderLoop(() => {
      if (mesh) {
        mesh.rotation.y += 0.005;
      }
      scene.render();
    });

    const resize = () => engine.resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      engine.dispose();
    };
  }, [params]);

  const exportSTL = () => {
    const geo = buildRingGeometry(params);
    const pos = geo.positions;
    const idx = geo.indices;
    const MM = 10;
    
    let stl = 'solid neoproxy_ring\n';
    for (let i = 0; i < idx.length; i += 3) {
      const i0 = idx[i] * 3;
      const i1 = idx[i + 1] * 3;
      const i2 = idx[i + 2] * 3;
      
      const ax = pos[i0] * MM, ay = pos[i0 + 1] * MM, az = pos[i0 + 2] * MM;
      const bx = pos[i1] * MM, by = pos[i1 + 1] * MM, bz = pos[i1 + 2] * MM;
      const cx = pos[i2] * MM, cy = pos[i2 + 1] * MM, cz = pos[i2 + 2] * MM;
      
      const ux = bx - ax, uy = by - ay, uz = bz - az;
      const vx = cx - ax, vy = cy - ay, vz = cz - az;
      
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= l; ny /= l; nz /= l;
      
      stl += `  facet normal ${nx.toFixed(6)} ${ny.toFixed(6)} ${nz.toFixed(6)}\n    outer loop\n`;
      stl += `      vertex ${ax.toFixed(4)} ${ay.toFixed(4)} ${az.toFixed(4)}\n`;
      stl += `      vertex ${bx.toFixed(4)} ${by.toFixed(4)} ${bz.toFixed(4)}\n`;
      stl += `      vertex ${cx.toFixed(4)} ${cy.toFixed(4)} ${cz.toFixed(4)}\n`;
      stl += `    endloop\n  endfacet\n`;
    }
    stl += 'endsolid neoproxy_ring\n';
    
    const blob = new Blob([stl], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NP_ring_seed${params.seed}_d${params.diam.toFixed(1)}mm.stl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newSeed = () => {
    setParams(prev => ({ ...prev, seed: Math.floor(Math.random() * 99999) }));
  };

  return (
    <div className="relative w-full h-screen bg-[#030308]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-8 border-b border-white/10 flex items-center justify-between px-6 z-10 text-[11px] font-mono tracking-widest text-[#cccccc] uppercase">
        <span>NEOPROXY // RING_GENERATOR v0.2</span>
        <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_10px_rgba(0,255,157,0.7)]" />
      </div>

      <div className="flex h-full pt-8">
        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full outline-none touch-none"
          />
        </div>

        {/* Control Panel */}
        <div className="w-80 bg-[#07070f] border-l border-[#12122a] overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Dimensions */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">DIMENSIONES</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] text-[#7777aa]">DIÁMETRO INTERIOR</span>
                    <span className="text-[8px] text-[#00ff9d]">{params.diam.toFixed(1)}mm</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="22"
                    step="0.1"
                    value={params.diam}
                    onChange={(e) => setParams(prev => ({ ...prev, diam: parseFloat(e.target.value) }))}
                    className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #b400ff 0%, #b400ff ${((params.diam - 14) / 8) * 100}%, #1a1a2e ${((params.diam - 14) / 8) * 100}%, #1a1a2e 100%)`
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] text-[#7777aa]">ANCHO</span>
                    <span className="text-[8px] text-[#00ff9d]">{params.width.toFixed(1)}mm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.5"
                    value={params.width}
                    onChange={(e) => setParams(prev => ({ ...prev, width: parseFloat(e.target.value) }))}
                    className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] text-[#7777aa]">GROSOR PARED</span>
                    <span className="text-[8px] text-[#00ff9d]">{params.thick.toFixed(1)}mm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={params.thick}
                    onChange={(e) => setParams(prev => ({ ...prev, thick: parseFloat(e.target.value) }))}
                    className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Spikes */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">SPIKES</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-[#7777aa]">ACTIVO</span>
                  <button
                    onClick={() => setParams(prev => ({ ...prev, spikes: !prev.spikes }))}
                    className={`w-[26px] h-[13px] relative transition-colors ${params.spikes ? 'bg-[#0a001a] border-[#b400ff]' : 'bg-[#1a1a2e] border-[#2a2a4e]'} border rounded`}
                  >
                    <div className={`absolute w-[7px] h-[7px] top-[2px] transition-transform ${params.spikes ? 'translate-x-[13px] bg-[#b400ff]' : 'left-[2px] bg-[#333]'}`} />
                  </button>
                </div>
                
                {params.spikes && (
                  <>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] text-[#7777aa]">CANTIDAD</span>
                        <span className="text-[8px] text-[#00ff9d]">{params.sc}</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="32"
                        step="1"
                        value={params.sc}
                        onChange={(e) => setParams(prev => ({ ...prev, sc: parseInt(e.target.value) }))}
                        className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] text-[#7777aa]">ALTURA</span>
                        <span className="text-[8px] text-[#00ff9d]">{params.sh.toFixed(1)}mm</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="4"
                        step="0.1"
                        value={params.sh}
                        onChange={(e) => setParams(prev => ({ ...prev, sh: parseFloat(e.target.value) }))}
                        className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Waves */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">ONDAS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-[#7777aa]">ACTIVO</span>
                  <button
                    onClick={() => setParams(prev => ({ ...prev, waves: !prev.waves }))}
                    className={`w-[26px] h-[13px] relative transition-colors ${params.waves ? 'bg-[#0a001a] border-[#b400ff]' : 'bg-[#1a1a2e] border-[#2a2a4e]'} border rounded`}
                  >
                    <div className={`absolute w-[7px] h-[7px] top-[2px] transition-transform ${params.waves ? 'translate-x-[13px] bg-[#b400ff]' : 'left-[2px] bg-[#333]'}`} />
                  </button>
                </div>
                
                {params.waves && (
                  <>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] text-[#7777aa]">FRECUENCIA</span>
                        <span className="text-[8px] text-[#00ff9d]">{params.wf}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="1"
                        value={params.wf}
                        onChange={(e) => setParams(prev => ({ ...prev, wf: parseInt(e.target.value) }))}
                        className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] text-[#7777aa]">AMPLITUD</span>
                        <span className="text-[8px] text-[#00ff9d]">{params.wa.toFixed(2)}mm</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.05"
                        value={params.wa}
                        onChange={(e) => setParams(prev => ({ ...prev, wa: parseFloat(e.target.value) }))}
                        className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Voronoi */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">VORONOI NOISE</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-[#7777aa]">ACTIVO</span>
                  <button
                    onClick={() => setParams(prev => ({ ...prev, voro: !prev.voro }))}
                    className={`w-[26px] h-[13px] relative transition-colors ${params.voro ? 'bg-[#0a001a] border-[#b400ff]' : 'bg-[#1a1a2e] border-[#2a2a4e]'} border rounded`}
                  >
                    <div className={`absolute w-[7px] h-[7px] top-[2px] transition-transform ${params.voro ? 'translate-x-[13px] bg-[#b400ff]' : 'left-[2px] bg-[#333]'}`} />
                  </button>
                </div>
                
                {params.voro && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[8px] text-[#7777aa]">INTENSIDAD</span>
                      <span className="text-[8px] text-[#00ff9d]">{params.vi.toFixed(2)}mm</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={params.vi}
                      onChange={(e) => setParams(prev => ({ ...prev, vi: parseFloat(e.target.value) }))}
                      className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Cuts */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">CORTES GLITCH</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-[#7777aa]">ACTIVO</span>
                  <button
                    onClick={() => setParams(prev => ({ ...prev, cuts: !prev.cuts }))}
                    className={`w-[26px] h-[13px] relative transition-colors ${params.cuts ? 'bg-[#0a001a] border-[#b400ff]' : 'bg-[#1a1a2e] border-[#2a2a4e]'} border rounded`}
                  >
                    <div className={`absolute w-[7px] h-[7px] top-[2px] transition-transform ${params.cuts ? 'translate-x-[13px] bg-[#b400ff]' : 'left-[2px] bg-[#333]'}`} />
                  </button>
                </div>
                
                {params.cuts && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[8px] text-[#7777aa]">CANTIDAD</span>
                      <span className="text-[8px] text-[#00ff9d]">{params.cn}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={params.cn}
                      onChange={(e) => setParams(prev => ({ ...prev, cn: parseInt(e.target.value) }))}
                      className="w-full h-[2px] bg-[#1a1a2e] outline-none border-none appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Seed */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">SEED GENERATIVO</h3>
              <button
                onClick={newSeed}
                className="w-full py-[9px] font-mono text-[9px] tracking-[0.25em] text-uppercase border border-[#b400ff] text-[#b400ff] bg-transparent cursor-pointer transition-all mb-2 hover:bg-[rgba(180,0,255,0.12)]"
              >
                ⟳ NUEVO SEED
              </button>
              <div className="text-[8px] text-[#333355] text-center">
                SEED: <span className="text-[#00ff9d]">{String(params.seed).padStart(5, '0')}</span>
              </div>
            </div>

            {/* Export */}
            <div>
              <h3 className="text-[8px] font-mono tracking-[0.3em] text-[#333355] mb-3">EXPORTAR</h3>
              <button
                onClick={exportSTL}
                className="w-full py-[9px] font-mono text-[9px] tracking-[0.25em] text-uppercase border border-[#ff9500] text-[#ff9500] bg-transparent cursor-pointer transition-all hover:bg-[rgba(255,149,0,0.08)]"
              >
                ↓ EXPORTAR STL
              </button>
              <div className="text-[8px] text-[#333355] leading-[1.7] mt-2">
                STL 1:1 en milímetros.<br/>
                Compatible Chitubox / Lychee.<br/>
                Resina: ABS-Like.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-white/10 flex items-center justify-between px-6 z-10 text-[11px] font-mono text-[#cccccc]">
        <span>Status: <span className="text-[#00ff9d]">ACTIVE</span></span>
        <span>Seed: <span className="text-[#b400ff]">{params.seed}</span></span>
      </div>
    </div>
  );
}
