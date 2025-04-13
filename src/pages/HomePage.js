import React from 'react';
import { Hero } from '../components/Hero';
import { QuickActions } from '../components/QuickActions';
import { Dashboard } from '../components/Dashboard';
import { DraggableDashboard } from '../components/DraggableDashboard';
import { CommunitySection } from '../components/CommunitySection';

export function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <Dashboard />
      <DraggableDashboard />
      <CommunitySection />
    </>
  );
}