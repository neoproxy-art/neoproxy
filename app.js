// PRNG (Mulberry32) for reproducible results
function mulberry32(a) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// System Mathematics Definitions
const attractors = {
    lorenz: {
        name: "Lorenz",
        equations: "dx/dt = σ(y−x)<br>dy/dt = x(ρ−z)−y<br>dz/dt = xy−βz",
        params: { sigma: 10, rho: 28, beta: 8/3, dt: 0.005 },
        formatParams: p => `σ = ${p.sigma}<br>ρ = ${p.rho}<br>β = ${(p.beta).toFixed(3)}<br>dt = ${p.dt}`,
        init: () => ({ x: 0.1, y: 0, z: 0 }),
        step: (p, rand, state) => {
            const dx = p.sigma * (state.y - state.x);
            const dy = state.x * (p.rho - state.z) - state.y;
            const dz = state.x * state.y - p.beta * state.z;
            state.x += dx * p.dt;
            state.y += dy * p.dt;
            state.z += dz * p.dt;
            return { x: state.x, y: state.y, z: state.z };
        }
    },
    thomas: {
        name: "Thomas",
        equations: "dx/dt = sin(y)−bx<br>dy/dt = sin(z)−by<br>dz/dt = sin(x)−bz",
        params: { b: 0.208, dt: 0.05 },
        formatParams: p => `b = ${p.b}<br>dt = ${p.dt}`,
        init: () => ({ x: 0.1, y: 0, z: 0 }),
        step: (p, rand, state) => {
            const dx = Math.sin(state.y) - p.b * state.x;
            const dy = Math.sin(state.z) - p.b * state.y;
            const dz = Math.sin(state.x) - p.b * state.z;
            state.x += dx * p.dt;
            state.y += dy * p.dt;
            state.z += dz * p.dt;
            return { x: state.x, y: state.y, z: state.z };
        }
    },
    clifford: {
        name: "Clifford",
        equations: "x' = sin(ay)+c·cos(ax)<br>y' = sin(bx)+d·cos(by)<br>z' = sin(i·0.0003+x')",
        params: null, 
        formatParams: p => `a = ${p.a.toFixed(4)}<br>b = ${p.b.toFixed(4)}<br>c = ${p.c.toFixed(4)}<br>d = ${p.d.toFixed(4)}`,
        init: (rand) => {
            return {
                x: 0.1, y: 0.1, z: 0.1, i: 0,
                p: { // Seeded random params for Clifford
                    a: (rand() - 0.5) * 4,
                    b: (rand() - 0.5) * 4,
                    c: (rand() - 0.5) * 4,
                    d: (rand() - 0.5) * 4
                }
            };
        },
        step: (p, rand, state) => {
            const cp = state.p;
            const next_x = Math.sin(cp.a * state.y) + cp.c * Math.cos(cp.a * state.x);
            const next_y = Math.sin(cp.b * state.x) + cp.d * Math.cos(cp.b * state.y);
            state.i++;
            const next_z = Math.sin(state.i * 0.0003 + next_x) * 2; // Arbitrary Z dimension logic as requested
            state.x = next_x;
            state.y = next_y;
            state.z = next_z;
            return { x: state.x, y: state.y, z: state.z, activeParams: cp };
        }
    },
    rossler: {
        name: "Rössler",
        equations: "dx/dt = −y−z<br>dy/dt = x+ay<br>dz/dt = b+z(x−c)",
        params: { a: 0.2, b: 0.2, c: 5.7, dt: 0.01 },
        formatParams: p => `a = ${p.a}<br>b = ${p.b}<br>c = ${p.c}<br>dt = ${p.dt}`,
        init: () => ({ x: 0.1, y: 0, z: 0 }),
        step: (p, rand, state) => {
            const dx = -state.y - state.z;
            const dy = state.x + p.a * state.y;
            const dz = p.b + state.z * (state.x - p.c);
            state.x += dx * p.dt;
            state.y += dy * p.dt;
            state.z += dz * p.dt;
            return { x: state.x, y: state.y, z: state.z };
        }
    }
};

// Application State
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let scene;
let currentMeshes = [];
let specimenNumber = 1;

// Initialize Scene
const createScene = function() {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromHexString("#080a0eFF");
    
    // Camera
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 4, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 50;
    camera.minZ = 0.1;
    
    // Lighting setup mapping prompt specs
    const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.4;
    
    const dirLight1 = new BABYLON.DirectionalLight("dir1", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight1.diffuse = BABYLON.Color3.FromHexString("#c8f5a0");
    dirLight1.intensity = 0.8;
    
    const dirLight2 = new BABYLON.DirectionalLight("dir2", new BABYLON.Vector3(1, 0, 1), scene);
    dirLight2.diffuse = BABYLON.Color3.FromHexString("#5ef0c0");
    dirLight2.intensity = 0.6;
    
    // Glow Layer
    const gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.6;
    
    return scene;
};

// Generate Geometry
function generateSystem() {
    document.getElementById("status-text").innerText = "Generating...";
    
    // Fetch user inputs
    const algoId = document.querySelector('#algo-selector .active').dataset.algo;
    const iters = parseInt(document.getElementById('iters').value);
    const radius = parseFloat(document.getElementById('radius').value);
    const scale = parseFloat(document.getElementById('scale').value);
    const seed = parseInt(document.getElementById('seed').value);
    
    // Cleanup previous geometry
    currentMeshes.forEach(m => m.dispose());
    currentMeshes = [];
    
    // Init Generator
    const rand = mulberry32(seed);
    const algo = attractors[algoId];
    let state = algo.init(rand);
    const p = algo.params;
    
    let rawPoints = [];
    let dynamicParams = null;
    
    // Warm-up transient states
    for(let i=0; i<500; i++) {
        const res = algo.step(p, rand, state);
        if(res.activeParams) dynamicParams = res.activeParams;
    }
    
    // Generate actual sequence
    for(let i=0; i<iters; i++) {
        const res = algo.step(p, rand, state);
        if(i % 3 === 0) { // Sample every 3rd point
            rawPoints.push({ x: res.x, y: res.y, z: res.z });
        }
    }
    
    // Compute Center of Mass to center object in scene seamlessly
    let cx = 0, cy = 0, cz = 0;
    for(let pt of rawPoints) { cx += pt.x; cy += pt.y; cz += pt.z; }
    cx /= rawPoints.length; cy /= rawPoints.length; cz /= rawPoints.length;
    
    // Shift and apply scale to babylon vectors
    const points = rawPoints.map(pt => new BABYLON.Vector3((pt.x - cx)*scale, (pt.y - cy)*scale, (pt.z - cz)*scale));
    
    // Update Info Panel 
    document.getElementById('eq-display').innerHTML = algo.equations;
    document.getElementById('param-display').innerHTML = dynamicParams ? algo.formatParams(dynamicParams) : algo.formatParams(p);
    
    // Build Geometry as Tubes in chunks
    const chunkSize = 150; 
    
    // Shared dark base material with subtle specularity simulating resin
    const mat = new BABYLON.StandardMaterial("resinMat", scene);
    mat.diffuseColor = BABYLON.Color3.FromHexString("#222222");
    mat.emissiveColor = BABYLON.Color3.FromHexString("#061208");
    mat.specularColor = BABYLON.Color3.FromHexString("#c8f5a0");
    mat.specularPower = 32;
    
    for (let i = 0; i < points.length; i += chunkSize) {
        // Overlap by 1 to connect the tubes correctly visually
        const endIdx = Math.min(i + chunkSize + 2, points.length);
        const chunk = points.slice(i, endIdx);
        
        if (chunk.length < 2) continue;
        
        const tube = BABYLON.MeshBuilder.CreateTube("tube" + i, {
            path: chunk,
            radius: radius,
            tessellation: 5,
            cap: BABYLON.Mesh.CAP_ALL,
            updatable: false
        }, scene);
        
        tube.material = mat;
        currentMeshes.push(tube);
    }
    
    // Update Data Panel UI
    document.getElementById('stat-points').innerText = points.length.toLocaleString();
    document.getElementById('stat-meshes').innerText = currentMeshes.length;
    
    const formattedNum = String(specimenNumber).padStart(4, '0');
    document.getElementById('specimen-id').innerHTML = `Specimen <span class="highlight">#${formattedNum}</span>`;
    document.getElementById('active-algo-seed').innerText = `${algo.name} | Seed: ${seed}`;
    specimenNumber++;
    
    document.getElementById("status-text").innerText = "Ready";
}


// UI Event Listeners Setup
document.querySelectorAll('#algo-selector button').forEach(b => {
    b.addEventListener('click', (e) => {
        document.querySelectorAll('#algo-selector button').forEach(bt => bt.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById('seed').value = Math.floor(Math.random() * 999999);
        generateSystem();
    });
});

['iters', 'radius', 'scale'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if(id === 'radius' || id === 'scale') val = val.toFixed(2);
        document.getElementById(`val-${id}`).innerText = val;
    });
});

document.getElementById('btn-rand-seed').addEventListener('click', () => {
    document.getElementById('seed').value = Math.floor(Math.random() * 999999);
    generateSystem();
});

document.getElementById('btn-generate').addEventListener('click', generateSystem);

// Export STL Protocol 
document.getElementById('btn-export').addEventListener('click', () => {
    document.getElementById("status-text").innerText = "Exporting...";
    setTimeout(() => {
        const algoId = document.querySelector('#algo-selector .active').dataset.algo;
        const seed = document.getElementById('seed').value;
        const filename = `specimen-${algoId}-${seed}`;
        
        // Ensure World Matrix baked into geometry before export
        currentMeshes.forEach(m => m.computeWorldMatrix(true));
        
        // Export as ASCII 
        BABYLON.STLExport.CreateSTL(currentMeshes, true, filename, false);
        
        document.getElementById("status-text").innerText = "Ready";
    }, 50);
});

// Boot Application
createScene();
setTimeout(() => { generateSystem(); }, 500);

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
