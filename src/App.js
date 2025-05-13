import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AppShell from './components/AppShell.jsx';
import FeedbackWidget from './components/FeedbackWidget.jsx';
import AuthGuard from './components/AuthGuard.jsx';

import LandingPage from './views/LandingPage.jsx';
import LoginView from './views/LoginView.jsx';
import DashboardView from './views/DashboardView.jsx';
import OKRView from './views/OKRView.jsx';
import BacklogView from './views/BacklogView.jsx';
import NotesView from './views/NotesView.jsx';
import NotFound from './views/NotFound.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Sync with localStorage on load
  useEffect(() => {
    const stored = localStorage.getItem('isAuthenticated');
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  // Keep auth in sync
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Auto-redirect from landing if already logged in
  if (location.pathname === '/' && isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <>
      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginView onLogin={() => setIsAuthenticated(true)} />} />

        {/* 🔒 Protected App Shell */}
        <Route
          path="/app"
          element={
            <AuthGuard>
              <AppShell onLogout={() => setIsAuthenticated(false)} />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardView />} />
          <Route path="okr" element={<OKRView />} />
          <Route path="backlog" element={<BacklogView />} />
          <Route path="notes" element={<NotesView />} />
        </Route>

        {/* ❌ Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FeedbackWidget />
    </>
  );
};

export default App;



