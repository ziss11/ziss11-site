'use client';

import {
  Environment,
  PerspectiveCamera,
  RoundedBox,
  ScrollControls,
  useScroll,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function Particles() {
  const scroll = useScroll();
  const count = 2000;

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
    }
    return pos;
  });

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Move particles based on scroll
    // scroll.offset is 0..1
    // We want them to move "away" (negative Z) or "forward" (positive Z)
    const zOffset = scroll.offset * 10;

    ref.current.position.z = zOffset;

    // Optional: rotate slightly
    ref.current.rotation.z += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color='#4d4dff'
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Smartphone() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;

    // Rotate on Y axis based on scroll
    const targetRotation = scroll.offset * Math.PI * 2; // Full rotation

    // Dampening manually (lerp) or rely on ScrollControl's damping
    // Since ScrollControls has damping, scroll.offset is already smoothed if configured.
    // However, user asked for 'Dampening'. ScrollControls damping prop handles the scroll value smoothing.

    group.current.rotation.y = targetRotation;

    // Move Z position slightly
    // group.current.position.z = scroll.offset * -2;
  });

  return (
    <group ref={group}>
      {/* Phone Body */}
      <RoundedBox
        args={[1, 2, 0.1]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color='#1a1a1a'
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Screen (Glowing) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.9, 1.9]} />
        <meshBasicMaterial color='#000' />
      </mesh>

      {/* Screen Content / Reflection */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[0.9, 1.9]} />
        <meshBasicMaterial
          color='#4d4dff'
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Side details (Buttons) */}
      <mesh position={[0.51, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.05]} />
        <meshStandardMaterial color='#333' />
      </mesh>
    </group>
  );
}

function Scene() {
  // We can access useScroll here
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
      />
      <Environment preset='city' />

      <Particles />
      <Smartphone />
    </>
  );
}

export default function ThreeHero() {
  return (
    <div className='w-screen h-screen absolute top-0 left-0 -z-[1]'>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
        />
        {/* damping={0.2} gives the smooth interaction user asked for */}
        {/* pages={1} means the scroll range covers 1 screen height properly mapped to 0..1 */}
        <ScrollControls
          pages={2}
          damping={0.2}
        >
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
