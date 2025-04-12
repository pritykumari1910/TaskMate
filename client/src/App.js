import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">TaskMate - To-Do List</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <TaskForm tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
