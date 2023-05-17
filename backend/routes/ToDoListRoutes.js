const express = require('express');
const router = express.Router();
const toDoListController = require('../controllers/ToDoListController');

router.get('/todolist/:id', toDoListController.getToDoList);
router.post('/todolist/:toDoListId/task', toDoListController.createTask);
router.put('/todolist/:id', toDoListController.updateToDoList);
router.delete('/todolist/:id', toDoListController.deleteToDoList);
router.get('/todolist/:toDoListId/task', toDoListController.getTasks);

module.exports = router;
