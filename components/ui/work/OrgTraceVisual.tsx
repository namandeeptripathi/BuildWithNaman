'use client';

import React from 'react';
import { motion, useReducedMotion, useTransform, useMotionValue, MotionValue } from 'motion/react';

interface NodeData {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  isCenter?: boolean;
}

const NODES: NodeData[] = [
  {
    id: 'central',
    name: 'Canonical Entity',
    x: 300,
    y: 190,
    color: '#8065FF',
    isCenter: true,
  },
  {
    id: 'register',
    name: 'Brønnøysund Register',
    x: 130,
    y: 100,
    color: '#48BFFF',
  },
  {
    id: 'discovery',
    name: 'Web Discovery',
    x: 470,
    y: 100,
    color: '#48BFFF',
  },
  {
    id: 'executive',
    name: 'Corporate Leadership',
    x: 140,
    y: 280,
    color: '#A38FFF',
  },
  {
    id: 'evidence',
    name: 'Evidence Provenance',
    x: 460,
    y: 280,
    color: '#8065FF',
  },
];

const EDGES = [
  { from: 'register', to: 'central' },
  { from: 'central', to: 'discovery' },
  { from: 'central', to: 'executive' },
  { from: 'central', to: 'evidence' },
  { from: 'register', to: 'executive' },
  { from: 'discovery', to: 'evidence' },
];

interface OrgTraceVisualProps {
  scrollProgress?: MotionValue<number>;
}

export const OrgTraceVisual: React.FC<OrgTraceVisualProps> = ({ scrollProgress }) => {
  const shouldReduceMotion = useReducedMotion();
  const fallbackProgress = useMotionValue(0.5);
  const activeProgress = scrollProgress || fallbackProgress;

  // Scroll-driven subtle constellation dynamics
  const constellationRotate = useTransform(activeProgress, [0, 0.5, 1], [-3.5, 0, 3.5]);
  const constellationScale = useTransform(activeProgress, [0, 0.5, 1], [0.94, 1.03, 0.96]);
  const ambientGlowOpacity = useTransform(activeProgress, [0, 0.5, 1], [0.1, 0.28, 0.1]);

  // Pulse timings staggered for calm, non-synchronous circulation of light
  const pulseConfigs = [
    { dur: '4.8s', begin: '0s' },
    { dur: '5.2s', begin: '1.4s' },
    { dur: '5.6s', begin: '2.8s' },
    { dur: '4.6s', begin: '0.8s' },
    { dur: '5.8s', begin: '2.0s' },
    { dur: '5.4s', begin: '3.4s' },
  ];

  return (
    <div className="relative w-full rounded-3xl bg-[#080B17]/75 border border-[#8065FF]/20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(128,101,255,0.18)] backdrop-blur-2xl group transition-all duration-700 hover:border-[#8065FF]/40">
      {/* Ambient background glow - coordinated with scroll */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 0.12 : ambientGlowOpacity }}
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8065FF] blur-[120px] transition-opacity duration-700"
      />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#48BFFF]/15 blur-[120px] transition-opacity duration-700 group-hover:bg-[#48BFFF]/25" />

      {/* Pure SVG Constellation Canvas with subtle scroll-driven rotation and scale */}
      <motion.div
        style={{
          rotate: shouldReduceMotion ? 0 : constellationRotate,
          scale: shouldReduceMotion ? 1 : constellationScale,
        }}
        className="relative p-4 sm:p-8 select-none origin-center"
      >
        <svg
          viewBox="0 0 600 380"
          className="w-full h-auto max-h-[460px] lg:max-h-[520px]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="orgtrace-grid-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8065FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#080A12" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orgtrace-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8065FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#48BFFF" stopOpacity="0.6" />
            </linearGradient>
            <filter id="orgtrace-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="orgtrace-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep celestial coordinate orbits */}
          <circle cx="300" cy="190" r="230" fill="none" stroke="#F1F2FA" strokeOpacity="0.02" strokeDasharray="4 6" />
          <circle cx="300" cy="190" r="160" fill="none" stroke="#F1F2FA" strokeOpacity="0.035" strokeDasharray="3 3" />
          <circle cx="300" cy="190" r="100" fill="none" stroke="#8065FF" strokeOpacity="0.08" />
          <circle cx="300" cy="190" r="50" fill="url(#orgtrace-grid-glow)" />

          {/* Coordinate grid axes */}
          <line x1="80" y1="190" x2="520" y2="190" stroke="#F1F2FA" strokeOpacity="0.035" />
          <line x1="300" y1="30" x2="300" y2="350" stroke="#F1F2FA" strokeOpacity="0.035" />

          {/* Edges / Relationship connectors */}
          {EDGES.map((edge, idx) => {
            const source = NODES.find((n) => n.id === edge.from)!;
            const target = NODES.find((n) => n.id === edge.to)!;
            const config = pulseConfigs[idx % pulseConfigs.length];

            return (
              <g key={idx}>
                {/* Base connector line */}
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="url(#orgtrace-line-grad)"
                  strokeOpacity="0.3"
                  strokeWidth="1.2"
                />

                {/* Subtle animated light pulse travelling along existing connection */}
                {!shouldReduceMotion && (
                  <circle r="2.2" fill="#7DD3FC" filter="url(#orgtrace-glow)" opacity="0">
                    <animateMotion
                      path={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
                      dur={config.dur}
                      begin={config.begin}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 1"
                      keySplines="0.4 0 0.2 1"
                    />
                    {/* Gentle opacity fade at endpoints so light emerges and dissolves smoothly */}
                    <animate
                      attributeName="opacity"
                      values="0; 0.85; 0.85; 0"
                      keyTimes="0; 0.15; 0.85; 1"
                      dur={config.dur}
                      begin={config.begin}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Network Nodes */}
          {NODES.map((node, nodeIdx) => {
            const isCenter = node.isCenter;
            const depthOpacity = isCenter ? 1 : 0.85;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                opacity={depthOpacity}
                className="transition-opacity duration-500"
              >
                {/* Calm, continuous breathing aura for central canonical anchor (replaces abrupt ping) */}
                {isCenter && !shouldReduceMotion && (
                  <circle
                    r="22"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.2"
                  >
                    <animate
                      attributeName="r"
                      values="20; 36; 20"
                      dur="5s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.35; 0.06; 0.35"
                      dur="5s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </circle>
                )}

                {/* Node halo ring with gentle depth */}
                <circle
                  r={isCenter ? 24 : 17}
                  fill="#0D1021"
                  stroke={node.color}
                  strokeOpacity={isCenter ? 0.8 : 0.4}
                  strokeWidth={isCenter ? 1.8 : 1.2}
                  filter="url(#orgtrace-glow)"
                />

                {/* Inner background fill */}
                <circle
                  r={isCenter ? 19 : 13}
                  fill={isCenter ? `${node.color}25` : '#131728'}
                />

                {/* Center dot with subtle breathing on peripheral nodes */}
                <circle
                  r={isCenter ? 5 : 3.5}
                  fill={node.color}
                >
                  {!isCenter && !shouldReduceMotion && (
                    <animate
                      attributeName="fill-opacity"
                      values="0.75; 1; 0.75"
                      dur={`${4.5 + nodeIdx * 0.8}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  )}
                </circle>

                {/* Node label */}
                <text
                  y={isCenter ? 36 : 27}
                  textAnchor="middle"
                  fill="#CCD0E5"
                  fontSize={isCenter ? '11' : '10'}
                  fontFamily="var(--font-jetbrains-mono, monospace)"
                  fontWeight={isCenter ? '600' : '500'}
                  className="tracking-tight select-none pointer-events-none"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
};
