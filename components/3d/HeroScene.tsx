'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CosmicCore } from './CosmicCore';
import { HeroFallback } from './HeroFallback';

export const HeroScene: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    // Responsive check
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);

    // Smooth window pointer tracking for deliberate 3D movement
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll progress tracking normalized across Hero runway
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        scrollRef.current = 0;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const heroScrollDistance = rect.height - window.innerHeight;
      const progress = heroScrollDistance > 0
        ? Math.max(0, Math.min(1.5, -rect.top / heroScrollDistance))
        : Math.max(0, Math.min(1.5, -rect.top / window.innerHeight));
      scrollRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // WebGL not supported fallback
  if (webglSupported === false) {
    return <HeroFallback reason="Hardware 3D Acceleration Unavailable" />;
  }

  // Pre-hydration placeholder
  if (webglSupported === null) {
    return <HeroFallback reason="Initializing 3D Pipeline..." />;
  }

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <Suspense fallback={<HeroFallback reason="Loading Atmospheric Shaders..." />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.8], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full pointer-events-none"
        >
          {/* Studio Key, Rim & Ambient Lighting Rig */}
          <ambientLight color="#080A12" intensity={1.2} />
          <directionalLight position={[4, 5, 5]} color="#FFFFFF" intensity={3.5} />
          <directionalLight position={[-5, 4, 3]} color="#8065FF" intensity={3.8} />
          <directionalLight position={[5, -3, 3]} color="#48BFFF" intensity={3.0} />
          <pointLight position={[0, 6, 2.5]} color="#F1F2FA" intensity={2.0} />
          <pointLight position={[0, -2, -3]} color="#8065FF" intensity={1.5} />

          {/* Procedural 3D Cosmic Core Sculpture */}
          <CosmicCore
            pointerRef={pointerRef}
            scrollRef={scrollRef}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
