
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsWork(!isWork);
          setMinutes(isWork ? 5 : 25);
          setSeconds(0);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isWork]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsWork(true);
  };

  const totalSeconds = isWork ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = (currentSeconds / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-xl shadow-lg text-white min-w-[300px] relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full bg-green-400 text-center py-2 transition-transform duration-500 ${showMessage ? 'translate-y-0' : '-translate-y-full'}`}>
        {isWork ? "Break time! Relax." : "Time to focus!"}
      </div>
      <h2 className="text-3xl font-bold mb-6 tracking-wide flex items-center">
        {isWork ? (
          <>
            Focus Time <Brain className="ml-2 animate-pulse" />
          </>
        ) : (
          <>
            Break Time <Coffee className="ml-2 animate-bounce" />
          </>
        )}
      </h2>
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full transform rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 * (1 - progress / 100)}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-6xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-white text-purple-600 rounded-full p-3 hover:bg-opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transform hover:scale-110"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-purple-400 text-white rounded-full p-3 hover:bg-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transform hover:scale-110"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
