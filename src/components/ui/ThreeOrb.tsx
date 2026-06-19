'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface ThreeOrbProps {
  size?: number
  material?: 'verre' | 'emeraude' | 'grifz'
  intensity?: number
  className?: string
  interactive?: boolean
}

// Composant interne pour l'orb et l'animation
function OrbMesh({ material, interactive }: { material: string, interactive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Configuration des matières
  let color = '#ffffff'
  let transmission = 1
  let ior = 1.5
  let thickness = 2
  let roughness = 0.05
  let chromaticAberration = 0.04
  let attenuationColor = '#ffffff'
  let attenuationDistance = 2

  if (material === 'emeraude') {
    color = '#a0ffc0'
    ior = 1.6
    transmission = 0.95
    thickness = 3
    roughness = 0.1
    chromaticAberration = 0.08
    attenuationColor = '#004a30'
    attenuationDistance = 1
  }

  // Animation et interactivité
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Temps pour le flottement
    const t = state.clock.getElapsedTime()
    
    // Mouvement de flottement lent
    meshRef.current.position.y = Math.sin(t / 2) * 0.1

    // Rotation de base
    meshRef.current.rotation.y += 0.002
    meshRef.current.rotation.x += 0.001

    // Si interactif, l'orb "regarde" la souris
    if (interactive) {
      const targetX = (state.mouse.x * Math.PI) / 6
      const targetY = (state.mouse.y * Math.PI) / 6
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05)
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* 64 segments pour une sphère très lisse */}
      <sphereGeometry args={[1, 64, 64]} />
      
      {/* Matériau avancé pour la réfraction du verre */}
      <MeshTransmissionMaterial
        backside
        backsideThickness={1}
        thickness={thickness}
        roughness={roughness}
        transmission={transmission}
        ior={ior}
        chromaticAberration={chromaticAberration}
        anisotropy={0.1}
        color={color}
        attenuationColor={attenuationColor}
        attenuationDistance={attenuationDistance}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

export default function ThreeOrb({
  size = 160,
  material = 'verre',
  intensity = 1,
  className = '',
  interactive = true
}: ThreeOrbProps) {
  return (
    <div className={`relative ${className} z-10 pointer-events-auto`} style={{ width: size, height: size }}>
      {/* Le fond du site sera visible au travers car le canvas est transparent par défaut */}
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 2]}>
        
        {/* Éclairage principal */}
        <ambientLight intensity={0.5 * intensity} />
        <directionalLight position={[5, 5, 5]} intensity={2 * intensity} color={material === 'emeraude' ? '#e0fff0' : 'white'} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={1 * intensity} />
        
        {/* Environnement (Reflets HDRI) - "city" donne de bons reflets contrastés pour le verre */}
        <Environment preset="city" />
        
        {/* L'Orbe */}
        <OrbMesh material={material} interactive={interactive} />
        
        {/* Ombre au sol douce sous l'orbe */}
        <ContactShadows position={[0, -1.3, 0]} opacity={0.6} scale={4} blur={2} far={4} color="#000" />
      </Canvas>
    </div>
  )
}
