
const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboardController');

// router.get('/task', dashboardcontroller.getAllTasks);
router.post('/dashboard/todolist', dashboardcontroller.getUserToDoListStats);
// router.put('/task/:id', dashboardcontroller.updateTask);
// router.delete('/task/:id', dashboardcontroller.deleteTask);

module.exports = router;