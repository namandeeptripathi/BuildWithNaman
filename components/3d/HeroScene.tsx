'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CosmicCore } from './CosmicCore';
import { HeroFallback } from './HeroFallback';
import { Radio, Zap } from 'lucide-react';

export const HeroScene: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isResonating, setIsResonating] = useState(false);
  const [coords, setCoords] = useState({ x: '0.00', y: '0.00' });

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl') ||
        canvas.getContext('webgl2');
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

    // Mouse coordinates tracking for HUD
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(2);
      const y = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(2);
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // WebGL not supported fallback
  if (webglSupported === false) {
    return <HeroFallback reason="WebGL Hardware Acceleration Unavailable" />;
  }

  // Pre-hydration placeholder
  if (webglSupported === null) {
    return <HeroFallback reason="Initializing 3D Pipeline..." />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-[#080A12]/90 border border-[#8065FF]/20 shadow-2xl backdrop-blur-xl group">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-[#8065FF]/15 via-[#48BFFF]/5 to-transparent blur-2xl" />

      {/* Decorative technical coordinate crosshairs */}
      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#F1F2FA]/10 to-transparent" />
      <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-[#F1F2FA]/10 to-transparent" />

      {/* 3D Canvas */}
      <Suspense fallback={<HeroFallback reason="Loading Shaders..." />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Studio Lighting Rig */}
          <ambientLight color="#0F1224" intensity={0.8} />
          <directionalLight position={[-4, 4, 3]} color="#8065FF" intensity={2.4} />
          <directionalLight position={[3, -3, -2]} color="#48BFFF" intensity={2.2} />
          <pointLight position={[0, 2, 4]} color="#F1F2FA" intensity={0.9} />

          {/* Procedural 3D Cosmic Core */}
          <CosmicCore
            isResonating={isResonating}
            onToggleResonance={() => setIsResonating((prev) => !prev)}
            isReducedMotion={isReducedMotion}
            isMobile={isMobile}
          />
        </Canvas>
      </Suspense>

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-3.5 inset-x-4 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#080A12]/80 border border-[#8065FF]/30 text-[#F1F2FA] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#48BFFF] animate-pulse" />
          <span className="text-[#8065FF] font-semibold">CORE_MODEL</span>
          <span className="text-[#9BA3BF]">{'//'}</span>
          <span>{isResonating ? 'RESONANCE_ACTIVE' : 'DEFAULT_STATE'}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#080A12]/80 border border-[#F1F2FA]/10 text-[#9BA3BF] backdrop-blur-md">
          <span>POINTER_XY:</span>
          <span className="text-[#48BFFF]">[{coords.x}, {coords.y}]</span>
        </div>
      </div>

      {/* Bottom Interactive HUD Bar */}
      <div className="absolute bottom-3.5 inset-x-4 flex items-center justify-between text-[10px] font-mono">
        <button
          type="button"
          onClick={() => setIsResonating((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer select-none backdrop-blur-md ${
            isResonating
              ? 'bg-[#48BFFF]/20 border-[#48BFFF] text-[#48BFFF] shadow-[0_0_15px_rgba(72,191,255,0.3)]'
              : 'bg-[#8065FF]/15 border-[#8065FF]/40 text-[#F1F2FA] hover:bg-[#8065FF]/30 hover:border-[#8065FF]'
          }`}
          title="Toggle interactive resonance state"
        >
          <Zap className={`w-3 h-3 ${isResonating ? 'text-[#48BFFF] animate-spin' : 'text-[#8065FF]'}`} />
          <span>{isResonating ? 'RESONANCE ACTIVE [RESET]' : 'INTERACT [OVERCLOCK]'}</span>
        </button>

        <div className="flex items-center gap-2 text-[#9BA3BF] px-2.5 py-1 rounded-full bg-[#080A12]/80 border border-[#F1F2FA]/10 backdrop-blur-md">
          <Radio className="w-2.5 h-2.5 text-[#48BFFF] animate-pulse" />
          <span className="hidden sm:inline">ENGINE:</span>
          <span className="text-[#F1F2FA]">R3F / THREE.JS</span>
        </div>
      </div>
    </div>
  );
};
