import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const ActivityTimeline = ({ activity = [], onClear }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity logged yet.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {activity.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <ArrowRightLeft size={18} className="text-purple-600 mt-1" />
                <div>
                  <p>{item.action}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {onClear && (
            <button
              onClick={onClear}
              className="text-sm text-red-500 hover:underline"
            >
              🧹 Clear Activity Log
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityTimeline;
