import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [scene, projects] = await Promise.all([
      db.sceneConfig.findFirst({ where: { isActive: true } }),
      db.project.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    ])
    return NextResponse.json({ scene, projects })
  } catch (e) {
    return NextResponse.json({
      scene: {
        rotationSpeed: 0.004,
        edgeOpacity: 0.25,
        edgeColor: '#0080cc',
        nodeColor: '#00d4ff',
        bgColor: '#00000a',
      },
      projects: [
        { slug: 'espada', title: 'ESPADA PROXY', description: 'Interface física · acceso a la red', icon: '⟁', href: '/espada', status: 'ONLINE' },
        { slug: 'shop', title: 'SHOP', description: 'STL premium · objetos físicos', icon: '◈', href: '/shop', status: 'SOON' },
        { slug: 'npos', title: 'NPOS / LAB', description: 'Creative OS · geometría generativa', icon: '⬡', href: '/npos', status: 'ONLINE' },
        { slug: 'sinspissss', title: 'SINSPISSSS', description: 'Protocolo neural cuántico', icon: '◉', href: '/concept', status: 'BETA' },
      ]
    })
  }
}
