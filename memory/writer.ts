import fs from 'fs'
import path from 'path'
import type { GeometryDNA } from '../geometry/generator'

export interface MemoryEntry {
  id: string
  dna: GeometryDNA
  stlPath: string
  createdAt: string
  notes?: string
}

export async function writeMemory(dna: GeometryDNA, stlBuffer: ArrayBuffer, notes?: string): Promise<MemoryEntry> {
  const id = `${dna.algorithm}-${dna.seed}-${dna.timestamp}`
  const dir = path.join(process.cwd(), 'memory', 'logs')
  const stlDir = path.join(process.cwd(), 'memory', 'stl')

  fs.mkdirSync(dir, { recursive: true })
  fs.mkdirSync(stlDir, { recursive: true })

  const stlPath = path.join(stlDir, `${id}.stl`)
  fs.writeFileSync(stlPath, Buffer.from(stlBuffer))

  const entry: MemoryEntry = {
    id,
    dna,
    stlPath,
    createdAt: new Date().toISOString(),
    notes
  }

  fs.writeFileSync(
    path.join(dir, `${id}.json`),
    JSON.stringify(entry, null, 2)
  )

  return entry
}

export function readMemory(): MemoryEntry[] {
  const dir = path.join(process.cwd(), 'memory', 'logs')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
