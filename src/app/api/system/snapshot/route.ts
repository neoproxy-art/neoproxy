import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

export async function GET() {
  try {
    const timestamp = new Date().toISOString()
    
    // Get API routes
    const apiDir = path.join(process.cwd(), 'src/app/api')
    const routes = fs.existsSync(apiDir) 
      ? fs.readdirSync(apiDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      : []
    
    // Get components
    const componentsDir = path.join(process.cwd(), 'src/components')
    const components = fs.existsSync(componentsDir)
      ? fs.readdirSync(componentsDir, { withFileTypes: true })
          .filter(dirent => dirent.isFile() && dirent.name.endsWith('.tsx'))
          .map(dirent => dirent.name)
      : []
    
    // Get pages (directories in src/app)
    const appDir = path.join(process.cwd(), 'src/app')
    const pages = fs.existsSync(appDir)
      ? fs.readdirSync(appDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_'))
          .map(dirent => dirent.name)
      : []
    
    // Get recent memory entries
    const dbPath = path.join(process.cwd(), 'sqlite.db')
    let recentMemory = []
    
    try {
      const db = new Database(dbPath)
      const stmt = db.prepare('SELECT * FROM memory ORDER BY timestamp DESC LIMIT 5')
      recentMemory = stmt.all()
      db.close()
    } catch (error) {
      console.log('Memory database not available:', error.message)
    }
    
    return NextResponse.json({
      timestamp,
      routes,
      components,
      pages,
      recentMemory
    })
    
  } catch (error) {
    console.error('[System Snapshot] Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate snapshot' },
      { status: 500 }
    )
  }
}
