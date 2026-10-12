'use client';

import React from 'react';
import { motion, useReducedMotion, useTransform, useMotionValue, MotionValue } from 'motion/react';

interface DevFlowAIVisualProps {
  scrollProgress?: MotionValue<number>;
}

export const DevFlowAIVisual: React.FC<DevFlowAIVisualProps> = ({ scrollProgress }) => {
  const shouldReduceMotion = useReducedMotion();
  const fallbackProgress = useMotionValue(0.5);
  const activeProgress = scrollProgress || fallbackProgress;

  // Scroll-driven subtle 3D holographic tilt on desktop
  const rotateX = useTransform(activeProgress, [0, 0.5, 1], [3.5, 0, -3.5]);
  const rotateY = useTransform(activeProgress, [0, 0.5, 1], [-2.5, 0, 2.5]);
  const scale = useTransform(activeProgress, [0, 0.5, 1], [0.98, 1.01, 0.98]);
  const ambientGlowOpacity = useTransform(activeProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  // Scroll-driven laser verification scanline beam
  const scanlineTop = useTransform(activeProgress, [0.2, 0.8], ['0%', '100%']);
  const scanlineOpacity = useTransform(activeProgress, [0.15, 0.25, 0.75, 0.85], [0, 0.9, 0.9, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: shouldReduceMotion ? 1 : scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-3xl bg-[#080B17]/80 border border-[#8065FF]/20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(128,101,255,0.2)] backdrop-blur-2xl group transition-all duration-700 hover:border-[#8065FF]/40"
      >
        {/* Ambient background glow - coordinated with scroll */}
        <motion.div
          style={{ opacity: shouldReduceMotion ? 0.12 : ambientGlowOpacity }}
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8065FF] blur-[120px] transition-opacity duration-700"
        />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#48BFFF]/15 blur-[120px] transition-opacity duration-700 group-hover:bg-[#48BFFF]/25" />

        {/* Holographic Terminal Titlebar */}
        <div className="px-5 py-3 border-b border-[#F1F2FA]/5 flex items-center justify-between text-[11px] font-mono select-none bg-[#0D1022]/60">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
            <span className="ml-2 text-[#A38FFF] font-semibold">services/resolver.ts</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#9BA3BF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>AST_PARSER // VERIFIED</span>
          </div>
        </div>

        {/* Illuminated Code Architecture Canvas */}
        <div className="p-4 sm:p-7 font-mono text-xs select-none">

          {/* Code Diff Lines with Staggered Entrance Reveal & Laser Scanline */}
          <div className="relative overflow-hidden rounded-xl border border-[#F1F2FA]/[0.06]">
            {/* Scroll-driven illuminated laser verification scanline */}
            {!shouldReduceMotion && (
              <motion.div
                style={{
                  top: scanlineTop,
                  opacity: scanlineOpacity,
                }}
                className="pointer-events-none absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#48BFFF] to-transparent shadow-[0_0_12px_#48BFFF] z-10"
              />
            )}

            <motion.div
              variants={shouldReduceMotion ? undefined : containerVariants}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-1.5 bg-gradient-to-b from-[#0F1325]/70 to-[#080A12]/90 p-4 sm:p-5 text-[11px] sm:text-xs overflow-x-auto leading-relaxed shadow-inner"
            >
          {/* Context Line 1 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 text-[#616B87]"
          >
            <span className="w-5 text-right select-none text-[10px] opacity-50">38</span>
            <span className="w-3 text-center select-none text-[#616B87]"> </span>
            <span className="text-[#CCD0E5]">
              <span className="text-[#8065FF]">export async function</span>{' '}
              <span className="text-[#48BFFF]">resolveEntity</span>
              (input: <span className="text-[#A38FFF]">NormalizedQuery</span>) {'{'}
            </span>
          </motion.div>

          {/* Context Line 2 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 text-[#616B87]"
          >
            <span className="w-5 text-right select-none text-[10px] opacity-50">39</span>
            <span className="w-3 text-center select-none text-[#616B87]"> </span>
            <span className="text-[#9BA3BF]/70 italic">
              {'  // Canonical register verification anchor'}
            </span>
          </motion.div>

          {/* Deleted Line */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 bg-[#E11D48]/[0.08] text-[#FCA5A5] -mx-2 px-2 py-0.5 rounded border-l-2 border-[#E11D48]/70"
          >
            <span className="w-5 text-right select-none text-[10px] text-[#E11D48]/80">40</span>
            <span className="w-3 text-center select-none font-bold text-[#E11D48]">-</span>
            <span>
              {'  '}<span className="text-[#E11D48]">const</span> rawEntity ={' '}
              <span className="text-[#E11D48]">await</span> fetchUncheckedDomain(input.name);
            </span>
          </motion.div>

          {/* Added Line 1 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 bg-[#10B981]/[0.08] text-[#6EE7B7] -mx-2 px-2 py-0.5 rounded border-l-2 border-[#10B981]/70"
          >
            <span className="w-5 text-right select-none text-[10px] text-[#10B981]/80">40</span>
            <span className="w-3 text-center select-none font-bold text-[#10B981]">+</span>
            <span>
              {'  '}<span className="text-[#8065FF]">const</span> verified ={' '}
              <span className="text-[#8065FF]">await</span> registryGuard.verify(input.orgNumber);
            </span>
          </motion.div>

          {/* Added Line 2 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 bg-[#10B981]/[0.08] text-[#6EE7B7] -mx-2 px-2 py-0.5 rounded border-l-2 border-[#10B981]/70"
          >
            <span className="w-5 text-right select-none text-[10px] text-[#10B981]/80">41</span>
            <span className="w-3 text-center select-none font-bold text-[#10B981]">+</span>
            <span>
              {'  '}<span className="text-[#8065FF]">if</span> (!verified.isCanonical){' '}
              <span className="text-[#8065FF]">throw new</span>{' '}
              <span className="text-[#48BFFF]">UnregisteredEntityError</span>();
            </span>
          </motion.div>

          {/* Context Line 3 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 text-[#616B87]"
          >
            <span className="w-5 text-right select-none text-[10px] opacity-50">42</span>
            <span className="w-3 text-center select-none text-[#616B87]"> </span>
            <span className="text-[#CCD0E5]">
              {'  '}<span className="text-[#8065FF]">return</span> buildAttestationGraph(verified);
            </span>
          </motion.div>

          {/* Context Line 4 */}
          <motion.div
            variants={shouldReduceMotion ? undefined : lineVariants}
            className="flex items-center gap-3 text-[#616B87]"
          >
            <span className="w-5 text-right select-none text-[10px] opacity-50">43</span>
            <span className="w-3 text-center select-none text-[#616B87]"> </span>
            <span className="text-[#CCD0E5]">{'}'}</span>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
);
};
