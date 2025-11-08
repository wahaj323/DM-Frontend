import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const QuizTimer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Show warning when 5 minutes or less remaining
    if (timeLeft <= 300 && !isWarning) {
      setIsWarning(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isWarning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((timeLimit * 60 - timeLeft) / (timeLimit * 60)) * 100;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'text-red-600'; // Last minute
    if (timeLeft <= 300) return 'text-orange-600'; // Last 5 minutes
    return 'text-gray-900';
  };

  const getProgressColor = () => {
    if (timeLeft <= 60) return 'bg-red-600';
    if (timeLeft <= 300) return 'bg-orange-500';
    return 'bg-primary-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-2 ${
      isWarning ? 'border-orange-300 animate-pulse' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {isWarning ? (
            <AlertTriangle className={`w-5 h-5 ${getTimerColor()}`} />
          ) : (
            <Clock className="w-5 h-5 text-gray-600" />
          )}
          <span className="text-sm font-medium text-gray-700">Time Remaining</span>
        </div>
        <span className={`text-2xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {isWarning && (
        <p className="text-xs text-orange-600 mt-2 text-center font-medium">
          ⚠️ Hurry up! Time is running out
        </p>
      )}
    </div>
  );
};

export default QuizTimer;