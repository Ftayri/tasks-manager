const Task = require('../Models/Task');
const ToDoList = require('../Models/ToDoList');
module.exports = {

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
            const deletedTask = await Task.findByIdAndUpdate(id);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            await ToDoList.updateMany({}, { $pull: { tasks: id } });
            res.json(deletedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },


};
