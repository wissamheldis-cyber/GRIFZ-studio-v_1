'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Fonction de bruit classique
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Distorsion avec le mouvement de la souris
    vec2 mouseOffset = (uMouse * 0.1);
    
    // Génération de vagues de bruit fluides
    float n = noise(vec3(st * 3.0 + mouseOffset, uTime * 0.2));
    float n2 = noise(vec3(st * 2.0 - mouseOffset, uTime * 0.3 + 10.0));
    
    float fluid = smoothstep(0.4, 0.6, n * n2 * 2.0);
    
    // Couleurs douces de type "verre liquide" (Beige / Gris clair / Blanc)
    vec3 color1 = vec3(0.95, 0.94, 0.93); // Beige très clair
    vec3 color2 = vec3(1.0, 1.0, 1.0);    // Blanc
    vec3 color3 = vec3(0.9, 0.92, 0.94);  // Gris bleuté très léger

    vec3 finalColor = mix(color1, color2, fluid);
    finalColor = mix(finalColor, color3, n2);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function LiquidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(typeof window !== 'undefined' ? window.innerWidth : 1000, typeof window !== 'undefined' ? window.innerHeight : 1000) }
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      // Interpolation douce de la souris
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(state.mouse.x, state.mouse.y), 
        0.05
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function ThreeLiquidBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-[-2] ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <LiquidPlane />
      </Canvas>
    </div>
  )
}
