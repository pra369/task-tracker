import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskFilters = () => {
  const { filters, setFilters, loadTasks } = useTasks();

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    loadTasks(updated);
  };

  return (
    <div className="filters">
      <input className="filter-search" type="text" name="search"
        placeholder="🔍 Search tasks..." value={filters.search} onChange={handleChange} />
      <select name="status" value={filters.status} onChange={handleChange} className="filter-select">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select name="priority" value={filters.priority} onChange={handleChange} className="filter-select">
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="filter-select">
        <option value="createdAt">Sort: Date Created</option>
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
        <option value="title">Sort: Title</option>
      </select>
      <select name="order" value={filters.order} onChange={handleChange} className="filter-select">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default TaskFilters;