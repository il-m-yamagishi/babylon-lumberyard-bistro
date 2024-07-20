# Babylon Lumberyard Bistro Demo

See
[Amazon Lumberyard Bistro | NVIDIA Developer](https://developer.nvidia.com/orca/amazon-lumberyard-bistro).

Inspired by
[Jamsers/Bistro-Demo-Tweaked](https://github.com/Jamsers/Bistro-Demo-Tweaked/tree/main)
Godot porting.

## Install

- git
- git lfs
- node.js v20.x
- npm

```s
$ npm install
$ npm run dev
```

## Convert fbx to glb

Download
[FBX2glTF v0.9.7](https://github.com/facebookincubator/FBX2glTF/releases/tag/v0.9.7)
binary.

```s
$ ./FBX2glTF-linux-x64 --binary --verbose --input Bistro_v5_2/BistroExterior.fbx --output Bistro_v5_2/BistroExterior.glb --pbr-metallic-roughness --khr-materials-unlit
```
