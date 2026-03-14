'use client'

import { useEffect, useRef, useState } from 'react'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders' // Import loaders for GLB/GLTF/OBJ
import { GridMaterial } from 'babylonjs-materials'
import styles from './fabrication.module.css'

type MaskModel = {
    id: string
    name: string
    file: string // filename in public/models/
    desc: string
    date: string
    material: string
}

// Placeholder data - user will replace files later
const MASKS: MaskModel[] = [
    {
        id: '001',
        name: 'NEXUS_PROXY_CORE',
        file: 'nexusproxy.glb',
        desc: 'Primary system avatar construct. High-fidelity scan.',
        date: '2026-01-29',
        material: 'UNKNOWN_ALLOY'
    },
    {
        id: '002',
        name: 'MIDFACE_ARMOR',
        file: 'midface.glb',
        desc: 'Tactical lower-face protection unit. Respiratory filtration.',
        date: '2025-12-15',
        material: 'RESIN TOUGH'
    },
    {
        id: '003',
        name: 'TRICKSTER_MOD',
        file: 'trickster.glb',
        desc: 'Stealth-operative disguise module. Lightweight composite.',
        date: '2026-01-10',
        material: 'PETG / ARAMID'
    },
    {
        id: '004',
        name: 'ONI_DAEMON',
        file: 'oni.glb',
        desc: 'Heavy assault psychological warfare visage.',
        date: '2025-10-31',
        material: 'PLASTEEL'
    }
]

export default function MaskGallery() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [currentIdx, setCurrentIdx] = useState(0)
    const [engine, setEngine] = useState<BABYLON.Engine | null>(null)
    const [scene, setScene] = useState<BABYLON.Scene | null>(null)

    // Keep track of the current mesh to dispose it when switching
    const currentMeshRef = useRef<BABYLON.AbstractMesh | null>(null)

    // Initialize Engine & Scene
    useEffect(() => {
        if (!canvasRef.current) return

        const newEngine = new BABYLON.Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true
        })

        const newScene = new BABYLON.Scene(newEngine)
        // Darker Cyberpunk background
        newScene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.05, 1)

        // FOG for depth fading
        newScene.fogMode = BABYLON.Scene.FOGMODE_EXP2
        newScene.fogDensity = 0.03
        newScene.fogColor = new BABYLON.Color3(0.02, 0.02, 0.05)

        // GLOW LAYER (Bloom)
        const gl = new BABYLON.GlowLayer("glow", newScene)
        gl.intensity = 0.6

        // Environment
        newScene.createDefaultEnvironment({
            createSkybox: false,
            createGround: false,
        })

        // Camera
        const camera = new BABYLON.ArcRotateCamera(
            'camera1',
            Math.PI / 2, // Alpha (Horizontal) - Front view
            Math.PI / 2.5, // Beta (Vertical)
            4, // Radius
            new BABYLON.Vector3(0, 0, 0),
            newScene
        )
        camera.attachControl(canvasRef.current, true)
        camera.minZ = 0.1
        camera.wheelPrecision = 50

        // Limit rotation (Lock to strict front view)
        // Alpha: Horizontal rotation limits (Approx 30 degrees each way)
        camera.lowerAlphaLimit = Math.PI / 2 - 0.5
        camera.upperAlphaLimit = Math.PI / 2 + 0.5

        // Beta: Vertical rotation limits (Very restricted)
        camera.lowerBetaLimit = Math.PI / 2.5 - 0.3
        camera.upperBetaLimit = Math.PI / 2.5 + 0.3

        // Zoom limits (Radius)
        camera.lowerRadiusLimit = 1.5  // Can't get closer than this
        camera.upperRadiusLimit = 6  // Can't go further than this

        // Lighting
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), newScene)
        light.intensity = 0.6
        light.groundColor = new BABYLON.Color3(0.1, 0.1, 0.2) // Slight blue uplift from below

        const spotLight = new BABYLON.SpotLight(
            "spotLight",
            new BABYLON.Vector3(2, 5, 2),
            new BABYLON.Vector3(-0.5, -1, -0.5),
            Math.PI / 3,
            2,
            newScene
        );
        spotLight.intensity = 0.8
        spotLight.diffuse = new BABYLON.Color3(0, 0.9, 1) // Cyan key light

        // =========================================
        // HOLO GRID FLOOR
        // =========================================
        const gridMat = new GridMaterial("gridMat", newScene)
        gridMat.majorUnitFrequency = 5
        gridMat.minorUnitVisibility = 0.3
        gridMat.gridRatio = 1
        gridMat.backFaceCulling = false
        gridMat.mainColor = new BABYLON.Color3(0, 0.05, 0.1)
        gridMat.lineColor = new BABYLON.Color3(0, 0.5, 0.5) // Cyan lines
        gridMat.opacity = 0.8

        // Offset the ground so the mask floats slightly above it
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, newScene)
        ground.material = gridMat
        ground.position.y = -1.5

        // Run loop
        newEngine.runRenderLoop(() => {
            newScene.render()
        })

        window.addEventListener('resize', () => newEngine.resize())

        setEngine(newEngine)
        setScene(newScene)

        return () => {
            newEngine.dispose()
            window.removeEventListener('resize', () => newEngine.resize())
        }
    }, [])

    // Load Model when index changes
    useEffect(() => {
        if (!scene || !engine) return

        const loadModel = async () => {
            // Cleanup previous
            if (currentMeshRef.current) {
                currentMeshRef.current.dispose()
                currentMeshRef.current = null
            }

            const mask = MASKS[currentIdx]
            let mesh: BABYLON.AbstractMesh | null = null

            if (mask.file === 'placeholder') {
                // Create a cool placeholder box/knot
                mesh = BABYLON.MeshBuilder.CreateTorusKnot("knot", { radius: 0.5, tube: 0.2, radialSegments: 128, tubularSegments: 64 }, scene);
                const mat = new BABYLON.StandardMaterial("mat", scene);
                mat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
                mat.emissiveColor = new BABYLON.Color3(0, 0.2, 0.2);
                mat.specularColor = new BABYLON.Color3(1, 1, 1);
                mat.wireframe = true; // Tech look
                mesh.material = mat;
            } else {
                // Try to load real file
                try {
                    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "/models/", mask.file, scene);
                    mesh = result.meshes[0];
                    // Normalize size?
                } catch (e) {
                    console.error("Failed to load model", e)
                }
            }

            if (mesh) {
                currentMeshRef.current = mesh

                // SCANNER EFFECT (Animation)
                // simple rotation for now
                scene.registerBeforeRender(() => {
                    if (mesh) mesh.rotation.y += 0.005
                })
            }
        }

        loadModel()

    }, [currentIdx, scene, engine])

    return (
        <div className={styles.container}>
            {/* 3D Canvas */}
            <div className={styles.canvasWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />
            </div>

            {/* UI Overlay */}
            <div className={styles.headerOverlay}>
                <h1 className={styles.title}>
                    FABRICATION_DB
                </h1>
                <div className={styles.infoBox}>
                    <h2 className={styles.maskName}>{MASKS[currentIdx].name}</h2>
                    <div className={styles.maskId}>ID: {MASKS[currentIdx].id}</div>
                    <p className={styles.maskDesc}>{MASKS[currentIdx].desc}</p>

                    <div className={styles.metaGrid}>
                        <div>
                            <span className={styles.label}>DATE_SCAN</span>
                            {MASKS[currentIdx].date}
                        </div>
                        <div>
                            <span className={styles.label}>MATERIAL</span>
                            {MASKS[currentIdx].material}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <button
                    onClick={() => setCurrentIdx(prev => (prev - 1 + MASKS.length) % MASKS.length)}
                    className={styles.button}
                >
                    [ PREV_UNIT ]
                </button>
                <button
                    onClick={() => setCurrentIdx(prev => (prev + 1) % MASKS.length)}
                    className={styles.button}
                >
                    [ NEXT_UNIT ]
                </button>
            </div>

            <div className={styles.backLink}>
                <a href="/" className={styles.backButton}>
                    [ RETURN_ROOT ]
                </a>
            </div>

        </div>
    )
}
