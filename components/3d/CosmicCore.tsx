'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface CosmicCoreProps {
  isResonating: boolean;
  onToggleResonance: () => void;
  isReducedMotion: boolean;
  isMobile: boolean;
}

export const CosmicCore: React.FC<CosmicCoreProps> = ({
  isResonating,
  onToggleResonance,
  isReducedMotion,
  isMobile,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  // Animate elements on frame with smooth interpolation
  useFrame((state, delta) => {
    // Pointer parallax damping
    if (groupRef.current && !isReducedMotion) {
      const targetRotX = state.pointer.y * 0.35;
      const targetRotY = state.pointer.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    if (isReducedMotion) return;

    const speed = isResonating ? 2.4 : 1.0;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35 * speed;
      coreRef.current.rotation.x += delta * 0.2 * speed;
    }

    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.25 * speed;
      latticeRef.current.rotation.z += delta * 0.15 * speed;
      // Gentle pulsing scale
      const pulse = Math.sin(state.clock.elapsedTime * (isResonating ? 3 : 1.5)) * 0.04;
      latticeRef.current.scale.set(1.35 + pulse, 1.35 + pulse, 1.35 + pulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.45 * speed;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.38 * speed;
    }

    // Orbit satellite position calculation
    if (satelliteRef.current) {
      const time = state.clock.elapsedTime * (isResonating ? 2.0 : 0.8);
      const radius = 2.3;
      satelliteRef.current.position.x = Math.cos(time) * radius;
      satelliteRef.current.position.y = Math.sin(time) * (radius * 0.4);
      satelliteRef.current.position.z = Math.sin(time) * radius;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={isReducedMotion ? 0 : isResonating ? 3.5 : 2}
        rotationIntensity={isReducedMotion ? 0 : 0.3}
        floatIntensity={isReducedMotion ? 0 : 0.5}
      >
        {/* Clickable Core Group */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            onToggleResonance();
          }}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Inner Faceted Monolith / Icosahedron Core */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[1.05, 0]} />
            <meshStandardMaterial
              roughness={0.18}
              metalness={0.88}
              color={hovered ? '#261D4C' : '#14172E'}
              emissive={isResonating ? '#8065FF' : '#3E2A82'}
              emissiveIntensity={isResonating ? 1.6 : hovered ? 0.9 : 0.45}
            />
          </mesh>

          {/* Outer Protective Lattice Cage */}
          <mesh ref={latticeRef}>
            <icosahedronGeometry args={[1.35, 1]} />
            <meshStandardMaterial
              wireframe
              roughness={0.3}
              metalness={0.6}
              color={isResonating ? '#48BFFF' : hovered ? '#A38FFF' : '#8065FF'}
              emissive={isResonating ? '#48BFFF' : '#8065FF'}
              emissiveIntensity={isResonating ? 1.2 : 0.7}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Internal Glow Light */}
          <pointLight
            color={isResonating ? '#48BFFF' : '#8065FF'}
            intensity={isResonating ? 4.5 : 1.8}
            distance={5}
            decay={2}
          />
        </group>

        {/* Primary Orbital Torus Ring */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.95, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#8065FF"
            emissive="#8065FF"
            emissiveIntensity={isResonating ? 1.8 : 0.9}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Secondary Intersecting Torus Ring */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.35, 0.015, 16, 120]} />
          <meshStandardMaterial
            color="#48BFFF"
            emissive="#48BFFF"
            emissiveIntensity={isResonating ? 1.8 : 0.9}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Orbital Satellite Node */}
        <mesh ref={satelliteRef}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#48BFFF"
            emissive="#48BFFF"
            emissiveIntensity={2.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Atmospheric Environmental Sparkles */}
      <Sparkles
        count={isMobile ? 24 : isResonating ? 70 : 45}
        scale={6.5}
        size={isMobile ? 1.8 : 2.4}
        speed={isReducedMotion ? 0 : isResonating ? 1.4 : 0.4}
        color={isResonating ? '#48BFFF' : '#8065FF'}
        opacity={0.7}
      />
    </group>
  );
};
