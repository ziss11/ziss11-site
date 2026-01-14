'use client';

import { Html, Line, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';

// Generate random nodes on sphere surface
const generateNodes = (count: number, radius: number) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    nodes.push({ position: new Vector3(x, y, z), id: i });
  }
  return nodes;
};

export default function ServerGlobe({
  onZoom,
}: {
  onZoom?: (pos: Vector3) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => generateNodes(30, 2.5), []);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe Core */}
      <Sphere args={[2.45, 32, 32]}>
        <meshBasicMaterial
          color='#001020'
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Atmosphere Shield */}
      <Sphere args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color='#000000'
          transparent
          opacity={0.8}
          roughness={0.7}
        />
      </Sphere>

      {/* Server Nodes */}
      {nodes.map((node) => (
        <group
          key={node.id}
          position={node.position}
        >
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              if (onZoom) onZoom(node.position);
            }}
            onPointerOver={() => setHoveredNode(node.id)}
            onPointerOut={() => setHoveredNode(null)}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={hoveredNode === node.id ? '#ff003c' : '#00f0ff'}
              emissive={hoveredNode === node.id ? '#ff003c' : '#00f0ff'}
              emissiveIntensity={2}
            />
          </mesh>
          {/* Node Label (Only visible close up or hover) */}
          {hoveredNode === node.id && (
            <Html distanceFactor={10}>
              <div
                style={{
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid #00f0ff',
                  padding: '4px',
                  fontSize: '10px',
                  color: '#00f0ff',
                  fontFamily: 'monospace',
                }}
              >
                NODE_{node.id}
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* Connections (Random lines between nodes) */}
      <Line
        points={nodes.slice(0, 20).map((n) => n.position)} // Simplify for demo
        color='#003050'
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}
