export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    
    // Using the same sqlite.db created by the Python kernel memory
    const dbPath = path.join(process.cwd(), 'sqlite.db');
    const db = new Database(dbPath);
    
    // We insert into the 'memory' table
    const stmt = db.prepare(`
      INSERT INTO memory (daemon, event_type, details)
      VALUES (?, ?, ?)
    `);
    
    const info = stmt.run('api_post', title, content);
    db.close();
    
    return NextResponse.json({
      success: true,
      id: info.lastInsertRowid,
      title,
      content,
      status: 'written to memory'
    });
  } catch (error: any) {
    console.error('Error writing to memory:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'sqlite.db');
    const db = new Database(dbPath);
    
    const stmt = db.prepare('SELECT * FROM memory ORDER BY timestamp DESC LIMIT 50');
    const rows = stmt.all();
    db.close();
    
    return NextResponse.json({
      success: true,
      memoryItems: rows
    });
  } catch (error: any) {
    console.error('Error reading memory:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
