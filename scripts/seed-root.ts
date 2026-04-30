import { db } from '../lib/core-db/index'
import { users } from '../src/db/schema'
import { createHash, randomUUID } from 'crypto'

async function seed() {
  const passwordHash = createHash('sha256').update('ROOT_PASSWORD_CHANGE_ME').digest('hex')
  
  await db.insert(users).values({
    id: randomUUID(),
    username: 'darkproxy',
    passwordHash,
    role: 'root',
    createdAt: Date.now(),
  }).onConflictDoNothing()

  console.log('✅ darkproxy root creado')
}

seed()
