import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StatsPage() {
  const [gameStats, setGameStats] = useState([]);
  const [newStat, setNewStat] = useState({
    date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '', turnovers: '', minutes: ''
  });
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("processHistory")) || [];
    setHistory(stored);
    const last = stored[stored.length - 1];
    if (last?.gameStats) setGameStats(last.gameStats);
  }, []);

  const handleAddStat = () => {
    const updatedStats = [...gameStats, newStat];
    setGameStats(updatedStats);
    setNewStat({ date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '', turnovers: '', minutes: '' });

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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Game Stats</h2>
      <div className="space-y-4">
        <input className="w-full border px-4 py-2 rounded" placeholder="Date of Game" value={newStat.date} onChange={e => setNewStat({ ...newStat, date: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Opponent Team Name" value={newStat.opponent} onChange={e => setNewStat({ ...newStat, opponent: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Points" value={newStat.points} onChange={e => setNewStat({ ...newStat, points: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Assists" value={newStat.assists} onChange={e => setNewStat({ ...newStat, assists: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Rebounds" value={newStat.rebounds} onChange={e => setNewStat({ ...newStat, rebounds: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Steals" value={newStat.steals} onChange={e => setNewStat({ ...newStat, steals: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Turnovers" value={newStat.turnovers} onChange={e => setNewStat({ ...newStat, turnovers: e.target.value })} />
        <input className="w-full border px-4 py-2 rounded" placeholder="Minutes Played (optional)" value={newStat.minutes} onChange={e => setNewStat({ ...newStat, minutes: e.target.value })} />
        <button onClick={handleAddStat} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">+ Add Another Game</button>

        {gameStats.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Games Entered:</h3>
            <ul className="list-disc list-inside space-y-1">
              {gameStats.map((gs, index) => (
                <li key={index}>{gs.date} vs {gs.opponent} – {gs.points} pts, {gs.assists} ast, {gs.rebounds} reb</li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="font-bold mb-2">Averages:</h3>
              <ul className="list-disc list-inside">
                <li>Points: {calculateAverage('points')}</li>
                <li>Assists: {calculateAverage('assists')}</li>
                <li>Rebounds: {calculateAverage('rebounds')}</li>
                <li>Steals: {calculateAverage('steals')}</li>
                <li>Turnovers: {calculateAverage('turnovers')}</li>
                <li>Minutes: {calculateAverage('minutes')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {history.length > 1 && (
        <div className="mt-8">
          <h3 className="font-bold mb-2">Past Reflections</h3>
          <ul className="list-disc list-inside space-y-1">
            {history.slice(0, -1).map((entry, idx) => (
              <li key={idx}>
                {new Date(entry.timestamp).toLocaleDateString()} – Score: {entry.total}%
                {entry.gameStats?.length && (
                  <ul className="ml-4 list-disc">
                    {entry.gameStats.map((gs, i) => (
                      <li key={i}>{gs.date} vs {gs.opponent} – {gs.points} pts</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <button onClick={() => navigate('/results')} className="w-full bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-500">Back to Results</button>
      </div>
    </div>
  );
}

export default StatsPage;
