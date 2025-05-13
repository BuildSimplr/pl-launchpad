// src/hooks/useAuth.js
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    setAuthChecked(true);
  }, []);

  return { isAuthenticated, authChecked };
};

export default useAuth;
