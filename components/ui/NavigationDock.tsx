'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Briefcase, User, Mail, Compass, FileText } from 'lucide-react';
import { profileData } from '@/data/profile';

export const NavigationDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'manifesto', 'work', 'skills', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: 'Selected Work', icon: Briefcase, href: '#work' },
    { id: 'manifesto', label: 'Manifesto', icon: Compass, href: '#manifesto' },
    { id: 'skills', label: 'Stack', icon: Code2, href: '#skills' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? 'glass-surface shadow-2xl border border-[#8065FF]/30 shadow-[#8065FF]/5 backdrop-blur-xl'
            : 'bg-[#151A2C]/60 border border-[#F1F2FA]/10 backdrop-blur-md'
        }`}
      >
        <a
          href="#hero"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-xs font-mono font-bold tracking-tight text-[#F1F2FA] hover:text-[#48BFFF] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#8065FF] shadow-[0_0_8px_#8065FF]" />
          <span className="hidden sm:inline">BUILD WITH NAMAN</span>
        </a>

        <div className="h-4 w-px bg-[#F1F2FA]/10 mx-1 hidden sm:block" />

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#F1F2FA] bg-[#8065FF]/20 border border-[#8065FF]/40 shadow-sm'
                    : 'text-[#9BA3BF] hover:text-[#F1F2FA] hover:bg-[#F1F2FA]/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="h-4 w-px bg-[#F1F2FA]/10 mx-1" />

        {/* Resume Action */}
        {profileData.resumeUrl && !profileData.resumeUrl.includes('[Add-Resume-URL]') ? (
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#48BFFF] bg-[#48BFFF]/10 border border-[#48BFFF]/30 hover:bg-[#48BFFF]/20 transition-colors"
            title="View résumé"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV</span>
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-[#9BA3BF]/60 bg-[#151A2C]/40 border border-[#F1F2FA]/5 cursor-not-allowed select-none"
            title="Résumé coming soon"
            aria-disabled="true"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV (Soon)</span>
          </span>
        )}
      </motion.nav>
    </header>
  );
};
