"use client"

import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import type { PanelId } from "@/lib/portfolio-config"
import { useEnvironment } from "@/hooks/use-environment"
import { LoadingScreen } from "@/components/loading-screen"
import { HeroScreen } from "@/components/hero-screen"
import { Navigation } from "@/components/navigation"
import { Tooltip } from "@/components/tooltip"
import { PortfolioPanel } from "@/components/portfolio-panels"
import { MobileExperience } from "@/components/mobile-experience"
import type { HoverInfo } from "@/components/workspace/interactive-object"

// The 3D scene is client-only and loaded lazily so it never blocks first paint.
const Scene = dynamic(() => import("@/components/workspace/scene").then((m) => m.Scene), {
  ssr: false,
})

type Stage = "loading" | "hero" | "workspace" | "mobile"

export default function Page() {
  const env = useEnvironment()
  const [stage, setStage] = useState<Stage>("loading")
  const [heroLeaving, setHeroLeaving] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [hover, setHover] = useState<HoverInfo>(null)

  const handleLoaded = useCallback(() => {
    setStage(env.use3D ? "hero" : "mobile")
  }, [env.use3D])

  const enterWorkspace = useCallback(() => {
    setHeroLeaving(true)
    window.setTimeout(() => setStage("workspace"), env.reducedMotion ? 0 : 480)
  }, [env.reducedMotion])

  // openPanel / closePanel / closeAllPanels
  const openPanel = useCallback((id: PanelId) => setActivePanel(id), [])
  const closePanel = useCallback(() => setActivePanel(null), [])

  // Nav: HOME (null) returns to overview; otherwise open the matching panel.
  const handleNavigate = useCallback(
    (panel: PanelId | null) => {
      if (panel === null) {
        setActivePanel(null)
        if (stage === "hero") enterWorkspace()
        return
      }
      setActivePanel(panel)
    },
    [stage, enterWorkspace],
  )

  const inWorkspace = stage === "workspace"

  return (
    <>
      {stage === "loading" && (
        <LoadingScreen onComplete={handleLoaded} reducedMotion={env.reducedMotion} />
      )}

      {/* ---------- Mobile / simplified experience ---------- */}
      {stage === "mobile" && <MobileExperience onOpen={openPanel} />}

      {/* ---------- Desktop / tablet 3D experience ---------- */}
      {env.use3D && (stage === "hero" || stage === "workspace") && (
        <>
          <Scene
            entered={inWorkspace}
            focus={inWorkspace ? activePanel : null}
            quality={env.quality}
            particleCount={env.particleCount}
            reducedMotion={env.reducedMotion}
            onSelect={openPanel}
            onHover={setHover}
          />

          {inWorkspace && <Tooltip info={hover} />}

          <Navigation
            visible={inWorkspace}
            active={activePanel}
            onNavigate={handleNavigate}
          />

          {stage === "hero" && (
            <HeroScreen
              onEnter={enterWorkspace}
              onViewResume={() => openPanel("resume")}
              leaving={heroLeaving}
            />
          )}
        </>
      )}

      {/* ---------- Shared panel system (works on all devices) ---------- */}
      {activePanel && (
        <PortfolioPanel active={activePanel} onClose={closePanel} reducedMotion={env.reducedMotion} />
      )}
    </>
  )
}
