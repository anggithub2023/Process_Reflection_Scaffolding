import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StatsPage() {
  const [gameStats, setGameStats] = useState([]);
  const [newStat, setNewStat] = useState({
    date: '', opponent: '', points: '', assists: '', rebounds: '', steals: '', turnovers: '', minutes: '', freeThrows: ''
  });
  const [history, setHistory] = useState([]);

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

  const handleAddStat = () => {
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
        <input
            type="date"
            className="w-full border px-4 py-2 rounded"
            value={newStat.date}
            onChange={e => setNewStat({ ...newStat, date: e.target.value })}
        />
        <input className="w-full border px-4 py-2 rounded" placeholder="Opponent Team Name" value={newStat.opponent} onChange={e => setNewStat({ ...newStat, opponent: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Points" value={newStat.points} onChange={e => setNewStat({ ...newStat, points: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Assists" value={newStat.assists} onChange={e => setNewStat({ ...newStat, assists: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Rebounds" value={newStat.rebounds} onChange={e => setNewStat({ ...newStat, rebounds: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Steals" value={newStat.steals} onChange={e => setNewStat({ ...newStat, steals: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Turnovers" value={newStat.turnovers} onChange={e => setNewStat({ ...newStat, turnovers: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Minutes Played (optional)" value={newStat.minutes} onChange={e => setNewStat({ ...newStat, minutes: e.target.value })} />
        <input type="number" className="w-full border px-4 py-2 rounded" placeholder="Free Throws" value={newStat.freeThrows} onChange={e => setNewStat({ ...newStat, freeThrows: e.target.value })} />

        <div className="mt-4">
          <button onClick={handleAddStat} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">+ Add Another Game</button>
        </div>

        {gameStats.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Games Entered:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border">
                  <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 font-semibold">Date</th>
                    <th className="p-2 font-semibold">Opponent</th>
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
                        <td className="p-2">{gs.date}</td>
                        <td className="p-2">{gs.opponent}</td>
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

              <div className="mt-6">
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
            </div>
        )}

        {history.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold mb-2">Reflection Score History</h3>
              <ul className="list-disc list-inside space-y-1">
                {history.map((entry, idx) => (
                    <li key={idx}>
                      {new Date(entry.timestamp).toLocaleDateString()} – Score: {entry.total}%
                    </li>
                ))}
              </ul>
            </div>
        )}

        <div className="mt-6 flex justify-between gap-4">
          <button onClick={() => navigate('/results')} className="flex-1 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">Back to Results</button>
          <button onClick={() => navigate('/reflect')} className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600">New Reflection</button>
        </div>
      </div>
  );
}

export default StatsPage;
