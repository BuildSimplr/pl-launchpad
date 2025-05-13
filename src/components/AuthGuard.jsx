import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../utils/useAuth'; // ✅ Make sure path is correct

const AuthGuard = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;


