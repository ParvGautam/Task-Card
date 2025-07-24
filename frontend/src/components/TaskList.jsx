import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, onDelete, editingIdx, editDraft, onEditDraftChange, onSaveEdit, onCancelEdit }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center col-span-full">No tasks yet.</p>
      ) : (
        tasks.map((task, idx) => (
          <TaskCard
            key={task._id || idx}
            task={editingIdx === idx ? editDraft : task}
            isEditing={editingIdx === idx}
            onEdit={() => onEdit(idx)}
            onDelete={() => onDelete(idx)}
            onEditDraftChange={onEditDraftChange}
            onSaveEdit={() => onSaveEdit(idx)}
            onCancelEdit={onCancelEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList; 