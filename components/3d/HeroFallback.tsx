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
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-28 select-none overflow-hidden pointer-events-none">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-[#8065FF]/12 via-[#48BFFF]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Atmospheric Orbital Rings */}
      <div className="relative flex items-center justify-center w-[320px] h-[320px] sm:w-[440px] sm:h-[440px]">
        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#8065FF]/25 animate-[spin_60s_linear_infinite]" />
        
        {/* Secondary counter-rotating orbital ring */}
        <div className="absolute inset-8 sm:inset-12 rounded-full border border-[#48BFFF]/20 animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Tertiary equatorial ellipse */}
        <div className="absolute inset-16 sm:inset-20 rounded-full border border-[#F1F2FA]/10 rotate-45" />

        {/* Center glowing geometric sculpture motif */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-xs">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8065FF]/25 to-[#48BFFF]/15 border border-[#8065FF]/40 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(128,101,255,0.3)]">
            <Orbit className="w-8 h-8 text-[#48BFFF] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8065FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8065FF]" />
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F1F2FA]">
            {reason}
          </span>
          <p className="text-[10px] font-mono text-[#9BA3BF] mt-1 leading-relaxed">
            Atmospheric CSS fallback mode active
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#151A2C]/80 border border-[#F1F2FA]/10 text-[9px] font-mono text-[#48BFFF]">
            <Sparkles className="w-2.5 h-2.5 text-[#8065FF]" />
            <span>ADAPTIVE ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
