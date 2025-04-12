// import React, { useState } from 'react';
// import TaskItem from './TaskItem';

// function TaskList({ tasks, setTasks }) {
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('');

//   const handleDelete = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   const handleToggle = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const filteredTasks = tasks.filter(task =>
//     (task.title.toLowerCase().includes(search.toLowerCase()) ||
//       task.description.toLowerCase().includes(search.toLowerCase())) &&
//     (filter ? task.category === filter : true)
//   );

//   return (
//     <div className="mt-6 space-y-3">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           className="flex-1 p-2 border rounded"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="p-2 border rounded"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="">All</option>
//           <option>Work</option>
//           <option>Personal</option>
//           <option>Study</option>
//           <option>Others</option>
//         </select>
//       </div>

//       {filteredTasks.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">No tasks found.</p>
//       )}

//       {filteredTasks.map(task => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           onDelete={handleDelete}
//           onToggle={handleToggle}
//         />
//       ))}
//     </div>
//   );
// }

// export default TaskList;


import React, { useEffect } from 'react';
import axios from 'axios';

function TaskList({ tasks, setTasks }) {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [setTasks]); // optional: include setTasks for clarity

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <ul className="mt-6 space-y-3">
      {tasks.map(task => (
        <li key={task._id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.dueDate && <p className="text-sm text-gray-500">Due: {task.dueDate}</p>}
            {task.category && <p className="text-sm text-blue-500">Category: {task.category}</p>}
          </div>
          <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
