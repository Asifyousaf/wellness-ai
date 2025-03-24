import { motion } from 'framer-motion';
import { Activity, Flame, Brain } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { icon: Activity, label: 'Steps Today', value: '8,432', target: '10,000' },
    { icon: Flame, label: 'Calories Burned', value: '487', target: '600' },
    { icon: Brain, label: 'Mindful Minutes', value: '15', target: '20' }
  ];

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Wellness Dashboard</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <stat.icon className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">Target: {stat.target}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseInt(stat.value.replace(',', '')) / parseInt(stat.target.replace(',', ''))) * 100}%` }}
                    className="bg-purple-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};