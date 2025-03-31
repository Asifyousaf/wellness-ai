'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useState } from 'react';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl z-50"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">AI Health Assistant</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div className="bg-purple-100 p-3 rounded-lg mb-4">
                Hello! I'm your AI wellness assistant. How can I help you today?
              </div>
              {/* Add more chat messages here */}
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};