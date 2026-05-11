import { useState } from 'react';
import { exerciseDB } from '../data/exercises';

const ExerciseLibrary = () => {
  const [filter, setFilter] = useState('All');

  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];
  
  const filteredExercises = filter === 'All' 
    ? exerciseDB 
    : exerciseDB.filter(ex => ex.muscle === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Exercise Library</h2>
      
      {/* Filter Tabs - Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto pb-2 mb-6">
        <div className="flex gap-2 min-w-max">
          {muscleGroups.map(group => (
            <button 
              key={group}
              onClick={() => setFilter(group)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === group 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredExercises.map(ex => (
          <div key={ex.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800">{ex.name}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                ex.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                ex.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {ex.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">🎯 {ex.muscle}</p>
            <p className="text-sm text-gray-600">{ex.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary;