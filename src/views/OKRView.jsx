import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Flag } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const LOCAL_STORAGE_KEY = 'pmLite_okrs';

const defaultObjectives = [
  {
    id: 1,
    title: 'Improve Product Adoption',
    owner: 'Lena',
    due: 'June 30',
    keyResults: [
      { text: 'Increase MAUs by 20%', done: false },
      { text: 'Launch onboarding flow v2', done: true },
      { text: 'Reduce churn by 15%', done: false },
    ],
  },
  {
    id: 2,
    title: 'Strengthen Engineering Velocity',
    owner: 'Alex',
    due: 'June 30',
    keyResults: [
      { text: 'Ship 80% of sprint goals', done: false },
      { text: 'Reduce PR cycle time to under 24h', done: true },
      { text: 'Improve test coverage by 30%', done: false },
    ],
  },
];

const OKRView = () => {
  const [objectives, setObjectives] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : defaultObjectives;
    } catch {
      return defaultObjectives;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [newKeyResults, setNewKeyResults] = useState(['']);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(objectives));
  }, [objectives]);

  const handleAddOrEditObjective = () => {
    if (!newTitle.trim()) return;
    const formattedKRs = newKeyResults.filter(kr => kr.trim()).map(kr => ({ text: kr, done: false }));

    if (editId) {
      setObjectives(prev =>
        prev.map(obj =>
          obj.id === editId ? { ...obj, title: newTitle, keyResults: formattedKRs } : obj
        )
      );
    } else {
      const newObj = {
        id: Date.now(),
        title: newTitle,
        owner: 'You',
        due: 'July 30',
        keyResults: formattedKRs,
      };
      setObjectives([...objectives, newObj]);
    }

    setNewTitle('');
    setNewKeyResults(['']);
    setEditId(null);
    setShowModal(false);
  };

  const handleEditClick = (id, currentTitle, keyResults) => {
    setEditId(id);
    setNewTitle(currentTitle);
    setNewKeyResults(keyResults.map(kr => kr.text));
    setShowModal(true);
  };

  const handleDeleteObjective = (id) => {
    if (window.confirm('Are you sure you want to delete this objective?')) {
      setObjectives(prev => prev.filter(obj => obj.id !== id));
    }
  };

  const handleKRChange = (index, value) => {
    const updated = [...newKeyResults];
    updated[index] = value;
    setNewKeyResults(updated);
  };

  const addKeyResultField = () => setNewKeyResults([...newKeyResults, '']);

  const toggleKeyResult = (objId, index) => {
    setObjectives(prev =>
      prev.map(obj => {
        if (obj.id === objId) {
          const updatedKRs = obj.keyResults.map((kr, i) =>
            i === index ? { ...kr, done: !kr.done } : kr
          );
          return { ...obj, keyResults: updatedKRs };
        }
        return obj;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Q2 OKRs</h1>
        <button
          onClick={() => {
            setEditId(null);
            setNewTitle('');
            setNewKeyResults(['']);
            setShowModal(true);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded-xl shadow hover:bg-green-800 transition"
        >
          + Add Objective
        </button>
      </div>

      {objectives.length === 0 ? (
        <EmptyState
          icon="🎯"
          title="No Objectives Yet"
          message="Start by adding your first objective to track key results."
          actionLabel="+ Add Objective"
          onAction={() => {
            setEditId(null);
            setNewTitle('');
            setNewKeyResults(['']);
            setShowModal(true);
          }}
        />
      ) : (
        objectives.map((obj) => (
          <div
            key={obj.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Flag className="text-green-700 w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">{obj.title}</h2>
              </div>
              <div className="flex gap-2 text-gray-500">
                <button
                  className="hover:text-green-700"
                  title="Edit"
                  onClick={() => handleEditClick(obj.id, obj.title, obj.keyResults)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="hover:text-red-600"
                  title="Delete"
                  onClick={() => handleDeleteObjective(obj.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-3">
              Owned by {obj.owner} · Due {obj.due}
            </p>

            <ul className="text-gray-700 space-y-2 pl-2">
              {obj.keyResults.map((kr, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={kr.done}
                    onChange={() => toggleKeyResult(obj.id, index)}
                  />
                  <span className={kr.done ? 'line-through text-gray-400' : ''}>{kr.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setNewTitle('');
        setNewKeyResults(['']);
        setEditId(null);
      }}>
        <h2 className="text-xl font-bold mb-4">
          {editId ? 'Edit Objective' : 'Add New Objective'}
        </h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Objective title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <div className="space-y-2 mb-4">
          {newKeyResults.map((kr, idx) => (
            <input
              key={idx}
              type="text"
              value={kr}
              onChange={(e) => handleKRChange(idx, e.target.value)}
              placeholder={`Key Result ${idx + 1}`}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          ))}
          <button
            onClick={addKeyResultField}
            className="text-sm text-green-700 mt-2 hover:underline"
          >
            + Add Key Result
          </button>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setShowModal(false);
              setNewTitle('');
              setNewKeyResults(['']);
              setEditId(null);
            }}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOrEditObjective}
            className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800"
          >
            {editId ? 'Save' : 'Add'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OKRView;


