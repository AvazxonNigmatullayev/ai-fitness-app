import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { exerciseDB } from '../data/exercises';

const WorkoutLogger = () => {
  const { addWorkoutLog, workoutLogs } = useUser();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise || !sets || !reps) {
      alert('Please fill in all fields');
      return;
    }
    addWorkoutLog({
      exercise: selectedExercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : 0
    });
    // Reset form
    setSelectedExercise('');
    setSets('');
    setReps('');
    setWeight('');
    alert('Workout logged!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">✏️ Log Workout</h2>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exercise</label>
            <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)} required className="w-full p-2 border rounded-lg">
              <option value="">Select an exercise</option>
              {exerciseDB.map(ex => (
                <option key={ex.id} value={ex.name}>{ex.name} ({ex.muscle})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
              <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
              <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input type="number" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Optional" />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">+ Add to History</button>
        </form>
      </div>

      <h3 className="text-xl font-semibold mb-3">Recent Logs</h3>
      <div className="space-y-3">
        {workoutLogs.length === 0 && <p className="text-gray-400 text-center py-4">No logs yet. Start your journey!</p>}
        {[...workoutLogs].reverse().slice(0, 10).map(log => (
          <div key={log.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
            <div>
              <p className="font-semibold">{log.exercise}</p>
              <p className="text-sm text-gray-500">{log.sets} sets x {log.reps} reps {log.weight > 0 && `@ ${log.weight}kg`}</p>
            </div>
            <span className="text-xs text-gray-400">{new Date(log.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutLogger;