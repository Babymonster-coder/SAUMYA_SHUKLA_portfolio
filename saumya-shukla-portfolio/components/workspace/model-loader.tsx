"use client"

import { Component, Suspense, type ReactNode } from "react"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

/**
 * =====================================================
 * GLB / GLTF SYSTEM
 * =====================================================
 * Reusable loader that renders a GLB model when available and gracefully
 * falls back to lightweight Three.js primitives when it is missing.
 *
 * HOW TO ADD YOUR OWN MODELS:
 *   1. Drop a .glb file into:  public/assets/models/
 *   2. Pass its path to any object, e.g.:
 *        <GLBModel path="/assets/models/desk.glb" fallback={<DeskPrimitive />} />
 *   3. If the file is missing the fallback primitive is shown and a clear
 *      console warning is logged. The site never crashes.
 *
 * Objects in this workspace render primitives by default (no `path` set) so the
 * site works immediately with zero external assets.
 * =====================================================
 */

export type ModelTransform = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; path: string; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    console.warn(
      `[v0] GLB model not found or failed to load: "${this.props.path}". Showing fallback primitive instead. Place the file in public${this.props.path} to use a custom model.`,
    )
  }

  render() {
    if (this.state.hasError) return <>{this.props.fallback}</>
    return this.props.children
  }
}

function LoadedModel({ path, transform }: { path: string; transform?: ModelTransform }) {
  const { scene } = useGLTF(path) as unknown as { scene: Group }
  const scale = transform?.scale ?? 1
  return (
    <primitive
      object={scene.clone()}
      position={transform?.position ?? [0, 0, 0]}
      rotation={transform?.rotation ?? [0, 0, 0]}
      scale={scale}
    />
  )
}

/**
 * loadGLBModel equivalent — declarative component form.
 * Supports position / rotation / scale via `transform`, plus a fallback object.
 */
export function GLBModel({
  path,
  fallback,
  transform,
}: {
  /** Optional path under /public. When omitted, the fallback is rendered directly. */
  path?: string
  fallback: ReactNode
  transform?: ModelTransform
}) {
  if (!path) return <>{fallback}</>
  return (
    <ModelErrorBoundary path={path} fallback={fallback}>
      <Suspense fallback={fallback}>
        <LoadedModel path={path} transform={transform} />
      </Suspense>
    </ModelErrorBoundary>
  )
}
