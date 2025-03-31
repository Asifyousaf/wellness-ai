import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface WorkoutTimerProps {
  expiryTimestamp: Date;
  onExpire?: () => void;
}

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ expiryTimestamp, onExpire }) => {
  const timer = useTimer({ 
    expiryTimestamp, 
    onExpire,
    autoStart: false 
  });

  const addTime = (additionalSeconds: number) => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + additionalSeconds);
    timer.restart(newTime);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-4xl font-bold text-center mb-4">
        <span>{String(timer.minutes).padStart(2, '0')}</span>:
        <span>{String(timer.seconds).padStart(2, '0')}</span>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => timer.isRunning ? timer.pause() : timer.start()}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
        >
          {timer.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300); // 5 minutes
            timer.restart(time);
          }}
          className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {[30, 60, 120].map((seconds) => (
          <button
            key={seconds}
            onClick={() => addTime(seconds)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +{seconds}s
          </button>
        ))}
      </div>
    </div>
  );
};