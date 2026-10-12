'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface CosmicCoreProps {
  pointerRef: React.RefObject<{ x: number; y: number }>;
  scrollRef?: React.RefObject<number>;
  isReducedMotion: boolean;
  isMobile: boolean;
}

export const CosmicCore: React.FC<CosmicCoreProps> = ({
  pointerRef,
  scrollRef,
  isReducedMotion,
  isMobile,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const outerCrystalRef = useRef<THREE.Mesh>(null);
  const innerGemRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  // Responsive focal positioning based on canvas viewport
  const isNarrow = viewport.width < 5.8;
  const baseTargetX = isNarrow ? 0 : Math.min(viewport.width * 0.28, 2.15);
  const baseTargetY = isNarrow ? 0.35 : 0;
  const baseScale = isNarrow ? 0.72 : 0.95;

  useFrame((state, delta) => {
    const scroll = (!isReducedMotion && scrollRef?.current) ? scrollRef.current : 0;

    // Scroll-driven 3D translation & scale: Crystal recedes into deep cosmic space as page scrolls down
    if (rootGroupRef.current) {
      const scrollTargetX = isNarrow ? 0 : baseTargetX * Math.max(0, 1 - scroll * 0.65);
      const scrollTargetY = baseTargetY + scroll * 1.1;
      const scrollTargetZ = -scroll * 3.4;
      const scrollTargetScale = baseScale * Math.max(0.68, 1 - scroll * 0.26);

      rootGroupRef.current.position.x = THREE.MathUtils.lerp(rootGroupRef.current.position.x, scrollTargetX, 0.06);
      rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, scrollTargetY, 0.06);
      rootGroupRef.current.position.z = THREE.MathUtils.lerp(rootGroupRef.current.position.z, scrollTargetZ, 0.06);
      rootGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(rootGroupRef.current.scale.x, scrollTargetScale, 0.06)
      );
    }

    // Pointer parallax + Scroll-driven tumbling rotation
    if (groupRef.current && !isReducedMotion) {
      const ptrX = pointerRef.current?.x ?? 0;
      const ptrY = pointerRef.current?.y ?? 0;

      const targetRotX = (ptrY * 0.22) + (scroll * Math.PI * 0.7);
      const targetRotY = (ptrX * 0.28) + (scroll * Math.PI * 1.1);

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

    // Outer prismatic crystal: slow, stately rotation catching faceted specular gleams
    if (outerCrystalRef.current) {
      outerCrystalRef.current.rotation.y += delta * (0.2 + scroll * 0.4);
      outerCrystalRef.current.rotation.x += delta * (0.12 + scroll * 0.25);
    }

    // Inner luminescent gem: counter-rotation creating optical refraction depth
    if (innerGemRef.current) {
      innerGemRef.current.rotation.y -= delta * (0.35 + scroll * 0.5);
      innerGemRef.current.rotation.z += delta * (0.22 + scroll * 0.3);
    }

    // Outer architectural lattice: breathing scale and counter-spin
    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.14;
      latticeRef.current.rotation.x += delta * 0.08;
      const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.025;
      latticeRef.current.scale.set(1.42 + pulse, 1.42 + pulse, 1.42 + pulse);
    }

    // Multi-axis orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * (0.2 + scroll * 0.3);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * (0.16 + scroll * 0.25);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * (0.1 + scroll * 0.15);
    }

    // Orbital satellite beacons
    if (satellite1Ref.current) {
      const t = state.clock.elapsedTime * (0.65 + scroll * 0.4);
      const r = 2.15;
      satellite1Ref.current.position.x = Math.cos(t) * r;
      satellite1Ref.current.position.y = Math.sin(t) * (r * 0.35);
      satellite1Ref.current.position.z = Math.sin(t) * r;
    }
    if (satellite2Ref.current) {
      const t = -state.clock.elapsedTime * (0.45 + scroll * 0.3) + Math.PI;
      const r = 2.55;
      satellite2Ref.current.position.x = Math.cos(t) * r;
      satellite2Ref.current.position.y = Math.sin(t) * (r * -0.4);
      satellite2Ref.current.position.z = Math.sin(t) * r;
    }
  });

  return (
    <group ref={rootGroupRef} position={[baseTargetX, baseTargetY, 0]} scale={baseScale}>
      <group ref={groupRef}>
        <Float
          speed={isReducedMotion ? 0 : 1.8}
          rotationIntensity={isReducedMotion ? 0 : 0.2}
          floatIntensity={isReducedMotion ? 0 : 0.32}
        >
          {/* Central Prismatic Glass Sculpture Group */}
          <group>
            {/* Inner Luminescent Gem Core */}
            <mesh ref={innerGemRef}>
              <octahedronGeometry args={[0.58, 0]} />
              <meshStandardMaterial
                roughness={0.08}
                metalness={0.9}
                color="#6B4CFF"
                emissive="#48BFFF"
                emissiveIntensity={3.2}
              />
            </mesh>

            {/* Inner Refractive Radiance */}
            <pointLight
              color="#8065FF"
              intensity={4.2}
              distance={5}
              decay={2}
            />
            <pointLight
              color="#48BFFF"
              intensity={3.2}
              distance={4}
              decay={2}
              position={[0, -0.1, 0.25]}
            />

            {/* Outer Prismatic Crystal Monolith with Faceted Diamond Shading */}
            <mesh ref={outerCrystalRef}>
              <icosahedronGeometry args={[1.22, 0]} />
              <meshPhysicalMaterial
                roughness={0.08}
                metalness={0.15}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                color="#231D4A"
                emissive="#3D2E80"
                emissiveIntensity={0.55}
                transparent={true}
                opacity={0.88}
                flatShading={true}
              />
            </mesh>

            {/* Outer Architectural Lattice — subdued to let crystal dominate */}
            <mesh ref={latticeRef}>
              <icosahedronGeometry args={[1.48, 1]} />
              <meshStandardMaterial
                wireframe
                roughness={0.3}
                metalness={0.6}
                color="#8065FF"
                emissive="#8065FF"
                emissiveIntensity={0.4}
                transparent
                opacity={0.18}
              />
            </mesh>
          </group>

          {/* Primary Orbital Torus Ring */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3.2, 0.2, 0]}>
            <torusGeometry args={[2.15, 0.012, 16, isMobile ? 64 : 128]} />
            <meshStandardMaterial
              color="#8065FF"
              emissive="#8065FF"
              emissiveIntensity={1.4}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Secondary Counter-Inclined Torus Ring */}
          <mesh ref={ring2Ref} rotation={[-Math.PI / 3.8, 0.4, 0.2]}>
            <torusGeometry args={[2.55, 0.009, 16, isMobile ? 64 : 128]} />
            <meshStandardMaterial
              color="#48BFFF"
              emissive="#48BFFF"
              emissiveIntensity={1.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Equatorial Accent Ring — very subtle */}
          <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
            <torusGeometry args={[1.72, 0.005, 16, isMobile ? 48 : 96]} />
            <meshStandardMaterial
              color="#F1F2FA"
              emissive="#F1F2FA"
              emissiveIntensity={0.5}
              metalness={0.95}
              roughness={0.08}
              transparent
              opacity={0.22}
            />
          </mesh>

          {/* Orbital Satellite Node 1 */}
          <mesh ref={satellite1Ref}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial
              color="#48BFFF"
              emissive="#48BFFF"
              emissiveIntensity={3.0}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>

          {/* Orbital Satellite Node 2 */}
          <mesh ref={satellite2Ref}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color="#8065FF"
              emissive="#8065FF"
              emissiveIntensity={3.2}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>
        </Float>

        {/* Serene Atmospheric Particle Field */}
        <Sparkles
          count={isMobile ? 18 : 36}
          scale={7.0}
          size={isMobile ? 1.6 : 2.2}
          speed={isReducedMotion ? 0 : 0.35}
          color="#8065FF"
          opacity={0.5}
        />
      </group>
    </group>
  );
};
