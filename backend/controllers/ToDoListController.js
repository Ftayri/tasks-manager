const ToDoList = require('../Models/ToDoList');
const Task = require('../Models/Task');
const User = require('../Models/User');

module.exports = {

    async updateToDoList(req, res) {
        const { id } = req.params;
        const { title, description, tasks } = req.body;

        try {
            const toDoList = await ToDoList.findByIdAndUpdate(
                id,
                { title, description, tasks },
                { new: true }
            ).populate('tasks');

            if (!toDoList) {
                return res.status(404).json({ message: 'ToDoList not found' });
            }
            res.json(toDoList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async deleteToDoList(req, res) {
        const { id } = req.params;

        try {
            const toDoList = await ToDoList.findByIdAndDelete(id);

            if (!toDoList) {
                return res.status(404).json({ message: 'ToDoList not found x' });
            }
            await Task.deleteMany({ _id: { $in: toDoList.tasks } });
            await User.updateMany({}, { $pull: { todolists: id } });
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
    },

    async getToDoList(req, res) {
        try {
            const { id } = req.params;
            const toDoList = await ToDoList.findById(id).populate({
                path: 'tasks',
                select: 'title priority status'
            });
            res.json(toDoList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

};