import React from 'react';
import { motion } from 'framer-motion';
import { WorkoutTimer } from './WorkoutTimer';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  instructions: string[];
  animation: string; // URL to animation/gif
}

interface ExerciseGuideProps {
  exercise: Exercise;
  onComplete: () => void;
}

export const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ exercise, onComplete }) => {
  const [currentSet, setCurrentSet] = React.useState(1);
  const [isResting, setIsResting] = React.useState(false);

  const handleSetComplete = () => {
    if (currentSet < exercise.sets) {
      setIsResting(true);
      const restTime = new Date();
      restTime.setSeconds(restTime.getSeconds() + exercise.restTime);
      return restTime;
    } else {
      onComplete();
      return new Date();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
        <p className="text-gray-600">
          Set {currentSet} of {exercise.sets} • {exercise.reps} reps
        </p>
      </motion.div>

      <div className="mb-8">
        <img
          src={exercise.animation}
          alt={exercise.name}
          className="w-full rounded-lg"
        />
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="font-semibold">Instructions:</h3>
        <ul className="space-y-2">
          {exercise.instructions.map((instruction, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span>{instruction}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {isResting ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Rest Time</h3>
          <WorkoutTimer
            expiryTimestamp={handleSetComplete()}
            onExpire={() => {
              setIsResting(false);
              setCurrentSet(currentSet + 1);
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => handleSetComplete()}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Complete Set
          </button>
        </div>
      )}
    </div>
  );
};