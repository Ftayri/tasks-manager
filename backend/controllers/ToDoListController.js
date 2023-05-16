const ToDoList = require('../Models/TodoList');
const Task = require('../Models/Task');

module.exports = {
    async getAllToDoLists(req, res) {
        try {
            const ToDoLists = await ToDoList.find().populate({
                path: 'tasks',
                select: 'title priority status'
            });
            res.json(ToDoLists);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async createToDoList(req, res) {
        const { title, createdAt, tasks, dueDate } = req.body;

        // Create the Tasks and save them to the database
        const createdTasks = await Task.insertMany(tasks);

        // Map the created Tasks to their ObjectIds
        const taskIds = createdTasks.map((task) => task._id);

        // Create the ToDoList with the Task ObjectIds
        const newToDoList = new ToDoList({
            title,
            createdAt,
            dueDate,
            tasks: createdTasks,
        });

        try {
            await newToDoList.save();
            const toDoList = await ToDoList.findById(newToDoList._id).populate({
                path: 'tasks',
                select: 'title priority status'
            });
            res.json(toDoList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

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
            const ToDoList = await ToDoList.findById(toDoListId);
            ToDoList.push(newTask);
            await newTask.save();
            await ToDoList.save();
            res.json(ToDoList);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
};