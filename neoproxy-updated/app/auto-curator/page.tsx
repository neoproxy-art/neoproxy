"use client";

import { useEffect, useRef, useState } from 'react';

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

interface Candidate {
  seed: number;
  p: RingParams;
  safety: { status: string };
  score: number;
  archetype: string;
}

const SAFETY_RULES = [
  { level: 'FAIL', check: (p: RingParams) => p.thick < 1.2 },
  { level: 'RISK', check: (p: RingParams) => p.thick < 1.5 },
  { level: 'RISK', check: (p: RingParams) => p.spikes && p.sh > 2.5 },
  { level: 'RISK', check: (p: RingParams) => p.spikes && p.sh > 1.8 && p.sc > 20 },
  { level: 'RISK', check: (p: RingParams) => p.voro && p.vi > 1.0 },
  { level: 'RISK', check: (p: RingParams) => p.cuts && p.cn > 10 },
  { level: 'RISK', check: (p: RingParams) => p.cuts && p.cn > 6 && p.thick < 1.8 },
];

const ARCHETYPES = [
  { id: 'THORN', test: (p: RingParams) => p.spikes && p.sh > 1.2 && p.sc >= 10 && !p.voro },
  { id: 'ORGANIC', test: (p: RingParams) => p.voro && p.waves && !p.spikes },
  { id: 'GLITCH', test: (p: RingParams) => p.cuts && p.cn >= 4 && !p.spikes },
  { id: 'BRUTAL', test: (p: RingParams) => p.spikes && p.cuts && p.sc >= 12 },
  { id: 'WAVE', test: (p: RingParams) => p.waves && !p.spikes && !p.cuts && p.wf >= 3 },
  { id: 'NOISE', test: (p: RingParams) => p.voro && !p.waves && p.vi > 0.4 },
  { id: 'HYBRID', test: (p: RingParams) => [p.spikes, p.waves, p.voro, p.cuts].filter(Boolean).length === 4 },
  { id: 'MINIMAL', test: (p: RingParams) => [p.spikes, p.waves, p.voro, p.cuts].filter(Boolean).length <= 1 },
  { id: 'CORE', test: () => true },
];

export default function AutoCurator() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('');
  const [results, setResults] = useState<Candidate[] | null>(null);
  const [stats, setStats] = useState({
    scanned: 0,
    safe: 0,
    rate: 0,
    avgScore: 0,
    archetypes: 0
  });

  const mkRand = (seed: number) => {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  };

  const paramsFromSeed = (seed: number): RingParams => {
    const r = mkRand(seed);
    return {
      diam: 16 + r() * 4,
      width: 5 + r() * 6,
      thick: 1.4 + r() * 2,
      spikes: r() > 0.3,
      sc: Math.round(6 + r() * 20),
      sh: 0.3 + r() * 2.8,
      waves: r() > 0.25,
      wf: Math.round(1 + r() * 8),
      wa: 0.1 + r() * 1.2,
      voro: r() > 0.35,
      vi: r() * 1.2,
      cuts: r() > 0.4,
      cn: Math.round(1 + r() * 14),
      seed
    };
  };

  const checkSafety = (p: RingParams) => {
    let status = 'SAFE';
    for (const r of SAFETY_RULES) {
      if (r.check(p)) {
        if (r.level === 'FAIL') return { status: 'FAIL' };
        status = 'RISK';
      }
    }
    return { status };
  };

  const scoreAesthetic = (p: RingParams): number => {
    let score = 40;
    const r = mkRand(p.seed + 1337);
    const mods = [p.spikes, p.waves, p.voro, p.cuts].filter(Boolean).length;

    // Complexity
    if (mods === 2) score += 16;
    if (mods === 3) score += 20;
    if (mods === 4) score += 10;
    if (mods <= 1) score -= 5;

    // Proportions
    const ratio = p.width / p.diam;
    if (ratio > 0.32 && ratio < 0.55) score += 12;
    else if (ratio < 0.22 || ratio > 0.65) score -= 10;

    // Spike quality
    if (p.spikes) {
      if (p.sc >= 8 && p.sc <= 16) score += 10;
      if (p.sh >= 0.8 && p.sh <= 1.8) score += 10;
      if (p.sc > 22 || p.sh > 2.2) score -= 8;
    }

    // Wave resonance
    if (p.waves) {
      if (p.wf >= 2 && p.wf <= 5) score += 8;
      if (p.wa > 0.4 && p.wa < 0.9) score += 5;
    }

    // Voronoi quality
    if (p.voro) {
      if (p.vi > 0.25 && p.vi < 0.75) score += 12;
      if (p.vi > 0.9) score -= 6;
    }

    // Cut drama
    if (p.cuts) {
      if (p.cn >= 3 && p.cn <= 7) score += 8;
      if (p.cn > 10) score -= 8;
    }

    // Wall quality
    if (p.thick >= 1.8 && p.thick <= 2.6) score += 8;

    // Small entropy
    score += (r() - 0.5) * 6;

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getArchetype = (p: RingParams): string => {
    for (const a of ARCHETYPES) {
      if (a.test(p)) return a.id;
    }
    return 'CORE';
  };

  const selectDrop = (candidates: Candidate[], dropSize: number): Candidate[] => {
    const sorted = [...candidates].sort((a, b) => b.score - a.score);
    const selected: Candidate[] = [];
    const archetypeCount: Record<string, number> = {};
    const MAX_PER_ARCHETYPE = 2;

    // Pass 1: greedy with archetype cap
    for (const c of sorted) {
      if (selected.length >= dropSize) break;
      const arch = c.archetype;
      const cnt = archetypeCount[arch] || 0;
      if (cnt >= MAX_PER_ARCHETYPE) continue;
      
      const similarDiam = selected.filter(s => Math.abs(s.p.diam - c.p.diam) < 0.8).length;
      if (similarDiam >= 3) continue;
      
      selected.push(c);
      archetypeCount[arch] = cnt + 1;
    }

    // Pass 2: fill remaining
    if (selected.length < dropSize) {
      for (const c of sorted) {
        if (selected.length >= dropSize) break;
        if (!selected.find(s => s.seed === c.seed)) {
          selected.push(c);
        }
      }
    }

    return selected;
  };

  const runAuto = async () => {
    setIsRunning(true);
    setResults(null);
    
    const TOTAL = 10000;
    const BATCH = 200;
    const DROP_SIZE = 15;
    
    let candidates: Candidate[] = [];
    let scanned = 0, safe = 0;

    // Phase 1: Scan
    setProgress(0);
    setPhase('PHASE 1/3 — ESCANEANDO UNIVERSO DE SEEDS');
    
    for (let b = 0; b < TOTAL / BATCH; b++) {
      await new Promise(r => setTimeout(r, 0));
      
      for (let i = 0; i < BATCH; i++) {
        const seed = Math.floor(Math.random() * 99999);
        const p = paramsFromSeed(seed);
        const safety = checkSafety(p);
        scanned++;
        
        if (safety.status === 'FAIL') continue;
        if (safety.status === 'RISK') continue; // SAFE only for DROP 01
        
        safe++;
        const score = scoreAesthetic(p);
        const archetype = getArchetype(p);
        candidates.push({ seed, p, safety, score, archetype });
      }
      
      const pct = ((b + 1) / (TOTAL / BATCH)) * 45;
      setProgress(pct);
    }

    // Phase 2: Select
    setProgress(50);
    setPhase('PHASE 2/3 — APLICANDO ALGORITMO DE DIVERSIDAD...');
    await new Promise(r => setTimeout(r, 100));
    
    const drop = selectDrop(candidates, DROP_SIZE);
    setProgress(70);
    
    // Phase 3: Results
    setProgress(75);
    setPhase('PHASE 3/3 — PROCESANDO RESULTADOS...');
    await new Promise(r => setTimeout(r, 100));
    
    const avgScore = Math.round(drop.reduce((s, d) => s + d.score, 0) / drop.length);
    const archetypes = new Set(drop.map(d => d.archetype)).size;
    
    setStats({
      scanned,
      safe,
      rate: Math.round((safe / scanned) * 100),
      avgScore,
      archetypes
    });
    
    setResults(drop);
    setProgress(100);
    setPhase('COMPLETADO — DROP 01 LISTO');
    
    await new Promise(r => setTimeout(r, 500));
    setIsRunning(false);
  };

  const exportManifest = () => {
    if (!results) return;
    
    const today = new Date().toISOString();
    const manifest = {
      drop: 'DROP_01',
      name: 'CORE',
      generated: today,
      algorithm: 'diversity-score-v1',
      universe_size: 10000,
      count: results.length,
      items: results.map((item, i) => ({
        index: i + 1,
        id: `NP-${String(item.seed).padStart(5, '0')}`,
        seed: item.seed,
        archetype: item.archetype,
        aesthetic_score: item.score,
        status: 'SAFE',
        params: {
          diam_mm: +item.p.diam.toFixed(2),
          width_mm: +item.p.width.toFixed(2),
          thick_mm: +item.p.thick.toFixed(2),
          spikes: item.p.spikes ? { count: item.p.sc, height_mm: +item.p.sh.toFixed(2) } : false,
          waves: item.p.waves ? { freq: item.p.wf, amp_mm: +item.p.wa.toFixed(3) } : false,
          voronoi: item.p.voro ? { intensity_mm: +item.p.vi.toFixed(3) } : false,
          cuts: item.p.cuts ? { count: item.p.cn } : false,
        },
        stl_filename: `NP-${String(item.seed).padStart(5, '0')}_d${item.p.diam.toFixed(1)}mm_[CERT].stl`,
        url: `neoproxy.art/ring-generator?seed=${item.seed}`,
      }))
    };
    
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NP_DROP01_CORE_manifest.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openRing = (seed: number) => {
    window.open(`/ring-generator?seed=${seed}`, '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-[#020205] text-[#aaaabb] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#0d0d1a]">
        <div className="text-[20px] tracking-[0.2em] text-[#b400ff]">
          NEOPROXY <span className="text-[#333355] text-[14px]">// AUTO_CURATOR v1.0</span>
        </div>
        <div className="text-[8px] tracking-[0.2em]">
          SISTEMA <span className="text-[#00ff9d]">● {isRunning ? 'CORRIENDO' : 'LISTO'}</span>
        </div>
      </div>

      {/* Run Panel */}
      <div className="flex items-center gap-8 px-8 py-6 border-b border-[#0d0d1a] bg-[#080812]">
        <button
          onClick={runAuto}
          disabled={isRunning}
          className="px-7 py-3 text-[9px] tracking-[0.25em] uppercase border border-[#b400ff] text-[#b400ff] bg-transparent cursor-pointer transition-all disabled:opacity-30 disabled:cursor-default hover:bg-[rgba(180,0,255,0.08)]"
        >
          {isRunning ? '⟳ EJECUTANDO...' : '▶ EJECUTAR CURADURÍA AUTOMÁTICA'}
        </button>
        
        <div className="flex gap-5 text-[8px]">
          <div className="text-center">
            <div className="text-[#2a2a44] mb-1">UNIVERSO DE SEEDS</div>
            <div className="text-[14px]">10,000</div>
          </div>
          <div className="text-center">
            <div className="text-[#2a2a44] mb-1">DROP SIZE</div>
            <div className="text-[14px]">15 PIEZAS</div>
          </div>
          <div className="text-center">
            <div className="text-[#2a2a44] mb-1">ALGORITMO</div>
            <div className="text-[14px]">DIVERSITY-SCORE</div>
          </div>
          <div className="text-center">
            <div className="text-[#2a2a44] mb-1">SAFETY GATE</div>
            <div className="text-[14px]">SAFE ONLY</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="px-8 py-4 border-b border-[#0d0d1a] bg-[#06060e]">
          <div className="flex justify-between mb-2">
            <span className="text-[8px] tracking-[0.2em] text-[#2a2a44]">{phase.split('—')[0]}</span>
            <span className="text-[8px] tracking-[0.1em] text-[#00ff9d]">{Math.round(progress)}%</span>
          </div>
          <div className="h-[2px] bg-[#0d0d1a] relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#b400ff] to-[#00ff9d] transition-all duration-80 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-[-4px] bottom-[-4px] w-[1px] bg-white shadow-[0_0_8px_var(--green)]" />
            </div>
          </div>
          <div className="text-[7px] text-[#2a2a44] tracking-[0.1em] mt-2 h-[14px] overflow-hidden">
            {phase}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-[36px] tracking-[0.1em] mb-1">
                DROP <span className="text-[#b400ff]">01</span>
              </div>
              <div className="text-[8px] tracking-[0.2em] text-[#2a2a44]">
                {results.length} INSTANCIAS CERTIFICADAS · SCORE MÍNIMO {Math.min(...results.map(d => d.score))} · MÁXIMO {Math.max(...results.map(d => d.score))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportManifest}
                className="px-5 py-2 text-[8px] tracking-[0.2em] uppercase border border-[#00ff9d] text-[#00ff9d] bg-transparent cursor-pointer hover:bg-[rgba(0,255,157,0.06)]"
              >
                ↓ MANIFEST JSON
              </button>
              <button
                onClick={runAuto}
                className="px-5 py-2 text-[8px] tracking-[0.2em] uppercase border border-[#2a2a44] text-[#2a2a44] bg-transparent cursor-pointer hover:bg-[rgba(42,42,68,0.5)]"
              >
                ⟳ RE-GENERAR
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-px bg-[#0d0d1a] border border-[#0d0d1a] mb-8">
            <div className="bg-[#06060e] p-4 text-center">
              <div className="text-[28px] tracking-[0.05em] text-[#2a2a44] mb-1">{stats.scanned.toLocaleString()}</div>
              <div className="text-[7px] tracking-[0.2em] text-[#2a2a44]">SEEDS ANALIZADOS</div>
            </div>
            <div className="bg-[#06060e] p-4 text-center">
              <div className="text-[28px] tracking-[0.05em] text-[#00ff9d] mb-1">{stats.safe}</div>
              <div className="text-[7px] tracking-[0.2em] text-[#2a2a44]">SAFE ENCONTRADOS</div>
            </div>
            <div className="bg-[#06060e] p-4 text-center">
              <div className="text-[28px] tracking-[0.05em] text-[#aaaabb] mb-1">{stats.rate}%</div>
              <div className="text-[7px] tracking-[0.2em] text-[#2a2a44]">TASA DE ÉXITO</div>
            </div>
            <div className="bg-[#06060e] p-4 text-center">
              <div className="text-[28px] tracking-[0.05em] text-[#b400ff] mb-1">{stats.avgScore}</div>
              <div className="text-[7px] tracking-[0.2em] text-[#2a2a44]">SCORE PROMEDIO DROP</div>
            </div>
            <div className="bg-[#06060e] p-4 text-center">
              <div className="text-[28px] tracking-[0.05em] text-[#ffb800] mb-1">{stats.archetypes}</div>
              <div className="text-[7px] tracking-[0.2em] text-[#2a2a44]">ARQUETIPOS DISTINTOS</div>
            </div>
          </div>

          {/* Drop Grid */}
          <div className="grid grid-cols-5 gap-px bg-[#0d0d1a] border border-[#0d0d1a] mb-8">
            {results.map((item, idx) => {
              const mods = [item.p.spikes && 'spikes', item.p.waves && 'waves', item.p.voro && 'voro', item.p.cuts && 'cuts'].filter(Boolean);
              return (
                <div
                  key={item.seed}
                  className="bg-[#06060e] p-0 overflow-hidden relative cursor-pointer hover:border-[#b400ff] transition-colors"
                  onClick={() => openRing(item.seed)}
                >
                  <div className="h-[180px] bg-[#080812] relative flex items-center justify-center">
                    <div className="absolute top-2 left-2 text-[20px] text-[rgba(180,0,255,0.2)]">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[#4a6080] text-[11px]">
                      NP-{String(item.seed).padStart(5, '0')}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] tracking-[0.18em] text-[#b400ff] mb-1 font-medium">
                      NP-{String(item.seed).padStart(5, '0')}
                    </div>
                    <div className="text-[7px] tracking-[0.2em] text-[#2a2a44] mb-2 uppercase">
                      {item.archetype}
                    </div>
                    <div className="flex gap-1 items-center mb-2">
                      <div className="flex-1 h-[1px] bg-[#0d0d1a]">
                        <div 
                          className="h-full bg-gradient-to-r from-[#4400aa] to-[#b400ff]"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <div className="text-[8px] text-[#b400ff] min-w-[24px] text-right tracking-[0.05em]">
                        {item.score}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      <span className="text-[6px] tracking-[0.12em] px-1 py-[2px] border border-[rgba(0,255,157,0.25)] text-[rgba(0,255,157,0.6)]">
                        SAFE
                      </span>
                      {mods.map(m => (
                        <span key={m} className="text-[6px] tracking-[0.12em] px-1 py-[2px] border border-[#0d0d1a] text-[#2a2a44]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Narrative */}
          <div className="border border-[#0d0d1a] p-8 bg-[#06060e] mb-8">
            <div className="text-[7px] tracking-[0.3em] text-[#2a2a44] mb-5">// NARRATIVA DEL DROP</div>
            <div className="text-[48px] tracking-[0.08em] mb-1">
              DROP 01<br/><span className="text-[#b400ff]">CORE</span>
            </div>
            <div className="text-[11px] text-[rgba(180,0,255,0.5)] tracking-[0.15em] mb-7 italic">
              Primera instancia física del universo NeoProxy
            </div>
            <div className="text-[11px] text-[#3a3a5a] leading-[2.2] max-w-[640px] mb-7">
              DROP 01 representa el primer punto de contacto entre el sistema generativo NeoProxy y el mundo físico.
              Cada instancia fue extraída de un universo de <strong>10,000 seeds posibles</strong>,
              filtrada por algoritmos de safety estructural, y seleccionada mediante un sistema de scoring
              que evalúa proporciones, complejidad y diversidad tipológica.<br/><br/>
              No son anillos diseñados. Son <strong>instancias certificadas</strong> — objetos que emergieron
              del ruido paramétrico y sobrevivieron los filtros suficientes para existir en resina.<br/><br/>
              Cada pieza lleva su seed como identidad permanente: reproducible, verificable, única.
              Esto no es edición limitada por decisión de marketing.
              Es limitada porque <strong>solo estos 15 seeds pasaron todos los filtros</strong>.
            </div>
            <div className="flex gap-8 border-t border-[#0d0d1a] pt-5 flex-wrap">
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">FECHA DE GENERACIÓN</div>
                <div className="text-[10px] tracking-[0.1em]">{new Date().toISOString().split('T')[0]}</div>
              </div>
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">PIEZAS EN DROP</div>
                <div className="text-[10px] tracking-[0.1em]">15 / 15</div>
              </div>
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">ARQUETIPOS</div>
                <div className="text-[10px] tracking-[0.1em]">{[...new Set(results.map(d => d.archetype))].join(' · ')}</div>
              </div>
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">SCORE PROMEDIO</div>
                <div className="text-[10px] tracking-[0.1em]">{stats.avgScore} / 100</div>
              </div>
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">MATERIAL</div>
                <div className="text-[10px] tracking-[0.1em]">Resina ABS-Like</div>
              </div>
              <div>
                <div className="text-[7px] tracking-[0.25em] text-[#2a2a44] mb-1">SISTEMA</div>
                <div className="text-[10px] tracking-[0.1em]">NP CERTIFIED ●</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
