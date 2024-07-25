const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - Retrieve all tasks
router.get('/', taskController.getAllTasks);

// GET /tasks/:id - Retrieve specific task by ID
router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    taskController.getTaskById
);

// POST /tasks - Create a new task
router.post('/',
    body('task_name').notEmpty().withMessage('task_name is required'),
    body('task_desc').notEmpty().withMessage('task_desc is required'),
    taskController.createTask
);

// PUT /tasks - Update Task Information
router.put('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    body('task_name').notEmpty().withMessage('task_name is required'),
    body('task_desc').notEmpty().withMessage('task_name is required.'),

    taskController.updateTask

);

// DELETE /tasks - Delete Task by ID
router.delete('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    taskController.deleteTask
);

module.exports = router;
