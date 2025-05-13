import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import { logActivity } from '../utils/activityLogger'; // ✅ NEW

const LOCAL_STORAGE_KEY = 'pmLite_backlog_tasks';

const defaultTasks = [
  { id: 1, title: 'Set up CI pipeline', status: 'To Do', priority: 'High', due: '2024-04-28' },
  { id: 2, title: 'Fix login bug', status: 'In Progress', priority: 'Medium', due: '2024-04-25' },
  { id: 3, title: 'Write test cases', status: 'To Do', priority: 'Low', due: '2024-05-02' },
  { id: 4, title: 'Deploy to staging', status: 'Done', priority: 'High', due: '2024-04-20' },
];

const BacklogBoard = () => {
  const [tasks, setTasks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', due: '', status: 'To Do' });
  const [editId, setEditId] = useState(null);
  const columns = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : defaultTasks;
      setTasks(parsed);
    } catch {
      setTasks(defaultTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const handleAddOrEditTask = () => {
    if (!newTask.title.trim()) return;
    if (editId) {
      setTasks(prev => prev.map(task => task.id === editId ? { ...newTask, id: editId } : task));
      logActivity(`Edited task: ${newTask.title}`);
    } else {
      const created = { ...newTask, id: Date.now() };
      setTasks(prev => [...prev, created]);
      logActivity(`Created task: ${newTask.title}`);
    }
    resetModal();
  };

  const handleEditClick = (task) => {
    setNewTask(task);
    setEditId(task.id);
    setShowModal(true);
  };

  const handleDeleteTask = (id) => {
    const deleted = tasks.find(task => task.id === id);
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
      if (deleted) {
        logActivity(`Deleted task: ${deleted.title}`);
      }
    }
  };

  const handleMoveTask = (id, direction) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const currentIndex = columns.indexOf(task.status);
          const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
          if (columns[newIndex]) {
            logActivity(`Moved task '${task.title}' from ${task.status} to ${columns[newIndex]}`);
            return { ...task, status: columns[newIndex] };
          }
        }
        return task;
      })
    );
  };

  const resetModal = () => {
    setShowModal(false);
    setNewTask({ title: '', priority: 'Medium', due: '', status: 'To Do' });
    setEditId(null);
  };

  if (!tasks) return <div className="p-6 text-gray-500">Loading backlog...</div>;

  const isEmpty = tasks.length === 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Backlog Board</h1>
        <button
          onClick={() => {
            setEditId(null);
            setNewTask({ title: '', priority: 'Medium', due: '', status: 'To Do' });
            setShowModal(true);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          + Add Task
        </button>
      </div>

      {isEmpty ? (
        <EmptyState
          icon="📋"
          title="No Backlog Tasks"
          message="You haven’t added any tasks yet. Start building your backlog."
          actionLabel="+ Add Task"
          onAction={() => {
            setEditId(null);
            setNewTask({ title: '', priority: 'Medium', due: '', status: 'To Do' });
            setShowModal(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div key={column} className="bg-gray-100 p-4 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">{column}</h2>
              <div className="space-y-4">
                {tasks.filter(task => task.status === column).map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Due: {task.due}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="space-x-2">
                        <button onClick={() => handleEditClick(task)} className="hover:text-green-700">Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)} className="hover:text-red-600">Delete</button>
                      </div>
                      <div className="space-x-2">
                        <button onClick={() => handleMoveTask(task.id, 'left')} className="hover:text-blue-600">←</button>
                        <button onClick={() => handleMoveTask(task.id, 'right')} className="hover:text-blue-600">→</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={resetModal}>
        <h2 className="text-lg font-bold mb-4">{editId ? 'Edit Task' : 'Add New Task'}</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <input
          type="date"
          value={newTask.due}
          onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        >
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={resetModal} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Cancel</button>
          <button onClick={handleAddOrEditTask} className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded">
            {editId ? 'Save' : 'Add'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BacklogBoard;



