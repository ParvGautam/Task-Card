const express = require('express');
const Task = require('../models/TaskModel');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, desc, tags } = req.body;
    const task = new Task({ title, desc, tags });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, desc, tags } = req.body;
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title, desc, tags },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

module.exports = router;
