const Task = require('../Models/Task');

module.exports = {
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async createTask(req, res) {
        try {
            const { title, description } = req.body;
            const task = new Task({ title, description });
            await task.save();
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, completed } = req.body;
            const task = await Task.findByIdAndUpdate(
                id,
                { title, description, completed },
                { new: true }
            );
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await Task.findByIdAndDelete(id);
            res.json({ message: 'Task deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
};
