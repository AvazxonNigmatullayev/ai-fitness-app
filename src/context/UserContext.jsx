import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('fitness_user_profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const savedLogs = localStorage.getItem('fitness_workout_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const [generatedPlan, setGeneratedPlan] = useState(() => {
    const savedPlan = localStorage.getItem('fitness_generated_plan');
    return savedPlan ? JSON.parse(savedPlan) : null;
  });

  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('fitness_user_profile', JSON.stringify(profile));
  };

  const addWorkoutLog = (log) => {
    const newLogs = [...workoutLogs, { ...log, id: Date.now(), date: new Date().toISOString() }];
    setWorkoutLogs(newLogs);
    localStorage.setItem('fitness_workout_logs', JSON.stringify(newLogs));
  };

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