import { useUser } from '../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState, useEffect } from 'react';

const ProgressDashboard = () => {
  const { workoutLogs, userProfile } = useUser();
  const [streak, setStreak] = useState(0);

  // Calculate weekly data
  const getWeeklyData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const logsByDate = workoutLogs.reduce((acc, log) => {
      const date = log.date.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return last7Days.map(date => ({
      name: date.substring(5),
      workouts: logsByDate[date] || 0
    }));
  };

  // Calculate current streak
  useEffect(() => {
    if (workoutLogs.length === 0) return;
    
    const dates = [...new Set(workoutLogs.map(log => log.date.split('T')[0]))].sort();
    let currentStreak = 1;
    let today = new Date().toISOString().split('T')[0];
    
    for (let i = dates.length - 1; i > 0; i--) {
      const diff = (new Date(dates[i]) - new Date(dates[i-1])) / (1000 * 3600 * 24);
      if (diff === 1) currentStreak++;
      else break;
    }
    setStreak(currentStreak);
  }, [workoutLogs]);

  const totalWorkouts = workoutLogs.length;
  const weeklyData = getWeeklyData();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Progress Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{totalWorkouts}</p>
          <p className="text-xs text-gray-500">Total Workouts</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-orange-500">{streak}</p>
          <p className="text-xs text-gray-500">Day Streak 🔥</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">
            {userProfile ? ((userProfile.weight / ((userProfile.height/100) ** 2)).toFixed(1)) : '?'}
          </p>
          <p className="text-xs text-gray-500">Current BMI</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold mb-4 text-center">Last 7 Days Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="workouts" fill="#3b82f6">
              {weeklyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.workouts > 0 ? '#22c55e' : '#f87171'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {totalWorkouts === 0 && (
        <div className="text-center text-gray-400 text-sm mt-4">
          Log your first workout to see progress charts!
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;