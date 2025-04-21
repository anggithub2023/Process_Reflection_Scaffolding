import React, { useState, useEffect, useRef } from 'react';
import DownloadButton from '../components/DownloadButton';
import StatForm from '../components/StatForm';
import StatsTable from '../components/StatsTable';
import AveragesPanel from '../components/AveragesPanel';
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
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-200 mb-6 tracking-tight text-center">Track greatness. Start logging your stats.</h2>

            <StatForm newStat={newStat} setNewStat={setNewStat} handleAddStat={handleAddStat} />

            {gameStats.length > 0 && (
                <div className="mt-6">
                    <StatsTable gameStats={gameStats} tableRef={tableRef} />
                </div>
            )}

            <AveragesPanel gameStats={gameStats} history={history} calculateAverage={calculateAverage} />

            <div className="mt-6 flex justify-between gap-4">
                <button onClick={() => navigate('/')} className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm">Back Home</button>
                <div className="w-1/2">
                    <DownloadButton gameStats={gameStats} history={history} calculateAverage={calculateAverage} />
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
