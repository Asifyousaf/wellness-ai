import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Dumbbell, Clock, Target } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

interface WorkoutPreference {
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  focus: string[];
  equipment: string[];
}

export const AIWorkoutGenerator: React.FC = () => {
  const [preferences, setPreferences] = useState<WorkoutPreference>({
    level: 'beginner',
    duration: 30,
    focus: [],
    equipment: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { addWorkout } = useWorkoutStore();

  const focusAreas = [
    'Full Body', 'Upper Body', 'Lower Body', 'Core',
    'Cardio', 'Strength', 'Flexibility'
  ];

  const equipmentOptions = [
    'No Equipment', 'Dumbbells', 'Resistance Bands',
    'Yoga Mat', 'Pull-up Bar', 'Kettlebell'
  ];

  const handleFocusToggle = (area: string) => {
    setPreferences(prev => ({
      ...prev,
      focus: prev.focus.includes(area)
        ? prev.focus.filter(f => f !== area)
        : [...prev.focus, area]
    }));
  };

  const handleEquipmentToggle = (item: string) => {
    setPreferences(prev => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter(e => e !== item)
        : [...prev.equipment, item]
    }));
  };

  const generateWorkout = async () => {
    setIsGenerating(true);
    try {
      // Here we would integrate with an AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const workout = {
        title: `${preferences.focus[0] || 'Full Body'} Workout`,
        type: preferences.level,
        duration: preferences.duration,
        calories_burned: Math.floor(preferences.duration * 8),
        date: new Date().toISOString().split('T')[0]
      };
      
      await addWorkout(workout);
    } catch (error) {
      console.error('Error generating workout:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">AI Workout Generator</h2>
          <p className="text-gray-600">
            Let our AI create a personalized workout plan based on your preferences
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Level
            </label>
            <select
              value={preferences.level}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                level: e.target.value as WorkoutPreference['level']
              }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Duration (minutes)
            </label>
            <input
              type="range"
              min="15"
              max="90"
              step="15"
              value={preferences.duration}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                duration: parseInt(e.target.value)
              }))}
              className="w-full"
            />
            <div className="text-center mt-2">{preferences.duration} minutes</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Areas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {focusAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => handleFocusToggle(area)}
                  className={`p-2 rounded-lg text-sm ${
                    preferences.focus.includes(area)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Equipment
            </label>
            <div className="grid grid-cols-2 gap-2">
              {equipmentOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleEquipmentToggle(item)}
                  className={`p-2 rounded-lg text-sm ${
                    preferences.equipment.includes(item)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Your Preferences</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span>Level: {preferences.level}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Duration: {preferences.duration} minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>Focus: {preferences.focus.join(', ') || 'Any'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-purple-600" />
                <span>Equipment: {preferences.equipment.join(', ') || 'None'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={generateWorkout}
          disabled={isGenerating}
          className={`
            bg-purple-600 text-white px-8 py-3 rounded-lg
            ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'}
            transition-colors
          `}
        >
          {isGenerating ? 'Generating...' : 'Generate Workout'}
        </button>
      </div>
    </div>
  );
};