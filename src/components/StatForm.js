import React from 'react';

function StatForm({ newStat, setNewStat, handleAddStat }) {
    return (
        <div>
            <label className="block text-gray-700">Date of Game</label>
            <input type="date" className="w-full border px-4 py-2 rounded" value={newStat.date} onChange={e => setNewStat({ ...newStat, date: e.target.value })} />
            <input className="w-full border px-4 py-2 rounded" placeholder="Name the squad you just torched 🔥" value={newStat.opponent} onChange={e => setNewStat({ ...newStat, opponent: e.target.value })} />
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
        </div>
    );
}

export default StatForm;
