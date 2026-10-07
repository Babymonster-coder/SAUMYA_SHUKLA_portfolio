"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ExternalLink,
  Mail,
  Download,
  GraduationCap,
  Briefcase,
  Award,
  FolderGit2,
} from "lucide-react"
import { Github, Linkedin } from "./brand-icons"
import {
  portfolioConfig,
  aboutText,
  skills,
  projects,
  resumeData,
  experience,
  type PanelId,
} from "@/lib/portfolio-config"
import { PanelShell } from "./panel-shell"
import { TerminalTyping } from "./terminal-typing"

const ACCENTS: Record<PanelId, string> = {
  about: "var(--accent-purple)",
  skills: "var(--accent-cyan)",
  projects: "var(--accent-blue)",
  experience: "var(--accent-pink)",
  resume: "var(--accent-cyan)",
  contact: "var(--accent-pink)",
  terminal: "var(--accent-cyan)",
}

const TITLES: Record<PanelId, string> = {
  about: "About Me",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  resume: "Resume",
  contact: "Contact",
  terminal: "Data Science Terminal",
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/90">
      {children}
    </span>
  )
}

function ExternalButton({
  href,
  icon,
  children,
  primary,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        primary
          ? "text-white hover:opacity-90"
          : "border border-white/12 bg-white/5 text-foreground hover:bg-white/10"
      }`}
      style={
        primary
          ? { background: "linear-gradient(100deg, var(--accent-purple), var(--accent-blue))" }
          : undefined
      }
    >
      {icon}
      {children}
    </a>
  )
}

/* ---------- Individual panel contents ---------- */

function AboutContent() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="mx-auto shrink-0">
        {/* Replace the placeholder image at public/assets/images/profile.png */}
        <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={portfolioConfig.profileImage || "/placeholder.svg"}
            alt={`Portrait of ${portfolioConfig.name}`}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="space-y-3">
        {aboutText.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg font-medium text-white" : "text-muted-foreground"}>
            {p}
          </p>
        ))}
        <dl className="grid grid-cols-1 gap-x-6 gap-y-1 pt-2 text-sm sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Degree:</dt>
            <dd>{portfolioConfig.degree}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Institute:</dt>
            <dd>SRIMT</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">University:</dt>
            <dd>{portfolioConfig.university}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Semester:</dt>
            <dd>{portfolioConfig.semester}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Graduation:</dt>
            <dd>{portfolioConfig.graduation}</dd>
          </div>
        </dl>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
          <span className="text-muted-foreground">Career Target: </span>
          <span className="text-cyan">{portfolioConfig.careerTarget}</span>
        </div>
      </div>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="space-y-5">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {group}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <article
          key={p.title}
          className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
        >
          <h3 className="text-base font-semibold text-white">{p.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-cyan"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.description}</p>
          <div className="mt-4 flex gap-2">
            <ExternalButton href={p.github} icon={<Github className="h-4 w-4" />}>
              GitHub
            </ExternalButton>
            <ExternalButton href={p.demo} icon={<ExternalLink className="h-4 w-4" />}>
              Live Demo
            </ExternalButton>
          </div>
        </article>
      ))}
    </div>
  )
}

function ExperienceContent() {
  return (
    <div className="space-y-4">
      <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-pink/15 p-2 text-pink">
            <Briefcase className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-white">Main Crafts</h3>
            <p className="text-sm text-muted-foreground">Internship</p>
          </div>
        </div>
        {/* REPLACE INTERNSHIP CERTIFICATE / LOR LINKS in lib/portfolio-config.ts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.certificateLink ? (
            <ExternalButton href={experience.certificateLink} icon={<Award className="h-4 w-4" />}>
              Internship Certificate
            </ExternalButton>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4" /> Internship Certificate (add link)
            </span>
          )}
          {experience.lorLink ? (
            <ExternalButton href={experience.lorLink} icon={<Award className="h-4 w-4" />}>
              Letter of Recommendation
            </ExternalButton>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4" /> Letter of Recommendation (add link)
            </span>
          )}
        </div>
      </article>
    </div>
  )
}

function ResumeContent() {
  const [error, setError] = useState(false)

  const handleDownload = async () => {
    try {
      const res = await fetch(portfolioConfig.resume, { method: "HEAD" })
      if (!res.ok) throw new Error("missing")
      window.open(portfolioConfig.resume, "_blank", "noopener,noreferrer")
    } catch {
      setError(true)
    }
  }

  return (
    <div className="space-y-5">
      <section>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-cyan">
          <GraduationCap className="h-4 w-4" /> Education
        </h3>
        {resumeData.education.map((e) => (
          <div key={e.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="font-medium text-white">{e.title}</p>
            <p className="text-sm text-muted-foreground">{e.org}</p>
            <p className="text-xs text-muted-foreground">{e.meta}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-cyan">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2">
        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-cyan">
            <FolderGit2 className="h-4 w-4" /> Projects
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {resumeData.projects.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-4">
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-cyan">
              <Briefcase className="h-4 w-4" /> Experience
            </h3>
            {resumeData.experience.map((e) => (
              <p key={e.org} className="text-sm text-muted-foreground">
                {e.role} — {e.org}
              </p>
            ))}
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-cyan">
              <Award className="h-4 w-4" /> Certifications
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {resumeData.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{ background: "linear-gradient(100deg, var(--accent-purple), var(--accent-blue))" }}
        >
          <Download className="h-4 w-4" />
          Download Resume
        </button>
        {error && (
          <p className="text-sm text-pink" role="alert">
            Resume PDF not found yet. Add your file at{" "}
            <code className="rounded bg-white/10 px-1">public{portfolioConfig.resume}</code> to enable download.
          </p>
        )}
      </div>
    </div>
  )
}

function ContactContent() {
  const rows = [
    {
      label: "Email",
      value: portfolioConfig.email,
      href: `mailto:${portfolioConfig.email}`,
      icon: <Mail className="h-5 w-5" />,
      accent: "var(--accent-pink)",
    },
    {
      label: "LinkedIn",
      value: portfolioConfig.linkedin.replace("https://", ""),
      href: portfolioConfig.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      accent: "var(--accent-blue)",
    },
    {
      label: "GitHub",
      value: portfolioConfig.github.replace("https://", ""),
      href: portfolioConfig.github,
      icon: <Github className="h-5 w-5" />,
      accent: "var(--accent-purple)",
    },
  ]
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <a
          key={r.label}
          href={r.href}
          target={r.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
        >
          <span
            className="rounded-lg p-2.5"
            style={{ background: `color-mix(in oklch, ${r.accent} 20%, transparent)`, color: r.accent }}
          >
            {r.icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.label}</p>
            <p className="truncate text-sm text-foreground">{r.value}</p>
          </div>
          <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
        </a>
      ))}
    </div>
  )
}

export function PortfolioPanel({
  active,
  onClose,
  reducedMotion,
}: {
  active: PanelId
  onClose: () => void
  reducedMotion: boolean
}) {
  return (
    <PanelShell title={TITLES[active]} accent={ACCENTS[active]} onClose={onClose}>
      {active === "about" && <AboutContent />}
      {active === "skills" && <SkillsContent />}
      {active === "projects" && <ProjectsContent />}
      {active === "experience" && <ExperienceContent />}
      {active === "resume" && <ResumeContent />}
      {active === "contact" && <ContactContent />}
      {active === "terminal" && <TerminalTyping reducedMotion={reducedMotion} />}
    </PanelShell>
  )
}
