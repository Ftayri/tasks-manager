const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// router.get('/todolist', ToDoListController.getAllToDoLists);
router.post('/create-user', UserController.createUser);
router.post('/user/:userId/todoList', UserController.createToDoList);

// router.put('/todolist/:id', ToDoListController.updateToDoList);
// router.delete('/todolist/:id', ToDoListController.deleteToDoList);

module.exports = router;