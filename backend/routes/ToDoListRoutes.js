const express = require('express');
const router = express.Router();
const ToDoListController = require('../controllers/ToDoListController');

router.get('/todolist', ToDoListController.getAllToDoLists);
router.post('/todolist/:toDoListId/task', ToDoListController.createTask);
router.put('/todolist/:id', ToDoListController.updateToDoList);
router.delete('/todolist/:id', ToDoListController.deleteToDoList);

module.exports = router;
