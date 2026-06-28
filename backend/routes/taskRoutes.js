const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllTasks, getTaskById, createTask,
  updateTask, updateTaskStatus, deleteTask, getTaskStats
} = require('../controllers/taskController');

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Minimum 3 characters')
    .isLength({ max: 100 }).withMessage('Maximum 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Max 500 characters'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('Invalid date'),
];

router.get('/stats', getTaskStats);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;