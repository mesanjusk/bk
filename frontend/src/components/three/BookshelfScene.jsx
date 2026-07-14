'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';

const COVERS = ['#1f3d2b', '#7a2331', '#2c4e37', '#5c1a25'];
const TILTS = [-0.05, 0.03, -0.07, 0.05, -0.03, 0.06];

function Book({ year, index, total, onOpen }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [opening, setOpening] = useState(false);
  const target = useRef({ y: 0, z: 0, scale: 1 });

  const spread = Math.max(total - 1, 1) * 2.1;
  const x = total > 1 ? -spread / 2 + index * 2.1 : 0;
  const tilt = TILTS[index % TILTS.length];
  const cover = COVERS[index % COVERS.length];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    target.current.y = hovered || opening ? 0.35 : 0;
    target.current.z = hovered || opening ? 0.5 : 0;
    target.current.scale = opening ? 1.15 : hovered ? 1.06 : 1;

    groupRef.current.position.y += (target.current.y - groupRef.current.position.y) * Math.min(delta * 8, 1);
    groupRef.current.position.z += (target.current.z - groupRef.current.position.z) * Math.min(delta * 8, 1);
    const s = groupRef.current.scale.x + (target.current.scale - groupRef.current.scale.x) * Math.min(delta * 8, 1);
    groupRef.current.scale.setScalar(s);
  });

  function handleClick() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => onOpen(year), 420);
  }

  return (
    <group
      ref={groupRef}
      position={[x, 0, 0]}
      rotation={[0, 0, tilt]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <RoundedBox args={[1.3, 2.1, 0.42]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial
          color={cover}
          roughness={0.45}
          metalness={0.15}
          emissive={hovered || opening ? '#c2a878' : '#000000'}
          emissiveIntensity={hovered || opening ? 0.18 : 0}
        />
      </RoundedBox>

      <Html position={[0, 0.15, 0.22]} center distanceFactor={5} style={{ pointerEvents: 'none' }} occlude={false}>
        <div className="flex w-28 flex-col items-center text-center select-none">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-300">
            Badhte Kadam Scholars
          </span>
          <span className="mt-1 font-serif text-2xl font-semibold text-cream">{year}</span>
        </div>
      </Html>
    </group>
  );
}

function CameraIntro() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.6, 9);
    const tween = gsap.to(camera.position, { x: 0, y: 1.1, z: 5.4, duration: 1.4, ease: 'power3.out' });
    return () => tween.kill();
  }, [camera]);

  return null;
}

export default function BookshelfScene({ years, onOpen }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.1, 5.4], fov: 40 }}>
      <Suspense fallback={null}>
        <color attach="background" args={['#efe8da']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#c2a878" />
        <CameraIntro />
        {years.map((year, index) => (
          <Book key={year} year={year} index={index} total={years.length} onOpen={onOpen} />
        ))}
        <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={12} blur={2.4} far={2} />
      </Suspense>
    </Canvas>
  );
}
