'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Orbit, Radio } from 'lucide-react';

export const Hero3DPlaceholder: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) * 2 - 1).toFixed(2);
      const y = (-(e.clientY / innerHeight) * 2 + 1).toFixed(2);
      setCoords({ x: Number(x), y: Number(y) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8065FF]/20 via-[#48BFFF]/10 to-transparent blur-3xl" />

      {/* Decorative Outer Orbital Ring */}
      <div className="absolute inset-4 rounded-full border border-dashed border-[#8065FF]/25 animate-[spin_40s_linear_infinite]" />
      
      {/* Intermediate Ring */}
      <div className="absolute inset-14 rounded-full border border-[#48BFFF]/20 animate-[spin_25s_linear_infinite_reverse]" />

      {/* Crosshair guidelines */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#F1F2FA]/10 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#F1F2FA]/10 to-transparent" />

      {/* Central Visual Focus */}
      <motion.div
        animate={{
          rotateX: coords.y * 15,
          rotateY: coords.x * 15,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative z-10 w-48 h-48 rounded-2xl glass-surface p-6 flex flex-col items-center justify-center text-center shadow-2xl border border-[#8065FF]/40 group"
      >
        <div className="relative mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8065FF]/30 to-[#48BFFF]/20 flex items-center justify-center border border-[#8065FF]/40 shadow-inner">
            <Orbit className="w-7 h-7 text-[#48BFFF] animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8065FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8065FF]"></span>
          </span>
        </div>

        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F1F2FA]">
          Selective 3D Core
        </p>
        <p className="text-[10px] font-mono text-[#9BA3BF] mt-1">
          Canvas Target: WebGL / R3F
        </p>

        {/* Telemetry pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#080A12]/80 border border-[#8065FF]/30 text-[10px] font-mono text-[#48BFFF]">
          <Radio className="w-2.5 h-2.5 animate-pulse text-[#48BFFF]" />
          <span>Stage 01 Placeholder</span>
        </div>
      </motion.div>

      {/* Floating HUD metrics */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-[#9BA3BF] bg-[#080A12]/90 border border-[#F1F2FA]/10 px-2.5 py-1 rounded backdrop-blur">
        NORM_XY: [{coords.x}, {coords.y}]
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#48BFFF] bg-[#080A12]/90 border border-[#48BFFF]/20 px-2.5 py-1 rounded backdrop-blur flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-[#8065FF]" />
        TARGET_FPS: 60 (R3F Ready)
      </div>
    </div>
  );
};
