import React from 'react';
import { MdHealthAndSafety } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function InjuryPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center px-4 py-8">
            <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sm:p-8 text-gray-800 dark:text-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 flex items-center gap-2">
                        <MdHealthAndSafety className="text-3xl sm:text-4xl bg-rose-500 text-white p-1 rounded-full" />
                        Injury Prevention
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-500 transition"
                    >
                        Back Home
                    </button>
                </div>

                <p className="text-md sm:text-lg mb-4">
                    Stay healthy, mobile, and strong. Injury prevention helps you maximize your training by avoiding setbacks and improving recovery.
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>Warm-up routines for ankles, knees, and hips</li>
                    <li>Mobility drills to improve flexibility and balance</li>
                    <li>Tips for post-practice recovery (ice, rest, and more)</li>
                    <li>Guidelines for recognizing early signs of overuse</li>
                </ul>

                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    * This section will continue to evolve with input from athletic trainers and sports medicine professionals.
                </div>
            </div>
        </div>
    );
}

export default InjuryPage;