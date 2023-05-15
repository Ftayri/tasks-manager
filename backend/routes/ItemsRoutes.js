const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.get('/item', itemController.getAllItems);
router.post('/item', itemController.createItem);
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);

module.exports = router;