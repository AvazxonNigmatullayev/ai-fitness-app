import { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const WorkoutGenerator = () => {
  const { userProfile, generatedPlan, saveGeneratedPlan } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateWorkout = async () => {
    if (!userProfile) {
      setError('Please complete your profile first!');
      return;
    }

    setLoading(true);
    setError(null);

    const prompt = `You are a professional fitness coach. Create a detailed 5-day workout plan for a ${userProfile.age}-year-old ${userProfile.experience} level person who wants to ${userProfile.goal}. 
    Return the response as a JSON object with the following structure: 
    { "planName": "string", "days": [ { "day": 1, "name": "Chest Day", "exercises": ["Exercise 1", "Exercise 2"] }, ... ] }. 
    Make the exercises specific and realistic. Do not include any markdown formatting or extra text.`;

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      // Using Google Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );
      
      const aiText = response.data.candidates[0].content.parts[0].text;
      // Clean the response to ensure valid JSON
      const cleanJson = aiText.replace(/```json\n?|\n?```/g, '');
      const plan = JSON.parse(cleanJson);
      saveGeneratedPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate plan. Check your API key or try again.');
      // Fallback mock data for demo if API fails
      const mockPlan = {
        planName: "Beginner's Full Body Focus",
        days: [
          { day: 1, name: "Upper Body", exercises: ["Push-ups", "Pull-ups", "Shoulder Press"] },
          { day: 2, name: "Lower Body", exercises: ["Squats", "Lunges", "Leg Press"] },
          { day: 3, name: "Rest Day", exercises: ["Active Stretching", "Walking"] },
          { day: 4, name: "Cardio & Core", exercises: ["Running", "Planks", "Crunches"] },
          { day: 5, name: "Full Body", exercises: ["Deadlifts", "Burpees", "Kettlebell Swings"] }
        ]
      };
      saveGeneratedPlan(mockPlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🤖 AI Workout Plan</h2>
      
      {!generatedPlan && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center mb-8">
          <p className="text-gray-600 mb-4">Click the button below to let AI create a personalized plan based on your profile.</p>
          <button onClick={generateWorkout} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 disabled:opacity-50">
            {loading ? '🧠 Generating...' : '✨ Generate My Plan'}
          </button>
          {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        </div>
      )}

      {generatedPlan && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-semibold text-gray-800">{generatedPlan.planName}</h3>
            <button onClick={() => saveGeneratedPlan(null)} className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">Clear Plan</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedPlan.days.map((day) => (
              <div key={day.day} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Day {day.day}</span>
                  <span className="font-bold text-gray-700">{day.name}</span>
                </div>
                <ul className="space-y-2 mt-2">
                  {day.exercises.map((ex, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">💡 Tip: You can log these exercises from the "Log" tab.</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator;