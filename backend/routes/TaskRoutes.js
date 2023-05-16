const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/task', taskController.getAllTasks);
router.post('/task', taskController.createTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;