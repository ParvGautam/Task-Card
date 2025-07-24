import { useState, useEffect, useRef } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const intervalRef = useRef();

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem('taskFormDraft');
    if (draft) {
      try {
        const { title, desc, tags } = JSON.parse(draft);
        setTitle(title || '');
        setDesc(desc || '');
        setTags(tags || '');
      } catch (err) {
      // If parsing fails, remove the invalid draft from localStorage
      localStorage.removeItem('taskFormDraft');
      console.error('Failed to parse taskFormDraft from localStorage:', err);
    }
    }
  }, []);

  // Auto-save draft every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      localStorage.setItem('taskFormDraft', JSON.stringify({ title, desc, tags }));
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [title, desc, tags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    onAddTask({
      title: title.trim(),
      desc: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setTitle('');
    setDesc('');
    setTags('');
    localStorage.removeItem('taskFormDraft'); // Clear draft on submit
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow flex flex-col gap-4 min-w-[300px]">
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
        <input
          id="title"
          className="border border-gray-300 bg-gray-50 text-gray-900 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="desc">Description</label>
        <textarea
          id="desc"
          className="border border-gray-300 bg-gray-50 text-gray-900 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="tags">Tags (comma separated)</label>
        <input
          id="tags"
          className="border border-gray-300 bg-gray-50 text-gray-900 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white w-full py-3 rounded mt-2 hover:bg-blue-600 transition">Add Task</button>
    </form>
  );
}

export default TaskForm; 