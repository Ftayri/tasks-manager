const Task = require('../Models/Task');
const Item = require('../Models/Item');

module.exports = {
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find().populate({
                path: 'items',
                select: 'title priority status'
            });
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async createTask(req, res) {
        const { title, createdAt, items } = req.body;

        // Create the items and save them to the database
        const createdItems = await Item.insertMany(items);

        // Map the created items to their ObjectIds
        const itemIds = createdItems.map((item) => item._id);

        // Create the task with the item ObjectIds
        const newTask = new Task({
            title,
            createdAt,
            items: itemIds,
        });

        try {
            await newTask.save();
            const task = await Task.findById(newTask._id).populate('items');
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async updateTask(req, res) {
        const { id } = req.params;
        const { title, items } = req.body;

        try {
            const task = await Task.findByIdAndUpdate(
                id,
                { title, items },
                { new: true }
            ).populate('items');

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            const task = await Task.findByIdAndDelete(id).populate('items');
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json({ message: 'Task deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
};
