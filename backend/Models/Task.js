const mongoose = require('mongoose');
const Item = require('./Item');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    items: [{ type: mongoose.Schema.Types.ObjectId, ref: Item }],
    createdAt: {
        type: Date,
        default: Date.now,
        // required: true,
    },


});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
