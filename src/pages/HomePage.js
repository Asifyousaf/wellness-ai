import React from 'react';
import { Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Life with WellnessAI
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your personalized journey to wellness starts here. AI-powered health coaching, customized meal plans, and mindful living.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            <Sparkles className="w-5 h-5" />
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}