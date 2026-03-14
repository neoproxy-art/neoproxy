import { Chronos } from '../db';

/**
 * Agent: Oracle (Data Intelligence & Analytics)
 * Responsibilities: Pattern recognition, artifact genealogy analysis, system health interpretation.
 */

export const Oracle = {
  /**
   * Analyzes the last N artifacts to find common aesthetic patterns.
   */
  analyzeAestheticTrends: async (limit = 20) => {
    const artifacts = await Chronos.getArtifacts();
    const recent = artifacts.slice(0, limit);
    
    // Simple frequency analysis for styles
    const styleCount: Record<string, number> = {};
    recent.forEach((art: any) => {
      const params = JSON.parse(art.parameters);
      styleCount[params.style] = (styleCount[params.style] || 0) + 1;
    });

    return {
      total_analyzed: recent.length,
      dominant_style: Object.entries(styleCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none',
      distribution: styleCount
    };
  },

  /**
   * Build the genetic tree of artifacts based on parent_id and style similarity.
   */
  getArtifactGenealogy: async () => {
    const artifacts = await Chronos.getArtifacts();
    
    // Transformation for D3.js Tree/Graph structures
    const nodes = artifacts.map((art: any) => ({
      id: art.id,
      name: art.name,
      agent: art.generator_agent,
      timestamp: art.created_at
    }));

    const links: any[] = [];
    
    // Connect nodes based on parent_id
    artifacts.forEach((art: any) => {
      if (art.parent_id) {
        links.push({ source: art.id, target: art.parent_id });
      }
    });

    // Fallback: If no lineages yet, show chronological chain
    if (links.length === 0 && nodes.length > 1) {
      for (let i = 0; i < nodes.length - 1; i++) {
        links.push({ source: nodes[i+1].id, target: nodes[i].id });
      }
    }

    return { nodes, links };
  },

  /**
   * Returns a graph representing the NeoProxy Pantheon architecture.
   */
  getSystemArchitectureGraph: async () => {
    // 15 Agents defined in the ontology
    const agents = [
      { id: 'nexus', name: 'NEXUS PROXY', layer: '01', type: 'PRIMORDIAL' },
      { id: 'chronos', name: 'CHRONOS', layer: '01', type: 'PRIMORDIAL' },
      { id: 'atlas', name: 'ATLAS', layer: '01', type: 'PRIMORDIAL' },
      { id: 'snake', name: 'SNAKE', layer: '02', type: 'CATALYST' },
      { id: 'trickzter', name: 'TRICKZTER', layer: '02', type: 'CATALYST' },
      { id: 'cipher', name: 'CIPHER', layer: '02', type: 'CATALYST' },
      { id: 'oracle', name: 'ORACLE', layer: '03', type: 'WATCHER' },
      // ... more agents can be added here
    ];

    const nodes = agents.map(a => ({ ...a, group: a.layer }));
    
    // Predetermined functional links
    const links = [
      { source: 'nexus', target: 'chronos', value: 2 },
      { source: 'trickzter', target: 'chronos', value: 5 },
      { source: 'cipher', target: 'chronos', value: 3 },
      { source: 'oracle', target: 'chronos', value: 10 },
      { source: 'atlas', target: 'oracle', value: 4 },
    ];

    return { nodes, links };
  },

  /**
   * Monitors the live process flow (Pipeline status).
   */
  getRealtimeProcessState: async () => {
    const logs = await Chronos.getRecentLogs(10);
    const activePipeline = logs.some((l: any) => l.event_type.includes('mutation') || l.event_type.includes('mint'));

    return {
      active: activePipeline,
      stages: [
        { id: 'input', label: 'OPERATOR_INPUT', status: activePipeline ? 'ACTIVE' : 'IDLE' },
        { id: 'agent', label: 'AGENT_LOGIC', status: activePipeline ? 'PROCESSING' : 'IDLE' },
        { id: 'db', label: 'MEMORY_COMMIT', status: activePipeline ? 'WRITING' : 'IDLE' },
        { id: 'render', label: 'VISUAL_SYNC', status: 'READY' }
      ]
    };
  },

  /**
   * Returns the hierarchical structure of the NeoProxy Web ecosystem.
   */
  getWebSitemap: async () => {
    return {
      name: "NEOPROXY_CORE",
      children: [
        {
          name: "PUBLIC_ZONE",
          children: [
            { name: "HOME", href: "/" },
            { name: "CONCEPT", href: "/concept" },
            { name: "MANIFESTO", href: "/manifesto" }
          ]
        },
        {
          name: "NPOS_OS",
          children: [
            { name: "LAB", href: "/npos/lab" },
            { name: "FABRICATION", href: "/npos/fabrication" },
            {
              name: "ADMIN_DASHBOARD",
              children: [
                { name: "OBSERVATORY", href: "/npos/admin" },
                { name: "KERNEL_CONTROL", href: "/npos/admin" }
              ]
            }
          ]
        }
      ]
    };
  },

  /**
   * Generates time-series data for the growth of artifacts in Chronos.
   */
  getSystemEvolution: async () => {
    const artifacts = await Chronos.getArtifacts();
    
    // Group by day
    const evolution: Record<string, number> = {};
    artifacts.forEach((art: any) => {
      const date = new Date(art.created_at).toISOString().split('T')[0];
      evolution[date] = (evolution[date] || 0) + 1;
    });

    // Convert to sorted array for D3
    return Object.entries(evolution)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  /**
   * Returns a graph of conceptual connections (Research layers + Artifacts).
   */
  getKnowledgeGraphData: async () => {
    // 1. Define Conceptual Nodes (The Layers & Domains)
    const nodes = [
      { id: 'phil', name: 'PHILOSOPHY', type: 'CONCEPT', group: '0' },
      { id: 'sci', name: 'SCIENCE', type: 'CONCEPT', group: '0' },
      { id: 'eng', name: 'ENGINEERING', type: 'CONCEPT', group: '0' },
      { id: 'mem', name: 'MEMORY', type: 'CONCEPT', group: '0' },
      
      // Domains
      { id: 'dom_math', name: 'MATHEMATICS', type: 'DOMAIN', group: 'sci' },
      { id: 'dom_phys', name: 'PHYSICS', type: 'DOMAIN', group: 'sci' },
      { id: 'dom_cplx', name: 'COMPLEX_SYS', type: 'DOMAIN', group: 'sci' },

      // Sub-concepts based on content
      { id: 'ent', name: 'ENTROPY', type: 'DOCUMENT', group: 'dom_phys' },
      { id: 'chaos', name: 'CHAOS_THEORY', type: 'DOCUMENT', group: 'dom_cplx' },
      { id: 'topology', name: 'TOPOLOGY', type: 'DOCUMENT', group: 'dom_math' },
      { id: 'emerge', name: 'EMERGENCE', type: 'DOCUMENT', group: 'dom_cplx' },
      { id: 'arch', name: 'ARCHITECTURE', type: 'DOCUMENT', group: 'eng' }
    ];

    const links = [
      { source: 'phil', target: 'sci' },
      { source: 'sci', target: 'dom_math' },
      { source: 'sci', target: 'dom_phys' },
      { source: 'sci', target: 'dom_cplx' },
      { source: 'dom_phys', target: 'ent' },
      { source: 'dom_cplx', target: 'chaos' },
      { source: 'dom_math', target: 'topology' },
      { source: 'dom_cplx', target: 'emerge' },
      { source: 'eng', target: 'arch' },
      { source: 'chaos', target: 'ent' }, // Connection: Chaos related to Entropy
      { source: 'arch', target: 'dom_math' } // Engineering uses math
    ];

    // 2. Fetch recent artifacts to connect to Memory
    const artifacts = await Chronos.getArtifacts();
    artifacts.slice(0, 10).forEach((art: any) => {
      nodes.push({ id: art.id, name: art.name, type: 'ARTIFACT', group: 'mem' });
      links.push({ source: 'mem', target: art.id });
    });

    return { nodes, links };
  },

  /**
   * Interprets system logs to detect anomalies or "Stability Breaches".
   */
  diagnoseSystemHealth: async () => {
    const logs = await Chronos.getRecentLogs(100);
    const errors = logs.filter((l: any) => l.event_type.includes('error') || l.event_type.includes('panic'));
    
    return {
      status: errors.length > 5 ? 'CRITICAL' : (errors.length > 0 ? 'WARNING' : 'STABLE'),
      error_count: errors.length,
      last_event: (logs[0] as any)?.timestamp
    };
  }
};
