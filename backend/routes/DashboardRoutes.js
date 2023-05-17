const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

router.post('/dashboard/tasks', dashboardController.dashboardTasks);
router.post('/dashboard/todolists', dashboardController.getUserToDoListStats);

module.exports = router;