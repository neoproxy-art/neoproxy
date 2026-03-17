"use client";

import { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import Link from 'next/link';
import { useAesthetics } from '@/components/npos/AestheticProvider';

export default function StardustPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<BABYLON.Scene | null>(null);
    const engineRef = useRef<BABYLON.Engine | null>(null);
    const mainGroupRef = useRef<BABYLON.TransformNode | null>(null);
    const pipelineRef = useRef<any>(null);
    const cameraRef = useRef<BABYLON.ArcRotateCamera | null>(null);

    const [terminalLines, setTerminalLines] = useState<{ text: string, type: string, time: string }[]>([]);
    const [terminalInput, setTerminalInput] = useState("");
    const [fps, setFps] = useState(60);
    const [isPostActive, setIsPostActive] = useState(true);
    const [config, setConfig] = useState({
        density: 80,
        complexity: 50,
        scale: 1.0,
        chaos: 0.1,
        seed: "A8F20-X"
    });

    const { tokens } = useAesthetics();

    const logToTerminal = (text: string, type = "info") => {
        const time = new Date().toLocaleTimeString();
        setTerminalLines(prev => [...prev.slice(-15), { text, type, time }]);
    };

    const generateArt = (overrideConfig?: typeof config) => {
        const scene = sceneRef.current;
        const mainGroup = mainGroupRef.current;
        if (!scene || !mainGroup) return;

        const currentConfig = overrideConfig || config;

        // Clear previous
        mainGroup.getChildMeshes().forEach(m => m.dispose());

        const count = currentConfig.density;
        const chaosAmt = currentConfig.chaos;
        const sizeBase = currentConfig.scale;
        
        const glassMat = new BABYLON.PBRMaterial("glassMat", scene);
        glassMat.metallic = 0.1;
        glassMat.roughness = 0.5 - (currentConfig.complexity / 200);
        glassMat.alpha = 0.3;
        glassMat.transparencyMode = 3;
        glassMat.albedoColor = new BABYLON.Color3(0.1, 0.4, 0.8);

        const glowMat = new BABYLON.PBRMaterial("glowMat", scene);
        glowMat.emissiveColor = new BABYLON.Color3(0, 0.8, 1);
        glowMat.emissiveIntensity = 2;

        for (let i = 0; i < count; i++) {
            const type = Math.random() * currentConfig.complexity;
            let mesh: BABYLON.Mesh;
            
            if (type < 20) {
                mesh = BABYLON.MeshBuilder.CreateBox("gen", { size: sizeBase * (0.5 + Math.random()) }, scene);
            } else if (type < 50) {
                mesh = BABYLON.MeshBuilder.CreateIcoSphere("gen", { radius: sizeBase * 0.5, subdivisions: 1 }, scene);
            } else {
                mesh = BABYLON.MeshBuilder.CreateTorus("gen", { diameter: sizeBase, thickness: 0.1 }, scene);
            }
            
            mesh.parent = mainGroup;
            
            const radius = 10 + (Math.random() * 5 * chaosAmt);
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            
            mesh.position = new BABYLON.Vector3(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            mesh.material = (Math.random() > 0.9) ? glowMat : glassMat;
            
            // Subtle pulse animation
            const rotationSpeed = (Math.random() - 0.5) * 0.02;
            scene.onBeforeRenderObservable.add(() => {
                if (!mesh || mesh.isDisposed()) return;
                mesh.rotation.y += rotationSpeed;
                mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002 * chaosAmt;
            });
        }

        const newSeed = Math.random().toString(36).substring(7).toUpperCase();
        setConfig(prev => ({ ...prev, seed: newSeed }));
    };

    const processCommand = (cmd: string) => {
        const parts = cmd.trim().toLowerCase().split(" ");
        const command = parts[0];
        const args = parts.slice(1);

        logToTerminal(`Executing: ${cmd}`, "command");

        if (command === ",hxa") {
            const scene = sceneRef.current;
            const mainGroup = mainGroupRef.current;
            if (!scene || !mainGroup) return;

            for (let i = 0; i < 20; i++) {
                const m = BABYLON.MeshBuilder.CreateBox("hxa", {size: 0.2}, scene);
                m.parent = mainGroup;
                const dir = new BABYLON.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
                const mat = new BABYLON.PBRMaterial("m", scene);
                mat.emissiveColor = new BABYLON.Color3(0, 1, 1);
                mat.emissiveIntensity = 8;
                m.material = mat;
                scene.onBeforeRenderObservable.add(() => {
                    if (m && !m.isDisposed()) {
                        m.position.addInPlace(dir.scale(0.2));
                        m.scaling.addInPlace(new BABYLON.Vector3(0.01, 0.01, 0.01));
                    }
                });
            }
            logToTerminal("Hyper-Expansion Array (,HXA) active.");
        } else if (command === "regen") {
            generateArt();
            logToTerminal("Neural sync complete.");
        } else if (command === "color") {
            if (args[0]) {
                const scene = sceneRef.current;
                const mainGroup = mainGroupRef.current;
                if (mainGroup) {
                    const col = BABYLON.Color3.FromHexString(args[0]);
                    mainGroup.getChildMeshes().forEach(m => {
                        if (m.material instanceof BABYLON.PBRMaterial) {
                            m.material.albedoColor = col;
                        }
                    });
                    logToTerminal(`Spectrum shifted to ${args[0]}`);
                }
            }
        } else if (command === "bloom") {
            const active = args[0] === "on";
            if (pipelineRef.current) {
                pipelineRef.current.bloomEnabled = active;
                setIsPostActive(active);
                logToTerminal(`Bloom ${active ? 'ENABLED' : 'DISABLED'}`);
            }
        } else if (command === "clear") {
            setTerminalLines([]);
        } else if (command === "help") {
            logToTerminal("Available: regen, color [hex], bloom [on/off], clear, ,HXA");
        } else {
            logToTerminal(`Unknown command: ${command}`, "error");
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new BABYLON.Engine(canvasRef.current, true);
        engineRef.current = engine;
        const scene = new BABYLON.Scene(engine);
        sceneRef.current = scene;

        scene.clearColor = new BABYLON.Color4(0.01, 0.01, 0.02, 1);

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 30, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvasRef.current, true);
        cameraRef.current = camera;
        camera.useAutoRotationBehavior = true;
        camera.autoRotationBehavior.idleRotationSpeed = 0.1;

        const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 15, 0), scene);
        light.intensity = 0.8;

        const pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene, [camera]);
        pipeline.bloomEnabled = true;
        pipeline.bloomThreshold = 0.7;
        pipeline.bloomWeight = 0.5;
        pipelineRef.current = pipeline;

        const mainGroup = new BABYLON.TransformNode("mainGroup", scene);
        mainGroupRef.current = mainGroup;

        generateArt();

        engine.runRenderLoop(() => {
            scene.render();
            mainGroup.rotation.y += 0.001;
        });

        const fpsInterval = setInterval(() => {
            setFps(Math.round(engine.getFps()));
        }, 1000);

        const handleResize = () => engine.resize();
        window.addEventListener("resize", handleResize);

        logToTerminal("Stardust OS v2.1 (Next.js Integrated) loaded.");

        return () => {
            clearInterval(fpsInterval);
            window.removeEventListener("resize", handleResize);
            engine.dispose();
        };
    }, []);

    const updateParam = (key: string, val: number) => {
        setConfig(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="stardust-container" style={{ position: 'relative', width: '100vw', height: '100vh', background: '#020205', color: '#fff', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', outline: 'none' }} />

            <div className="overlay" style={{ position: 'absolute', inset: 0, padding: '40px', pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '4px' }}>
                        <span style={{ color: '#00f2ff' }}>NEO</span>PROXY <span style={{fontSize: '10px', opacity: 0.5}}>/ STARDUST</span>
                    </div>
                    <Link href="/npos" style={{ pointerEvents: 'auto', border: '1px solid #00f2ff', padding: '5px 15px', color: '#00f2ff', textDecoration: 'none', fontSize: '10px', fontWeight: 600 }}>EXIT</Link>
                </header>

                <main style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Left Panel */}
                    <div className="glass-panel" style={{ pointerEvents: 'auto', width: '380px', padding: '30px', background: 'rgba(10, 10, 20, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 600, color: '#00f2ff' }}>STARDUST CONSOLE</h1>
                        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Procedural geometry engine active.</p>

                        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,242,255,0.1)', borderRadius: '16px', padding: '15px', marginBottom: '20px' }}>
                            <div style={{ height: '100px', overflowY: 'auto', fontSize: '10px', fontFamily: 'monospace', marginBottom: '10px' }}>
                                {terminalLines.map((line, i) => (
                                    <div key={i} style={{ marginBottom: '4px', opacity: 0.8 }}>
                                        <span style={{ color: '#00f2ff' }}>[{line.time}]</span> {line.text}
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                                <span style={{ color: '#00f2ff', marginRight: '8px' }}>&gt;</span>
                                <input 
                                    type="text" 
                                    value={terminalInput}
                                    onChange={(e) => setTerminalInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if (terminalInput) processCommand(terminalInput);
                                            setTerminalInput("");
                                        }
                                    }}
                                    placeholder="Type command..."
                                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#00f2ff', fontSize: '11px', width: '100%' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
                            {[',HXA', 'REGEN', 'BLOOM ON', 'CYAN', 'PINK', 'CLEAR'].map(cmd => (
                                <button 
                                    key={cmd}
                                    onClick={() => processCommand(cmd === 'CYAN' ? 'color #00f2ff' : cmd === 'PINK' ? 'color #ff00ff' : cmd.toLowerCase())}
                                    style={{ background: 'rgba(0,242,255,0.05)', border: '1px solid rgba(0,242,255,0.1)', color: '#00f2ff', padding: '8px', fontSize: '9px', borderRadius: '6px', cursor: 'pointer' }}
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => generateArt()}
                            style={{ width: '100%', padding: '15px', background: '#00f2ff', color: '#000', fontSize: '11px', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                        >
                            REGENERATE SYNC
                        </button>
                    </div>

                    {/* Right Panel */}
                    <div className="glass-panel" style={{ pointerEvents: 'auto', width: '300px', padding: '30px', background: 'rgba(10, 10, 20, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h1 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 600, color: '#fff' }}>SYNTHESIS</h1>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>
                                <span>DENSITY</span> <span style={{ color: '#00f2ff' }}>{config.density}</span>
                            </div>
                            <input type="range" min="10" max="300" value={config.density} onChange={(e) => updateParam('density', parseInt(e.target.value))} style={{ width: '100%' }} />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>
                                <span>COMPLEXITY</span> <span style={{ color: '#00f2ff' }}>{config.complexity}%</span>
                            </div>
                            <input type="range" min="1" max="100" value={config.complexity} onChange={(e) => updateParam('complexity', parseInt(e.target.value))} style={{ width: '100%' }} />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>
                                <span>SCALE</span> <span style={{ color: '#00f2ff' }}>{config.scale.toFixed(1)}</span>
                            </div>
                            <input type="range" min="1" max="50" value={config.scale * 10} onChange={(e) => updateParam('scale', parseInt(e.target.value) / 10)} style={{ width: '100%' }} />
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}>SEED:</span>
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#00f2ff' }}>#{config.seed}</span>
                        </div>
                    </div>
                </main>

                <footer style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '10px', opacity: 0.4 }}>
                    <div>{fps} FPS // RENDER_MODE: PBR_HIGH</div>
                    <div>NEOPROXY // ARTIFICIAL_STARDUST_ENGINE</div>
                </footer>
            </div>

            <style jsx>{`
                input[type="range"] {
                    -webkit-appearance: none;
                    height: 4px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 2px;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    background: #00f2ff;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,242,255,0.5);
                }
            `}</style>
        </div>
    );
}
