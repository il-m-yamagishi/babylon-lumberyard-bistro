import "@babylonjs/core/Loading/loadingScreen";
import { Engine } from "@babylonjs/core/Engines/engine";
// import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";
import { Scene, ScenePerformancePriority } from "@babylonjs/core/scene";
import { HDRCubeTexture } from "@babylonjs/core/Materials/Textures/hdrCubeTexture";
import SanGiuseppeBridge4K from "../Bistro_v5_2/san_giuseppe_bridge_4k.hdr?url";
import "@babylonjs/core/Helpers/sceneHelpers";

// biome-ignore lint/suspicious/useAwait: <explanation>
async function createEngineAsync(canvas: HTMLCanvasElement) {
  // if (await WebGPUEngine.IsSupportedAsync) {
  //   const engine = new WebGPUEngine(canvas, {
  //     adaptToDeviceRatio: true,
  //     antialias: true,
  //     audioEngine: false,
  //     enableAllFeatures: true,
  //     powerPreference: "high-performance",
  //   });
  //   await engine.initAsync();
  //   return engine;
  // }

  return new Engine(canvas, true, {
    adaptToDeviceRatio: true,
    alpha: false,
    antialias: true,
    audioEngine: false,
    disableWebGL2Support: false,
    powerPreference: "high-performance",
    useHighPrecisionFloats: true,
  });
}

window.addEventListener("load", async () => {
  const canvas = document.getElementById("render-canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  const engine = await createEngineAsync(canvas);
  const scene = new Scene(engine, {
    useClonedMeshMap: true,
    useGeometryUniqueIdsMap: true,
    useMaterialMeshMap: true,
  });
  scene.createDefaultCameraOrLight(true, true, true);
  scene.createDefaultEnvironment({
    createGround: true,
    createSkybox: true,
    enableGroundMirror: false,
    enableGroundShadow: false,
    environmentTexture: new HDRCubeTexture(SanGiuseppeBridge4K, scene, 128, false, true, false, true),
    toneMappingEnabled: true,
  });
  scene.performancePriority = ScenePerformancePriority.Aggressive;

  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
});
