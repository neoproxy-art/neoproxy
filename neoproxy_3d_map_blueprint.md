# 🗺️ NEOPROXY 3D MAP - BLUEPRINT DEFINITIVO

## 🌌 **The Living Network** - Arquitectura Espacial Completa

*Fecha: March 13, 2026*
*Versión: 1.0 - Experience Spec*

---

## 🎯 **VISIÓN EJECUTIVA**

NeoProxy no es un sitio web. Es **un organismo digital vivo** que el usuario explora como si navegara por una red neuronal biológica.

**Principio rector:** Todo elemento debe comportarse como parte de una red viva - pulsando, respirando, respondiendo.

---

## 🏗️ **ARQUITECTURA ESPACIAL**

### **Sistema de Coordenadas**

```
Centro: KERNEL (0, 0, 0)
Radio base: 8 unidades
Altura estratificada: Y = importancia * 2
```

### **Nodos Principales - Posicionamiento 3D**

| Nodo | Posición (X, Y, Z) | Radio | Importancia | Color |
|------|-------------------|-------|-------------|-------|
| **KERNEL** | (0, 0, 0) | 2.0 | 10 | `#00ff9c` |
| **AGENTS** | (-6, 3, 2) | 1.5 | 8 | `#3aa8ff` |
| **MODELS** | (6, 4, -1) | 1.5 | 8 | `#ff6b35` |
| **LAB** | (0, 2, 6) | 1.3 | 6 | `#ffaa00` |
| **PORTAL** | (0, -3, 0) | 1.0 | 7 | `#ffffff` |
| **ARCHIVE** | (-4, -2, -4) | 1.2 | 5 | `#666666` |

---

## 🔗 **CONEXIONES DE RED**

### **Topología de Conexiones**

```
KERNEL ↔ AGENTS (primary)
KERNEL ↔ MODELS (primary)
KERNEL ↔ LAB (secondary)
KERNEL ↔ PORTAL (primary)
KERNEL ↔ ARCHIVE (tertiary)

AGENTS ↔ MODELS (data_flow)
MODELS ↔ LAB (creative_flow)
LAB ↔ PORTAL (output_flow)
```

### **Propiedades de Conexiones**

```javascript
const connections = {
  primary: {
    width: 0.05,
    color: '#00ff9c',
    pulseSpeed: 2.0,
    opacity: 0.8
  },
  secondary: {
    width: 0.03,
    color: '#3aa8ff',
    pulseSpeed: 1.5,
    opacity: 0.6
  },
  tertiary: {
    width: 0.02,
    color: '#666666',
    pulseSpeed: 1.0,
    opacity: 0.4
  },
  data_flow: {
    width: 0.04,
    color: '#ff6b35',
    pulseSpeed: 3.0,
    opacity: 0.7,
    animated: true
  }
}
```

---

## 📷 **CINEMÁTICA DE CÁMARA**

### **Estados de Cámara**

| Estado | Posición | Target | Duración | Easing |
|--------|----------|--------|----------|--------|
| **BOOT_VIEW** | (0, 0, 15) | (0, 0, 0) | 3s | `power2.out` |
| **KERNEL_ORBIT** | orbital | KERNEL | ∞ | `sine.inOut` |
| **NODE_FOCUS** | node + offset | node | 1.5s | `back.out` |
| **CONSTELLATION_VIEW** | (12, 8, 12) | (0, 0, 0) | 2s | `power2.inOut` |
| **SERPENT_VIEW** | dynamic | serpent_path | 4s | `elastic.out` |

### **Transiciones Automáticas**

```javascript
const cameraTransitions = {
  idle_timeout: 30000, // ms
  auto_orbit: {
    radius: 12,
    height: 3,
    speed: 0.5
  },
  node_approach: {
    distance: 3,
    height_offset: 1,
    look_ahead: 0.5
  }
}
```

---

## 🎮 **SISTEMA DE INTERACCIÓN**

### **Zonas de Influencia**

```javascript
const interactionZones = {
  magnetic_field: {
    radius: node.radius * 3,
    force: 0.1,
    falloff: 'quadratic'
  },
  hover_zone: {
    radius: node.radius * 1.5,
    trigger: 'enter'
  },
  click_zone: {
    radius: node.radius * 1.2,
    feedback: 'immediate'
  }
}
```

### **Estados de Nodo**

```javascript
const nodeStates = {
  idle: {
    scale: 1.0,
    glow: 0.3,
    pulse: false
  },
  hover: {
    scale: 1.2,
    glow: 0.8,
    pulse: true,
    label: {
      visible: true,
      fadeIn: 0.3
    }
  },
  active: {
    scale: 1.5,
    glow: 1.0,
    pulse: true,
    particles: true
  },
  loading: {
    scale: 1.1,
    rotation: true,
    glow: 0.6
  }
}
```

---

## ✨ **MICROINTERACCIONES**

### **1. Energy Probe Cursor**

```javascript
const cursor = {
  geometry: 'sphere',
  radius: 0.05,
  trail: {
    length: 20,
    fade: 0.95,
    color: '#00ff9c'
  },
  magnetic_pull: {
    strength: 0.3,
    range: 5
  }
}
```

### **2. Data Pulses**

```javascript
const dataPulse = {
  geometry: 'icosahedron',
  size: 0.1,
  speed: 2.0,
  lifetime: 3.0,
  color: '#3aa8ff',
  trail: true
}
```

### **3. Network Breathing**

```javascript
const systemBreath = {
  interval: 8000, // ms
  amplitude: 0.1,
  duration: 2000,
  affect: ['nodes', 'connections', 'particles']
}
```

---

## 🐍 **SERPENT NETWORK - MOMENTO WOW**

### **Secuencia de Transformación**

```javascript
const serpentSequence = {
  trigger: 'first_scroll',
  duration: 4.0,

  phases: [
    {
      name: 'dissolve',
      duration: 1.0,
      action: 'nodes_fade',
      connections: 'pulse_increase'
    },
    {
      name: 'reform',
      duration: 2.0,
      action: 'serpent_path',
      camera: 'follow_path'
    },
    {
      name: 'explode',
      duration: 1.0,
      action: 'nodes_burst',
      particles: 'explosion'
    }
  ]
}
```

### **Serpent Path Calculation**

```javascript
function calculateSerpentPath(nodes) {
  // Algoritmo de pathfinding orgánico
  const path = [];
  const visited = new Set();

  // Start from KERNEL
  let current = nodes.KERNEL;

  for (let i = 0; i < nodes.length; i++) {
    const next = findNearestUnvisited(current, nodes, visited);
    if (!next) break;

    path.push({
      from: current.position,
      to: next.position,
      controlPoint: generateOrganicControlPoint(current, next)
    });

    visited.add(next.id);
    current = next;
  }

  return path;
}
```

---

## 🔮 **NARRATIVA OCULTA - ICEBERG SYSTEM**

### **Capas de Visibilidad**

```javascript
const visibilityLayers = {
  public: {
    nodes: ['KERNEL', 'AGENTS', 'MODELS', 'LAB', 'PORTAL'],
    connections: 'primary_only',
    data_flow: false
  },

  authenticated: {
    nodes: ['ARCHIVE', 'SYSTEM_LOGS'],
    connections: 'all',
    data_flow: true
  },

  admin: {
    nodes: ['DEBUG_CONSOLE', 'METRICS', 'BACKUP_SYSTEMS'],
    connections: 'full_mesh',
    real_time_data: true
  }
}
```

### **Easter Eggs**

```javascript
const easterEggs = [
  {
    trigger: 'triple_click_kernel',
    action: 'reveal_hidden_nodes',
    duration: 10000
  },
  {
    trigger: 'serpent_completion',
    action: 'unlock_secret_portal',
    reward: 'alternate_dimension'
  }
]
```

---

## ⚡ **OPTIMIZACIÓN TÉCNICA**

### **Performance Budget**

```javascript
const performanceBudget = {
  maxTriangles: 50000,
  maxDrawCalls: 100,
  targetFPS: 60,
  maxMemory: '256MB'
}
```

### **LOD System**

```javascript
const lodLevels = {
  high: { distance: 0-5, detail: 1.0 },
  medium: { distance: 5-15, detail: 0.7 },
  low: { distance: 15+, detail: 0.3 }
}
```

### **Instancing Strategy**

```javascript
const instancingGroups = {
  connection_lines: {
    maxInstances: 100,
    geometry: 'cylinder',
    material: 'emissive'
  },
  data_particles: {
    maxInstances: 500,
    geometry: 'sphere',
    material: 'additive'
  }
}
```

---

## 🎨 **IMPLEMENTACIÓN VISUAL**

### **Shaders Principales**

```glsl
// Node Glow Shader
uniform float glowIntensity;
uniform vec3 glowColor;

void main() {
  float glow = 1.0 - length(gl_PointCoord - 0.5) * 2.0;
  glow = pow(glow, 2.0) * glowIntensity;

  gl_FragColor = vec4(glowColor, glow);
}
```

### **Particle Systems**

```javascript
const particleSystems = {
  ambient: {
    count: 100,
    size: 0.02,
    speed: 0.1,
    color: '#00ff9c',
    behavior: 'float'
  },

  data_flow: {
    count: 50,
    size: 0.05,
    speed: 1.0,
    color: '#3aa8ff',
    behavior: 'pulse_along_connections'
  }
}
```

---

## 📊 **ROADMAP DE IMPLEMENTACIÓN**

### **Fase 1: Core System (2 semanas)**
- [ ] Basic 3D scene setup
- [ ] Node positioning system
- [ ] Camera controller
- [ ] Basic interactions

### **Fase 2: Living Network (3 semanas)**
- [ ] Connection system
- [ ] Data pulses
- [ ] Network breathing
- [ ] Magnetic interactions

### **Fase 3: Experience Polish (2 semanas)**
- [ ] Serpent transformation
- [ ] Advanced shaders
- [ ] Performance optimization
- [ ] Mobile adaptation

### **Fase 4: Secret Layer (1 semana)**
- [ ] Admin system
- [ ] Easter eggs
- [ ] Analytics integration

---

## 🧪 **PRUEBAS DE USUARIO**

### **Escenarios Críticos**

1. **First Time User**
   - Boot sequence clarity
   - Navigation discoverability
   - WOW moment impact

2. **Returning User**
   - State persistence
   - Shortcut learning
   - Advanced features

3. **Performance Test**
   - Load times
   - Frame rate stability
   - Memory usage

---

## 📈 **MÉTRICAS DE ÉXITO**

### **Awwwards Criteria**

- **Design**: 9+ (visual identity, typography, color)
- **Creativity**: 9+ (serpent network, living metaphor)
- **UX**: 9+ (spatial navigation, interactions)
- **Content**: 8+ (narrative depth, iceberg system)

### **Performance Targets**

- **Lighthouse Score**: 95+
- **Load Time**: <3s
- **Memory Usage**: <200MB
- **Frame Rate**: 60fps stable

---

## 🚀 **DEPLOYMENT STRATEGY**

### **Build Optimization**

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: 'raw-loader'
    });
    return config;
  }
}
```

### **CDN Strategy**

- Static assets → CDN
- 3D models → Cloud storage
- Shaders → Precompiled

---

## 🔧 **HERRAMIENTAS DE DESARROLLO**

### **Stack Principal**

```json
{
  "framework": "Next.js 16+",
  "3d": "React Three Fiber + Three.js",
  "animation": "Framer Motion + GSAP",
  "shaders": "GLSL",
  "state": "Zustand",
  "testing": "Playwright + Lighthouse"
}
```

### **Dev Tools**

- **React DevTools** - Component debugging
- **Three.js Inspector** - 3D scene analysis
- **Spector.js** - WebGL debugging
- **Lighthouse** - Performance auditing

---

## 🎯 **CONCLUSION**

Este mapa 3D es el **blueprint exacto** para construir NeoProxy. Cada coordenada, cada transición, cada interacción está diseñada para crear una experiencia que no solo gane premios, sino que **defina una nueva categoría**.

**El Living Network no es solo una metáfora. Es el ADN del sistema.**

¿Listo para construir el sitio que redefinirá las webs premiadas? 🗺️✨

---

*Document Version: 1.0*
*Last Updated: March 13, 2026*
*Status: Ready for Implementation*</content>
<parameter name="filePath">/home/darkproxy/neoproxy-repo/NEOPROXY_3D_MAP_BLUEPRINT.md