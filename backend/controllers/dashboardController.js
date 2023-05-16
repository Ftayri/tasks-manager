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
    },

    async getUserToDoListStats(req, res) {
        const { firebaseUid } = req.body;
        try {

            const user = await User.where({ firebaseUid: firebaseUid }).findOne().populate('todolists');
            const todoLists = user.todolists;
            const totalToDoLists = todoLists.length;
            const overdueToDoLists = todoLists.filter(todolist => todolist.dueDate < Date.now()).length;
            //get number of todolists created per day for the last 7 days
            const countPerDay = getToDoListCountPerDayLast7Days(todoLists);
            const response = {
                totalToDoLists,
                overdueToDoLists,
                countPerDay,
            }
            res.json(response);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) { }

    }

}



function getToDoListCountPerDayLast7Days(json) {
    //get todolists created per day for the last 7 days
    const todolistsPerDay = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(day.getDate() - i);
        const dayCount = json.filter(todolist => todolist.createdAt.toDateString() === day.toDateString()).length;
        todolistsPerDay.push(dayCount);
    }
    return todolistsPerDay;

}
