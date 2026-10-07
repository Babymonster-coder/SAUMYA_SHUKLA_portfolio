"use client"

import Image from "next/image"
import {
  User,
  Layers,
  FolderGit2,
  Briefcase,
  FileText,
  Mail,
  Terminal as TerminalIcon,
  type LucideIcon,
} from "lucide-react"
import { Github, Linkedin } from "./brand-icons"
import { portfolioConfig, type PanelId } from "@/lib/portfolio-config"

type Card = { id: PanelId; label: string; desc: string; icon: LucideIcon; accent: string }

const CARDS: Card[] = [
  { id: "about", label: "About Me", desc: "Who I am & my goals", icon: User, accent: "var(--accent-purple)" },
  { id: "skills", label: "Skills", desc: "Languages, data & tools", icon: Layers, accent: "var(--accent-cyan)" },
  { id: "projects", label: "Projects", desc: "4 data & web projects", icon: FolderGit2, accent: "var(--accent-blue)" },
  { id: "experience", label: "Experience", desc: "Internship", icon: Briefcase, accent: "var(--accent-pink)" },
  { id: "resume", label: "Resume", desc: "Education & download", icon: FileText, accent: "var(--accent-cyan)" },
  { id: "contact", label: "Contact", desc: "Email, LinkedIn, GitHub", icon: Mail, accent: "var(--accent-pink)" },
  { id: "terminal", label: "DS Terminal", desc: "SELECT * FROM career", icon: TerminalIcon, accent: "var(--accent-cyan)" },
]

/**
 * Simplified, fully accessible mobile experience. No heavy 3D — just a compact
 * animated header and navigation cards that open the same portfolio panels.
 * Every piece of information remains reachable.
 */
export function MobileExperience({ onOpen }: { onOpen: (panel: PanelId) => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-10">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 10%, color-mix(in oklch, var(--accent-purple) 22%, transparent), transparent 70%), radial-gradient(50% 40% at 90% 30%, color-mix(in oklch, var(--accent-cyan) 16%, transparent), transparent 70%), radial-gradient(60% 40% at 50% 100%, color-mix(in oklch, var(--accent-pink) 12%, transparent), transparent 70%)",
        }}
      />

      <header className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={portfolioConfig.profileImage || "/placeholder.svg"}
            alt={`Portrait of ${portfolioConfig.name}`}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{portfolioConfig.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{portfolioConfig.role}</p>
        <p className="mt-2 font-mono text-xs text-foreground/70">
          {portfolioConfig.degree} · {portfolioConfig.semester} · {portfolioConfig.graduation}
        </p>

        {/* Quick links */}
        <div className="mt-5 flex justify-center gap-2">
          <a
            href={portfolioConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass-subtle rounded-full p-2.5 text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={portfolioConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass-subtle rounded-full p-2.5 text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${portfolioConfig.email}`}
            aria-label="Email"
            className="glass-subtle rounded-full p-2.5 text-foreground"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </header>

      <nav aria-label="Portfolio sections" className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-3">
        {CARDS.map((c) => {
          const Icon = c.icon
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onOpen(c.id)}
              className="glass-subtle flex items-center gap-4 rounded-xl p-4 text-left transition-transform active:scale-[0.98]"
            >
              <span
                className="rounded-lg p-2.5"
                style={{ background: `color-mix(in oklch, ${c.accent} 20%, transparent)`, color: c.accent }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-white">{c.label}</span>
                <span className="block text-sm text-muted-foreground">{c.desc}</span>
              </span>
            </button>
          )
        })}
      </nav>

      <footer className="mx-auto mt-10 max-w-md text-center text-xs text-muted-foreground/70">
        Best viewed on desktop for the full 3D workspace experience.
      </footer>
    </main>
  )
}
