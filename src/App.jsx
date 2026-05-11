import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Profile from './pages/Profile';
import WorkoutGenerator from './pages/WorkoutGenerator';
import ExerciseLibrary from './pages/ExerciseLibrary';
import WorkoutLogger from './pages/WorkoutLogger';
import ProgressDashboard from './pages/ProgressDashboard';
import BMICalculator from './pages/BMICalculator';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 pb-20">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-blue-600 text-center">💪 AI Fitness Coach</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6 max-w-4xl">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/generate" element={<WorkoutGenerator />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/logger" element={<WorkoutLogger />} />
              <Route path="/progress" element={<ProgressDashboard />} />
              <Route path="/bmi" element={<BMICalculator />} />
            </Routes>
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
            <div className="flex justify-around items-center py-2 max-w-md mx-auto">
              <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">👤</span>
                <span className="text-xs">Profile</span>
              </NavLink>
              <NavLink to="/generate" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">🤖</span>
                <span className="text-xs">AI Plan</span>
              </NavLink>
              <NavLink to="/exercises" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">📚</span>
                <span className="text-xs">Exercises</span>
              </NavLink>
              <NavLink to="/logger" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">✏️</span>
                <span className="text-xs">Log</span>
              </NavLink>
              <NavLink to="/progress" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">📈</span>
                <span className="text-xs">Progress</span>
              </NavLink>
              <NavLink to="/bmi" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <span className="text-xl">📊</span>
                <span className="text-xs">BMI</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
