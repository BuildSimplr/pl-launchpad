import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <h1 className="text-5xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-xl text-gray-800 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => navigate('/app/okr')}
        className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
