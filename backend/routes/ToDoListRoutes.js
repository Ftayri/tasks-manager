const express = require('express');
const router = express.Router();
const toDoListController = require('../controllers/ToDoListController');

router.post('/todolist/:toDoListId/task', toDoListController.createTask);
router.put('/todolist/:id', toDoListController.updateToDoList);
router.delete('/todolist/:id', toDoListController.deleteToDoList);

module.exports = router;
