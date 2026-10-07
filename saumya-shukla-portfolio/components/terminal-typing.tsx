"use client"

import { useEffect, useState } from "react"
import { terminalData } from "@/lib/portfolio-config"

/** Realistic terminal typing effect for the Data Science easter egg. */
export function TerminalTyping({ reducedMotion }: { reducedMotion: boolean }) {
  const queryText = terminalData.query.join("\n")
  const [typed, setTyped] = useState(reducedMotion ? queryText : "")
  const [showResults, setShowResults] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    let i = 0
    const interval = window.setInterval(() => {
      i++
      setTyped(queryText.slice(0, i))
      if (i >= queryText.length) {
        window.clearInterval(interval)
        window.setTimeout(() => setShowResults(true), 350)
      }
    }, 32)
    return () => window.clearInterval(interval)
  }, [queryText, reducedMotion])

  return (
    <div className="rounded-xl border border-white/10 bg-[#04120a] p-5 font-mono text-sm">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-[#4dff9b]/60">saumya@career ~ sql</span>
      </div>
      <pre className="whitespace-pre-wrap text-[#7dffc0]">
        {typed}
        {!showResults && <span className="animate-blink text-[#4dff9b]">▊</span>}
      </pre>
      {showResults && (
        <div className="mt-4 space-y-1 border-t border-[#4dff9b]/15 pt-4 text-[#9dffce] animate-fade-in">
          {terminalData.results.map((line) => (
            <p key={line}>
              <span className="text-[#4dff9b]">→</span> {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
