"use client"

import { useEffect, useRef, useState } from "react"

type LoadingScreenProps = {
  onComplete: () => void
  reducedMotion: boolean
}

/**
 * Full-screen loading experience. Progress is driven by a light timer so the
 * screen disappears quickly once the app shell is ready — no artificial delay.
 */
export function LoadingScreen({ onComplete, reducedMotion }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const duration = reducedMotion ? 500 : 1400

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out for a smooth fill.
      const eased = 1 - Math.pow(1 - t, 2)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        window.setTimeout(onComplete, reducedMotion ? 0 : 500)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete, reducedMotion])

  // Generated after mount only, so random values never cause SSR/client
  // hydration mismatches.
  const [particles, setParticles] = useState<
    { id: number; left: number; delay: number; duration: number; size: number }[]
  >([])

  useEffect(() => {
    if (reducedMotion) return
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    )
  }, [reducedMotion])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background ${
        leaving ? "animate-fade-out" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress} percent`}
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in oklch, var(--accent-purple) 22%, transparent), transparent 70%), radial-gradient(50% 40% at 70% 70%, color-mix(in oklch, var(--accent-cyan) 14%, transparent), transparent 70%)",
        }}
      />

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 rounded-full bg-cyan/70"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animation: `float-up ${p.duration}s ${p.delay}s ease-in infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="text-3xl font-semibold tracking-[0.3em] text-foreground sm:text-5xl">
          SAUMYA SHUKLA
        </h1>
        <p className="mt-4 text-xs font-medium tracking-[0.5em] text-muted-foreground sm:text-sm">
          DATA <span className="text-purple">•</span> CODE{" "}
          <span className="text-cyan">•</span> CREATIVITY
        </p>

        {/* Progress bar */}
        <div className="mt-10 h-[3px] w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-cyan))",
            }}
          />
        </div>
        <span className="mt-4 font-mono text-sm tabular-nums text-muted-foreground">
          {progress}%
        </span>
      </div>
    </div>
  )
}
