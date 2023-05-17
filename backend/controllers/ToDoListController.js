const ToDoList = require('../Models/TodoList');
const { Task } = require('../Models/Task');

module.exports = {

    async updateToDoList(req, res) {
        const { id } = req.params;
        const { title, tasks } = req.body;

        try {
            const ToDoList = await ToDoList.findByIdAndUpdate(
                id,
                { title, tasks },
                { new: true }
            ).populate('tasks');

            if (!ToDoList) {
                return res.status(404).json({ message: 'ToDoList not found' });
            }

            res.json(ToDoList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async deleteToDoList(req, res) {
        const { id } = req.params;

        try {
            const ToDoList = await ToDoList.findByIdAndDelete(id).populate('tasks');
            if (!ToDoList) {
                return res.status(404).json({ message: 'ToDoList not found' });
            }
            res.json({ message: 'ToDoList deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async createTask(req, res) {

        try {

            const { title, priority } = req.body;
            const { toDoListId } = req.params;
            const newTask = new Task({ title, priority });
            const toDoList = await ToDoList.findById(toDoListId);
            toDoList.tasks.push(newTask);
            await newTask.save();
            await toDoList.save();

            const toDoListjson = await ToDoList.findById(toDoListId).populate({
                path: 'tasks',
                select: 'title priority status'
            });
            res.json(toDoListjson);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    //get tasks by todolist id
    async getTasks(req, res) {
        try {
            const { toDoListId } = req.params;
            const toDoList = await ToDoList.findById(toDoListId).populate({
                path: 'tasks',
                select: 'title priority status'
            });
            res.json(toDoList.tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

};