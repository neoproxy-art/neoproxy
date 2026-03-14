-- NeoProxy OS: Chronos Memory Schema (v1.0)

-- Table: artifacts
-- Stores every generated geometry artifact
CREATE TABLE IF NOT EXISTS artifacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id TEXT,                -- Lineage: ID of the ancestor artifact
    generator_agent TEXT NOT NULL, -- e.g., 'trickzter'
    parameters JSON NOT NULL,      -- Generation parameters (seed, scale, complexity)
    geometry_hash TEXT,           -- For unique identity / NFT
    glb_path TEXT,                -- Path to optimized model
    stl_path TEXT,                -- Path to raw geometry
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES artifacts(id)
);

-- Table: nfts
-- Tracks the minting status on the blockchain
CREATE TABLE IF NOT EXISTS nfts (
    artifact_id TEXT PRIMARY KEY,
    token_id INTEGER UNIQUE,
    contract_address TEXT,
    owner_wallet TEXT,
    ipfs_metadata_cid TEXT,
    mint_tx_hash TEXT,
    mint_status TEXT DEFAULT 'PENDING', -- 'PENDING', 'SUCCESS', 'FAILED'
    minted_at DATETIME,
    FOREIGN KEY (artifact_id) REFERENCES artifacts(id)
);

-- Table: agent_logs
-- Detailed activity trace for the Pantheon agents
CREATE TABLE IF NOT EXISTS agent_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id TEXT NOT NULL,       -- e.g., 'nexus', 'snake', 'oracle'
    event_type TEXT NOT NULL,     -- e.g., 'mutation_start', 'print_success'
    message TEXT,
    metadata JSON,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: system_health
-- Basic infrastructure metrics logged by Atlas/Oracle
CREATE TABLE IF NOT EXISTS system_health (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_name TEXT NOT NULL,    -- 'cpu_load', 'ram_usage', 'render_fps'
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial Logs for Kernel Boot
INSERT INTO agent_logs (agent_id, event_type, message) 
VALUES ('chronos', 'kernel_boot', 'Chronos memory initialized. Root stability confirmed.');
