const User = require('../Models/User');
const Task = require('../Models/Task');
const ToDoList = require('../Models/TodoList');

module.exports = {
    async dashboardTasks(req, res) {
        try {
            const { firebaseUid } = req.body;
            const user = await User.where({ firebaseUid: firebaseUid }).findOne();
            const todoLists = user.todolists;
            const tasks = [];
            for (let i = 0; i < todoLists.length; i++) {
                const todoList = await ToDoList.findById(todoLists[i]).populate('tasks');
                for (let j = 0; j < todoList.tasks.length; j++) {
                    tasks.push(todoList.tasks[j]);
                }
            }
            const totalCompleted = tasks.filter(task => task.status === 'completed').length;
            const totalPending = tasks.filter(task => task.status === 'pending').length;
            const pendingPerPriority = {
                low: tasks.filter(task => task.status === 'pending' && task.priority === 'low').length,
                medium: tasks.filter(task => task.status === 'pending' && task.priority === 'medium').length,
                high: tasks.filter(task => task.status === 'pending' && task.priority === 'high').length,
            }
            response ={
                totalCompleted,
                totalPending,
                pendingPerPriority,
            }
            res.json(response);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}