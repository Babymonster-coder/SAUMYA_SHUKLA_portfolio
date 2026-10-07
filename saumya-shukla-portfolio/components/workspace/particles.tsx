"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type ParticlesProps = {
  count: number
  reducedMotion: boolean
}

/** Lightweight floating dust particles rendered as a single Points object. */
export function Particles({ count, reducedMotion }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, geometry } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = Math.random() * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { positions, geometry }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return
    const t = state.clock.elapsedTime
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      const y = positions[i * 3 + 1] + Math.sin(t * 0.3 + i) * 0.15
      attr.setY(i, y)
    }
    attr.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
  })

  if (count === 0) return null

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#7fd8ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
