const TaskModel = require('../models/taskModel');
const { validationResult } = require('express-validator');
const taskModel = new TaskModel();

// Retrieve all task
async function getAllTasks(req, res, next) {
    try {
        const { rows } = await taskModel.getAllTasks();
        res.json({
            success: true,
            message: 'Tasks retrieved successfully',
            total: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

// Retrieve specific user by ID
async function getTaskById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    const taskId = req.params.id;
    try {
        const { task } = await taskModel.getTaskById(taskId);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
}

// Create a new task
async function createTask(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const taskData = req.body;
    try {
        const { id } = await taskModel.createTask(taskData);
        res.status(201).json({ success: true, message: 'Task created successfully', id });
    } catch (error) {
        next(error);
    }
}

// Update specific task by ID
async function updateTask(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const taskId = req.params.id;
    const taskData = req.body;

    try {
        const task = await taskModel.getTaskById(taskId);
        if (!task) {
            const error = new Error('Task does not exist.');
            error.statusCode = 404;
            throw error;
        }

        const result = await taskModel.updateTask(taskData, taskId);
        res.status(200).json({ success: true, message: 'Task updated successfully', id: taskId });
    } catch (error) {
        next(error);
    }
}

// Delete a new task by ID
async function deleteTask(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const taskId = req.params.id;

    try {
        const task = await taskModel.getTaskById(taskId);
        if (!task) {
            const error = new Error('Task does not exist.');
            error.statusCode = 404;
            throw error;
        }

        const result = await taskModel.deleteTask(taskId);
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }

}





module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};