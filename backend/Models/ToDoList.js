const mongoose = require('mongoose');
const { Task, taskSchema } = require('./Task');

const todolistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // required: true,
    },
    dueDate: {
        type: Date,
        // required: true,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task' // Referencing the Task model
        }// Referencing the Task model
    ],


});

const ToDoList = mongoose.model('ToDoList', todolistSchema);

module.exports = ToDoList;
