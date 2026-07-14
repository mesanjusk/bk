'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const posters = [
  { color: '#7c2d3a', position: [-1.6, 0.3, -0.6], rotation: [0, 0.5, -0.08] },
  { color: '#3f5945', position: [0, 0.5, 0], rotation: [0, -0.15, 0.04] },
  { color: '#b08b57', position: [1.7, 0.1, -0.4], rotation: [0, -0.5, 0.1] },
];

export default function PosterFlourishScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.5], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <directionalLight position={[-2, -1, -2]} intensity={0.4} color="#c2a878" />
        {posters.map((poster, index) => (
          <Float key={index} speed={1.3 + index * 0.2} rotationIntensity={0.35} floatIntensity={0.9}>
            <mesh position={poster.position} rotation={poster.rotation}>
              <planeGeometry args={[1.1, 1.4]} />
              <meshStandardMaterial color={poster.color} roughness={0.5} metalness={0.1} side={2} />
            </mesh>
          </Float>
        ))}
      </Suspense>
    </Canvas>
  );
}
