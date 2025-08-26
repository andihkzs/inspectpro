/**
 * Main application component with routing and authentication
 * Handles app-wide state management and navigation structure
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import CreateForm from './pages/CreateForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/forms/create" replace />} />
            <Route path="/forms/create" element={<CreateForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;