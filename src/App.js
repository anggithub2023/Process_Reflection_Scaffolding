
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReflectionPage from './pages/ReflectionPage';
import ResultsPage from './pages/ResultsPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/reflect" replace />} />
        <Route path="/reflect" element={<ReflectionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
