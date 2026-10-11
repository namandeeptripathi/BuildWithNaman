'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { HeroFallback } from './HeroFallback';

const DynamicHeroScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <HeroFallback reason="Initializing 3D Canvas..." />,
  }
);

export const HeroCanvasLoader: React.FC = () => {
  return <DynamicHeroScene />;
};
