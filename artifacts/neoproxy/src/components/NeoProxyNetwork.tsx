import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// =========================================
// NEOPROXY 3D MAP - IMPLEMENTATION
// =========================================

// Node Configuration
const NODES_CONFIG = {
  KERNEL: { position: [0, 0, 0], radius: 2.0, importance: 10, color: '#00ff9c', label: 'KERNEL' },
  AGENTS: { position: [-6, 3, 2], radius: 1.5, importance: 8, color: '#3aa8ff', label: 'AGENTS' },
  MODELS: { position: [6, 4, -1], radius: 1.5, importance: 8, color: '#ff6b35', label: 'MODELS' },
  LAB: { position: [0, 2, 6], radius: 1.3, importance: 6, color: '#ffaa00', label: 'LAB' },
  PORTAL: { position: [0, -3, 0], radius: 1.0, importance: 7, color: '#ffffff', label: 'PORTAL' },
  ARCHIVE: { position: [-4, -2, -4], radius: 1.2, importance: 5, color: '#666666', label: 'ARCHIVE' }
};

// Connection Configuration
const CONNECTIONS_CONFIG = [
  { from: 'KERNEL', to: 'AGENTS', type: 'primary' },
  { from: 'KERNEL', to: 'MODELS', type: 'primary' },
  { from: 'KERNEL', to: 'LAB', type: 'secondary' },
  { from: 'KERNEL', to: 'PORTAL', type: 'primary' },
  { from: 'KERNEL', to: 'ARCHIVE', type: 'tertiary' },
  { from: 'AGENTS', to: 'MODELS', type: 'data_flow' },
  { from: 'MODELS', to: 'LAB', type: 'creative_flow' },
  { from: 'LAB', to: 'PORTAL', type: 'output_flow' }
];

const CONNECTION_TYPES = {
  primary: { width: 0.05, color: '#00ff9c', pulseSpeed: 2.0, opacity: 0.8 },
  secondary: { width: 0.03, color: '#3aa8ff', pulseSpeed: 1.5, opacity: 0.6 },
  tertiary: { width: 0.02, color: '#666666', pulseSpeed: 1.0, opacity: 0.4 },
  data_flow: { width: 0.04, color: '#ff6b35', pulseSpeed: 3.0, opacity: 0.7, animated: true },
  creative_flow: { width: 0.04, color: '#ffaa00', pulseSpeed: 2.5, opacity: 0.7, animated: true },
  output_flow: { width: 0.04, color: '#ffffff', pulseSpeed: 1.8, opacity: 0.7, animated: true }
};

// =========================================
// COMPONENTS
// =========================================

// Network Node Component
function NetworkNode({ config, onHover, onClick, isHovered, isActive }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [scale, setScale] = useState(1.0);
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  useFrame((state) => {
    if (meshRef.current) {
      // Breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
      meshRef.current.scale.setScalar(scale * breath);
    }

    if (glowRef.current && glowRef.current.material) {
      glowRef.current.material.uniforms.glowIntensity.value = glowIntensity;
    }
  });

  useEffect(() => {
    if (isHovered) {
      gsap.to(meshRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
      gsap.to(glowRef.current.material.uniforms, { glowIntensity: 0.8, duration: 0.3 });
    } else if (isActive) {
      gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 });
      gsap.to(glowRef.current.material.uniforms, { glowIntensity: 1.0, duration: 0.3 });
    } else {
      gsap.to(meshRef.current.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.3 });
      gsap.to(glowRef.current.material.uniforms, { glowIntensity: 0.3, duration: 0.3 });
    }
  }, [isHovered, isActive]);

  return (
    <group position={config.position}>
      {/* Main Node */}
      <Sphere ref={meshRef} args={[config.radius, 32, 32]}>
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Glow Effect */}
      <Sphere ref={glowRef} args={[config.radius * 1.5, 32, 32]}>
        <shaderMaterial
          uniforms={{
            glowColor: { value: new THREE.Color(config.color) },
            glowIntensity: { value: 0.3 }
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            uniform float glowIntensity;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, intensity * glowIntensity);
            }
          `}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Label */}
      {isHovered && (
        <Html position={[0, config.radius + 0.5, 0]} center>
          <div style={{
            color: config.color,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0,0,0,0.8)',
            pointerEvents: 'none'
          }}>
            {config.label}
          </div>
        </Html>
      )}

      {/* Invisible interaction sphere */}
      <Sphere
        args={[config.radius * 2, 8, 8]}
        onPointerEnter={() => onHover(config.label, true)}
        onPointerLeave={() => onHover(config.label, false)}
        onClick={() => onClick(config.label)}
        visible={false}
      />
    </group>
  );
}

// Network Connection Component
function NetworkConnection({ from, to, type }) {
  const lineRef = useRef();
  const pulseRef = useRef();
  const config = CONNECTION_TYPES[type];

  const points = useMemo(() => {
    const start = new THREE.Vector3(...NODES_CONFIG[from].position);
    const end = new THREE.Vector3(...NODES_CONFIG[to].position);

    // Create curved connection
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    midPoint.y += 1; // Add some height for organic feel

    return [start, midPoint, end];
  }, [from, to]);

  useFrame((state) => {
    if (pulseRef.current && config.animated) {
      const pulse = Math.sin(state.clock.elapsedTime * config.pulseSpeed) * 0.5 + 0.5;
      pulseRef.current.material.opacity = config.opacity * pulse;
    }
  });

  return (
    <group>
      {/* Main connection line */}
      <Line
        ref={lineRef}
        points={points}
        color={config.color}
        lineWidth={config.width * 100}
        transparent
        opacity={config.opacity}
      />

      {/* Animated pulse effect */}
      {config.animated && (
        <Line
          ref={pulseRef}
          points={points}
          color={config.color}
          lineWidth={config.width * 200}
          transparent
          opacity={0}
        />
      )}
    </group>
  );
}

// Data Pulse Component
function DataPulse({ path, speed = 2.0, color = '#3aa8ff' }) {
  const pulseRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to({}, {
      duration: 1 / speed,
      onUpdate: () => {
        setProgress(tl.progress());
      }
    });
  }, [speed]);

  const position = useMemo(() => {
    if (!path || path.length < 2) return [0, 0, 0];

    const curve = new THREE.CatmullRomCurve3(path.map(p => new THREE.Vector3(...p)));
    return curve.getPointAt(progress).toArray();
  }, [path, progress]);

  return (
    <Sphere ref={pulseRef} args={[0.1, 8, 8]} position={position}>
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </Sphere>
  );
}

// Camera Controller
function CameraController({ targetNode, cameraState }) {
  const { camera } = useThree();
  const cameraRef = useRef();

  useEffect(() => {
    if (!targetNode) return;

    const nodePos = NODES_CONFIG[targetNode].position;
    const targetPos = new THREE.Vector3(...nodePos);
    const cameraPos = new THREE.Vector3(targetPos.x + 3, targetPos.y + 1, targetPos.z + 3);

    gsap.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: 1.5,
      ease: "back.out(1.7)"
    });

    gsap.to(camera, {
      duration: 1.5,
      ease: "back.out(1.7)",
      onUpdate: () => {
        camera.lookAt(targetPos);
      }
    });
  }, [targetNode]);

  useFrame((state) => {
    if (cameraState === 'KERNEL_ORBIT' && !targetNode) {
      const time = state.clock.elapsedTime * 0.5;
      const radius = 12;
      const height = 3;

      camera.position.x = Math.cos(time) * radius;
      camera.position.z = Math.sin(time) * radius;
      camera.position.y = height + Math.sin(time * 0.5) * 2;

      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Energy Probe Cursor
function EnergyProbeCursor() {
  const { viewport, mouse } = useThree();
  const cursorRef = useRef();
  const trailRef = useRef();
  const trail = useRef([]);

  useFrame((state) => {
    if (cursorRef.current) {
      // Convert mouse position to 3D world position
      const worldX = (mouse.x * viewport.width) / 2;
      const worldY = (mouse.y * viewport.height) / 2;

      cursorRef.current.position.set(worldX, worldY, 0);

      // Update trail
      trail.current.push([worldX, worldY, 0]);
      if (trail.current.length > 20) {
        trail.current.shift();
      }

      if (trailRef.current) {
        trailRef.current.geometry.setFromPoints(
          trail.current.map(p => new THREE.Vector3(...p))
        );
      }
    }
  });

  return (
    <group>
      {/* Main cursor */}
      <Sphere ref={cursorRef} args={[0.05, 8, 8]}>
        <meshBasicMaterial color="#00ff9c" transparent opacity={0.8} />
      </Sphere>

      {/* Trail */}
      <line ref={trailRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00ff9c" transparent opacity={0.3} />
      </line>
    </group>
  );
}

// Main NeoProxy Network Component
export default function NeoProxyNetwork() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [cameraState, setCameraState] = useState('KERNEL_ORBIT');

  const handleNodeHover = (nodeId, isHovered) => {
    setHoveredNode(isHovered ? nodeId : null);
  };

  const handleNodeClick = (nodeId) => {
    setActiveNode(nodeId);
    setCameraState('NODE_FOCUS');

    // Auto-return to orbit after 5 seconds
    setTimeout(() => {
      setActiveNode(null);
      setCameraState('KERNEL_ORBIT');
    }, 5000);
  };

  // Generate data pulse paths
  const pulsePaths = useMemo(() => {
    return CONNECTIONS_CONFIG
      .filter(conn => CONNECTION_TYPES[conn.type].animated)
      .map(conn => [
        NODES_CONFIG[conn.from].position,
        NODES_CONFIG[conn.to].position
      ]);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ff9c" />

      {/* Camera Controller */}
      <CameraController targetNode={activeNode} cameraState={cameraState} />

      {/* Energy Probe Cursor */}
      <EnergyProbeCursor />

      {/* Network Nodes */}
      {Object.entries(NODES_CONFIG).map(([key, config]) => (
        <NetworkNode
          key={key}
          config={config}
          onHover={handleNodeHover}
          onClick={handleNodeClick}
          isHovered={hoveredNode === key}
          isActive={activeNode === key}
        />
      ))}

      {/* Network Connections */}
      {CONNECTIONS_CONFIG.map((conn, index) => (
        <NetworkConnection
          key={index}
          from={conn.from}
          to={conn.to}
          type={conn.type}
        />
      ))}

      {/* Data Pulses */}
      {pulsePaths.map((path, index) => (
        <DataPulse
          key={index}
          path={path}
          speed={CONNECTION_TYPES[CONNECTIONS_CONFIG[index].type].pulseSpeed}
          color={CONNECTION_TYPES[CONNECTIONS_CONFIG[index].type].color}
        />
      ))}
    </Canvas>
  );
}

// =========================================
// USAGE EXAMPLE
// =========================================

/*
import NeoProxyNetwork from './components/NeoProxyNetwork';

export default function HomePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <NeoProxyNetwork />
    </div>
  );
}
*/</content>
<parameter name="filePath">/home/darkproxy/neoproxy-repo/src/components/NeoProxyNetwork.tsx