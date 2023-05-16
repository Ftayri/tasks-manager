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

            const user = await User.where({ firebaseUid: firebaseUid }).populate("todolists");
            const currentDate = new Date();
            const overdueCount = user.todolists.filter(todolist => new Date(todolist.dueDate) < currentDate).length;
            const totalCount = user.todolists.length;
            console.log(overdueCount);
            console.log(totalCount);
            //number of todolist added in the last 7 days per day
            const todolistAddedInLast7Days = user.todolists.filter(todolist => {
                const todolistDate = new Date(todolist.createdAt);
                const todolistDatePlus7Days = new Date(todolistDate.setDate(todolistDate.getDate() + 7));
                return todolistDatePlus7Days > currentDate;
            }).length;
            console.log(todolistAddedInLast7Days);

            //number of todolist per day in the last 7 days
            const todolistPerDayInLast7Days = getToDoListCountPerDayLast7Days(user);

            console.log(todolistPerDayInLast7Days)

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) { }





    }

}



function getToDoListCountPerDayLast7Days(json) {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    const countPerDay = {};

    for (let i = 0; i < 7; i++) {
        const currentDateMinusDays = new Date(sevenDaysAgo);
        currentDateMinusDays.setDate(sevenDaysAgo.getDate() + i);

        const count = json.todolists.reduce((total, todolist) => {
            const todolistDate = new Date(todolist.createdAt);
            console.log(todolistDate);
            if (
                todolistDate.getFullYear() === currentDateMinusDays.getFullYear() &&
                todolistDate.getMonth() === currentDateMinusDays.getMonth() &&
                todolistDate.getDate() === currentDateMinusDays.getDate()
            ) {
                return total + 1;
            }
            return total;
        }, 0);

        countPerDay[currentDateMinusDays.toDateString()] = count;
    }

    return countPerDay;
}
