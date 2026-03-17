import * as BABYLON from '@babylonjs/core';

export interface Vec3 { x: number; y: number; z: number }
export interface MaterialCfg {
  type: 'PBR' | 'STD' | 'EMI'
  albedoColor: string
  emissiveColor?: string
  metallic?: number
  roughness?: number
  wireframe?: boolean
}
export interface Object3DCfg {
  id: string
  slug: string
  modelUrl: string
  position: Vec3
  rotation: Vec3
  scale: Vec3
  material?: MaterialCfg
  layer: 'nav' | 'deco' | 'ui'
  action?: { type: 'route'; value: string }
  content?: { title: string; body?: string }
}
export interface SceneCfg {
  ambientColor: string
  gravity: number
  objects: Object3DCfg[]
}

export class SceneEngine {
  private engine: BABYLON.Engine;
  public scene: BABYLON.Scene;
  private canvas: HTMLCanvasElement;
  public onObjectClick: ((obj: Object3DCfg) => void) | null = null;
  private stardustSystem: BABYLON.ParticleSystem | null = null;
  private stardustGroup: BABYLON.TransformNode | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    
    this.setupScene();
    this.setupLighting();
    this.setupCamera();
    this.setupPointerEvents();
  }

  private setupScene() {
    this.scene.clearColor = BABYLON.Color4.FromHexString("#080a0eFF");
  }

  private setupLighting() {
    const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    hemiLight.intensity = 0.4;
    
    const dirLight1 = new BABYLON.DirectionalLight("dir1", new BABYLON.Vector3(-1, -2, -1), this.scene);
    dirLight1.diffuse = BABYLON.Color3.FromHexString("#c8f5a0");
    dirLight1.intensity = 0.8;
    
    const dirLight2 = new BABYLON.DirectionalLight("dir2", new BABYLON.Vector3(1, 0, 1), this.scene);
    dirLight2.diffuse = BABYLON.Color3.FromHexString("#5ef0c0");
    dirLight2.intensity = 0.6;
    
    const gl = new BABYLON.GlowLayer("glow", this.scene);
    gl.intensity = 0.6;
  }

  private setupCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      "camera", 
      Math.PI / 4, 
      Math.PI / 3, 
      20, 
      BABYLON.Vector3.Zero(), 
      this.scene
    );
    camera.attachControl(this.canvas, true);
    camera.wheelPrecision = 50;
    camera.minZ = 0.1;
  }

  private setupPointerEvents() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh) {
        const mesh = pointerInfo.pickInfo.pickedMesh;
        const objectData = mesh.metadata as Object3DCfg;
        if (objectData && this.onObjectClick) {
          this.onObjectClick(objectData);
        }
      }
    });
  }

  public async loadFromConfig(sceneConfig: SceneCfg) {
    // Clear existing meshes
    this.scene.meshes.forEach(mesh => mesh.dispose());
    
    // Load objects from config
    for (const objectConfig of sceneConfig.objects) {
      await this.createObject(objectConfig);
    }
  }

  private async createObject(config: Object3DCfg) {
    // Create a simple sphere as placeholder since modelUrl is empty
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      config.id,
      { diameter: 1 },
      this.scene
    );

    // Apply transformations
    sphere.position = new BABYLON.Vector3(config.position.x, config.position.y, config.position.z);
    sphere.rotation = new BABYLON.Vector3(config.rotation.x, config.rotation.y, config.rotation.z);
    sphere.scaling = new BABYLON.Vector3(config.scale.x, config.scale.y, config.scale.z);

    // Create material
    const material = this.createMaterial(config.material);
    sphere.material = material;

    // Store metadata for click detection
    sphere.metadata = config;
    sphere.isPickable = true;

    return sphere;
  }

  private createMaterial(materialConfig?: MaterialCfg): BABYLON.Material {
    if (!materialConfig) {
      const mat = new BABYLON.StandardMaterial("defaultMat", this.scene);
      mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      return mat;
    }

    switch (materialConfig.type) {
      case 'PBR':
        const pbr = new BABYLON.PBRMaterial(`${materialConfig.albedoColor}_pbr`, this.scene);
        pbr.albedoColor = BABYLON.Color3.FromHexString(materialConfig.albedoColor);
        if (materialConfig.emissiveColor) {
          pbr.emissiveColor = BABYLON.Color3.FromHexString(materialConfig.emissiveColor);
        }
        pbr.metallic = materialConfig.metallic || 0;
        pbr.roughness = materialConfig.roughness || 1;
        return pbr;
      
      case 'STD':
        const std = new BABYLON.StandardMaterial(`${materialConfig.albedoColor}_std`, this.scene);
        std.diffuseColor = BABYLON.Color3.FromHexString(materialConfig.albedoColor);
        if (materialConfig.emissiveColor) {
          std.emissiveColor = BABYLON.Color3.FromHexString(materialConfig.emissiveColor);
        }
        return std;
      
      case 'EMI':
        const emi = new BABYLON.StandardMaterial(`${materialConfig.albedoColor}_emi`, this.scene);
        emi.emissiveColor = BABYLON.Color3.FromHexString(materialConfig.albedoColor);
        if (materialConfig.emissiveColor) {
          emi.emissiveColor = BABYLON.Color3.FromHexString(materialConfig.emissiveColor);
        }
        return emi;
      
      default:
        const defaultMat = new BABYLON.StandardMaterial("defaultMat", this.scene);
        defaultMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        return defaultMat;
    }
  }

  public startRenderLoop() {
    this.engine.runRenderLoop(() => {
      if (this.scene) this.scene.render();
    });
  }

  public resize() {
    this.engine.resize();
  }

  public dispose() {
    this.engine.dispose();
  }

  public addBackgroundStardust(config: {
    density?: number;
    complexity?: number;
    scale?: number;
    chaos?: number;
  } = {}) {
    const {
      density = 80,
      complexity = 50,
      scale = 1.0,
      chaos = 0.1
    } = config;

    // Clear previous stardust
    if (this.stardustGroup) {
      this.stardustGroup.getChildMeshes().forEach(m => m.dispose());
      this.stardustGroup.dispose();
    }

    // Create stardust group
    this.stardustGroup = new BABYLON.TransformNode("stardustGroup", this.scene);

    // Create materials
    const glassMat = new BABYLON.PBRMaterial("glassMat", this.scene);
    glassMat.metallic = 0.1;
    glassMat.roughness = 0.5 - (complexity / 200);
    glassMat.alpha = 0.3;
    glassMat.transparencyMode = 3;
    glassMat.albedoColor = new BABYLON.Color3(0.1, 0.4, 0.8);

    const glowMat = new BABYLON.PBRMaterial("glowMat", this.scene);
    glowMat.emissiveColor = new BABYLON.Color3(0, 0.8, 1);
    glowMat.emissiveIntensity = 2;

    // Generate stardust particles
    for (let i = 0; i < density; i++) {
      const type = Math.random() * complexity;
      let mesh: BABYLON.Mesh;
      
      if (type < 20) {
        mesh = BABYLON.MeshBuilder.CreateBox("stardust", { size: scale * (0.5 + Math.random()) }, this.scene);
      } else if (type < 50) {
        mesh = BABYLON.MeshBuilder.CreateIcoSphere("stardust", { radius: scale * 0.5, subdivisions: 1 }, this.scene);
      } else {
        mesh = BABYLON.MeshBuilder.CreateTorus("stardust", { diameter: scale, thickness: 0.1 }, this.scene);
      }
      
      mesh.parent = this.stardustGroup;
      
      // Distribute in sphere around origin
      const radius = 10 + (Math.random() * 5 * chaos);
      const phi = Math.acos(-1 + (2 * i) / density);
      const theta = Math.sqrt(density * Math.PI) * phi;
      
      mesh.position = new BABYLON.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      mesh.material = (Math.random() > 0.9) ? glowMat : glassMat;
      
      // Subtle animation
      const rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.scene.onBeforeRenderObservable.add(() => {
        if (!mesh || mesh.isDisposed()) return;
        mesh.rotation.y += rotationSpeed;
        mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002 * chaos;
      });
    }

    // Add slow rotation to the entire group
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.stardustGroup && !this.stardustGroup.isDisposed()) {
        this.stardustGroup.rotation.y += 0.001;
      }
    });
  }
}
