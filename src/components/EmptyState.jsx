import React from 'react';

const EmptyState = ({
  icon = '📄',
  title = 'Nothing Here Yet',
  message = 'You haven’t added any content yet.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
