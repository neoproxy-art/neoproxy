import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const db = new PrismaClient({
  adapter,
  errorFormat: 'minimal'
})

async function main() {
  await db.sceneConfig.deleteMany()
  await db.project.deleteMany()

  await db.sceneConfig.create({
    data: {
      name: 'neoproxy-v1',
      isActive: true,
      rotationSpeed: 0.004,
      edgeOpacity: 0.25,
      edgeColor: '#0080cc',
      nodeColor: '#00d4ff',
      bgColor: '#00000a',
      ambientColor: '#00d4ff',
    }
  })

  await db.project.createMany({
    data: [
      { slug: 'espada', title: 'ESPADA PROXY', description: 'Interface física · acceso a la red', icon: '⟁', href: '/espada', status: 'ONLINE', order: 1 },
      { slug: 'shop', title: 'SHOP', description: 'STL premium · objetos físicos', icon: '◈', href: '/shop', status: 'SOON', order: 2 },
      { slug: 'npos', title: 'NPOS / LAB', description: 'Creative OS · geometría generativa', icon: '⬡', href: '/npos', status: 'ONLINE', order: 3 },
      { slug: 'sinspissss', title: 'SINSPISSSS', description: 'Protocolo neural cuántico', icon: '◉', href: '/concept', status: 'BETA', order: 4 },
    ]
  })

  console.log('Seed completado')
}

main().catch(console.error).finally(() => db.$disconnect())
