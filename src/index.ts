import { Engine } from "@babylonjs/core/Engines/engine";
// import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/core/Helpers/sceneHelpers";
import { HDRCubeTexture } from "@babylonjs/core/Materials/Textures/hdrCubeTexture";
import { Scene, ScenePerformancePriority } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF/2.0";
import SanGiuseppeBridge4K from "../Bistro_v5_2/san_giuseppe_bridge_4k.hdr?url";
import BistroExterior from "../Bistro_v5_2/BistroExterior.glb?url";

// biome-ignore lint/suspicious/useAwait: <explanation>
async function createEngineAsync(canvas: HTMLCanvasElement) {
  // WebGPUEngine does not support HDRCubeTexture yet.
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

  SceneLoader.Append(BistroExterior, "", scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
});
