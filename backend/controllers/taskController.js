const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const tasks = await Task.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) { next(error); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (error) { next(error); }
};

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } catch (error) { next(error); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task updated successfully', data: task });
  } catch (error) { next(error); }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'in-progress', 'completed'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Status updated', data: task });
  } catch (error) { next(error); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) { next(error); }
};

exports.getTaskStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments();
    const byStatus = await Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const byPriority = await Task.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]);
    res.json({ success: true, data: { total, byStatus, byPriority } });
  } catch (error) { next(error); }
};