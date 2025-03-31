import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Calendar, Target, Clock } from 'lucide-react';

export const AIPlannerPage = () => {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">AI Wellness Planner</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized wellness recommendations powered by artificial intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Your AI Wellness Goals</h2>
            <div className="space-y-4">
              {[
                { icon: Target, label: 'Weight Goal', value: '150 lbs' },
                { icon: Clock, label: 'Weekly Exercise', value: '5 hours' },
                { icon: Brain, label: 'Mindfulness', value: '20 min/day' },
                { icon: Calendar, label: 'Plan Duration', value: '12 weeks' }
              ].map((goal) => (
                <div key={goal.label} className="flex items-center gap-4">
                  <goal.icon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium">{goal.label}</p>
                    <p className="text-gray-600">{goal.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">AI Recommendations</h2>
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Today's Focus</h3>
                <p className="text-gray-600">High-intensity cardio and meditation</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Nutrition Tip</h3>
                <p className="text-gray-600">Increase protein intake by 20g</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Weekly Progress</h3>
                <p className="text-gray-600">On track to reach your goals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};