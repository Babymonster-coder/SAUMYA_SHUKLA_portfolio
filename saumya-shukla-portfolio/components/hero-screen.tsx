"use client"

import { ArrowRight, FileText } from "lucide-react"
import { portfolioConfig } from "@/lib/portfolio-config"

type HeroScreenProps = {
  onEnter: () => void
  onViewResume: () => void
  leaving: boolean
}

export function HeroScreen({ onEnter, onViewResume, leaving }: HeroScreenProps) {
  return (
    <section
      aria-label="Welcome"
      className={`fixed inset-0 z-40 flex items-center justify-center px-6 ${
        leaving ? "animate-fade-out pointer-events-none" : "animate-fade-in"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.25em] text-muted-foreground uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-blink" />
          Digital Workspace
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Welcome to{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--accent-purple), var(--accent-cyan) 60%, var(--accent-pink))",
            }}
          >
            Saumya&apos;s Digital Workspace
          </span>
        </h1>

        <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
          {portfolioConfig.role}
        </p>

        <p className="mt-3 font-mono text-sm text-foreground/80">
          {portfolioConfig.degree}
          <span className="mx-2 text-white/20">|</span>
          {portfolioConfig.semester}
          <span className="mx-2 text-white/20">|</span>
          Graduation {portfolioConfig.graduation}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onEnter}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] sm:w-auto"
            style={{
              background:
                "linear-gradient(100deg, var(--accent-purple), var(--accent-blue))",
              boxShadow: "0 12px 40px -12px color-mix(in oklch, var(--accent-purple) 80%, transparent)",
            }}
          >
            Enter Portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={onViewResume}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-200 hover:bg-white/10 sm:w-auto"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">
          Tip: click objects in the workspace to explore — or use the top navigation.
        </p>
      </div>
    </section>
  )
}
