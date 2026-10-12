'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const DevFlowAIVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
    <div className="relative rounded-2xl bg-[#0B0E1B]/60 border border-[#8065FF]/15 overflow-hidden shadow-2xl backdrop-blur-xl group transition-all duration-700 hover:border-[#8065FF]/30">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#8065FF]/10 blur-3xl transition-opacity duration-700 group-hover:bg-[#8065FF]/15" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#48BFFF]/10 blur-3xl transition-opacity duration-700 group-hover:bg-[#48BFFF]/15" />

      {/* Illuminated Code Architecture Canvas */}
      <div className="p-5 sm:p-7 font-mono text-xs select-none">
        {/* Subtle File Marker */}
        <div className="mb-3.5 flex items-center justify-between text-[11px] text-[#9BA3BF]/80 pb-2.5 border-b border-[#F1F2FA]/5">
          <span className="text-[#A38FFF] font-semibold">services/resolver.ts</span>
          <span className="text-[#616B87] text-[10px]">UNIFIED DIFF</span>
        </div>

        {/* Code Diff Lines with Staggered Entrance Reveal */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-1.5 rounded-xl bg-gradient-to-b from-[#0F1325]/70 to-[#080A12]/90 border border-[#F1F2FA]/[0.06] p-4 sm:p-5 text-[11px] sm:text-xs overflow-x-auto leading-relaxed shadow-inner"
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
  );
};
