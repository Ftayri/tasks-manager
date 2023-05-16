const User = require('../Models/User');
const ToDoList = require('../Models/TodoList');

module.exports = {
    async getUserToDoListStats(req, res) {
        const { id } = req.body;
        try {

            const user = await User.findById(id).populate("todolists");
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


