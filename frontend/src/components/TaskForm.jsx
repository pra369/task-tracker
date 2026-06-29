import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

const EMPTY = { title: '', description: '', status: 'pending', priority: 'medium', dueDate: '', tags: '' };

const TaskForm = ({ editData, onClose }) => {
  const { addTask, editTask } = useTasks();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        dueDate: editData.dueDate ? editData.dueDate.substring(0, 10) : '',
        tags: editData.tags?.join(', ') || '',
      });
    }
  }, [editData]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.trim().length < 3) e.title = 'Minimum 3 characters required';
    if (form.description.length > 500) e.description = 'Max 500 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) return setErrors(e2);
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        dueDate: form.dueDate || null,
      };
      if (editData) await editTask(editData._id, payload);
      else await addTask(payload);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editData ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange}
              placeholder="Enter task title" className={errors.title ? 'input-error' : ''} />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Task description (optional)" rows={3}
              className={errors.description ? 'input-error' : ''} />
            {errors.description && <span className="error-msg">{errors.description}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. work, urgent" />
            </div>
          </div>
          {errors.submit && <div className="error-banner">{errors.submit}</div>}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Saving...' : editData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;