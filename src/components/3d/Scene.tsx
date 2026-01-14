'use client';

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Stars,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import SmartphoneScene from './SmartphoneScene';

export default function Scene() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: '#010101',
      }}
    >
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 8]}
        />

        {/* Mobile-focused Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color='#4d4dff'
        />
        <pointLight
          position={[-10, -5, 5]}
          intensity={2}
          color='#bc13fe'
        />

        <Suspense fallback={null}>
          <Environment preset='city' />
          <Stars
            radius={200}
            depth={50}
            count={3000}
            factor={3}
            saturation={0}
            fade
            speed={1}
          />
          <Sparkles
            count={40}
            scale={10}
            size={4}
            speed={0.4}
            opacity={0.5}
            color='#4d4dff'
          />

          <SmartphoneScene />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
