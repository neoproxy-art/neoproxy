// Client-side database simulation for browser compatibility
class DatabaseSimulator {
  private data: Map<string, any[]> = new Map();
  
  constructor() {
    this.initializeTables();
  }
  
  private initializeTables() {
    this.data.set('agents', []);
    this.data.set('concepts', []);
    this.data.set('assemblies', []);
    this.data.set('mutations', []);
  }
  
  public prepare(query: string) {
    return {
      run: (params?: any) => this.executeStatement(query, params),
      all: (params?: any) => this.executeQuery(query, params),
      get: (params?: any) => this.executeQuery(query, params)[0]
    };
  }
  
  private executeStatement(query: string, params?: any) {
    console.log('DB Execute:', query, params);
    return { lastInsertRowid: Date.now() };
  }
  
  private executeQuery(query: string, params?: any) {
    console.log('DB Query:', query, params);
    return [];
  }
  
  public pragma(statement: string) {
    console.log('DB Pragma:', statement);
  }
  
  public exec(query: string) {
    console.log('DB Exec:', query);
  }
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';
const isServer = !isBrowser;

// Use real SQLite only on server, simulation on client
const Database = isServer ? require('better-sqlite3').default : DatabaseSimulator;
const path = isServer ? require('path') : { join: (...args: string[]) => args.join('/') };
const fs = isServer ? require('fs') : { 
  readFileSync: () => '-- Schema simulation --',
  existsSync: () => true
};

const DB_PATH = path.join(process.cwd?.() || '.', 'neoproxy_memory.sqlite');
const SCHEMA_PATH = path.join(process.cwd?.() || '.', 'src/lib/db/schema.sql');

let db: any;

/**
 * Initializes the database if it doesn't exist or if forced.
 */
export function initDB() {
  if (!db) {
    db = new Database(DB_PATH, { verbose: console.log });
    db.pragma('journal_mode = WAL');
    
    // Initialize schema if tables don't exist
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
  }
  return db;
}

/**
 * Chronos Service: Memory management
 */
export const Chronos = {
  logAgentActivity: (agentId: string, eventType: string, message: string, metadata?: object) => {
    const database = initDB();
    const stmt = database.prepare(`
      INSERT INTO agent_logs (agent_id, event_type, message, metadata)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(agentId, eventType, message, metadata ? JSON.stringify(metadata) : null);
  },

  registerArtifact: (name: string, agent: string, params: object, parentId: string | null = null) => {
    const database = initDB();
    const id = `ART_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const stmt = database.prepare(`
      INSERT INTO artifacts (id, name, generator_agent, parameters, parent_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, agent, JSON.stringify(params), parentId);
    return id;
  },

  /**
   * NFT Management
   */
  startMinting: (artifactId: string, wallet: string) => {
    const database = initDB();
    const stmt = database.prepare(`
      INSERT INTO nfts (artifact_id, owner_wallet, mint_status)
      VALUES (?, ?, 'PENDING')
    `);
    return stmt.run(artifactId, wallet);
  },

  updateMintStatus: (artifactId: string, tokenId: number, txHash: string, status: string) => {
    const database = initDB();
    const stmt = database.prepare(`
      UPDATE nfts 
      SET token_id = ?, mint_tx_hash = ?, mint_status = ?, minted_at = CURRENT_TIMESTAMP
      WHERE artifact_id = ?
    `);
    return stmt.run(tokenId, txHash, status, artifactId);
  },

  getArtifactWithLineage: (id: string) => {
    const database = initDB();
    return database.prepare(`
      WITH RECURSIVE lineage AS (
        SELECT * FROM artifacts WHERE id = ?
        UNION ALL
        SELECT a.* FROM artifacts a
        INNER JOIN lineage l ON l.parent_id = a.id
      )
      SELECT * FROM lineage
    `).all(id);
  },
  getRecentLogs: (limit = 50) => {
    const database = initDB();
    return database.prepare('SELECT * FROM agent_logs ORDER BY timestamp DESC LIMIT ?').all(limit);
  },

  getArtifacts: () => {
    const database = initDB();
    return database.prepare('SELECT * FROM artifacts ORDER BY created_at DESC').all();
  }
};

export default initDB();
