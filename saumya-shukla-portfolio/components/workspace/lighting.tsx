"use client"

type LightingProps = {
  quality: "high" | "medium" | "low"
}

/**
 * Cinematic but restrained lighting: soft ambient base + one shadow-casting key
 * light, plus subtle purple / blue-cyan / pink accent point lights.
 */
export function Lighting({ quality }: LightingProps) {
  const shadows = quality === "high"
  return (
    <>
      <ambientLight intensity={0.35} color="#b8c0e0" />
      <hemisphereLight intensity={0.25} color="#8a6cff" groundColor="#0a0a12" />

      {/* Key light (soft shadows) */}
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.1}
        color="#eef0ff"
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 1024 : 512}
        shadow-mapSize-height={shadows ? 1024 : 512}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
      />

      {/* Purple accent */}
      <pointLight position={[-4, 3, 1]} intensity={22} color="#9b5cff" distance={16} decay={2} />
      {/* Blue / cyan accent */}
      <pointLight position={[4.5, 2, 2]} intensity={18} color="#3fd8ff" distance={16} decay={2} />
      {/* Pink accent (subtle, high and toward the back so it grazes the scene) */}
      <pointLight position={[1, 3.4, -1.5]} intensity={9} color="#ff5ca8" distance={14} decay={2} />
    </>
  )
}
