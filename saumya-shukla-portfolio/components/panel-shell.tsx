"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { X } from "lucide-react"

type PanelShellProps = {
  title: string
  accent?: string
  onClose: () => void
  children: ReactNode
}

/**
 * Reusable modal/panel: glass surface, backdrop, close button, ESC support,
 * focus management, and smooth open/close animations.
 */
export function PanelShell({ title, accent = "var(--accent-purple)", onClose, children }: PanelShellProps) {
  const [closing, setClosing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const requestClose = useCallback(() => {
    setClosing(true)
    window.setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement
    panelRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        requestClose()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      previouslyFocused.current?.focus?.()
    }
  }, [requestClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close panel"
        onClick={requestClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
          closing ? "animate-fade-out" : "animate-fade-in"
        }`}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`glass relative z-10 flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl outline-none ${
          closing ? "animate-panel-out" : "animate-panel-in"
        }`}
      >
        {/* Accent top bar */}
        <div
          aria-hidden
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        <header className="flex items-center justify-between gap-4 px-6 pt-5 pb-3">
          <h2 className="text-xl font-semibold tracking-tight" style={{ color: "white" }}>
            <span
              aria-hidden
              className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            {title}
          </h2>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="overflow-y-auto px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}
