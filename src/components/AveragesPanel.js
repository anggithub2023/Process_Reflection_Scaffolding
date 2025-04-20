import React from 'react';

function AveragesPanel({ gameStats, history, calculateAverage }) {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-bold mb-2">Averages:</h3>
                <ul className="list-disc list-inside">
                    <li>Points: {calculateAverage('points')}</li>
                    <li>Assists: {calculateAverage('assists')}</li>
                    <li>Rebounds: {calculateAverage('rebounds')}</li>
                    <li>Steals: {calculateAverage('steals')}</li>
                    <li>Turnovers: {calculateAverage('turnovers')}</li>
                    <li>Free Throws: {calculateAverage('freeThrows')}</li>
                    <li>Minutes: {calculateAverage('minutes')}</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-2">Reflection Score History</h3>
                <ul className="space-y-2">
                    {history.map((entry, idx) => {
                        const score = entry.total;
                        const badgeColor =
                            score >= 85 ? "bg-green-500 text-white" :
                                score >= 70 ? "bg-yellow-400 text-black" :
                                    "bg-red-500 text-white";

                        return (
                            <li key={idx} className="flex items-center justify-between">
                                <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                                <span className={`text-sm px-2 py-1 rounded ${badgeColor}`}>
                  {score}%
                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AveragesPanel;
