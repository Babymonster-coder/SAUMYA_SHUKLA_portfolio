"use client"

import type { PanelId } from "@/lib/portfolio-config"

type NavItem = { label: string; panel: PanelId | null }

// HOME returns to the workspace overview (panel: null).
const NAV_ITEMS: NavItem[] = [
  { label: "Home", panel: null },
  { label: "About", panel: "about" },
  { label: "Skills", panel: "skills" },
  { label: "Projects", panel: "projects" },
  { label: "Experience", panel: "experience" },
  { label: "Resume", panel: "resume" },
  { label: "Contact", panel: "contact" },
]

type NavigationProps = {
  visible: boolean
  active: PanelId | null
  onNavigate: (panel: PanelId | null) => void
}

export function Navigation({ visible, active, onNavigate }: NavigationProps) {
  return (
    <nav
      aria-label="Primary"
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-6 opacity-0"
      }`}
    >
      <ul className="glass-subtle flex items-center gap-0.5 rounded-full p-1.5 sm:gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.panel === active
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => onNavigate(item.panel)}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:px-4 sm:text-sm ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(100deg, color-mix(in oklch, var(--accent-purple) 40%, transparent), color-mix(in oklch, var(--accent-blue) 40%, transparent))",
                      boxShadow: "0 0 18px -4px var(--accent-purple)",
                    }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
