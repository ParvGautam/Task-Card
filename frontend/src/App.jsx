
import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TagFilter from './components/TagFilter';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from backend on mount
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/tasks')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tasks');
        setLoading(false);
      });
  }, []);

  const handleAddTask = (task) => {
    axios.post('http://localhost:5000/tasks', task)
      .then(res => {
        setTasks(prev => [res.data, ...prev]);
        setShowModal(false);
      })
      .catch(() => {
        setError('Failed to add task');
      });
  };

  const handleEditTask = (idx) => {
    setEditingIdx(idx);
    setEditDraft({ ...tasks[idx] });
  };

  const handleDeleteTask = (idx) => {
    const task = tasks[idx];
    if (!task || !task._id) return;
    if (window.confirm('Delete this task?')) {
      axios.delete(`http://localhost:5000/tasks/${task._id}`)
        .then(() => {
          setTasks(prev => prev.filter((_, i) => i !== idx));
          if (editingIdx === idx) {
            setEditingIdx(null);
            setEditDraft(null);
          }
        })
        .catch(() => {
          setError('Failed to delete task');
        });
    }
  };

  const handleEditDraftChange = (field, value) => {
    setEditDraft(draft => ({ ...draft, [field]: value }));
  };

  const handleSaveEdit = (idx) => {
    const task = tasks[idx];
    if (!task || !task._id) return;
    const updatedTask = {
      ...editDraft,
      tags: typeof editDraft.tags === 'string' ? editDraft.tags.split(',').map(t => t.trim()).filter(Boolean) : editDraft.tags
    };
    axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask)
      .then(res => {
        setTasks(prev => prev.map((t, i) => i === idx ? res.data : t));
        setEditingIdx(null);
        setEditDraft(null);
      })
      .catch(() => {
        setError('Failed to update task');
      });
  };

  const handleCancelEdit = () => {
    setEditingIdx(null);
    setEditDraft(null);
  };

  // Compute unique tags
  const allTags = Array.from(new Set(tasks.flatMap(t => t.tags || [])));
  const filteredTasks = selectedTag ? tasks.filter(t => t.tags && t.tags.includes(selectedTag)) : tasks;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 text-gray-900 relative">
     
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-6 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg px-6 py-3 text-lg font-bold transition"
      >
        + Add Task
      </button>
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Card UI</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>}
        <TagFilter tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            editingIdx={editingIdx}
            editDraft={editDraft}
            onEditDraftChange={handleEditDraftChange}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <TaskForm onAddTask={handleAddTask} />
      </Modal>
    </div>
  );
}

export default App;
