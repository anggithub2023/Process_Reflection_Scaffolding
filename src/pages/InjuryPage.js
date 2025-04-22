import React from 'react';
import { MdHealthAndSafety } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function InjuryPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-4 py-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 flex items-center gap-2">
                        <MdHealthAndSafety className="text-3xl bg-rose-500 text-white p-1 rounded-full" />
                        Injury Prevention
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-500 transition"
                    >
                        Back Home
                    </button>
                </div>

                {/* Trainer Intro (optional video) */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
                    <h2 className="text-lg font-semibold mb-2 text-rose-700">Why Injury Prevention Matters</h2>
                    <p className="text-sm mb-2">
                        Stay healthy and stay in the game. This section features insights and routines from a certified athletic trainer to help you reduce injury risk and perform at your best.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        More content will be added soon, including videos and warm-up templates.
                    </p>
                </div>

                {/* Section Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-md font-semibold text-rose-700 mb-2">🏃 Warm-Up Routines</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Dynamic mobility before games</li>
                            <li>Joint-specific activation drills</li>
                            <li>Pre-practice stabilization sets</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-md font-semibold text-rose-700 mb-2">🧊 Recovery Tips</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Post-game stretching & foam rolling</li>
                            <li>Sleep and hydration guidance</li>
                            <li>Nutrition for joint and muscle health</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-md font-semibold text-rose-700 mb-2">📹 Video Series (Coming Soon)</h3>
                        <p className="text-sm">Watch how real athletes warm up, rehab, and bounce back — led by a certified athletic trainer.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-md font-semibold text-rose-700 mb-2">🧠 Common Injury Red Flags</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>When soreness becomes a signal</li>
                            <li>Warning signs of ankle, knee, or hip issues</li>
                            <li>When to stop and seek help</li>
                        </ul>
                    </div>
                </div>

                {/* Footer/Notice */}
                <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
                    Content in this section is provided by certified professionals. Always consult a licensed physician for medical concerns.
                </div>
            </div>
        </div>
    );
}

export default InjuryPage;