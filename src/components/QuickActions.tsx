import { motion } from 'framer-motion';
import { Utensils, Dumbbell, Brain } from 'lucide-react';

const cards = [
  {
    title: 'Meal Plans',
    icon: Utensils,
    description: 'AI-powered nutrition plans tailored to your goals',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    title: 'Workouts',
    icon: Dumbbell,
    description: 'Personalized fitness routines that adapt to you',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    title: 'Mental Wellness',
    icon: Brain,
    description: 'Guided meditation and mindfulness exercises',
    color: 'from-purple-400 to-pink-500'
  }
];

export const QuickActions = () => {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative p-8 text-white">
                <card.icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/90">{card.description}</p>
                <button className="mt-6 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};