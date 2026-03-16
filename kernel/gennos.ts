import { generatePiece } from '../geometry/generator'
import { writeMemory } from '../memory/writer'
import type { GeometryDNA } from '../geometry/generator'

const ALGORITHMS: GeometryDNA['algorithm'][] = ['crystal', 'organic', 'twist', 'lorenz']

function parseSeed(idea: string): string {
  return idea.toLowerCase().trim().replace(/\s+/g, '-') + '-' + Date.now()
}

function pickAlgorithm(idea: string): GeometryDNA['algorithm'] {
  const idea_lower = idea.toLowerCase()
  if (idea_lower.includes('cristal') || idea_lower.includes('crystal') || idea_lower.includes('angular')) return 'crystal'
  if (idea_lower.includes('organico') || idea_lower.includes('orgánico') || idea_lower.includes('blob')) return 'organic'
  if (idea_lower.includes('twist') || idea_lower.includes('espiral') || idea_lower.includes('torsion')) return 'twist'
  if (idea_lower.includes('caos') || idea_lower.includes('flujo') || idea_lower.includes('lorenz')) return 'lorenz'
  return ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)]
}

export async function processIdea(idea: string) {
  console.log(`\n[GENNOS] Procesando: "${idea}"`)

  const seed = parseSeed(idea)
  const algorithm = pickAlgorithm(idea)

  console.log(`[GENNOS] Seed: ${seed}`)
  console.log(`[GENNOS] Algoritmo: ${algorithm}`)

  const piece = await generatePiece(seed, algorithm)
  const entry = await writeMemory(piece.dna, piece.stlBuffer, idea)

  console.log(`[GENNOS] Pieza generada: ${entry.id}`)
  console.log(`[GENNOS] STL guardado en: ${entry.stlPath}`)

  return entry
}
