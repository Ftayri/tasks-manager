const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;