"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { PanelId } from "@/lib/portfolio-config"

type CameraRigProps = {
  entered: boolean
  focus: PanelId | null
  reducedMotion: boolean
}

type View = { pos: [number, number, number]; look: [number, number, number] }

// Overview before "Enter", and after entering the workspace.
const OVERVIEW_OUT: View = { pos: [0, 3.5, 8.2], look: [0, 1.5, -0.4] }
const OVERVIEW_IN: View = { pos: [0, 2.5, 5.7], look: [0, 1.4, -0.4] }

/**
 * focusObject() targets — a gentle move toward each interactive object.
 * moveCameraTo() / resetCamera() are expressed by switching the `focus` prop.
 */
const FOCUS_VIEWS: Record<PanelId, View> = {
  projects: { pos: [-0.9, 1.9, 3.4], look: [-0.9, 1.2, 0] },
  skills: { pos: [-2.6, 2.0, 2.4], look: [-4.4, 1.4, -1.5] },
  about: { pos: [1.7, 2.0, 2.7], look: [3.0, 1.6, -0.7] },
  resume: { pos: [-1.7, 2.5, 2.6], look: [-2.6, 2.2, -0.6] },
  contact: { pos: [-1.5, 1.8, 2.6], look: [-2.2, 1.3, -0.6] },
  terminal: { pos: [1.5, 1.9, 3.0], look: [2.3, 1.4, 0.2] },
  experience: OVERVIEW_IN,
}

export function CameraRig({ entered, focus, reducedMotion }: CameraRigProps) {
  const { camera, pointer } = useThree()
  const targetPos = useRef(new THREE.Vector3(...OVERVIEW_OUT.pos))
  const targetLook = useRef(new THREE.Vector3(...OVERVIEW_OUT.look))
  const currentLook = useRef(new THREE.Vector3(...OVERVIEW_OUT.look))

  useFrame((_, delta) => {
    const view: View = !entered ? OVERVIEW_OUT : focus ? FOCUS_VIEWS[focus] : OVERVIEW_IN

    // Subtle mouse parallax (disabled for reduced motion / before entering).
    const px = reducedMotion || !entered ? 0 : pointer.x * 0.5
    const py = reducedMotion || !entered ? 0 : pointer.y * 0.3

    targetPos.current.set(view.pos[0] + px, view.pos[1] + py, view.pos[2])
    targetLook.current.set(...view.look)

    const lerp = reducedMotion ? 1 : Math.min(1, delta * 2.4)
    camera.position.lerp(targetPos.current, lerp)
    currentLook.current.lerp(targetLook.current, lerp)
    camera.lookAt(currentLook.current)
  })

  return null
}
