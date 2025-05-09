import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState'; // ✅ Import EmptyState

const LOCAL_STORAGE_KEY = 'pmLiteNotes';

const MeetingNotesView = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.map(note => ({
        ...note,
        tags: Array.isArray(note.tags) ? note.tags : [],
      }));
    } catch {
      return [];
    }
  });

  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAddOrEditNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const formattedNote = {
      ...newNote,
      id: editId || Date.now(),
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    setNotes(prev =>
      editId
        ? prev.map(note => note.id === editId ? formattedNote : note)
        : [formattedNote, ...prev]
    );

    setNewNote({ title: '', content: '', tags: '', date: '' });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (note) => {
    setNewNote({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      date: note.date,
    });
    setEditId(note.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesTag = filterTag ? note.tags.includes(filterTag) : true;
    const matchesDate = filterDate ? note.date === filterDate : true;
    return matchesTag && matchesDate;
  });

  return (
    <div className="px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📝 Meeting Notes</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + New Note
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value.trim())}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={() => {
            setFilterTag('');
            setFilterDate('');
          }}
          className="text-sm text-gray-600 hover:underline"
        >
          Clear Filters
        </button>
      </div>

      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No Meeting Notes Yet"
            message="You haven’t added any notes. Start by creating your first meeting note."
            actionLabel="+ New Note"
            onAction={() => {
              setShowModal(true);
              setEditId(null);
            }}
          />
        ) : (
          filteredNotes.map(note => (
            <div key={note.id} className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>
                <span className="text-xs text-gray-400">{note.date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{note.content}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <button onClick={() => handleEdit(note)} className="hover:text-green-700">Edit</button>
                <button onClick={() => handleDelete(note.id)} className="hover:text-red-600">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setNewNote({ title: '', content: '', tags: '', date: '' });
        setEditId(null);
      }}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">{editId ? 'Edit Note' : 'Add New Meeting Note'}</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <textarea
          placeholder="Write your note here..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 h-24 resize-none"
        />
        <input
          type="text"
          placeholder="Tags (e.g. sprint, retro)"
          value={newNote.tags}
          onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <input
          type="date"
          value={newNote.date}
          onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setShowModal(false);
              setNewNote({ title: '', content: '', tags: '', date: '' });
              setEditId(null);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOrEditNote}
            className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded"
          >
            {editId ? 'Save Note' : 'Add Note'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MeetingNotesView;




