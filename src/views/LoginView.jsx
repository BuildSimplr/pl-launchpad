import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Static loading messages outside component
const loadingMessages = [
  'Refining your OKRs...',
  'Grooming your backlog...'
];

const LoginView = () => {
  const [loading, setLoading] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (loading) {
      setCurrentMsg(loadingMessages[0]);
      interval = setInterval(() => {
        setCurrentMsg((prev) =>
          prev === loadingMessages[0] ? loadingMessages[1] : loadingMessages[0]
        );
      }, 300);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true'); // ✅ Set persistent auth flag
      navigate('/app'); // ✅ Navigate to main app
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        {!loading ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to PM Lite</h1>
            <p className="mb-6 text-gray-500">Sign in to continue managing your product work.</p>
            <button
              onClick={handleLogin}
              className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition"
            >
              Sign In
            </button>
          </>
        ) : (
          <div className="h-20 flex items-center justify-center">
            <p className="animate-pulse text-gray-600 text-sm font-medium">
              {currentMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginView;






