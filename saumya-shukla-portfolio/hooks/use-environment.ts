"use client"

import { useEffect, useState } from "react"

export type DeviceTier = "mobile" | "tablet" | "desktop"

export type Environment = {
  reducedMotion: boolean
  tier: DeviceTier
  quality: "high" | "medium" | "low"
  particleCount: number
  /** Whether to render the full 3D workspace (desktop/tablet) vs. mobile cards. */
  use3D: boolean
  ready: boolean
}

/**
 * Detects reduced-motion preference and device tier, then derives 3D quality,
 * particle budget and whether to use the full 3D experience.
 */
export function useEnvironment(): Environment {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [tier, setTier] = useState<DeviceTier>("desktop")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReducedMotion(motionQuery.matches)
    updateMotion()
    motionQuery.addEventListener("change", updateMotion)

    const computeTier = () => {
      const w = window.innerWidth
      const coarse = window.matchMedia("(pointer: coarse)").matches
      if (w < 768 || (coarse && w < 900)) setTier("mobile")
      else if (w < 1200) setTier("tablet")
      else setTier("desktop")
    }
    computeTier()
    window.addEventListener("resize", computeTier)
    setReady(true)

    return () => {
      motionQuery.removeEventListener("change", updateMotion)
      window.removeEventListener("resize", computeTier)
    }
  }, [])

  const quality: Environment["quality"] =
    tier === "desktop" ? "high" : tier === "tablet" ? "medium" : "low"

  const particleCount = reducedMotion ? 0 : tier === "desktop" ? 120 : tier === "tablet" ? 60 : 0

  return {
    reducedMotion,
    tier,
    quality,
    particleCount,
    use3D: tier !== "mobile",
    ready,
  }
}
