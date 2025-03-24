import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Dumbbell } from 'lucide-react';
import { AIWorkoutGenerator } from '../components/AIWorkoutGenerator';
import { ProgressTracking } from '../components/ProgressTracking';
import { useWorkoutStore } from '../store/workoutStore';

export const WorkoutsPage = () => {
  const [activeTab, setActiveTab] = useState<'workouts' | 'progress' | 'generator'>('workouts');
  const { workouts, fetchWorkouts, isLoading } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const filteredWorkouts = workouts.filter(workout =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return <ProgressTracking />;
      case 'generator':
        return <AIWorkoutGenerator />;
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {isLoading ? (
                <div>Loading workouts...</div>
              ) : (
                filteredWorkouts.map((workout) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4" />
                          <span>{workout.type}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">Calories: {workout.calories_burned}</p>
                      <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Start Workout
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Workout Dashboard</h1>
          <div className="flex justify-center gap-4">
            {[
              { id: 'workouts', label: 'My Workouts' },
              { id: 'progress', label: 'Progress' },
              { id: 'generator', label: 'AI Generator' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {renderContent()}
      </div>
    </div>
  );
};