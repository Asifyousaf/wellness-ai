import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface WorkoutTimerProps {
  expiryTimestamp: Date;
  onExpire?: () => void;
}

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ expiryTimestamp, onExpire }) => {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, onExpire });

  const addTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    restart(time);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-4xl font-bold text-center mb-4">
        <span>{minutes.toString().padStart(2, '0')}</span>:
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={isRunning ? pause : start}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300); // 5 minutes
            restart(time);
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