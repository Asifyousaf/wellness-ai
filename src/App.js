import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AIPlannerPage } from './pages/AIPlannerPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { NutritionPage } from './pages/NutritionPage';
import { CommunityPage } from './pages/CommunityPage';
import { StorePage } from './pages/StorePage';
import { ProfilePage } from './pages/ProfilePage';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-planner" element={
            <ProtectedRoute>
              <AIPlannerPage />
            </ProtectedRoute>
          } />
          <Route path="/workouts" element={
            <ProtectedRoute>
              <WorkoutsPage />
            </ProtectedRoute>
          } />
          <Route path="/nutrition" element={
            <ProtectedRoute>
              <NutritionPage />
            </ProtectedRoute>
          } />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;