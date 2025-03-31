'use client';

import React from 'react';
import { Hero } from './Hero';
import { QuickActions } from './QuickActions';
import { Dashboard } from './Dashboard';
import { DraggableDashboard } from './DraggableDashboard';
import { CommunitySection } from './CommunitySection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <QuickActions />
      <Dashboard />
      <DraggableDashboard />
      <CommunitySection />
    </>
  );
};