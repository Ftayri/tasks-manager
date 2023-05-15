const Item = require('../Models/Item');

module.exports = {
    async getAllItems(req, res) {
        try {
            const items = await Item.find();
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async createItem(req, res) {
        try {
            const { title, priority, status } = req.body;
            const newItem = new Item({ title, priority, status });
            const savedItem = await newItem.save();
            res.json(savedItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const { title, priority, status } = req.body;
            const updatedItem = await Item.findByIdAndUpdate(
                id,
                { title, priority, status },
                { new: true }
            );
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(updatedItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Item.findByIdAndDelete(id);
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(deletedItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};
