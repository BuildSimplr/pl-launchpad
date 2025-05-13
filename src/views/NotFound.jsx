import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <EmptyState
        icon="🚫"
        title="Page Not Found"
        message="The page you're looking for doesn’t exist or has been moved."
        actionLabel="Go to Dashboard"
        onAction={() => navigate('/app/okr')}
      />
    </div>
  );
};

export default NotFound;
