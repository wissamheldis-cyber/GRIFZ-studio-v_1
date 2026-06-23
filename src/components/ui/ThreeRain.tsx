'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RainParticlesProps {
  count?: number
  speed?: number
  color?: string
}

function RainParticles({ count = 2000, speed = 1, color = '#00aaff' }: RainParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Initialisation des positions aléatoires
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // x entre -10 et 10
      pos[i * 3] = (Math.random() - 0.5) * 20
      // y entre -10 et 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      // z entre -5 et 5 (profondeur)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      // Vitesse de chute aléatoire
      vel[i] = 0.1 + Math.random() * 0.2
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    const positionsAttr = pointsRef.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      // Fait descendre la particule
      positionsAttr.array[i * 3 + 1] -= velocities[i] * speed
      
      // Si elle sort de l'écran en bas, on la remet en haut
      if (positionsAttr.array[i * 3 + 1] < -10) {
        positionsAttr.array[i * 3 + 1] = 10
        positionsAttr.array[i * 3] = (Math.random() - 0.5) * 20
      }
    }
    
    // Indique que l'attribut a changé pour le rendu GPU
    positionsAttr.needsUpdate = true
    
    // Légère rotation pour un effet de vent
    pointsRef.current.rotation.y += 0.001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ThreeRain({ className = '', color = '#09f' }: { className?: string, color?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <RainParticles count={3000} speed={0.8} color={color} />
      </Canvas>
    </div>
  )
}
