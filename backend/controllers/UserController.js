const User = require('../Models/User');
const ToDoList = require('../Models/TodoList');
const Task = require('../Models/Task');


module.exports = {
    async createUser(req, res) {
        const { username, firebaseUid } = req.body;

        const newUser = new User({
            firebaseUid,
            username,
        });
        try {
            await newUser.save();
            res.json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    //create todolist and add to user
    async createToDoList(req, res) {
        try {
            const { title, dueDate, description } = req.body;
            const { userId } = req.params;
            //find user by firebaseUid
            const user = await User.where({ firebaseUid: userId }).findOne();
            const newToDoList = new ToDoList({ title, dueDate, description, tasks: [] });
            user.todolists.push(newToDoList);
            await newToDoList.save();
            await user.save();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },



    async getUser(req, res) {
        const { id } = req.body;

        try {
            const user = await User.findById(id).populate('todolists');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    //get todolist by user firebaseUid
    async getToDoList(req, res) {
        try {
            const { userId } = req.body;
            const user = await User.where({ firebaseUid: userId }).findOne().populate('todolists');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.todolists);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }



};
