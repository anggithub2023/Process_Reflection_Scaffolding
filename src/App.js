import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReflectionPage from './pages/ReflectionPage';
import StatsPage from './pages/StatsPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reflect" element={<ReflectionPage />} />
            <Route path="/stats" element={<StatsPage />} />
        </Routes>
    );
}

export default App;
