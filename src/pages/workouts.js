import React from 'react';

function Workouts() {
    return (
        <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-extrabold text-yellow-700 mb-4">🏋️‍♂️ Workouts</h1>
            <p className="text-lg text-gray-700">This is where your workouts will go. You can list drills, upload plans, or link to videos here.</p>
            <button onClick={() => window.location.href='/'} className="mt-8 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">
                Back Home
            </button>
        </div>
    );
}

export default Workouts;
