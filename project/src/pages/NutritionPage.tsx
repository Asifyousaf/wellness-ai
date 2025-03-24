import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Coffee, Pizza, Utensils } from 'lucide-react';

export const NutritionPage = () => {
  const meals = [
    {
      type: "Breakfast",
      time: "8:00 AM",
      calories: 450,
      items: ["Oatmeal with berries", "Greek yogurt", "Green tea"],
      image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "Lunch",
      time: "1:00 PM",
      calories: 650,
      items: ["Grilled chicken salad", "Quinoa", "Fresh fruit"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "Dinner",
      time: "7:00 PM",
      calories: 550,
      items: ["Salmon", "Roasted vegetables", "Brown rice"],
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Your Nutrition Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI-powered meal suggestions based on your preferences and goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Today's Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Apple, label: 'Calories', value: '2,000', target: '2,200' },
                { icon: Coffee, label: 'Protein', value: '120g', target: '140g' },
                { icon: Pizza, label: 'Carbs', value: '250g', target: '275g' },
                { icon: Utensils, label: 'Fat', value: '65g', target: '70g' }
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">Target: {stat.target}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Increase Protein</h3>
                <p className="text-gray-600">Add an extra serving of lean protein to reach your daily goal</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Hydration</h3>
                <p className="text-gray-600">Drink 2 more glasses of water today</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Pre-workout Meal</h3>
                <p className="text-gray-600">Have a banana and protein shake before your evening workout</p>
              </div>
            </div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Today's Meal Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-48 relative">
                <img
                  src={meal.image}
                  alt={meal.type}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{meal.type}</h3>
                  <span className="text-gray-600">{meal.time}</span>
                </div>
                <p className="text-gray-600 mb-4">{meal.calories} calories</p>
                <ul className="space-y-2">
                  {meal.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-purple-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  View Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};