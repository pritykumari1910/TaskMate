import React from 'react';

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`p-4 rounded border ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm">Due: {task.dueDate}</p>
          <p className="text-sm">Category: {task.category}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onToggle(task.id)}
            className={`px-2 py-1 rounded text-sm ${task.completed ? 'bg-yellow-400' : 'bg-green-500 text-white'}`}
          >
            {task.completed ? 'Incomplete' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
