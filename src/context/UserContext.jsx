import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedProfile = localStorage.getItem('fitness_user_profile');
    const savedLogs = localStorage.getItem('fitness_workout_logs');
    const savedPlan = localStorage.getItem('fitness_generated_plan');

    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedLogs) setWorkoutLogs(JSON.parse(savedLogs));
    if (savedPlan) setGeneratedPlan(JSON.parse(savedPlan));
  }, []);

  // Save profile to localStorage whenever it changes
  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('fitness_user_profile', JSON.stringify(profile));
  };

  // Add a new workout log
  const addWorkoutLog = (log) => {
    const newLogs = [...workoutLogs, { ...log, id: Date.now(), date: new Date().toISOString() }];
    setWorkoutLogs(newLogs);
    localStorage.setItem('fitness_workout_logs', JSON.stringify(newLogs));
  };

  // Save AI generated plan
  const saveGeneratedPlan = (plan) => {
    setGeneratedPlan(plan);
    localStorage.setItem('fitness_generated_plan', JSON.stringify(plan));
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateUserProfile, 
      workoutLogs, 
      addWorkoutLog,
      generatedPlan,
      saveGeneratedPlan
    }}>
      {children}
    </UserContext.Provider>
  );
};