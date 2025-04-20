import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex flex-col items-center overflow-x-hidden overflow-y-auto" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1585779031259-7c0426dd7248?auto=format&fit=crop&w=1600&q=80)' }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">Process Reflection</h1>
            <p className="text-center text-gray-600 mb-10 max-w-md">
                A focused tool for players to reflect, improve, and track their journey on and off the court.
            </p>

            <div className="grid gap-6 w-full max-w-4xl grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
                <div onClick={() => navigate('/reflect')} className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-indigo-200 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-1">📝 Reflection</h2>
                    <p className="text-gray-600 text-sm">Answer key questions after every session or game to sharpen your mindset.</p>
                </div>

                <div onClick={() => navigate('/stats')} className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-green-200 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold text-green-700 mb-1">📊 Player Stats</h2>
                    <p className="text-gray-600 text-sm">Track your game-by-game performance, see averages, and download your progress.</p>
                </div>

                <div onClick={() => navigate('/workouts')} className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-yellow-200 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold text-yellow-600 mb-1">💪 Workouts</h2>
                    <p className="text-gray-600 text-sm">Browse workouts or training plans that align with your goals.</p>
                </div>

                <div onClick={() => navigate('/videos')} className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-red-200 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold text-red-600 mb-1">🎥 Videos</h2>
                    <p className="text-gray-600 text-sm">Watch practice footage, breakdowns, or motivational clips.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
