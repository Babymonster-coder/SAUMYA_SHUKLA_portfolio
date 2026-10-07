"use client"

import { useRef, useState, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import type { PanelId } from "@/lib/portfolio-config"

export type HoverInfo = {
  id: PanelId
  label: string
  x: number
  y: number
} | null

type InteractiveObjectProps = {
  id: PanelId
  label: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  /** Lift amount on hover (world units). */
  lift?: number
  onSelect: (id: PanelId) => void
  onHover: (info: HoverInfo) => void
  reducedMotion: boolean
  children: ReactNode
}

/**
 * Wraps any 3D object to make it interactive:
 * hover -> subtle scale + lift + pointer cursor + tooltip; click -> onSelect.
 */
export function InteractiveObject({
  id,
  label,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  lift = 0.06,
  onSelect,
  onHover,
  reducedMotion,
  children,
}: InteractiveObjectProps) {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return
    const target = hovered ? 1.045 : 1
    const s = group.current.scale.x
    const next = s + (target - s) * Math.min(1, delta * 10)
    group.current.scale.setScalar(next)

    const targetY = position[1] + (hovered ? lift : 0)
    group.current.position.y += (targetY - group.current.position.y) * Math.min(1, delta * 10)
  })

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
        onHover({ id, label, x: e.clientX, y: e.clientY })
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
        if (hovered) onHover({ id, label, x: e.clientX, y: e.clientY })
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = "auto"
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "auto"
        onSelect(id)
      }}
    >
      {children}
    </group>
  )
}
