import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StatsPage() {
    const [gameStats, setGameStats] = useState([]);
    const [newStat, setNewStat] = useState({
        date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '', turnovers: '', minutes: '', freeThrows: ''
    });
    const [history, setHistory] = useState([]);
    const tableRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("processHistory")) || [];
        setHistory(stored);
        const last = stored[stored.length - 1];
        if (last?.gameStats) setGameStats(last.gameStats);

        const draft = JSON.parse(localStorage.getItem("newStatDraft"));
        if (draft) setNewStat(draft);
    }, []);

    useEffect(() => {
        localStorage.setItem("newStatDraft", JSON.stringify(newStat));
    }, [newStat]);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gameStats]);

    const handleAddStat = () => {
        if (!window.confirm("Are you sure you want to clear this form and add the stat?")) return;
        const updatedStats = [...gameStats, newStat];
        setGameStats(updatedStats);
        setNewStat({ date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '', turnovers: '', minutes: '', freeThrows: '' });
        localStorage.removeItem("newStatDraft");

        const updatedHistory = [...history];
        if (updatedHistory.length) {
            updatedHistory[updatedHistory.length - 1].gameStats = updatedStats;
            setHistory(updatedHistory);
            localStorage.setItem("processHistory", JSON.stringify(updatedHistory));
        }
    };

    const calculateAverage = (key) => {
        const values = gameStats.map(gs => parseFloat(gs[key])).filter(n => !isNaN(n));
        if (!values.length) return 0;
        const total = values.reduce((sum, val) => sum + val, 0);
        return (total / values.length).toFixed(1);
    };

    return (
        <div className="max-w-xl mx-auto text-left p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Stats</h2>

            <label className="block text-gray-700">Date of Game</label>
            <input type="date" className="w-full border px-4 py-2 rounded" value={newStat.date} onChange={e => setNewStat({ ...newStat, date: e.target.value })} />
            <input className="w-full border px-4 py-2 rounded" placeholder="Opponent Team Name" value={newStat.opponent} onChange={e => setNewStat({ ...newStat, opponent: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Points" value={newStat.points} onChange={e => setNewStat({ ...newStat, points: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Assists" value={newStat.assists} onChange={e => setNewStat({ ...newStat, assists: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Rebounds" value={newStat.rebounds} onChange={e => setNewStat({ ...newStat, rebounds: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Steals" value={newStat.steals} onChange={e => setNewStat({ ...newStat, steals: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Turnovers" value={newStat.turnovers} onChange={e => setNewStat({ ...newStat, turnovers: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Free Throws" value={newStat.freeThrows} onChange={e => setNewStat({ ...newStat, freeThrows: e.target.value })} />
            <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Minutes Played (optional)" value={newStat.minutes} onChange={e => setNewStat({ ...newStat, minutes: e.target.value })} />

            <div className="mt-4">
                <button
                    onClick={handleAddStat}
                    disabled={!(newStat.date && newStat.points && newStat.assists)}
                    className={`w-full px-4 py-2 rounded ${newStat.date && newStat.points && newStat.assists ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                >
                    + Add Another Game
                </button>
            </div>

            {gameStats.length > 0 && (
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
                </div>
            )}

            <div className="mt-6 flex justify-between gap-4">
                <button onClick={() => navigate('/reflect')} className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600">New Reflection</button>
                <button onClick={() => navigate('/')} className="flex-1 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">Back Home</button>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => {
                        const csvContent = [
                            ['Date', 'PTS', 'AST', 'REB', 'STL', 'TOV', 'FT', 'MIN'],
                            ...gameStats.map(gs => [
                                new Date(gs.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: '2-digit' }),
                                gs.points, gs.assists, gs.rebounds, gs.steals, gs.turnovers, gs.freeThrows, gs.minutes
                            ]),
                            [],
                            ['Averages', calculateAverage('points'), calculateAverage('assists'), calculateAverage('rebounds'), calculateAverage('steals'), calculateAverage('turnovers'), calculateAverage('freeThrows'), calculateAverage('minutes')],
                            [],
                            ['Reflection Scores'],
                            ...history.map(entry => [new Date(entry.timestamp).toLocaleDateString(), `${entry.total}%`])
                        ].map(row => row.join(",")).join("\n");

                        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "player_stats.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500"
                >
                    Download Player Stats (CSV)
                </button>
            </div>
        </div>
    );
}

export default StatsPage;
