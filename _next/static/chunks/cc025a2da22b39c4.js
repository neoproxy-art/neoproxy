(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,757152,e=>{"use strict";var t=e.i(47662);e.i(360896),e.i(980239);let o="volumetricLightingRenderVolumeVertexShader",r=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute position : vec3f;varying vWorldPos: vec4f;@vertex
fn main(input : VertexInputs)->FragmentInputs {let worldPos=mesh.world*vec4f(vertexInputs.position,1.0);vertexOutputs.vWorldPos=worldPos;vertexOutputs.position=scene.viewProjection*worldPos;}
`;t.ShaderStore.ShadersStoreWGSL[o]||(t.ShaderStore.ShadersStoreWGSL[o]=r),e.s(["volumetricLightingRenderVolumeVertexShaderWGSL",0,{name:o,shader:r}])}]);