'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Reveal } from '@/components/motion/Reveal';
import { Mail, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <footer id="contact" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/10 bg-[#080A12]">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8065FF]/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#48BFFF]">
              <Mail className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest">Direct Channel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F1F2FA] tracking-tight">
              Initiate Transmission
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9BA3BF] font-sans">
              Open for software engineering initiatives, intelligent tooling collaborations, and select project opportunities.
            </p>
          </Reveal>
        </div>

        {/* Primary Contact Action Card */}
        <Reveal delay={0.1}>
          <div className="p-8 sm:p-12 rounded-2xl bg-[#151A2C]/80 border border-[#8065FF]/30 shadow-2xl backdrop-blur-xl mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#8065FF] mb-2">
                {'//'} Direct Email Contact Placeholder
              </div>
              <a
                href={profileData.socials.find((s) => s.name === 'Email')?.url || 'mailto:[your-email@example.com]'}
                className="text-xl sm:text-3xl font-mono font-bold text-[#F1F2FA] hover:text-[#48BFFF] transition-colors break-all"
              >
                {profileData.socials.find((s) => s.name === 'Email')?.handle || '[your-email@example.com]'}
              </a>
              <p className="text-xs font-mono text-[#9BA3BF] mt-2">
                Response timeline: 24–48 hours for engineering & project inquiries.
              </p>
            </div>

            <a
              href={profileData.socials.find((s) => s.name === 'Email')?.url || 'mailto:[your-email@example.com]'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8065FF] hover:bg-[#A38FFF] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-[#8065FF]/25 hover:scale-105 active:scale-95 shrink-0"
            >
              <span>SEND TRANSMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* Social / Link Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {profileData.socials.map((social, idx) => (
            <Reveal key={social.name} delay={idx * 0.05}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#151A2C]/40 border border-[#F1F2FA]/10 hover:border-[#8065FF]/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-mono text-[#9BA3BF] group-hover:text-[#F1F2FA] transition-colors">
                    {social.name}
                  </div>
                  <div className="text-xs font-mono text-[#8065FF] truncate max-w-[150px]">
                    {social.handle}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9BA3BF] group-hover:text-[#48BFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Bottom Colophon / Status Bar */}
        <div className="pt-8 border-t border-[#F1F2FA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9BA3BF]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
            <span>{profileData.name} © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>PORTFOLIO SYSTEM: STAGE 01 FOUNDATION</span>
            <span className="text-[#8065FF]">{'//'} NEXT.JS 15 + R3F + MOTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
