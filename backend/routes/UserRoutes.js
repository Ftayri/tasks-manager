const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/user', UserController.getUser);
router.post('/create-user', UserController.createUser);
router.post('/user/:userId/todoList', UserController.createToDoList);

// router.put('/todolist/:id', ToDoListController.updateToDoList);
// router.delete('/todolist/:id', ToDoListController.deleteToDoList);

module.exports = router;