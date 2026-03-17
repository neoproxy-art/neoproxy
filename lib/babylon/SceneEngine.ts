import * as BABYLON from '@babylonjs/core';

export class SceneEngine {
  private engine: BABYLON.Engine;
  public scene: BABYLON.Scene;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    
    this.setupScene();
    this.setupLighting();
    this.setupCamera();
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
}
