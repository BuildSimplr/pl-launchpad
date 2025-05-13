import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  StickyNote,
  Flag,
  ArrowRightLeft
} from 'lucide-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const DashboardView = () => {
  const [okrCount, setOkrCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    try {
      const okrs = JSON.parse(localStorage.getItem('pmLite_okrs')) || [];
      const tasks = JSON.parse(localStorage.getItem('pmLite_backlog_tasks')) || [];
      const notes = JSON.parse(localStorage.getItem('pmLiteNotes')) || [];
      const activity = JSON.parse(localStorage.getItem('pmLite_activity_log')) || [];

      setOkrCount(okrs.length);
      setTaskCount(tasks.length);
      setNoteCount(notes.length);
      setRecentActivity(activity.slice(0, 10));
    } catch (error) {
      console.warn('⚠️ Failed to load dashboard data:', error);
    }
  }, []);

  const handleClearActivity = () => {
    if (window.confirm('Clear all activity logs?')) {
      localStorage.removeItem('pmLite_activity_log');
      setRecentActivity([]);
    }
  };

  const stats = [
    {
      label: 'Total Objectives',
      value: okrCount,
      icon: <Flag size={24} className="text-green-700" />,
      tooltip: 'Track your quarterly OKRs and progress',
      link: '/app/okr'
    },
    {
      label: 'Backlog Tasks',
      value: taskCount,
      icon: <CheckCircle size={24} className="text-blue-600" />,
      tooltip: 'Your Kanban-style task board',
      link: '/app/backlog'
    },
    {
      label: 'Meeting Notes',
      value: noteCount,
      icon: <StickyNote size={24} className="text-yellow-600" />,
      tooltip: 'Notes organized by date and tag',
      link: '/app/notes'
    }
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Tippy content={stat.tooltip} key={idx} delay={[200, 0]} arrow={false} placement="top">
            <Link to={stat.link} className="block">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div>{stat.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          </Tippy>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity logged yet.</p>
        ) : (
          <>
            <ul className="space-y-3 mb-4">
              {recentActivity.map((item, idx) => (
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
            <button
              onClick={handleClearActivity}
              className="text-sm text-red-500 hover:underline"
            >
              🧹 Clear Activity Log
            </button>
          </>
        )}
      </section>

      <p className="text-gray-500 text-sm">
        This dashboard pulls live data from your OKRs, backlog, and meeting notes.
      </p>
    </div>
  );
};

export default DashboardView;






