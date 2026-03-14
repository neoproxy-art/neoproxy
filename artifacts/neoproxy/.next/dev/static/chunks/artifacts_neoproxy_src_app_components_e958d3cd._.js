(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/artifacts/neoproxy/src/app/components/TheAwakening.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "TheAwakening-module__uOyaLq__active",
  "awakeningCanvas": "TheAwakening-module__uOyaLq__awakeningCanvas",
  "awakeningContainer": "TheAwakening-module__uOyaLq__awakeningContainer",
  "fadeOut": "TheAwakening-module__uOyaLq__fadeOut",
  "progressDot": "TheAwakening-module__uOyaLq__progressDot",
  "progressIndicator": "TheAwakening-module__uOyaLq__progressIndicator",
  "sceneText": "TheAwakening-module__uOyaLq__sceneText",
  "skipButton": "TheAwakening-module__uOyaLq__skipButton",
  "textOverlay": "TheAwakening-module__uOyaLq__textOverlay",
  "textPulse": "TheAwakening-module__uOyaLq__textPulse",
});
}),
"[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TheAwakening
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/babylonjs@8.55.1/node_modules/babylonjs/babylon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/artifacts/neoproxy/src/app/components/TheAwakening.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TheAwakening({ onComplete, skipIntro }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [currentScene, setCurrentScene] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showSkip, setShowSkip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        scene: null,
        engine: null,
        particles: [],
        networkNodes: [],
        connections: [],
        logo: null,
        agentLabels: []
    });
    const scenes = [
        {
            name: 'darkness',
            duration: 1000,
            text: 'Initializing System...'
        },
        {
            name: 'network',
            duration: 1500,
            text: 'Establishing Connections...'
        },
        {
            name: 'logo',
            duration: 1500,
            text: 'NeoProxy'
        },
        {
            name: 'agents',
            duration: 1000,
            text: 'Agents Online'
        },
        {
            name: 'transition',
            duration: 1000,
            text: 'System Ready'
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TheAwakening.useEffect": ()=>{
            if (skipIntro) {
                onComplete();
                return;
            }
            const timer = setTimeout({
                "TheAwakening.useEffect.timer": ()=>setShowSkip(true)
            }["TheAwakening.useEffect.timer"], 2000);
            return ({
                "TheAwakening.useEffect": ()=>clearTimeout(timer)
            })["TheAwakening.useEffect"];
        }
    }["TheAwakening.useEffect"], [
        skipIntro,
        onComplete
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TheAwakening.useEffect": ()=>{
            if (skipIntro || !canvasRef.current) return;
            let engine;
            try {
                engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Engine"](canvasRef.current, true, {
                    preserveDrawingBuffer: true,
                    stencil: true
                });
            } catch (e) {
                // WebGL not supported — skip intro
                onComplete();
                return;
            }
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"](engine);
            scene.clearColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color4"](0, 0, 0, 1);
            // Camera
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniversalCamera"]('camera', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -10), scene);
            camera.setTarget(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"].Zero());
            // Lighting
            const light = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HemisphericLight"]('light', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1), scene);
            light.intensity = 0.3;
            sceneRef.current = {
                scene,
                engine,
                particles: [],
                networkNodes: [],
                connections: [],
                logo: null,
                agentLabels: []
            };
            // Start scene sequence
            startSceneSequence();
            engine.runRenderLoop({
                "TheAwakening.useEffect": ()=>{
                    scene.render();
                }
            }["TheAwakening.useEffect"]);
            return ({
                "TheAwakening.useEffect": ()=>{
                    engine.dispose();
                }
            })["TheAwakening.useEffect"];
        }
    }["TheAwakening.useEffect"], [
        skipIntro
    ]);
    const startSceneSequence = ()=>{
        let sceneIndex = 0;
        const runScene = async ()=>{
            if (sceneIndex >= scenes.length) {
                onComplete();
                return;
            }
            setCurrentScene(sceneIndex);
            const current = scenes[sceneIndex];
            switch(current.name){
                case 'darkness':
                    await sceneDarkness();
                    break;
                case 'network':
                    await sceneNetwork();
                    break;
                case 'logo':
                    await sceneLogo();
                    break;
                case 'agents':
                    await sceneAgents();
                    break;
                case 'transition':
                    await sceneTransition();
                    break;
            }
            sceneIndex++;
            setTimeout(runScene, 100);
        };
        runScene();
    };
    const sceneDarkness = async ()=>{
        const { scene } = sceneRef.current;
        if (!scene) return;
        // Create initial pulse
        const pulse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere('pulse', {
            diameter: 0.1
        }, scene);
        const pulseMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"]('pulseMat', scene);
        pulseMaterial.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0, 1, 0.617);
        pulseMaterial.alpha = 0.8;
        pulse.material = pulseMaterial;
        // Animate pulse
        let scale = 0.1;
        let alpha = 0.8;
        const pulseAnimation = setInterval(()=>{
            scale += 0.02;
            alpha -= 0.015;
            pulse.scaling = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](scale, scale, scale);
            if (pulse.material) {
                pulse.material.alpha = alpha;
            }
            if (alpha <= 0) {
                clearInterval(pulseAnimation);
                pulse.dispose();
            }
        }, 16);
    };
    const sceneNetwork = async ()=>{
        const { scene, networkNodes, connections } = sceneRef.current;
        if (!scene) return;
        // Create network nodes
        const nodeCount = 20;
        const nodes = [];
        for(let i = 0; i < nodeCount; i++){
            const node = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere(`node${i}`, {
                diameter: 0.05
            }, scene);
            // Position nodes in a sphere pattern
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3 + Math.random() * 2;
            node.position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
            const nodeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"](`nodeMat${i}`, scene);
            nodeMaterial.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0, 0.831, 1);
            nodeMaterial.alpha = 0;
            node.material = nodeMaterial;
            nodes.push(node);
            networkNodes.push(node);
        }
        // Animate nodes appearing
        nodes.forEach((node, index)=>{
            setTimeout(()=>{
                if (node.material) {
                    node.material.alpha = 0.8;
                }
            }, index * 50);
        });
        // Create connections between nearby nodes
        setTimeout(()=>{
            for(let i = 0; i < nodes.length; i++){
                for(let j = i + 1; j < nodes.length; j++){
                    const distance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"].Distance(nodes[i].position, nodes[j].position);
                    if (distance < 2) {
                        const line = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateLines(`line${i}_${j}`, {
                            points: [
                                nodes[i].position,
                                nodes[j].position
                            ]
                        }, scene);
                        line.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0, 1, 0.617);
                        line.alpha = 0.3;
                        connections.push(line);
                    }
                }
            }
        }, 500);
    };
    const sceneLogo = async ()=>{
        const { scene, networkNodes } = sceneRef.current;
        if (!scene) return;
        // Create NeoProxy text using planes (simplified)
        const logoGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransformNode"]('logoGroup', scene);
        // Create central glowing sphere as logo placeholder
        const logo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere('logo', {
            diameter: 0.5
        }, scene);
        const logoMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"]('logoMat', scene);
        logoMaterial.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0); // Red color matching current theme
        logoMaterial.alpha = 0;
        logo.material = logoMaterial;
        logo.parent = logoGroup;
        // Animate logo appearing
        let alpha = 0;
        const logoAnimation = setInterval(()=>{
            alpha += 0.02;
            if (logo.material) {
                logo.material.alpha = alpha;
            }
            if (alpha >= 1) {
                clearInterval(logoAnimation);
            }
        }, 16);
        // Make network nodes orbit around logo
        networkNodes.forEach((node, index)=>{
            const angle = index / networkNodes.length * Math.PI * 2;
            const radius = 4;
            const orbitAnimation = setInterval(()=>{
                const time = Date.now() * 0.001;
                node.position.x = Math.cos(angle + time * 0.5) * radius;
                node.position.z = Math.sin(angle + time * 0.5) * radius;
            }, 16);
        });
        sceneRef.current.logo = logo;
    };
    const sceneAgents = async ()=>{
        const { scene } = sceneRef.current;
        if (!scene) return;
        const agents = [
            'Snake',
            'Gennos',
            'D',
            'Trickzter'
        ];
        const agentLabels = [];
        agents.forEach((agent, index)=>{
            // Create agent indicator
            const indicator = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere(`agent${index}`, {
                diameter: 0.1
            }, scene);
            const angle = index / agents.length * Math.PI * 2;
            const radius = 2;
            indicator.position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
            const agentMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"](`agentMat${index}`, scene);
            agentMaterial.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.2, 0.2); // Red theme
            agentMaterial.alpha = 0;
            indicator.material = agentMaterial;
            // Flash agent
            setTimeout(()=>{
                if (agentMaterial) {
                    agentMaterial.alpha = 1;
                    setTimeout(()=>{
                        agentMaterial.alpha = 0.3;
                    }, 500);
                }
            }, index * 200);
            agentLabels.push(indicator);
        });
        sceneRef.current.agentLabels = agentLabels;
    };
    const sceneTransition = async ()=>{
        const { scene, networkNodes, connections, logo } = sceneRef.current;
        if (!scene) return;
        // Move everything back and fade out
        const allMeshes = [
            ...networkNodes,
            ...connections,
            ...logo ? [
                logo
            ] : []
        ];
        allMeshes.forEach((mesh, index)=>{
            setTimeout(()=>{
                const transitionAnimation = setInterval(()=>{
                    mesh.position.z += 0.1;
                    if (mesh.material) {
                        const material = mesh.material;
                        const currentAlpha = material.alpha || 1;
                        material.alpha = Math.max(0, currentAlpha - 0.02);
                    }
                    if (mesh.position.z > 10) {
                        clearInterval(transitionAnimation);
                        mesh.dispose();
                    }
                }, 16);
            }, index * 10);
        });
    };
    const handleSkip = ()=>{
        onComplete();
    };
    if (skipIntro) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].awakeningContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].awakeningCanvas
            }, void 0, false, {
                fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textOverlay,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sceneText,
                    children: scenes[currentScene]?.text
                }, void 0, false, {
                    fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                    lineNumber: 356,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            showSkip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].skipButton,
                onClick: handleSkip,
                children: "Skip Intro →"
            }, void 0, false, {
                fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                lineNumber: 362,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].progressIndicator,
                children: scenes.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].progressDot} ${index <= currentScene ? __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$TheAwakening$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`
                    }, index, false, {
                        fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_s(TheAwakening, "EDMcCzCux478mD0Z4LBdu/i/uAc=");
_c = TheAwakening;
var _c;
__turbopack_context__.k.register(_c, "TheAwakening");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/artifacts/neoproxy/src/app/components/TheAwakening.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=artifacts_neoproxy_src_app_components_e958d3cd._.js.map