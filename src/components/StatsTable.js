import React from 'react';

function StatsTable({ gameStats, tableRef }) {
    return (
        <div className="mt-6">
            <h3 className="font-bold mb-2">Games Entered:</h3>
            <div ref={tableRef} className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 font-semibold">Date</th>
                        <th className="p-2 font-semibold">PTS</th>
                        <th className="p-2 font-semibold">AST</th>
                        <th className="p-2 font-semibold">REB</th>
                        <th className="p-2 font-semibold">STL</th>
                        <th className="p-2 font-semibold">TOV</th>
                        <th className="p-2 font-semibold">FT</th>
                        <th className="p-2 font-semibold">MIN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gameStats.map((gs, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2">{gs.date ? new Date(gs.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }) : ''}</td>
                            <td className="p-2">{gs.points}</td>
                            <td className="p-2">{gs.assists}</td>
                            <td className="p-2">{gs.rebounds}</td>
                            <td className="p-2">{gs.steals}</td>
                            <td className="p-2">{gs.turnovers}</td>
                            <td className="p-2">{gs.freeThrows}</td>
                            <td className="p-2">{gs.minutes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatsTable;
