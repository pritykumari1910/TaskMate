import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ tasks, setTasks }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, form);
      setTasks([...tasks, res.data]);
      setForm({ title: '', description: '', dueDate: '', category: '' });
    } catch (err) {
      console.error("Error adding task:", err.message);
      alert("Error adding task. Make sure the server is running.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-xl border border-gray-200 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Task</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={4}
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
