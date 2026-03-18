import { db } from '@/lib/db'
import { HomeClient } from '@/components/HomeClient'

export const revalidate = 60

export default async function Page() {
  let scene: any = null
  let projects: any[] = []

  try {
    const [sceneData, projectsData] = await Promise.all([
      db.sceneConfig.findFirst({ where: { isActive: true } }),
      db.project.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    ])
    scene = sceneData
    projects = projectsData
  } catch (e) {
    console.error('DB fallback activo')
  }

  const finalScene = scene ?? {
    rotationSpeed: 0.004,
    edgeOpacity: 0.25,
    edgeColor: '#0080cc',
    nodeColor: '#00d4ff',
    bgColor: '#00000a',
  }

  const finalProjects = projects.length > 0 ? projects : [
    { slug: 'espada', title: 'ESPADA PROXY', description: 'Interface física · acceso a la red', icon: '⟁', href: '/espada', status: 'ONLINE' },
    { slug: 'shop', title: 'SHOP', description: 'STL premium · objetos físicos', icon: '◈', href: '/shop', status: 'SOON' },
    { slug: 'npos', title: 'NPOS / LAB', description: 'Creative OS · geometría generativa', icon: '⬡', href: '/npos', status: 'ONLINE' },
    { slug: 'sinspissss', title: 'SINSPISSSS', description: 'Protocolo neural cuántico', icon: '◉', href: '/concept', status: 'BETA' },
  ]

  return <HomeClient scene={finalScene} projects={finalProjects} />
}
