import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center overflow-x-hidden overflow-y-auto">
            <header className="w-full text-center py-6 bg-white bg-opacity-80 shadow-md sticky top-0 z-50">
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 tracking-tight">🏀 Process Reflection</h1>
            </header>

            <p className="text-center text-indigo-700 font-medium mt-6 mb-10 max-w-md px-4 tracking-wide">$1</p>

            <div className="grid gap-6 w-full max-w-4xl px-4 sm:px-6 grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
                <div onClick={() => navigate('/reflect')} className="cursor-pointer bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-indigo-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-1">📝 Reflection</h2>
                    <p className="text-gray-600 text-sm">Answer key questions after every session or game to sharpen your mindset.</p>
                </div>

                <div onClick={() => navigate('/stats')} className="cursor-pointer bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-green-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-green-700 mb-1">📊 Player Stats</h2>
                    <p className="text-gray-600 text-sm">Track your game-by-game performance, see averages, and download your progress.</p>
                </div>

                <div onClick={() => navigate('/workouts')} className="cursor-pointer bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-yellow-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-yellow-600 mb-1">💪 Workouts</h2>
                    <p className="text-gray-600 text-sm">Browse workouts or training plans that align with your goals.</p>
                </div>

                <div onClick={() => navigate('/videos')} className="cursor-pointer bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-red-300 hover:scale-105 transform transition duration-300">
                    <h2 className="text-xl font-semibold text-red-600 mb-1">🎥 Videos</h2>
                    <p className="text-gray-600 text-sm">Watch practice footage, breakdowns, or motivational clips.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
