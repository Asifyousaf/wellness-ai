import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-gray-600">
          Made with <Heart className="w-4 h-4 text-red-500" /> by WellnessAI Team
        </p>
      </div>
    </footer>
  );
}