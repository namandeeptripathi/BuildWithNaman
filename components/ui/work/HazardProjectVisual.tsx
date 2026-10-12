'use client';

import React from 'react';
import { motion, useReducedMotion, useTransform, useMotionValue, MotionValue } from 'motion/react';

interface HazardProjectVisualProps {
  scrollProgress?: MotionValue<number>;
}

export const HazardProjectVisual: React.FC<HazardProjectVisualProps> = ({ scrollProgress }) => {
  const shouldReduceMotion = useReducedMotion();
  const fallbackProgress = useMotionValue(0.5);
  const activeProgress = scrollProgress || fallbackProgress;

  // Scroll-driven elevation strata differential parallax
  const fgContourY = useTransform(activeProgress, [0, 1], [-8, 8]);
  const mgContourY = useTransform(activeProgress, [0, 1], [-4, 4]);
  const bgContourY = useTransform(activeProgress, [0, 1], [-1.5, 1.5]);

  // Scroll-driven progressive relocation spline and waypoint reveals
  const routePathLength = useTransform(activeProgress, [0.25, 0.65], [0, 1]);
  const routeOpacity = useTransform(activeProgress, [0.2, 0.3], [0, 0.85]);
  const waypoint1Scale = useTransform(activeProgress, [0.38, 0.48], [0, 1]);
  const waypoint2Scale = useTransform(activeProgress, [0.52, 0.62], [0, 1]);
  const ambientGlowOpacity = useTransform(activeProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  return (
    <div className="relative w-full rounded-3xl bg-[#080B17]/75 border border-[#48BFFF]/20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(72,191,255,0.18)] backdrop-blur-2xl group transition-all duration-700 hover:border-[#48BFFF]/40">
      {/* Ambient background glow - coordinated with scroll */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 0.12 : ambientGlowOpacity }}
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#48BFFF] blur-[120px] transition-opacity duration-700"
      />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#8065FF]/15 blur-[120px] transition-opacity duration-700 group-hover:bg-[#8065FF]/25" />

      {/* Cartographic Coordinate Banner */}
      <div className="px-5 py-2.5 border-b border-[#F1F2FA]/5 flex items-center justify-between text-[10px] font-mono text-[#9BA3BF]/70 select-none">
        <span className="text-[#48BFFF] font-semibold">GEOSPATIAL ELEVATION STRATA // MODEL_V2</span>
        <span className="tracking-widest hidden sm:inline">60°47&apos;N · 08°28&apos;E // NVE HYDROL</span>
      </div>

      {/* Pure Topographic Map Canvas */}
      <div className="relative p-4 sm:p-8 select-none">
        <svg
          viewBox="0 0 600 370"
          className="w-full h-auto max-h-[440px] lg:max-h-[490px]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="hazard-basin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8065FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#E11D48" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="safe-parcel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48BFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.08" />
            </linearGradient>

            <pattern id="hazard-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#8065FF" strokeOpacity="0.18" strokeWidth="1" />
            </pattern>

            <filter id="hazard-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coordinate grid lines */}
          <g stroke="#F1F2FA" strokeOpacity="0.03" strokeWidth="0.5">
            <line x1="50" y1="70" x2="550" y2="70" />
            <line x1="50" y1="140" x2="550" y2="140" />
            <line x1="50" y1="210" x2="550" y2="210" />
            <line x1="50" y1="280" x2="550" y2="280" />
            <line x1="120" y1="30" x2="120" y2="340" />
            <line x1="240" y1="30" x2="240" y2="340" />
            <line x1="360" y1="30" x2="360" y2="340" />
            <line x1="480" y1="30" x2="480" y2="340" />
          </g>

          {/* Organic Topographic Elevation Contours with Restrained Strata Parallax */}
          <g fill="none">
            {/* Contour 1 - Valley Floor (Foreground strata) */}
            <motion.g
              opacity={0.3}
              style={{ y: shouldReduceMotion ? 0 : fgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -1.5; 0 0"
                  dur="11s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,300 C 120,320 180,270 270,280 C 360,290 430,330 560,300"
                stroke="#48BFFF"
                strokeWidth="1"
              />
            </motion.g>

            {/* Contour 2 - 25m Strata */}
            <motion.g
              opacity={0.4}
              style={{ y: shouldReduceMotion ? 0 : fgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -2; 0 0"
                  dur="9.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,260 C 130,280 190,230 280,240 C 370,250 440,280 560,250"
                stroke="#48BFFF"
                strokeWidth="1"
              />
            </motion.g>

            {/* Contour 3 - 60m Strata */}
            <motion.g
              opacity={0.55}
              style={{ y: shouldReduceMotion ? 0 : mgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -2.5; 0 0"
                  dur="8.2s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,210 C 140,230 200,180 300,195 C 400,210 460,230 560,200"
                stroke="#48BFFF"
                strokeWidth="1"
              />
            </motion.g>

            {/* Contour 4 - 110m (Primary Index Contour) */}
            <motion.g
              opacity={0.75}
              style={{ y: shouldReduceMotion ? 0 : mgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -3; 0 0"
                  dur="7.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,160 C 150,180 210,130 320,145 C 410,160 470,180 560,150"
                stroke="#48BFFF"
                strokeWidth="1.4"
              />
            </motion.g>

            {/* Contour 5 - 160m Intermediate */}
            <motion.g
              opacity={0.5}
              style={{ y: shouldReduceMotion ? 0 : bgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -2; 0 0"
                  dur="9s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,110 C 160,130 230,90 340,105 C 430,120 490,130 560,100"
                stroke="#8065FF"
                strokeWidth="1"
              />
            </motion.g>

            {/* Contour 6 - 210m Ridge Line */}
            <motion.g
              opacity={0.35}
              style={{ y: shouldReduceMotion ? 0 : bgContourY }}
            >
              {!shouldReduceMotion && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -1.6; 0 0"
                  dur="10.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              )}
              <path
                d="M 40,70 C 180,90 250,55 360,70 C 450,85 510,90 560,60"
                stroke="#8065FF"
                strokeWidth="1"
              />
            </motion.g>
          </g>

          {/* Elevation Labels */}
          <g fontSize="8" fontFamily="var(--font-jetbrains-mono, monospace)" fill="#9BA3BF" opacity="0.5">
            <text x="65" y="155">+110m</text>
            <text x="65" y="205">+60m</text>
            <text x="65" y="255">+25m</text>
          </g>

          {/* Hazard Risk Exposure Basin (Shaded polygon) */}
          <g>
            <path
              d="M 100,230 C 140,210 200,220 230,260 C 260,300 200,330 140,320 C 90,310 70,260 100,230 Z"
              fill="url(#hazard-basin-grad)"
              stroke="#8065FF"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <path
              d="M 100,230 C 140,210 200,220 230,260 C 260,300 200,330 140,320 C 90,310 70,260 100,230 Z"
              fill="url(#hazard-hatch)"
            />

            {/* Impact Center Marker */}
            <circle cx="160" cy="275" r="4.5" fill="#8065FF" filter="url(#hazard-glow)" />

            {/* Calm, continuous breathing aura for impact epicenter */}
            {!shouldReduceMotion && (
              <circle
                cx="160"
                cy="275"
                r="10"
                fill="none"
                stroke="#8065FF"
                strokeWidth="1.2"
              >
                <animate
                  attributeName="r"
                  values="8; 20; 8"
                  dur="4.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.4; 0.05; 0.4"
                  dur="4.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </circle>
            )}

            <text
              x="160"
              y="305"
              textAnchor="middle"
              fill="#CCD0E5"
              fontSize="8.5"
              fontFamily="var(--font-jetbrains-mono, monospace)"
              opacity="0.8"
            >
              Hazard Impact Zone
            </text>
          </g>

          {/* Candidate Relocation Parcel */}
          <g>
            <path
              d="M 370,95 C 430,75 500,85 520,125 C 530,165 480,195 420,185 C 370,175 340,125 370,95 Z"
              fill="url(#safe-parcel-grad)"
              stroke="#48BFFF"
              strokeWidth="1.4"
            />

            <circle cx="440" cy="140" r="4.5" fill="#48BFFF" filter="url(#hazard-glow)" />

            <text
              x="440"
              y="115"
              textAnchor="middle"
              fill="#7DD3FC"
              fontSize="8.5"
              fontWeight="bold"
              fontFamily="var(--font-jetbrains-mono, monospace)"
            >
              Safe Receptor Parcel
            </text>
          </g>

          {/* Progressive Scroll-Driven Relocation Route Vector Spline */}
          <g>
            <motion.path
              d="M 160,275 C 230,230 320,250 440,140"
              fill="none"
              stroke="#48BFFF"
              strokeWidth="1.8"
              strokeDasharray="5 4"
              strokeOpacity="0.8"
              style={{
                pathLength: shouldReduceMotion ? 1 : routePathLength,
                opacity: shouldReduceMotion ? 0.85 : routeOpacity,
              }}
            />

            {/* Waypoint 1 - revealed as route advances */}
            <motion.circle
              cx="280"
              cy="235"
              r="2.5"
              fill="#48BFFF"
              style={{
                scale: shouldReduceMotion ? 1 : waypoint1Scale,
                opacity: shouldReduceMotion ? 0.9 : routeOpacity,
              }}
            />

            {/* Waypoint 2 - revealed as route approaches receptor */}
            <motion.circle
              cx="360"
              cy="195"
              r="2.5"
              fill="#48BFFF"
              style={{
                scale: shouldReduceMotion ? 1 : waypoint2Scale,
                opacity: shouldReduceMotion ? 0.9 : routeOpacity,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
