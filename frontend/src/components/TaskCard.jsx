function TaskCard({ task, isEditing, onEdit, onDelete, onEditDraftChange, onSaveEdit, onCancelEdit }) {
  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3 mb-4 border border-gray-100">
        <input
          className="border border-gray-300 bg-gray-50 text-gray-900 text-lg font-bold rounded p-2 focus:outline-none"
          type="text"
          value={task.title}
          onChange={e => onEditDraftChange('title', e.target.value)}
        />
        <textarea
          className="border border-gray-300 bg-gray-50 text-gray-900 rounded p-2 focus:outline-none"
          value={task.desc}
          onChange={e => onEditDraftChange('desc', e.target.value)}
        />
        <input
          className="border border-gray-300 bg-gray-50 text-gray-900 rounded p-2 focus:outline-none"
          type="text"
          value={Array.isArray(task.tags) ? task.tags.join(', ') : task.tags}
          onChange={e => onEditDraftChange('tags', e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button onClick={onSaveEdit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Save</button>
          <button onClick={onCancelEdit} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3 border border-gray-100 min-h-[150px]">
      <h3 className="text-lg font-bold text-gray-900 truncate">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-2 truncate">{task.desc}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {task.tags && task.tags.map && task.tags.map((tag, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard; 