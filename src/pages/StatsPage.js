import React, { useState, useEffect, useRef } from 'react';
import StatForm from '../components/StatForm';
import StatsTable from '../components/StatsTable';
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
        if (gameStats.length > 0 && gameStats.length !== (JSON.parse(localStorage.getItem("processHistory"))?.slice(-1)[0]?.gameStats?.length || 0)) {
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: 'smooth' });
            }
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
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 tracking-tight">Track greatness. Start logging your stats.</h2>

            <StatForm newStat={newStat} setNewStat={setNewStat} handleAddStat={handleAddStat} />

            {gameStats.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-bold mb-2">Games Entered:</h3>
                    <StatsTable gameStats={gameStats} tableRef={tableRef} />

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
