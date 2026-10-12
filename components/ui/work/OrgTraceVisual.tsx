'use client';

import React from 'react';
import { useReducedMotion } from 'motion/react';

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

export const OrgTraceVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
    <div className="relative rounded-2xl bg-[#0B0E1B]/60 border border-[#8065FF]/15 overflow-hidden shadow-2xl backdrop-blur-xl group transition-all duration-700 hover:border-[#8065FF]/30">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#8065FF]/10 blur-3xl transition-opacity duration-700 group-hover:bg-[#8065FF]/15" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#48BFFF]/10 blur-3xl transition-opacity duration-700 group-hover:bg-[#48BFFF]/15" />

      {/* Pure SVG Constellation Canvas */}
      <div className="relative p-4 sm:p-6 select-none">
        <svg
          viewBox="0 0 600 370"
          className="w-full h-auto max-h-[350px]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="orgtrace-grid-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8065FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#080A12" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orgtrace-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8065FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#48BFFF" stopOpacity="0.5" />
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

          {/* Background ambient radial circles */}
          <circle cx="300" cy="190" r="160" fill="none" stroke="#F1F2FA" strokeOpacity="0.03" strokeDasharray="3 3" />
          <circle cx="300" cy="190" r="100" fill="none" stroke="#8065FF" strokeOpacity="0.06" />
          <circle cx="300" cy="190" r="45" fill="url(#orgtrace-grid-glow)" />

          {/* Coordinate grid axes */}
          <line x1="100" y1="190" x2="500" y2="190" stroke="#F1F2FA" strokeOpacity="0.03" />
          <line x1="300" y1="40" x2="300" y2="340" stroke="#F1F2FA" strokeOpacity="0.03" />

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
      </div>
    </div>
  );
};
