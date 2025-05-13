import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Flag } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { logActivity } from '../utils/activityLogger';

const LOCAL_STORAGE_KEY = 'pmLite_okrs';
const TITLE_STORAGE_KEY = 'pmLite_okr_title';

const OKRView = () => {
  const [objectives, setObjectives] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [pageTitle, setPageTitle] = useState('Q2 OKRs');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [newKeyResults, setNewKeyResults] = useState(['']);

  useEffect(() => {
    const savedTitle = localStorage.getItem(TITLE_STORAGE_KEY);
    if (savedTitle) setPageTitle(savedTitle);
  }, []);

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
      logActivity(`Edited objective: ${newTitle}`);
    } else {
      const newObj = {
        id: Date.now(),
        title: newTitle,
        owner: 'You',
        due: 'July 30',
        keyResults: formattedKRs,
      };
      setObjectives(prev => [...prev, newObj]);
      logActivity(`Created new objective: ${newTitle}`);
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
    const deleted = objectives.find(obj => obj.id === id);
    if (window.confirm('Are you sure you want to delete this objective?')) {
      setObjectives(prev => prev.filter(obj => obj.id !== id));
      if (deleted) logActivity(`Deleted objective: ${deleted.title}`);
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
          logActivity(`Marked KR as ${updatedKRs[index].done ? 'done' : 'undone'}: ${updatedKRs[index].text}`);
          return { ...obj, keyResults: updatedKRs };
        }
        return obj;
      })
    );
  };

  const calculateProgress = (krs) => {
    const completed = krs.filter(kr => kr.done).length;
    const total = krs.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  };

  const handleTitleSave = () => {
    const clean = titleInput.trim();
    if (clean) {
      setPageTitle(clean);
      localStorage.setItem(TITLE_STORAGE_KEY, clean);
    }
    setEditingTitle(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="text-3xl font-bold border border-gray-300 px-3 py-1 rounded-lg"
              />
              <button
                onClick={handleTitleSave}
                className="text-sm bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {pageTitle}
              <button onClick={() => {
                setTitleInput(pageTitle);
                setEditingTitle(true);
              }}>
                <Pencil size={16} className="text-gray-400 hover:text-green-700" />
              </button>
            </h1>
          )}
        </div>

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
        objectives
          .sort((a, b) => a.due.localeCompare(b.due))
          .map((obj) => {
            const { completed, total, percent } = calculateProgress(obj.keyResults);
            return (
              <div key={obj.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 hover:shadow-xl transition">
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

                <p className="text-sm font-medium text-gray-600 mb-2">
                  <span className="text-green-800">Due: {obj.due}</span> · Owner: {obj.owner}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  Progress: {completed} of {total} completed
                </p>
                <div className="w-full h-2 rounded bg-gray-200 mb-4 overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

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
            );
          })
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


