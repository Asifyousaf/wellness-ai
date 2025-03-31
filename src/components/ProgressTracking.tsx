import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Activity, Flame, Trophy, TrendingUp } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

export const ProgressTracking: React.FC = () => {
  const { workouts } = useWorkoutStore();

  const chartData = workouts.map(workout => ({
    date: format(new Date(workout.date), 'MMM d'),
    calories: workout.calories_burned,
    duration: workout.duration
  }));

  const stats = {
    totalWorkouts: workouts.length,
    totalCalories: workouts.reduce((sum, w) => sum + w.calories_burned, 0),
    totalMinutes: workouts.reduce((sum, w) => sum + w.duration, 0),
    streak: calculateStreak(workouts)
  };

  function calculateStreak(workouts: any[]): number {
    if (!workouts.length) return 0;
    
    let streak = 1;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const sortedWorkouts = [...workouts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let lastWorkoutDate = new Date(sortedWorkouts[0].date);
    lastWorkoutDate.setHours(0, 0, 0, 0);
    
    if (currentDate.getTime() - lastWorkoutDate.getTime() > 86400000) {
      return 0;
    }
    
    for (let i = 1; i < sortedWorkouts.length; i++) {
      const currentWorkoutDate = new Date(sortedWorkouts[i].date);
      currentWorkoutDate.setHours(0, 0, 0, 0);
      
      const diffDays = (lastWorkoutDate.getTime() - currentWorkoutDate.getTime()) / 86400000;
      
      if (diffDays === 1) {
        streak++;
        lastWorkoutDate = currentWorkoutDate;
      } else {
        break;
      }
    }
    
    return streak;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Activity className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="text-gray-600">Total Workouts</h3>
          <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <h3 className="text-gray-600">Calories Burned</h3>
          <p className="text-2xl font-bold">{stats.totalCalories}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-gray-600">Current Streak</h3>
          <p className="text-2xl font-bold">{stats.streak} days</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-gray-600">Total Minutes</h3>
          <p className="text-2xl font-bold">{stats.totalMinutes}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-6">Progress Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="calories"
                stroke="#9333ea"
                name="Calories"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="duration"
                stroke="#2563eb"
                name="Duration (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-6">Recent Workouts</h3>
        <div className="space-y-4">
          {workouts.slice(0, 5).map((workout, index) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{workout.title}</h4>
                <p className="text-sm text-gray-600">
                  {format(new Date(workout.date), 'MMMM d, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{workout.calories_burned} cal</p>
                <p className="text-sm text-gray-600">{workout.duration} min</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};