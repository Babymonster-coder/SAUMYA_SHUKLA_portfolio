"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import type { PanelId } from "@/lib/portfolio-config"
import { Lighting } from "./lighting"
import { Particles } from "./particles"
import { CameraRig } from "./camera"
import { WorkspaceObjects } from "./objects"
import type { HoverInfo } from "./interactive-object"

type SceneProps = {
  entered: boolean
  focus: PanelId | null
  quality: "high" | "medium" | "low"
  particleCount: number
  reducedMotion: boolean
  onSelect: (id: PanelId) => void
  onHover: (info: HoverInfo) => void
}

export function Scene({
  entered,
  focus,
  quality,
  particleCount,
  reducedMotion,
  onSelect,
  onHover,
}: SceneProps) {
  return (
    <Canvas
      className="!fixed inset-0"
      shadows={quality === "high"}
      dpr={[1, quality === "high" ? 2 : 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 3.5, 8.2] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <color attach="background" args={["#0d0c14"]} />
      <fog attach="fog" args={["#0d0c14", 9, 20]} />

      <Lighting quality={quality} />
      <CameraRig entered={entered} focus={focus} reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <WorkspaceObjects
          onSelect={onSelect}
          onHover={onHover}
          reducedMotion={reducedMotion}
          quality={quality}
        />
      </Suspense>

      <Particles count={particleCount} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
