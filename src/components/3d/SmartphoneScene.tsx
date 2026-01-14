'use client';

import { Float, Html, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Mock Icons for floating stack (Simple Colored Boxes with Text for now, or use images if available)
// Ideally we would use textures, but for procedural we'll use simple meshes with labels
const FloatingIcon = ({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) => (
  <Float
    speed={2}
    rotationIntensity={1}
    floatIntensity={1}
    floatingRange={[-0.2, 0.2]}
  >
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <Html
        transform
        distanceFactor={3}
        position={[0, 0, 0.11]}
      >
        <div
          style={{
            pointerEvents: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  </Float>
);

export default function SmartphoneScene() {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      // Subtle idle rotation
      phoneRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group>
      {/* Smartphone Model */}
      <group ref={phoneRef}>
        {/* Body */}
        <RoundedBox
          args={[3, 6, 0.3]}
          radius={0.3}
          smoothness={4}
        >
          <meshStandardMaterial
            color='#1a1a1a'
            roughness={0.2}
            metalness={0.9}
          />
        </RoundedBox>
        {/* Bezel/Screen Border */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.8, 5.8]} />
          <meshBasicMaterial color='black' />
        </mesh>
        {/* Screen Content (Animated UI) */}
        <Html
          transform
          position={[0, 0, 0.17]}
          distanceFactor={3}
          occlude
        >
          <div
            style={{
              width: '280px',
              height: '580px',
              background: '#0d0d12',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'sans-serif',
              position: 'relative',
            }}
          >
            {/* Status Bar */}
            <div
              style={{
                height: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 15px',
                alignItems: 'center',
                color: 'white',
                fontSize: '10px',
              }}
            >
              <span>9:41</span>
              <span>5G</span>
            </div>

            {/* App Header */}
            <div style={{ padding: '20px', color: 'white' }}>
              <h2 style={{ margin: 0, fontSize: '24px' }}>My Portfolio</h2>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
                Mobile Engineer
              </p>
            </div>

            {/* Mock Chat/List UI */}
            <div
              style={{
                flex: 1,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='app-msg'
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '10px',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '12px',
                    transform: 'translateY(20px)',
                    animation: `slideUp 0.5s ease-out ${i * 0.2}s forwards`,
                  }}
                >
                  <div
                    style={{
                      width: '30px',
                      height: '6px',
                      background: 'rgba(255,255,255,0.2)',
                      marginBottom: '5px',
                      borderRadius: '3px',
                    }}
                  />
                  <div
                    style={{
                      width: '80%',
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Nav */}
            <div
              style={{
                height: '60px',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  opacity: 0.5,
                }}
              />
            </div>

            <style jsx>{`
              @keyframes slideUp {
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              .app-msg {
                opacity: 0;
              }
            `}</style>
          </div>
        </Html>
      </group>

      {/* Orbiting Icons */}
      <FloatingIcon
        position={[-2.5, 1, 0]}
        color='#F05138'
        label='Swift'
        delay={0}
      />
      <FloatingIcon
        position={[2.5, 2, -1]}
        color='#02569B'
        label='Flutter'
        delay={1}
      />
      <FloatingIcon
        position={[-2, -2, 1]}
        color='#61DAFB'
        label='React'
        delay={2}
      />
      <FloatingIcon
        position={[2.2, -1.5, 0.5]}
        color='#7F52FF'
        label='Kotlin'
        delay={3}
      />
      <FloatingIcon
        position={[0, 3.5, -2]}
        color='#FFCA28'
        label='Firebase'
        delay={4}
      />
    </group>
  );
}
