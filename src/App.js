import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AppShell from './components/AppShell.jsx';
import FeedbackWidget from './components/FeedbackWidget.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import OKRView from './views/OKRView.jsx';
import BacklogView from './views/BacklogView.jsx';
import NotesView from './views/NotesView.jsx';
import LoginView from './views/LoginView.jsx';
import NotFound from './views/NotFound.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save auth state on change
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={<LoginView onLogin={() => setIsAuthenticated(true)} />}
        />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppShell onLogout={() => setIsAuthenticated(false)} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="okr" replace />} />
          <Route path="okr" element={<OKRView />} />
          <Route path="backlog" element={<BacklogView />} />
          <Route path="notes" element={<NotesView />} />
        </Route>

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FeedbackWidget />
    </>
  );
};

export default App;