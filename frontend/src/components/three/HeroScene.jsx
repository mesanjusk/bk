'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const SAGE = '#3c6248';
const GOLD = '#c2a878';
const MAROON = '#7a2331';

function GrowthEmblem() {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.4, 1]} />
          <MeshDistortMaterial color={SAGE} distort={0.28} speed={1.4} roughness={0.35} metalness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.6}>
        <mesh position={[1.9, 1.1, -0.6]}>
          <torusGeometry args={[0.42, 0.13, 24, 64]} />
          <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.6} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={0.6} floatIntensity={1.3}>
        <mesh position={[-1.8, -0.9, -0.4]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={MAROON} roughness={0.4} metalness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[-1.1, 1.4, -0.8]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 4]} intensity={1.3} />
        <directionalLight position={[-3, -2, -3]} intensity={0.45} color={GOLD} />
        <pointLight position={[0, 2, 2]} intensity={0.4} color={SAGE} />
        <GrowthEmblem />
      </Suspense>
    </Canvas>
  );
}
