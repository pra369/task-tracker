import React, { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../utils/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', priority: 'all', search: '', sortBy: 'createdAt', order: 'desc' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadTasks = useCallback(async (customFilters) => {
    setLoading(true);
    try {
      const params = customFilters || filters;
      const res = await api.fetchTasks(params);
      setTasks(res.data.data);
    } catch {
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadStats = useCallback(async () => {
    try {
      const res = await api.fetchStats();
      setStats(res.data.data);
    } catch {}
  }, []);

  const addTask = async (data) => {
    await api.createTask(data);
    showToast('Task created successfully!');
    loadTasks();
    loadStats();
  };

  const editTask = async (id, data) => {
    await api.updateTask(id, data);
    showToast('Task updated successfully!');
    loadTasks();
    loadStats();
  };

  const changeStatus = async (id, status) => {
    await api.updateTaskStatus(id, status);
    showToast('Status updated!');
    loadTasks();
    loadStats();
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    showToast('Task deleted!', 'error');
    loadTasks();
    loadStats();
  };

  return (
    <TaskContext.Provider value={{
      tasks, stats, loading, toast, filters, setFilters,
      loadTasks, loadStats, addTask, editTask, changeStatus, removeTask, showToast
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);