import { BabylonCanvas } from '@/components/BabylonCanvas'

export const revalidate = 60

const SCENE = {
  ambientColor: '#000814',
  gravity: -9.8,
  objects: [
    {
      id: '1',
      slug: 'fabrication',
      modelUrl: '',
      position: { x: -4, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      layer: 'nav' as const,
      material: {
        type: 'PBR' as const,
        albedoColor: '#000d1a',
        emissiveColor: '#00d4ff',
        metallic: 0.95,
        roughness: 0.05,
      },
      action: { type: 'route' as const, value: '/fabrication' },
      content: {
        title: 'FABRICATION',
        body: 'Objetos físicos del laboratorio. La materia como dato.',
      },
    },
    {
      id: '2',
      slug: 'kernel',
      modelUrl: '',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1.6, y: 1.6, z: 1.6 },
      layer: 'nav' as const,
      material: {
        type: 'PBR' as const,
        albedoColor: '#08000f',
        emissiveColor: '#b400ff',
        metallic: 1,
        roughness: 0,
      },
      action: { type: 'route' as const, value: '/npos/lab' },
      content: {
        title: 'KERNEL',
        body: 'Centro del sistema NeoProxy. Todo fluye desde aquí.',
      },
    },
    {
      id: '3',
      slug: 'memory',
      modelUrl: '',
      position: { x: 4, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      layer: 'nav' as const,
      material: {
        type: 'PBR' as const,
        albedoColor: '#000d08',
        emissiveColor: '#00ff9d',
        metallic: 0.8,
        roughness: 0.15,
      },
      action: { type: 'route' as const, value: '/memory' },
      content: {
        title: 'MEMORY',
        body: 'Archivo del proceso. El diario del laboratorio.',
      },
    },
    {
      id: '4',
      slug: 'store',
      modelUrl: '',
      position: { x: 0, y: -3, z: 1 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 0.8, y: 0.8, z: 0.8 },
      layer: 'nav' as const,
      material: {
        type: 'PBR' as const,
        albedoColor: '#0d0800',
        emissiveColor: '#ff9500',
        metallic: 0.7,
        roughness: 0.2,
      },
      action: { type: 'route' as const, value: '/store' },
      content: {
        title: 'STORE',
        body: 'STL files, objetos físicos, acceso a la red.',
      },
    },
  ],
}

export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <BabylonCanvas sceneConfig={SCENE} />
    </main>
  )
}
