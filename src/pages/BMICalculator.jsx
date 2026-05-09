import { useState } from 'react';
import { useUser } from '../context/UserContext';

const BMICalculator = () => {
  const { userProfile } = useUser();
  const [weight, setWeight] = useState(userProfile?.weight || '');
  const [height, setHeight] = useState(userProfile?.height || '');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
    }
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { name: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { name: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { name: 'Overweight', color: 'text-orange-500' };
    return { name: 'Obese', color: 'text-red-500' };
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 BMI Calculator</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <button onClick={calculateBMI} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold">Calculate</button>
        </div>

        {bmi && (
          <div className="text-center p-4 bg-gray-50 rounded-lg animate-fade-in">
            <p className="text-3xl font-bold">{bmi}</p>
            <p className={`text-lg font-semibold ${getCategory(bmi).color}`}>{getCategory(bmi).name}</p>
            <p className="text-xs text-gray-400 mt-2">A healthy BMI ranges from 18.5 to 24.9</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;