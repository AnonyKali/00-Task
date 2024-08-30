const Task = require('../models/taskModel');

// Convert completed field to boolean
const convertToBoolean = (value) => !!value;

exports.createTask = (req, res) => {
    const { title, description, completed } = req.body;
    Task.create(title, description, completed, (err, taskId) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: taskId,
            title,
            description,
            completed: convertToBoolean(completed)
        });
    });
};

exports.getAllTasks = (req, res) => {
    Task.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Convert completed field to boolean
        const tasks = rows.map(task => ({
            ...task,
            completed: convertToBoolean(task.completed)
        }));

        res.json(tasks);
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Check if the task exists before updating
    Task.getAll((err, tasks) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const taskExists = tasks.some(task => task.id == id);
        if (!taskExists) {
            return res.status(404).json({ error: 'Task not found' });
        }

        Task.update(id, title, description, completed, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (changes === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({
                id,
                title,
                description,
                completed: convertToBoolean(completed)
            });
        });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    Task.delete(id, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    });
};
