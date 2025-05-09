import React, { useState } from 'react';
import { Bot } from 'lucide-react';

const FeedbackWidget = () => {
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, message: 'Love the OKR layout — clean and simple!', type: 'positive', submitted: '2024-04-10' },
    { id: 2, message: 'Would like dark mode support.', type: 'suggestion', submitted: '2024-04-12' },
  ]);

  const [newFeedback, setNewFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  const handleSubmit = () => {
    if (!newFeedback.trim()) {
      setToast({ type: 'error', message: 'Please enter your feedback before submitting.' });
      return;
    }

    setSubmitting(true);
    const newEntry = {
      id: Date.now(),
      message: newFeedback,
      type: feedbackType,
      submitted: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      setFeedbackList([newEntry, ...feedbackList]);
      setNewFeedback('');
      setFeedbackType('suggestion');
      setSubmitting(false);
      setToast({ type: 'success', message: 'Feedback submitted successfully!' });
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className="group relative bg-green-700 hover:bg-green-800 text-white rounded-full p-3 shadow-lg cursor-pointer transition animate-slowpulse"
          onClick={() => setShowWidget(!showWidget)}
        >
          <Bot className="w-5 h-5" />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-50">
            Send Feedback
          </div>
        </div>
      </div>

      {/* Widget Panel */}
      {showWidget && (
        <div className="fixed bottom-20 right-6 z-50 w-[22rem] sm:w-[26rem] bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-700" />
            Send Feedback
          </h2>

          {toast && (
            <div
              className={`absolute top-2 right-4 px-4 py-2 rounded shadow-md text-sm text-white ${
                toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {toast.message}
            </div>
          )}

          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="What do you love or want to see improved?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 h-24 focus:outline-none focus:ring"
          />
          <div className="flex items-center justify-between mb-4">
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="suggestion">Suggestion</option>
              <option value="positive">Positive</option>
              <option value="bug">Bug Report</option>
            </select>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Recent Feedback</h3>
            <ul className="space-y-3 max-h-40 overflow-y-auto">
              {feedbackList.map((fb) => (
                <li key={fb.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex justify-between mb-1 text-sm text-gray-600">
                    <span className="capitalize font-medium">{fb.type}</span>
                    <span>{fb.submitted}</span>
                  </div>
                  <p className="text-gray-800 text-sm">{fb.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;

