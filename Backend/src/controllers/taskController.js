const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }
    const id = await Task.create(title.trim());
    res.status(201).json({ id, title, status: 'pending' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await Task.updateStatus(id, status);
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.delete(id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};