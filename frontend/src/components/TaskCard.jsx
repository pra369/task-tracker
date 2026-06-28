import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
const statusColor = { pending: '#94a3b8', 'in-progress': '#3b82f6', completed: '#22c55e' };

const TaskCard = ({ task, onEdit }) => {
  const { changeStatus, removeTask } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setDeleting(true);
    await removeTask(task._id);
  };

  const handleStatusChange = (e) => changeStatus(task._id, e.target.value);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`task-card ${deleting ? 'deleting' : ''}`} style={{ borderLeft: `4px solid ${priorityColor[task.priority]}` }}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="priority-badge" style={{ background: priorityColor[task.priority] + '22', color: priorityColor[task.priority] }}>
          {task.priority.toUpperCase()}
        </span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            📅 {new Date(task.dueDate).toLocaleDateString()} {isOverdue && '⚠️ Overdue'}
          </span>
        )}
        {task.tags?.length > 0 && (
          <div className="tags">
            {task.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
      </div>
      <div className="task-card-footer">
        <select className="status-select" value={task.status} onChange={handleStatusChange}
          style={{ borderColor: statusColor[task.status], color: statusColor[task.status] }}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task)}>✏️ Edit</button>
          <button className="btn-delete" onClick={handleDelete} disabled={deleting}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;