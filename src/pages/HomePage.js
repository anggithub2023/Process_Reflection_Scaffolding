import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800">Welcome to Process Reflection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
                <button onClick={() => navigate('/reflect')} className="bg-indigo-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-indigo-500">📝 Reflection</button>
                <button onClick={() => navigate('/stats')} className="bg-green-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-green-500">📊 Player Stats</button>
                <button onClick={() => navigate('/workouts')} className="bg-yellow-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-yellow-400">💪 Workouts</button>
                <button onClick={() => navigate('/videos')} className="bg-red-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-red-400">🎥 Videos</button>
            </div>
        </div>
    );
}

export default HomePage;
