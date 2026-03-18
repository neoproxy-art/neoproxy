import chroma from 'chroma-js';

// Brain.js simulation for style genome processing
class BrainSimulator {
  private memory: Map<string, any> = new Map();
  
  constructor() {
    this.initializeMemory();
  }
  
  private initializeMemory() {
    // Initialize with basic aesthetic patterns
    this.memory.set('cyberpunk', {
      palette: ['#00d4ff', '#020408', '#ff6b6b'],
      mood: 'high-tech',
      intensity: 0.8
    });
    
    this.memory.set('minimal', {
      palette: ['#ffffff', '#000000', '#cccccc'],
      mood: 'clean',
      intensity: 0.3
    });
  }
  
  public predict(input: any): any {
    // Simple pattern matching based on input
    const patterns = Array.from(this.memory.keys());
    const match = patterns.find(pattern => 
      input && typeof input === 'string' && input.toLowerCase().includes(pattern.toLowerCase())
    );
    
    return this.memory.get(match || '') || {
      palette: ['#00d4ff', '#020408'],
      mood: 'unknown',
      intensity: 0.5
    };
  }
  
  public learn(input: any, output: any): void {
    // Store learning patterns
    const key = `pattern_${Date.now()}`;
    this.memory.set(key, { input, output, timestamp: Date.now() });
  }
}

const brain = new BrainSimulator();

/**
 * Style Genome Interface: Represents the complete visual DNA of the system.
 */
export interface StyleGenome {
  palette: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  lighting: {
    intensity: number;
    glow: string;
  };
  material: {
    blur: string;
    opacity: number;
  };
  geometry: {
    rounding: string;
    borderWidth: string;
  };
}

/**
 * Foundational Style Frames
 */
const STYLE_FRAMES: Record<string, StyleGenome> = {
  cyberpunk: {
    palette: { primary: '#00ffff', secondary: '#ff0066', background: '#050505', accent: '#7b2fff' },
    lighting: { intensity: 1.0, glow: 'rgba(0, 255, 255, 0.4)' },
    material: { blur: '10px', opacity: 0.7 },
    geometry: { rounding: '0px', borderWidth: '1px' }
  },
  minimal: {
    palette: { primary: '#ffffff', secondary: '#333333', background: '#000000', accent: '#00ff9d' },
    lighting: { intensity: 0.5, glow: 'rgba(255, 255, 255, 0.1)' },
    material: { blur: '0px', opacity: 1.0 },
    geometry: { rounding: '2px', borderWidth: '1px' }
  },
  neural: {
    palette: { primary: '#00ff9d', secondary: '#00d4ff', background: '#020408', accent: '#ff3cac' },
    lighting: { intensity: 0.8, glow: 'rgba(0, 255, 157, 0.3)' },
    material: { blur: '15px', opacity: 0.6 },
    geometry: { rounding: '12px', borderWidth: '0px' }
  }
};

/**
 * Aesthetic Agent: Responsible for the visual mutation of NeoProxy OS.
 */
export const AestheticAgent = {
  net: {
    train: (data: any[]) => {
      console.log('Training aesthetic agent with data:', data);
    },
    run: (input: any) => {
      return brain.predict(input);
    }
  },

  train: () => {
    const trainingData = [
      { input: { entropy: 0.1, health: 1.0 }, output: { minimal: 1 } },
      { input: { entropy: 0.4, health: 0.9 }, output: { neural: 1 } },
      { input: { entropy: 0.9, health: 0.4 }, output: { cyberpunk: 1 } },
    ];
    AestheticAgent.net.train(trainingData);
  },

  /**
   * Generates a unique Style Genome based on AI prediction and stochastic mutation.
   */
  generateGenome: async (entropy: number, health: number): Promise<StyleGenome> => {
    AestheticAgent.train();
    const prediction = AestheticAgent.net.run({ entropy, health }) as any;
    
    // Select dominant frame
    const frameKey = Object.keys(prediction).reduce((a, b) => prediction[a] > prediction[b] ? a : b);
    const baseGenome = { ...STYLE_FRAMES[frameKey] };

    // Apply Mutation Rules (The 35% Stability Law)
    const mutationFactor = (entropy * 0.35); // Max 35% change
    
    // Mutate Primary Color (chroma-js rotation)
    const primaryColor = chroma(baseGenome.palette.primary);
    const hslColor = primaryColor.get('hsl') as any;
    const mutatedHSL = {
      h: (hslColor[0] as number) + (mutationFactor * 100),
      s: (hslColor[1] as number) + (mutationFactor * 2),
      l: (hslColor[2] as number)
    };
    const mutedPrimary = chroma(mutatedHSL).hex();
    
    // Get complementary color
    const complementaryColor = chroma(mutedPrimary).set('hsl.h', ((hslColor[0] as number) + 180) % 360).hex();

    return {
      ...baseGenome,
      palette: {
        ...baseGenome.palette,
        primary: mutedPrimary,
        accent: complementaryColor
      },
      lighting: {
        ...baseGenome.lighting,
        intensity: baseGenome.lighting.intensity * (1 + (entropy - 0.5) * 0.2)
      }
    };
  }
};
