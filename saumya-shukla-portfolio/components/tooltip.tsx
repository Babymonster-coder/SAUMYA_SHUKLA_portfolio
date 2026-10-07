"use client"

import type { HoverInfo } from "./workspace/interactive-object"

/** Elegant, unobtrusive tooltip that follows the cursor over interactive objects. */
export function Tooltip({ info }: { info: HoverInfo }) {
  if (!info) return null
  return (
    <div
      className="pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-[140%] animate-fade-in"
      style={{ left: info.x, top: info.y }}
      role="status"
      aria-live="polite"
    >
      <div className="glass-subtle rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground">
        {info.label}
      </div>
    </div>
  )
}
