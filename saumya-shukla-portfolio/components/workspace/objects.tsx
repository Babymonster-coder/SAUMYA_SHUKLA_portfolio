"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import type { PanelId } from "@/lib/portfolio-config"
import { InteractiveObject, type HoverInfo } from "./interactive-object"
import { GLBModel } from "./model-loader"

type ObjectsProps = {
  onSelect: (id: PanelId) => void
  onHover: (info: HoverInfo) => void
  reducedMotion: boolean
  quality: "high" | "medium" | "low"
}

const FONT = "/fonts/GeistMono-Regular.ttf"

/* ---------- Environment: floor + walls ---------- */
function Room({ shadows }: { shadows: boolean }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={shadows}>
        <planeGeometry args={[26, 20]} />
        <meshStandardMaterial color="#12121c" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 4, -3.2]} receiveShadow={shadows}>
        <planeGeometry args={[26, 12]} />
        <meshStandardMaterial color="#161522" roughness={0.95} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-6.5, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#14131f" roughness={0.95} />
      </mesh>
      {/* Soft glowing strip on back wall */}
      <mesh position={[0, 6.4, -3.15]}>
        <planeGeometry args={[10, 0.06]} />
        <meshStandardMaterial color="#9b5cff" emissive="#9b5cff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ---------- Desk ---------- */
function Desk({ shadows }: { shadows: boolean }) {
  return (
    <group>
      <mesh position={[0, 1.0, -0.2]} castShadow={shadows} receiveShadow={shadows}>
        <boxGeometry args={[6, 0.12, 2.4]} />
        <meshStandardMaterial color="#2a2733" roughness={0.5} metalness={0.35} />
      </mesh>
      {/* Legs */}
      {[
        [-2.85, 0.5, 0.8],
        [2.85, 0.5, 0.8],
        [-2.85, 0.5, -1.1],
        [2.85, 0.5, -1.1],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow={shadows}>
          <boxGeometry args={[0.12, 1.0, 0.12]} />
          <meshStandardMaterial color="#1c1a24" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Monitor (non-interactive backdrop) ---------- */
function Monitor({ shadows }: { shadows: boolean }) {
  return (
    <group position={[1.7, 1.06, -0.9]}>
      <mesh position={[0, 0.75, 0]} castShadow={shadows}>
        <boxGeometry args={[2.0, 1.15, 0.06]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.75, 0.035]}>
        <planeGeometry args={[1.86, 1.0]} />
        <meshStandardMaterial
          color="#0a1420"
          emissive="#1b90c8"
          emissiveIntensity={0.55}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, 0.95, 0.05]}
        fontSize={0.1}
        color="#7fe6ff"
        anchorX="center"
        font={FONT}
      >
        analytics.ipynb
      </Text>
      {/* simple bar-chart glyphs */}
      {[0.18, 0.34, 0.26, 0.44, 0.3].map((h, i) => (
        <mesh key={i} position={[-0.5 + i * 0.25, 0.55 + h / 2, 0.05]}>
          <planeGeometry args={[0.14, h]} />
          <meshStandardMaterial color="#3fd8ff" emissive="#3fd8ff" emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      ))}
      {/* stand */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.12, 0.35, 0.12]} />
        <meshStandardMaterial color="#1c1a24" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.03, 0.1]}>
        <boxGeometry args={[0.6, 0.05, 0.35]} />
        <meshStandardMaterial color="#1c1a24" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ---------- Keyboard + Mouse ---------- */
function Peripherals({ shadows }: { shadows: boolean }) {
  return (
    <group position={[0.9, 1.08, 0.5]}>
      <mesh castShadow={shadows}>
        <boxGeometry args={[1.1, 0.05, 0.4]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.02, 0.32]} />
        <meshStandardMaterial color="#0d0d16" emissive="#6a3cff" emissiveIntensity={0.3} toneMapped={false} />
      </mesh>
      <mesh position={[0.95, 0, 0.05]} castShadow={shadows}>
        <boxGeometry args={[0.18, 0.05, 0.28]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  )
}

/* ---------- Coffee cup ---------- */
function CoffeeCup({ shadows }: { shadows: boolean }) {
  return (
    <group position={[-2.3, 1.06, 0.4]}>
      <mesh castShadow={shadows}>
        <cylinderGeometry args={[0.16, 0.13, 0.28, 24]} />
        <meshStandardMaterial color="#e8e8ef" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.03, 24]} />
        <meshStandardMaterial color="#3a241a" roughness={0.3} />
      </mesh>
      <mesh position={[0.19, 0, 0]}>
        <torusGeometry args={[0.07, 0.02, 12, 24]} />
        <meshStandardMaterial color="#e8e8ef" roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ---------- Plant ---------- */
function Plant({ position, shadows }: { position: [number, number, number]; shadows: boolean }) {
  return (
    <group position={position}>
      <mesh castShadow={shadows}>
        <cylinderGeometry args={[0.16, 0.12, 0.28, 16]} />
        <meshStandardMaterial color="#242233" roughness={0.7} />
      </mesh>
      {[
        [0, 0.32, 0],
        [0.1, 0.28, 0.05],
        [-0.1, 0.28, -0.05],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0.2 * i, i, 0.1 * i]}>
          <coneGeometry args={[0.09, 0.4, 8]} />
          <meshStandardMaterial color="#2f8f6b" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Office chair ---------- */
function Chair({ shadows }: { shadows: boolean }) {
  return (
    <group position={[-1.7, 0, 2.9]} rotation={[0, 0.35, 0]} scale={0.92}>
      <mesh position={[0, 0.75, 0]} castShadow={shadows}>
        <boxGeometry args={[1.0, 0.12, 0.9]} />
        <meshStandardMaterial color="#1a1822" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.35, 0.42]} rotation={[-0.12, 0, 0]} castShadow={shadows}>
        <boxGeometry args={[0.95, 1.05, 0.12]} />
        <meshStandardMaterial color="#1a1822" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
        <meshStandardMaterial color="#111019" metalness={0.6} roughness={0.4} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.35, 0.06, Math.sin(a) * 0.35]}>
            <boxGeometry args={[0.4, 0.06, 0.08]} />
            <meshStandardMaterial color="#111019" metalness={0.6} roughness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

/* ---------- Laptop (interactive -> Projects) ---------- */
function Laptop({ shadows }: { shadows: boolean }) {
  return (
    <group>
      {/* base */}
      <mesh position={[0, 0, 0]} castShadow={shadows}>
        <boxGeometry args={[1.2, 0.06, 0.8]} />
        <meshStandardMaterial color="#2b2833" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.035, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 0.6]} />
        <meshStandardMaterial color="#0d0d16" />
      </mesh>
      {/* screen */}
      <group position={[0, 0.03, -0.4]} rotation={[-1.15, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow={shadows}>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#1c1a24" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0.025]}>
          <planeGeometry args={[1.1, 0.7]} />
          <meshStandardMaterial
            color="#0a0f1e"
            emissive="#6a3cff"
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
        <Text position={[0, 0.55, 0.04]} fontSize={0.075} color="#c9b8ff" font={FONT} anchorX="center">
          {"> projects --list"}
        </Text>
        <Text
          position={[0, 0.36, 0.04]}
          fontSize={0.06}
          color="#7fe6ff"
          font={FONT}
          anchorX="center"
          maxWidth={1}
          textAlign="center"
        >
          {"4 data & web\nprojects"}
        </Text>
      </group>
    </group>
  )
}

/* ---------- Bookshelf (interactive -> Skills) ---------- */
function Bookshelf({ shadows }: { shadows: boolean }) {
  const bookColors = ["#9b5cff", "#3fd8ff", "#ff5ca8", "#5c7cff", "#4de0b0", "#c9b8ff"]
  return (
    <group>
      <mesh castShadow={shadows} receiveShadow={shadows}>
        <boxGeometry args={[1.6, 2.4, 0.5]} />
        <meshStandardMaterial color="#211f2b" roughness={0.7} />
      </mesh>
      {[-0.7, -0.05, 0.6].map((y, shelf) => (
        <group key={shelf} position={[0, y, 0.02]}>
          {Array.from({ length: 6 }).map((_, i) => {
            const h = 0.42 + ((i * 7) % 3) * 0.04
            return (
              <mesh
                key={i}
                position={[-0.6 + i * 0.22, h / 2 + 0.06, 0]}
                rotation={[0, 0, i === 5 ? 0.28 : 0]}
                castShadow={shadows}
              >
                <boxGeometry args={[0.16, h, 0.36]} />
                <meshStandardMaterial
                  color={bookColors[(i + shelf) % bookColors.length]}
                  emissive={bookColors[(i + shelf) % bookColors.length]}
                  emissiveIntensity={0.12}
                  roughness={0.6}
                />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

/* ---------- Desk lamp (interactive -> Contact) ---------- */
function Lamp({ shadows }: { shadows: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.22, 0.26, 0.06, 24]} />
        <meshStandardMaterial color="#1c1a24" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.025, 0.025, 1, 12]} />
        <meshStandardMaterial color="#2b2833" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.28, 0.95, 0]} rotation={[0, 0, -0.9]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 12]} />
        <meshStandardMaterial color="#2b2833" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.82, 0]} rotation={[0, 0, -0.6]} castShadow={shadows}>
        <coneGeometry args={[0.18, 0.28, 24, 1, true]} />
        <meshStandardMaterial color="#2b2833" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.52, 0.76, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#fff3d6" emissive="#ffcf7a" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <pointLight position={[0.55, 0.7, 0.1]} intensity={6} color="#ffcf7a" distance={4} decay={2} />
    </group>
  )
}

/* ---------- Profile card (interactive -> About) ---------- */
function ProfileCard() {
  return (
    <group>
      <RoundedBox args={[0.95, 1.2, 0.05]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#211f2b" metalness={0.4} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.12, 0.03]}>
        <planeGeometry args={[0.78, 0.78]} />
        <meshStandardMaterial color="#3a2f5a" emissive="#6a3cff" emissiveIntensity={0.25} />
      </mesh>
      <Text position={[0, 0.12, 0.04]} fontSize={0.16} color="#c9b8ff" font={FONT} anchorX="center">
        SS
      </Text>
      <Text position={[0, -0.42, 0.04]} fontSize={0.075} color="#ffffff" font={FONT} anchorX="center">
        SAUMYA
      </Text>
      <Text position={[0, -0.52, 0.04]} fontSize={0.05} color="#7fe6ff" font={FONT} anchorX="center">
        about me
      </Text>
    </group>
  )
}

/* ---------- Floating resume document (interactive -> Resume) ---------- */
function ResumeDoc({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 0.9) * 0.06
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.04
  })
  return (
    <group ref={ref}>
      <RoundedBox args={[0.72, 0.95, 0.02]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#f4f5fb" roughness={0.5} emissive="#3fd8ff" emissiveIntensity={0.08} />
      </RoundedBox>
      {[0.3, 0.16, 0.02, -0.12, -0.26].map((y, i) => (
        <mesh key={i} position={[0, y, 0.02]}>
          <planeGeometry args={[i === 0 ? 0.42 : 0.5, 0.03]} />
          <meshStandardMaterial color="#8a8aa0" />
        </mesh>
      ))}
      <Text position={[0, 0.42, 0.02]} fontSize={0.07} color="#1a1a24" font={FONT} anchorX="center">
        RESUME
      </Text>
    </group>
  )
}

/* ---------- Terminal (interactive -> Terminal easter egg) ---------- */
function Terminal() {
  return (
    <group>
      <RoundedBox args={[1.0, 0.72, 0.06]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#0c0c14" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.9, 0.62]} />
        <meshStandardMaterial color="#04120a" emissive="#0f8a3c" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
      <Text position={[-0.4, 0.2, 0.05]} fontSize={0.06} color="#4dff9b" font={FONT} anchorX="left">
        {"$ query.sql"}
      </Text>
      <Text position={[-0.4, 0.08, 0.05]} fontSize={0.05} color="#7dffc0" font={FONT} anchorX="left">
        {"SELECT * FROM"}
      </Text>
      <Text position={[-0.4, -0.02, 0.05]} fontSize={0.05} color="#7dffc0" font={FONT} anchorX="left">
        {"career..."}
      </Text>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.16]} />
        <meshStandardMaterial color="#1c1a24" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}

export function WorkspaceObjects({ onSelect, onHover, reducedMotion, quality }: ObjectsProps) {
  const shadows = quality === "high"
  const common = { onSelect, onHover, reducedMotion }

  return (
    <group>
      <Room shadows={shadows} />
      <Desk shadows={shadows} />
      <Monitor shadows={shadows} />
      <Peripherals shadows={shadows} />
      <CoffeeCup shadows={shadows} />
      <Chair shadows={shadows} />
      <Plant position={[2.6, 1.06, 0.3]} shadows={shadows} />
      <Plant position={[-3.4, 0, 0.6]} shadows={shadows} />

      {/* ---- Interactive objects (swap primitives for GLB via `path`) ---- */}

      {/* LAPTOP -> Projects */}
      <InteractiveObject id="projects" label="Projects" position={[-0.9, 1.09, 0.1]} {...common}>
        <GLBModel fallback={<Laptop shadows={shadows} />} />
      </InteractiveObject>

      {/* BOOKSHELF -> Skills */}
      <InteractiveObject id="skills" label="Skills" position={[-4.6, 1.2, -1.6]} rotation={[0, 0.5, 0]} {...common}>
        <GLBModel fallback={<Bookshelf shadows={shadows} />} />
      </InteractiveObject>

      {/* PROFILE CARD -> About */}
      <InteractiveObject id="about" label="About Me" position={[3.0, 1.7, -0.7]} rotation={[0, -0.4, 0]} {...common}>
        <GLBModel fallback={<ProfileCard />} />
      </InteractiveObject>

      {/* RESUME DOCUMENT -> Resume (floating) */}
      <InteractiveObject id="resume" label="Resume" position={[-2.6, 2.3, -0.6]} rotation={[0, 0.3, 0]} lift={0.1} {...common}>
        <GLBModel fallback={<ResumeDoc reducedMotion={reducedMotion} />} />
      </InteractiveObject>

      {/* DESK LAMP -> Contact */}
      <InteractiveObject id="contact" label="Contact" position={[-2.2, 1.06, -0.6]} {...common}>
        <GLBModel fallback={<Lamp shadows={shadows} />} />
      </InteractiveObject>

      {/* TERMINAL -> Data Science Terminal */}
      <InteractiveObject id="terminal" label="Data Science Terminal" position={[2.3, 1.45, 0.2]} rotation={[0, -0.5, 0]} {...common}>
        <GLBModel fallback={<Terminal />} />
      </InteractiveObject>
    </group>
  )
}
