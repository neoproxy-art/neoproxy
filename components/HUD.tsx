'use client'
import { useEffect } from 'react'
import { type Object3DCfg } from '@/lib/babylon/SceneEngine'

interface HUDProps {
  activeObject: Object3DCfg | null
  onClose: () => void
  onAction: (obj: Object3DCfg) => void
}

export function HUD({ activeObject, onClose, onAction }: HUDProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  if (!activeObject) return null

  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-64 bg-black/90 border border-cyan-500/25 p-5 font-mono z-50">
      <div className="text-[9px] text-cyan-400/60 tracking-widest mb-2">
        // NODE_DETECTED
      </div>
      <div className="text-[15px] text-white font-bold mb-2 tracking-tight">
        {activeObject.content?.title ?? activeObject.slug.toUpperCase()}
      </div>
      {activeObject.content?.body && (
        <div className="text-[11px] text-white/45 leading-relaxed mb-4">
          {activeObject.content.body}
        </div>
      )}
      {activeObject.action && (
        <button
          onClick={() => onAction(activeObject)}
          className="w-full bg-transparent border border-cyan-500/40 text-cyan-400 font-mono text-[9px] tracking-wide py-2 mb-2 cursor-pointer hover:bg-cyan-500/10 transition-colors"
        >
          ENTER //
        </button>
      )}
      <div
        onClick={onClose}
        className="absolute top-2 right-3 text-cyan-400/35 cursor-pointer text-[11px] font-mono leading-none hover:text-cyan-400 transition-colors"
      >
        ✕
      </div>
    </div>
  )
}
