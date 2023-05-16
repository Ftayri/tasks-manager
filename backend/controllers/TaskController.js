const Task = require('../Models/Task');

module.exports = {
    async getAllTasks(req, res) {
        try {
            const Tasks = await Task.find();
            res.json(Tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async createTask(req, res) {
        try {
            const { title, priority, status } = req.body;
            const newTask = new Task({ title, priority, status });
            const savedTask = await newTask.save();
            res.json(savedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, priority, status } = req.body;
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                { title, priority, status },
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(updatedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(deletedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};
