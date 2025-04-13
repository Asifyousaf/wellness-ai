import React from 'react';
import { motion } from 'framer-motion';
import { Settings, History, Heart, Calendar, Bell } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const ProfilePage = () => {
  const { user, profile } = useAuthStore();

  if (!user) {
    return (
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600">You need to be signed in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <img
              src={profile?.avatar_url || 'https://via.placeholder.com/128'}
              alt={profile?.username}
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{profile?.full_name || 'User'}</h1>
          <p className="text-gray-600">@{profile?.username}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile?.full_name || ''}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Activity Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold">Workout Streak</h3>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Heart className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold">Total Workouts</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <History className="w-5 h-5 text-gray-600" />
                  <span>Order History</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span>Notifications</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};