'use client';

import React from 'react';
import { Orbit, Sparkles } from 'lucide-react';

interface HeroFallbackProps {
  reason?: string;
}

export const HeroFallback: React.FC<HeroFallbackProps> = ({
  reason = 'Cosmic Core Standby',
}) => {
  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-[#0B0E1B]/80 border border-[#8065FF]/20 shadow-2xl backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#8065FF]/15 via-[#48BFFF]/5 to-transparent blur-2xl" />

      {/* Subtle orbital geometry */}
      <div className="absolute w-72 h-72 rounded-full border border-dashed border-[#8065FF]/30 animate-[spin_50s_linear_infinite]" />
      <div className="absolute w-52 h-52 rounded-full border border-[#48BFFF]/25 animate-[spin_35s_linear_infinite_reverse]" />

      {/* Center geometric motif */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-xs">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8065FF]/20 to-[#48BFFF]/10 border border-[#8065FF]/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(128,101,255,0.25)]">
          <Orbit className="w-8 h-8 text-[#48BFFF] animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8065FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8065FF]" />
          </span>
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F2FA]">
          {reason}
        </span>
        <p className="text-[11px] font-mono text-[#9BA3BF] mt-1.5 leading-relaxed">
          Tactile 3D viewport initialized with hardware-adaptive fallback.
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151A2C] border border-[#F1F2FA]/10 text-[10px] font-mono text-[#48BFFF]">
          <Sparkles className="w-3 h-3 text-[#8065FF]" />
          <span>CSS ACCELERATED MODE</span>
        </div>
      </div>

      {/* Decorative telemetry markings */}
      <div className="absolute top-3 left-4 font-mono text-[9px] text-[#9BA3BF]/70">
        CANVAS_FALLBACK // SEC_01
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#8065FF]/70">
        STABLE_ENVIRONMENT: ACTIVE
      </div>
    </div>
  );
};
