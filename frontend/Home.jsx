import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import StatsBar from '../components/StatsBar';

const Home = () => {
  const { tasks, stats, loading, loadTasks, loadStats } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const handleEdit = (task) => { setEditData(task); setShowForm(true); };
  const handleClose = () => { setShowForm(false); setEditData(null); };

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="page-title">My Tasks</h1>
        <button className="btn-add" onClick={() => setShowForm(true)}>+ Add Task</button>
      </div>
      <StatsBar stats={stats} />
      <TaskFilters />
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>📋 No tasks found. Click "Add Task" to get started!</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}
      {showForm && <TaskForm editData={editData} onClose={handleClose} />}
    </div>
  );
};

export default Home;