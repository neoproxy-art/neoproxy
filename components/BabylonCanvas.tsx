'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { SceneEngine, type SceneCfg, type Object3DCfg } from '@/lib/babylon/SceneEngine'
import { HUD } from '@/components/HUD'

export function BabylonCanvas({ sceneConfig }: { sceneConfig: SceneCfg }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<SceneEngine | null>(null)
  const [active, setActive] = useState<Object3DCfg | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const init = async () => {
      const engine = new SceneEngine(canvasRef.current!)
      engine.onObjectClick = (obj) => setActive(obj)
      await engine.loadFromConfig(sceneConfig)
      
      // Add background stardust
      engine.addBackgroundStardust({
        density: 60,
        complexity: 40,
        scale: 0.8,
        chaos: 0.05
      })
      
      engineRef.current = engine
      setReady(true)
    }

    init()
    return () => engineRef.current?.dispose()
  }, [sceneConfig])

  const handleAction = useCallback((obj: Object3DCfg) => {
    if (obj.action?.type === 'route') {
      window.location.href = obj.action.value
    }
  }, [])

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block outline-none" />
      
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <span className="font-mono text-[10px] text-cyan-400 animate-pulse tracking-[0.3em]">
            NEOPROXY // INITIALIZING_NETWORK...
          </span>
        </div>
      )}

      {ready && (
        <HUD 
          activeObject={active} 
          onClose={() => setActive(null)} 
          onAction={handleAction}
        />
      )}
    </div>
  )
}
