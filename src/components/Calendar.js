
import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [hover, setHover] = useState(null);
  const [daysUntilSpringFestival, setDaysUntilSpringFestival] = useState(0);
  const [progress, setProgress] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0
  });

  useEffect(() => {
    const calculateDaysUntilSpringFestival = () => {
      const today = new Date();
      const springFestival = new Date('2025-01-29');
      const timeDiff = springFestival - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysUntilSpringFestival(daysDiff);
    };

    const calculateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 11, 31);

      setProgress({
        today: ((now - startOfDay) / (endOfDay - startOfDay)) * 100,
        week: ((now - startOfWeek) / (endOfWeek - startOfWeek)) * 100,
        month: ((now - startOfMonth) / (endOfMonth - startOfMonth)) * 100,
        year: ((now - startOfYear) / (endOfYear - startOfYear)) * 100
      });
    };

    calculateDaysUntilSpringFestival();
    calculateProgress();

    const timer = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const progressItems = [
    { key: 'today', label: '今日', remaining: `${24 - new Date().getHours()} 小时` },
    { key: 'week', label: '本周', remaining: `${7 - new Date().getDay()} 天` },
    { key: 'month', label: '本月', remaining: `${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()} 天` },
    { key: 'year', label: '本年', remaining: `${365 - Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))} 天` }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center w-full max-w-4xl mx-auto">
      <div className="text-center mr-6 flex-none w-2/5">
        <span className="text-sm text-gray-500">距离</span>
        <h2 className="text-2xl font-bold my-2">春节</h2>
        <div className="text-5xl font-bold text-gray-800">{daysUntilSpringFestival}</div>
        <div className="text-sm text-gray-500">2025-01-29</div>
      </div>
      <div className="w-px h-full bg-gray-200 mx-6"></div>
      <div className="flex-grow space-y-4">
        {progressItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center space-x-4"
            onMouseEnter={() => setHover(item.key)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="text-sm text-gray-700 w-10">{item.label}</span>
            <div className="relative flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-blue-500 transition-all duration-300"
                style={{ width: `${progress[item.key]}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative h-full w-full">
                  <div className={`absolute inset-0 flex items-center justify-center text-xs text-white font-semibold transition-all duration-300 ${hover === item.key ? 'opacity-0 transform -translate-y-full' : 'opacity-100'}`}>
                    {progress[item.key].toFixed(2)}%
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center text-xs text-white font-semibold transition-all duration-300 ${hover === item.key ? 'opacity-100' : 'opacity-0 transform translate-y-full'}`}>
                    还剩 {item.remaining}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
